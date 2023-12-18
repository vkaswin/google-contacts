import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

const Trash = sequelize.define(
  "Trash",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "trash" }
);

export default Trash;
