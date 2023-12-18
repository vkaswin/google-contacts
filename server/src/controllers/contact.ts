import { Op } from "sequelize";
import Contact from "../models/contact";
import { CustomError, asyncHandler } from "../utils";

const getContacts = asyncHandler(async (req, res) => {
  let contacts = await Contact.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "name",
      "phone",
      "jobTitle",
      "company",
      "email",
      "createdBy",
      "colorCode",
      "isFavourite",
      "createdAt",
      "updatedAt",
    ],
    where: {
      createdBy: req.user.id,
    },
  });

  res.status(200).send({ message: "Success", data: { contacts } });
});

const createContact = asyncHandler(async (req, res) => {
  let contact = await Contact.create({ ...req.body, createdBy: req.user.id });

  res.status(200).send({
    message: "Contact has been created successfully",
    data: contact.dataValues,
  });
});

const updateContact = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findByPk(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  if (contact.dataValues.createdBy !== req.user.id) {
    throw new CustomError({
      message: "You don't have access to update this contact",
      status: 400,
    });
  }

  await Contact.update(req.body, {
    where: {
      id: {
        [Op.eq]: contactId,
      },
    },
  });

  res.status(200).send({ message: "Contact has been updated successfully" });
});

const removeContact = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findByPk(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  await Contact.destroy({
    where: {
      id: { [Op.eq]: contactId },
    },
  });

  res.status(200).send({ message: "Contact has been deleted successfully" });
});

const getContactById = asyncHandler(async (req, res) => {
  let { contactId } = req.params;

  let contact = await Contact.findByPk(contactId);

  if (!contact) {
    throw new CustomError({ message: "Contact not exist", status: 400 });
  }

  if (contact.dataValues.createdBy !== req.user.id) {
    throw new CustomError({
      message: "You don't have access to update this contact",
      status: 400,
    });
  }

  res.status(200).send({ message: "Success", data: contact });
});

const ContactController = {
  getContacts,
  createContact,
  updateContact,
  removeContact,
  getContactById,
};

export default ContactController;
