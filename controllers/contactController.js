import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
//* @desc   Get all contacts
//* @route  GET /api/contacts
//* @access Private

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user._id });
  res.json(contacts);

  res.status(200).json({ message: "Get all contacts" });
});

//* @desc   Get a contact
//* @route  GET /api/contacts/:id
//* @access Private

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ contact });
});

//* @desc   Create a contact
//* @route  POST /api/contacts
//* @access Private

export const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user._id,
  });
  res.status(201).json({ contact });
});

//* @desc   Update a contact
//* @route  PUT /api/contacts/:id
//* @access private

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ contact });
});

//* @desc   Delete a contact
//* @route  DELETE /api/contacts/:id
//* @access private

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({
    message: "Contact deleted",
    deletedContact: {
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    },
  });
});
