import { db } from '@/lib/db'; // Your Drizzle client
import {
  STUDY_MATERIAL_TABLE,
  CHAPTER_NOTES_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from '@/lib/schema'; // Adjust based on your actual schema import

import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ error: 'Course ID is required' });
  }

  try {
    // Delete related chapter notes
    await db.delete(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    // Delete study type content (flashcards, quiz, etc.)
    await db.delete(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

    // Delete the course itself
    await db.delete(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    return res.status(500).json({ error: 'Failed to delete course' });
  }
}
