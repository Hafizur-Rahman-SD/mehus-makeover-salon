import express from "express";
import { createReceipt, confirmReceipt, listReceipts } from "../controllers/receiptController.js";

const router = express.Router();

router.get("/", listReceipts);
router.post("/", createReceipt);          // Save only
router.put("/:id/confirm", confirmReceipt); // Confirm → Finance

export default router;
