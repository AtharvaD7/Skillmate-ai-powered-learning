import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

export const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING);