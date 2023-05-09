import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
//* @desc   Get all contacts
//* @route  GET /api/contacts
//* @access Public

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);

  res.status(200).json({ message: "Get all contacts" });
});

//* @desc   Get a contact
//* @route  GET /api/contacts/:id
//* @access Public

export const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get a contact with id ${req.params.id}` });
});

//* @desc   Create a contact
//* @route  POST /api/contacts
//* @access Public

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
  });
  res.status(201).json({ contact });
});

//* @desc   Update a contact
//* @route  PUT /api/contacts/:id
//* @access Public

export const updateContact = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Update a contact with id ${req.params.id}` });
});

//* @desc   Delete a contact
//* @route  DELETE /api/contacts/:id
//* @access Public

export const deleteContact = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Delete a contact with id ${req.params.id}` });
});
