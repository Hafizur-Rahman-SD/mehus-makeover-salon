import express from "express";
import { addFinance, getFinance } from "../controllers/financeController.js";

const router = express.Router();

router.post("/", addFinance);
router.get("/", getFinance);

export default router;
