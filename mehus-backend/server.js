// mehus-backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bookingRoutes from "./routes/bookingRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";
import offersRoutes from "./routes/offersRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS (Express 5 safe)
app.use(
  cors({
    origin: [
      "https://mehus-makeover-salon.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/health", (req, res) => res.status(200).send("OK"));

// Root
app.get("/", (req, res) => res.send("✅ Backend API is running."));

// routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/offers", offersRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
