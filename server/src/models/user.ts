import { Schema, model } from "mongoose";
import { getRandomColorCode } from "../utils";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    colorCode: {
      type: String,
      default: getRandomColorCode,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      name: {
        get() {
          return `${this.firstName} ${this.lastName || ""}`.trim();
        },
      },
    },
  }
);

const User = model("User", UserSchema);

export default User;
