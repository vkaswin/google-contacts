import { Schema, Types, model } from "mongoose";

const LabelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add label name"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Label = model("Label", LabelSchema);

export default Label;
