import { asyncHandler } from "../utils/asyncHandler";

const getAllContacts = asyncHandler(async (req, res) => {
  res.status(200).send("Hello World");
});

export default { getAllContacts };
