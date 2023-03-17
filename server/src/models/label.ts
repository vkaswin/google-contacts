import { Schema, model } from "mongoose";

const LabelSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("Label", LabelSchema);
