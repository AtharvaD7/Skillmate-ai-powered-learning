import { Button } from '@/components/ui/button';
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(!!studyTypeContent?.[item.type]?.length);
  const isAskAI = item.name === 'Ask AI';

  useEffect(() => {
    if (studyTypeContent?.[item.type]?.length) {
      setIsReady(true);
    }
  }, [studyTypeContent]);

  // ✅ Utility to update localStorage progress
  const updateProgress = (field) => {
    const key = `course-progress-${course?.courseId}`;
    const existing = JSON.parse(localStorage.getItem(key)) || {};
    if (!existing[field]) {
      existing[field] = true;
      localStorage.setItem(key, JSON.stringify(existing));
    }
  };

  const GenerateContent = async () => {
    toast('Generating your content...');
    setLoading(true);

    let chapters = '';
    course?.courseLayout.chapters.forEach((chapter) => {
      chapters = (chapter.chapterTitle || chapter.chapter_Title) + ',' + chapters;
    });

    try {
      await axios.post('/api/study-type', {
        courseId: course?.courseId,
        type: item.name,
        chapters: chapters,
      });

      toast('Your content is ready to view');
      setIsReady(true);
      setTimeout(refreshData, 1000);

      // ✅ Store flashcard, quiz or notes progress
      if (item.name === 'Flashcard') updateProgress('flashcards');
      if (item.name === 'Quiz') updateProgress('quiz');
      if (item.name === 'Notes') updateProgress('notes');

    } catch (error) {
      console.error('Error generating content:', error);
      toast('Failed to generate content. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Ask AI click
  const handleAskClick = () => {
    updateProgress('ai');
  };

  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${!isReady && !isAskAI && 'grayscale'}`}>
      <h2 className={`p-1 px-2 rounded-full text-[10px] ${isReady || isAskAI ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
        {isAskAI ? 'Ready' : isReady ? 'Ready' : 'Generate'}
      </h2>

      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.desc}</p>

      {isAskAI ? (
        <Link href={'/course/' + course?.courseId + item.path}>
          <Button
            className="mt-3 w-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleAskClick}
          >
            Ask
          </Button>
        </Link>
      ) : !isReady ? (
        <Button className="mt-3 w-full cursor-pointer" variant="outline" onClick={GenerateContent}>
          {loading && <RefreshCcw className="animate-spin" />} Generate
        </Button>
      ) : (
        <Link href={'/course/' + course?.courseId + item.path}>
          <Button
            className="mt-3 w-full cursor-pointer"
            variant="outline"
            onClick={() =>
              toast('Please refresh the page periodically, as it may take some time to generate the content.', { duration: 2000 })
            }
          >
            View
          </Button>
        </Link>
      )}
    </div>
  );
}

export default MaterialCardItem;
