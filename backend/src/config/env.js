// src/config/env.js
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  RISK_API_URL: process.env.RISK_API_URL,
  RISK_API_KEY: process.env.RISK_API_KEY,
};
