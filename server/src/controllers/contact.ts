import { asyncHandler } from "../utils";

const getAllContacts = asyncHandler(async (req, res) => {
  res.status(200).send("Hello World");
});

export default { getAllContacts };
