import { courseOutlineAIModel } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";


export async function POST(req) {

    const {courseId,topic,courseType,difficultyLevel,createdBy}=await req.json();

    //generate the course layout using ai
    const PROMPT='Generate a study material for '+topic+' for '+courseType+' and level of difficulty will be '+difficultyLevel+' with summary of course, List of Chapters along with summary for each chapter in one line, Topic list in each chapter in JSON format'

    const aiResp=await courseOutlineAIModel.sendMessage(PROMPT);
    const aiResult= JSON.parse(aiResp.response.text());
   

    //save the ressult along with the user i/p
    const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult
        
    }).returning({resp:STUDY_MATERIAL_TABLE})

    //trigger inngest func to gen chapter notes

    const result=await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    })

    console.log(result);

    return NextResponse.json({result:dbResult[0]})
    
}