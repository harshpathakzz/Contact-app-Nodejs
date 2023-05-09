import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContact,
} from "../controllers/contactController.js";
const router = express.Router();
router.get("/", getContacts);

router.post("/", createContact);

router.get("/:id", getContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

export default router;
