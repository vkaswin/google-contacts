import Label from "../models/label";
import { CustomError, asyncHandler } from "../utils";

const getAllLabels = asyncHandler(async (req, res) => {
  let labels = await Label.find({ createdBy: req.user._id });

  res.status(200).send({ message: "Success", data: { labels } });
});

const createLabel = asyncHandler(async (req, res) => {
  let label = await Label.create({
    name: req.body.name,
    createdBy: req.user._id,
  });

  res
    .status(200)
    .send({ message: "Label has been created successfully", data: { label } });
});

const removeLabel = asyncHandler(async (req, res) => {
  let { labelId } = req.params;

  let label = await Label.findById(labelId);

  if (!label) {
    throw new CustomError({ message: "Label not exist", status: 400 });
  }

  await Label.findByIdAndDelete(labelId);

  res.status(200).send({ message: "Label has been deleted successfully" });
});

const updateLabel = asyncHandler(async (req, res) => {
  let { labelId } = req.params;

  let label = await Label.findById(labelId);

  if (!label) {
    throw new CustomError({ message: "Label not exist", status: 400 });
  }

  await Label.findByIdAndUpdate(labelId, { name: req.body.name });

  res.status(200).send({ message: "Label has been updated successfully" });
});

const LabelController = { getAllLabels, createLabel, updateLabel, removeLabel };

export default LabelController;
