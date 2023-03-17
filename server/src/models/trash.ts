import { model } from "mongoose";
import { ContactSchema } from "./contact";

export default model("Trash", ContactSchema);
