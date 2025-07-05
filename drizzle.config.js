require('dotenv').config({ path: '.env.local' });

/** @type {import("drizzle-kit").Config} */
module.exports = {
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DRIZZLE_DB_URL,
  },
};
