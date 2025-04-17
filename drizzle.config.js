import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';
import { resolve } from 'path';


config({ path: resolve(__dirname, '.env.local') });
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url: process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING
  }
});
