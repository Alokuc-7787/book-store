import express from "express";
import { createContactMessage, deleteContactMessage, getContactMessages } from "../controller/contact.controller.js";
import { requireAdmin, requireAuth } from "../middleware/security.middleware.js";

const router = express.Router();

router.get("/", requireAuth, requireAdmin, getContactMessages);
router.post("/", requireAuth, createContactMessage);
router.delete("/:id", requireAuth, requireAdmin, deleteContactMessage);

export default router;
