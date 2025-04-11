import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {chapters,courseId,type}=await req.json();

    const PROMPT=type==='Flashcard'
    ? 'Generate the flashcard on topic : '+chapters+' JSON format with front back content, Maximum 15' 
    : 'Generate Quiz on topic : '+chapters+' with Question and Options along with correct answer in JSON format, Max 10';



    //insert record to DB, update status to generating
    const result=await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type
    }).returning({id:STUDY_TYPE_CONTENT_TABLE.id});


    //trigger inngest function
    inngest.send({
        name:'studyType.content',
        data:{
            studyType:type,
            prompt:PROMPT,
            courseId:courseId,
            recordId:result[0].id
        }
    })

    return NextResponse.json(result[0].id)
    
}