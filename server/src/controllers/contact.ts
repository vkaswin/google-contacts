import Contact from "../models/contact";
import { CustomError, asyncHandler } from "../utils";

const getContacts = asyncHandler(async (req, res) => {
  let { q } = req.query;

  let contacts = await Contact.find(
    {
      createdBy: req.user._id,
      inTrash: false,
      ...(q && {
        $or: [
          { firstName: { $regex: q, $options: "i" } },
          { lastName: { $regex: q, $options: "i" } },
        ],
      }),
    },
    {
      firstName: 1,
      lastName: 1,
      phone: 1,
      email: 1,
      jobTitle: 1,
      company: 1,
      colorCode: 1,
      isFavourite: 1,
    }
  ).sort({ firstName: -1, lastName: -1 });

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

  if (contact.createdBy !== req.user._id) {
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

  res.status(200).send({ message: "Contact has been deleted successfully" });
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

  let contact = await Contact.findById(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  if (contact.createdBy !== req.user._id) {
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

  res.status(200).send({ message: "Contact has been updated successfully" });
});

const removeFavourite = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findById(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  await Contact.findByIdAndUpdate(contactId, { isFavourite: false });

  res.status(200).send({ message: "Contact has been updated successfully" });
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
};

export default ContactController;
