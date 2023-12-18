import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const models = ["user", "contact", "label", "trash"];
const DB = process.env.DB as string;
const userName =
  process.env.NODE_ENV === "development"
    ? "root"
    : (process.env.USERNAME as string);
const password =
  process.env.NODE_ENV === "development"
    ? ""
    : (process.env.PASSWORD as string);

export const sequelize = new Sequelize(DB, userName, password, {
  host: "localhost",
  dialect: "mysql",
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    for (let fileName of models) {
      let modal = await import(`../models/${fileName}`);
      await modal.default.sync();
    }

    console.log("Modals synced successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
