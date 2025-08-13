import { generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello, World!" };
  },
);


export const CreateNewUser = inngest.createFunction(
  { id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {
    const {user} = event.data;
    // get event data
    const result = await step.run('Check User and create New if Not in DB', async () => {
      //checks if user already exists

      const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))
      console.log(result);
      if (result?.length == 0) {
        const userResp = await db.insert(USER_TABLE).values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress

        }).returning({ id: USER_TABLE.id })
         return userResp;

      }
      return result;
    })

    return 'Success';

  }

  //step for sending welcome email notification

  //step for sending email noti after 3 days once user joined
)

export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data; //all record info

    // gen notes for each chapter with ai
    console.log("🧠 [Inngest] notes.generate event received", event.data);

    const notesResult=await step.run('Generate Chapter Notes',async()=>{
      const Chapters=course?.courseLayout?.chapters;
      
      for(let i=0; i<Chapters.length; i++) {
        const chapter = Chapters[i];
        const PROMPT='Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTML , Head, Body, title tag), The chapters :'+JSON.stringify(chapter);

        const result=await generateNotesAiModel.sendMessage(PROMPT);

        const aiResp=result.response.text();

        await db.insert(  CHAPTER_NOTES_TABLE).values({
          chapterId:i,
          courseId:course?.courseId,
          notes:aiResp

        })
      }
      return 'Completed'
    })

    //update status to ready
    const updateCourseStatusResult=await step.run('Update Course Status to Ready',async()=>{
      const result=await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'

      }) .where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId)) 
      return 'Success';
    });


  }
)

// flash , quiz , qa
export const GenerateStudyTypeContent=inngest.createFunction(
  {id:'Generate Study Type Content'},
  {event:'studyType.content'},

  async({event,step})=>{
    const {studyType,prompt,courseId,recordId}=event.data;

  
     const AiResult= await step.run('Generating Flashcard using AI',async()=>{
        const result=
        studyType=='Flashcard'?
        await GenerateStudyTypeContentAiModel.sendMessage(prompt):await GenerateQuizAiModel.sendMessage(prompt);

       const AIResult= JSON.parse(result.response.text());
        return AIResult

      })
  
    

    //save result

    const DbResult=await step.run('Save Result to DB',async()=>{
      const result=await db.update(STUDY_TYPE_CONTENT_TABLE).set({
        content:AiResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))

      return 'data inserted'
    })
    
  }  
)