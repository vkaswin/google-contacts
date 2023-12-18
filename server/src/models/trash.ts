import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

const Trash = sequelize.define(
  "Trash",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { timestamps: true, tableName: "trash" }
);

export default Trash;
