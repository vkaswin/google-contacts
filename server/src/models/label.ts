import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

const Label = sequelize.define(
  "Label",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "label" }
);

export default Label;
