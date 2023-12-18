import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

const Label = sequelize.define(
  "Label",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { timestamps: true, tableName: "label" }
);

export default Label;
