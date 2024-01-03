import mongoose from "mongoose";
import config from "./config";

// Extracting the MongoDB URL from the configuration
const dbURL = config.db.url;

// Connecting to MongoDB using the extracted URL
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("mongodb atlas is connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
