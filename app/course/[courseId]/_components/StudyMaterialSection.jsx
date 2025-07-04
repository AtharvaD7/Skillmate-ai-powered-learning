import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import { db } from '@/configs/db';
import axios from 'axios';
import Link from 'next/link';

function StudyMaterialSection({courseId,course}) {

    const [studyTypeContent,setStudyTypeContent]=useState();

    const MaterialList=[
       {
        name:'Notes',
        desc:'Read notes to learn and prepare for it',
        icon:'/notes.png',
        path:'/notes',
        type:'notes'
       },
       {
        name:'Flashcard',
        desc:'Flashcard helps to remember the concepts',
        icon:'/flashcard.png',
        path:'/flashcards',
        type:'flashcards'
       },
       {
        name:'Quiz',
        desc:'Great way to test your existing knowledge',
        icon:'/quiz.png',
        path:'/quiz',
        type:'quiz'
       },
       {
        name:'Ask AI',
        desc:'An interactive chatbot to clear doubts',
        icon:'/qa.png',
        path:'/chatbot',
        type:'chatbot'
       },
    ]

    useEffect(()=>{
        GetStudyMaterial();

    },[])

    const GetStudyMaterial=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'ALL'

        })

        console.log(result?.data);
        setStudyTypeContent(result.data)

    }
  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
           {MaterialList.map((item,index)=>(
            //<Link key={index} href={'/course/'+courseId+item.path}>
            <MaterialCardItem  item={item} key={index} studyTypeContent={studyTypeContent}
            course={course} 
            refreshData={GetStudyMaterial}/>
          // </Link>
           ))} 
        </div>
    </div>
  )
}

export default StudyMaterialSection