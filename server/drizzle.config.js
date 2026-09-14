import { defineConfig } from "drizzle-kit";
import { cfg } from './config.js'

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.js",
  out: "./db/drizzle",
  dbCredentials: {
    url: cfg.dbUrl,
  },
});