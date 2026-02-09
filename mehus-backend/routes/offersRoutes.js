import express from "express";
import multer from "multer";
import { getOffers, createOffer, updateOffer, deleteOffer } from "../controllers/offersController.js";

const router = express.Router();

// Multer storage (local uploads folder in root)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Routes
router.get("/", getOffers);
router.post("/", upload.single("image"), createOffer);
router.put("/:id", upload.single("image"), updateOffer);
router.delete("/:id", deleteOffer);

export default router;
