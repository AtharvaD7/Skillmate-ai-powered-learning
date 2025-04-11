import { Button } from '@/components/ui/button';
import { RefreshCw, MoreVertical, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

function CourseCardItem({ course, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

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

  const handleViewClick = () => {
    const key = `course-progress-${course?.courseId}`;
    const data = JSON.parse(localStorage.getItem(key)) || {
      view: false,
      flashcard: false,
      quiz: false,
      ai: false,
    };

    if (!data.view) {
      data.view = true;
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  if (!course) {
    return (
      <div className='flex justify-center items-center h-40 w-full text-gray-500 text-lg font-medium'>
        No course available ☹️
      </div>
    );
  }

  const formattedDate = course?.createdAt
    ? new Date(course.createdAt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Unknown Date';

  return (
    <div className='border rounded-lg shadow-md p-5 w-full relative'>
      {/* Watermark */}
      <div className='absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none'>
        <Image src={'/cleanlogo.svg'} alt='watermark' width={200} height={200} />
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <div className='flex justify-between items-center'>
          <Image src={'/knowledge.png'} alt='other' width={50} height={50} />

          <div className='flex items-center gap-2 relative' ref={menuRef}>
            <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-700 text-white'>
              {formattedDate}
            </h2>

            <button onClick={() => setMenuOpen(!menuOpen)} className='p-1'>
              <MoreVertical className='w-4 h-4 text-gray-600 cursor-pointer' />
            </button>

            {menuOpen && (
              <div className='absolute right-0 mt-14 w-20 bg-white shadow-md rounded-lg py-1 z-20 border border-gray-200'>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(course.courseId);
                  }}
                  className='flex items-center gap-1 px-2 py-1 text-red-600 text-xs hover:bg-gray-100 rounded-md w-full'
                >
                  <Trash2 className='w-3.5 h-3.5' /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.courseTitle}</h2>
        <p className='text-sm line-clamp-2 text-gray-500 mt-2'>
          {course?.courseLayout?.courseSummary}
        </p>

        {/* Progress Bar */}
        <div className='w-full bg-gray-200 rounded-full h-2.5 mt-4'>
          <div
            className='bg-green-500 h-2.5 rounded-full transition-all duration-300'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className='text-xs mt-1 text-right text-gray-600'>{progress}% Complete</p>

        <div className='mt-3 flex justify-end'>
          {course?.status === 'Generating' ? (
            <h2 className='text-sm p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400 text-white'>
              <RefreshCw className='h-5 w-5 animate-spin' />
              Generating...
            </h2>
          ) : (
            <Link href={'/course/' + course?.courseId}>
              <Button onClick={handleViewClick}>View</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
