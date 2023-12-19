import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";
import { getRandomColorCode } from "../utils";

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [3],
          msg: "First name should contain atleast three characters",
        },
        isAlpha: { msg: "First name should contains characters only" },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: {
          args: [3],
          msg: "Last name should contain atleast three characters",
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Last name should contains characters only",
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
    nickName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: {
          args: [3],
          msg: "Nick name should contain atleast three characters",
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Nick name should contain characters only",
        },
      },
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: {
          args: [2],
          msg: "Company should contain atleast two characters",
        },
      },
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[a-zA-Z0-9\s&(),.-]+$/,
          msg: "Invalid job title",
        },
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Department should contain characters only",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Invalid email" },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(\+?[0-9]{1,4}[\s\-]?)?(\(?[0-9]{3}\)?|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
          msg: "Invalid phone number",
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Country should contain characters only",
        },
      },
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "State should contain characters only",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "City should contain characters only",
        },
      },
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: { args: /^[0-9]{5}(?:-[0-9]{4})?$/, msg: "Invalid pincode" },
      },
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: { isDate: true },
    },
    event: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    relatedPeople: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    colorCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: getRandomColorCode,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isInt: true },
      references: {
        model: "users",
        key: "id",
      },
    },
    isFavourite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true, tableName: "contacts" }
);

export default Contact;
