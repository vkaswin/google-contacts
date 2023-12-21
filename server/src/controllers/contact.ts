import { Types } from "mongoose";
import xlsx from "xlsx";
import Contact from "../models/contact";
import { CustomError, asyncHandler } from "../utils";

const getContactCount = asyncHandler(async (req, res) => {
  let count = await Contact.find({
    createdBy: req.user._id,
    inTrash: false,
  }).countDocuments();

  res.status(200).send({ message: "Success", data: { count } });
});

const getContacts = asyncHandler(async (req, res) => {
  let { q, labelId } = req.query;

  let contacts = await Contact.aggregate([
    {
      $match: {
        createdBy: new Types.ObjectId(req.user._id),
        inTrash: false,
        ...(typeof labelId === "string" && {
          labels: { $in: [new Types.ObjectId(labelId)] },
        }),
        ...(q && {
          $or: [
            { firstName: { $regex: q, $options: "i" } },
            { lastName: { $regex: q, $options: "i" } },
          ],
        }),
      },
    },
    {
      $project: {
        firstName: "$firstName",
        lastName: "$lastName",
        name: {
          $trim: {
            input: {
              $concat: ["$firstName", " ", { $ifNull: ["$lastName", ""] }],
            },
          },
        },
        phone: "$phone",
        email: "$email",
        jobTitle: "$jobTitle",
        company: "$company",
        colorCode: "$colorCode",
        isFavourite: "$isFavourite",
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);

  res.status(200).send({ message: "Success", data: { contacts } });
});

const createContact = asyncHandler(async (req, res) => {
  let contact = await Contact.create({ ...req.body, createdBy: req.user._id });

  res.status(200).send({
    message: "Contact has been created successfully",
    data: { contact: contact.toObject() },
  });
});

const updateContact = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findById(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  if (contact.createdBy.toString() !== req.user._id) {
    throw new CustomError({
      message: "You don't have access to update this contact",
      status: 400,
    });
  }

  await Contact.findByIdAndUpdate(contactId, req.body);

  res.status(200).send({ message: "Contact has been updated successfully" });
});

const removeContact = asyncHandler(async (req, res) => {
  await Contact.updateMany({ _id: { $in: req.body } }, { inTrash: true });

  res.status(200).send({ message: "Contact has been deleted successfully" });
});

const clearTrash = asyncHandler(async (req, res) => {
  await Contact.deleteMany({
    createdBy: req.user._id,
    inTrash: 1,
    ...(req.body && Array.isArray(req.body) && { _id: { $in: req.body } }),
  });

  res
    .status(200)
    .send({ message: "Contact has been permanently deleted successfully" });
});

const recoverContact = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findById(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  await Contact.findByIdAndUpdate(contactId, { inTrash: false });

  res.status(200).send({ message: "Contact has been recovered successfully" });
});

const getContactById = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findById(contactId).populate("labels");

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  if (contact.createdBy.toString() !== req.user._id) {
    throw new CustomError({
      message: "You don't have access to update this contact",
      status: 400,
    });
  }

  res.status(200).send({ message: "Success", data: { contact } });
});

const addFavourite = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findById(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  await Contact.findByIdAndUpdate(contactId, { isFavourite: true });

  res
    .status(200)
    .send({ message: "Contact has been marked as favourite successfully" });
});

const removeFavourite = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findById(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  await Contact.findByIdAndUpdate(contactId, { isFavourite: false });

  res
    .status(200)
    .send({ message: "Contact has been removed from favourite successfully" });
});

const getAllTrash = asyncHandler(async (req, res) => {
  let contacts = await Contact.find(
    {
      createdBy: req.user._id,
      inTrash: 1,
    },
    {
      firstName: 1,
      lastName: 1,
      phone: 1,
      email: 1,
      colorCode: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  ).sort({ updatedAt: 1 });

  res.status(200).send({ message: "Success", data: { contacts } });
});

const downloadSampleFile = asyncHandler(async (req, res) => {
  const ws = xlsx.utils.json_to_sheet([], {
    header: [
      "firstName",
      "lastName",
      "nickName",
      "email",
      "phone",
      "company",
      "jobTitle",
      "department",
      "addressLine1",
      "addressLine2",
      "country",
      "state",
      "city",
      "pincode",
      "birthday",
      "website",
    ],
  });

  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Sheet 1");
  const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=sample-file.xlsx");
  res.setHeader("Content-Length", buffer.length);
  res.end(buffer);
});

const bulkUpload = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).send({ message: "File required" });

  let wb = xlsx.read(req.file.buffer);
  const sheetName = wb.SheetNames[0];
  let contactList = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]) as any[];

  for (let contact of contactList as any) {
    contact.createdBy = req.user._id;
  }

  await Contact.create(contactList);

  res.status(200).send({ message: "Contacts has been added successfully" });
});

const exportContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.aggregate([
    { $match: { createdBy: new Types.ObjectId(req.user._id), inTrash: false } },
    {
      $project: {
        _id: 0,
        __v: 0,
        updatedAt: 0,
        createdAt: 0,
        inTrash: 0,
        isFavourite: 0,
        createdBy: 0,
        colorCode: 0,
        name: 0,
      },
    },
  ]);

  const ws = xlsx.utils.json_to_sheet(contacts);

  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Sheet 1");
  const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=sample-file.xlsx");
  res.setHeader("Content-Length", buffer.length);
  res.send(200).send(buffer);
});

const updateContactLabel = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findById(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  await Contact.findByIdAndUpdate(contactId, {
    labels: req.body.labels,
  });

  res
    .status(200)
    .send({ message: "Contact label has been updated successfully" });
});

const ContactController = {
  getContacts,
  createContact,
  updateContact,
  removeContact,
  getContactById,
  addFavourite,
  removeFavourite,
  getAllTrash,
  recoverContact,
  clearTrash,
  downloadSampleFile,
  bulkUpload,
  exportContact,
  getContactCount,
  updateContactLabel,
};

export default ContactController;
