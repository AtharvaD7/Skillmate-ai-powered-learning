import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function CourseIntroCard({ course }) {
  const [progress, setProgress] = useState(0);

  // Read from localStorage
  useEffect(() => {
    const key = `course-progress-${course?.courseId}`;
    const data = JSON.parse(localStorage.getItem(key)) || {};
    let count = 0;
    if (data.view) count += 25;
    if (data.flashcard) count += 25;
    if (data.quiz) count += 25;
    if (data.ai) count += 25;
    setProgress(count);
  }, [course?.courseId]);

  // Shortens summary
  const formatSummary = (summary) => {
    if (!summary) return "";
    const parts = summary.split(",");
    return parts.length > 2 ? `${parts[0]}, ${parts[1]} and more..` : summary;
  };

  return (
    <div className='flex flex-col gap-4 p-5 border shadow-md rounded-lg'>
      <div className='flex gap-5 items-center'>
        <Image src={'/knowledge.png'} alt='other' width={70} height={70} />
        <div>
          <h2 className='font-bold text-2xl'>{course?.courseLayout?.courseTitle}</h2>
          <p className='line-clamp-2 break-words overflow-hidden text-ellipsis max-h-[3.2em] leading-5'>
            {formatSummary(course?.courseLayout?.courseSummary)}
          </p>
          <h2 className='mt-3 text-lg text-blue-700'>Total Chapters: {course?.courseLayout?.chapters?.length}</h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='w-full'>
        <Progress value={progress} />
        <p className='text-sm mt-1 text-right text-gray-600'>{progress}% Complete</p>
      </div>
    </div>
  );
}

export default CourseIntroCard;
