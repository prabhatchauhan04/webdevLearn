import { defineConfig, env } from "prisma/config";
import "dotenv/config"; // This helps to use the .env file variables in this file

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});





