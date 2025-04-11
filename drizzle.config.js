import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://lmsacc_owner:npg_tSU7ZjA5CoID@ep-muddy-river-a5w1n83c-pooler.us-east-2.aws.neon.tech/lmsacc?sslmode=require'
  }
});
