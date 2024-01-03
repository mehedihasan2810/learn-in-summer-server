import dotenv from "dotenv";
import { DevConfig } from "../types/interfaces";

// Loading environment variables from the '.env' file into process.env
dotenv.config();

// Defining the development configuration object using the DevConfig interface
const dev: DevConfig = {
  // Application configuration
  app: {
    // Using the provided PORT environment variable or defaulting to 4000 if not available
    port: process.env.PORT || 4000,
  },

  // Database configuration
  db: {
    // Using the provided DB_URL environment variable or defaulting to a local MongoDB connection
    url: process.env.DB_URL || "mongodb://localhost:27017/userDemoDB",
  },
};

export default dev;
