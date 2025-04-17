import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:NEXT_PUBLIC_DATABASE_CONNECTION_STRING
  }
});
