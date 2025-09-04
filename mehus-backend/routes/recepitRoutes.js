import express from "express";
import { confirmBookingAndGenerateReceipt } from "../controllers/receiptController.js";

const router = express.Router();

router.put("/:id/confirm", confirmBookingAndGenerateReceipt);

export default router;
