import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./schema/drizzle",
  schema: "./schema/models.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
