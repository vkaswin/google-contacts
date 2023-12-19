import { Schema, Types } from "mongoose";

const Label = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add label name"],
    },
  },
  { timestamps: true }
);

export default Label;
