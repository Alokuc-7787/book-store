import express from "express";
import { createContactMessage, deleteContactMessage, getContactMessages } from "../controller/contact.controller.js";

const router = express.Router();

router.get("/", getContactMessages);
router.post("/", createContactMessage);
router.delete("/:id", deleteContactMessage);

export default router;
