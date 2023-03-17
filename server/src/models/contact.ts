import { Schema, model } from "mongoose";

export const ContactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
    },
    company: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    email: {
      type: String,
    },
    birthday: {
      type: String,
    },
    address: {
      type: {
        line1: String,
        line2: String,
        pincode: String,
        city: String,
        state: String,
        country: String,
      },
      default: {},
    },
    phone: {
      type: [
        {
          countryCode: String,
          number: String,
          title: String,
        },
      ],
      defaut: [],
    },
    imageUrl: {
      type: String,
    },
    label: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    starred: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Contact", ContactSchema);
