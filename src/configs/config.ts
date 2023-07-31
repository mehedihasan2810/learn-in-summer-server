import dotenv from "dotenv";
import { DevConfig } from "../types/interfaces";
dotenv.config();

const dev: DevConfig = {
  app: {
    port: process.env.PORT || 4000,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/userDemoDB",
  },
};

export default dev;
