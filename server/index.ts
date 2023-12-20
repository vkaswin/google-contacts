import express from "express";
import dotenv from "dotenv";
import cors from "./src/middlewares/cors";
import router from "./src/routes";
import connect from "./src/database/config";
import xlsx from "xlsx";

dotenv.config();

const port = process.env.PORT;
const app = express();

app
  .use(cors)
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(router);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("🚀 ~ file: index.ts:29 ~ error:", error);
    process.exit();
  });
