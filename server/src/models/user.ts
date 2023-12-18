import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [3],
          msg: "First name should contain atleast three characters",
        },
        max: {
          args: [20],
          msg: "First name should not exceed more than 20 characters",
        },
        is: {
          args: /[a-zA-Z\s]+/,
          msg: "First name should contain characters only",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [3],
          msg: "Last name should contain atleast three characters",
        },
        max: {
          args: [20],
          msg: "Last name should not exceed more than 20 characters",
        },
        is: {
          args: /[a-zA-Z\s]+/,
          msg: "Last name should contain characters only",
        },
      },
    },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.dataValues.firstName} ${
          this.dataValues.lastName || ""
        }`.trim();
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "Invalid email" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "users" }
);

export default User;
