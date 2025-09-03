import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// ✅ Root test route (এইখানেই বসাতে হবে)
app.get("/", (req, res) => {
  res.send("✅ Backend API is running...");
});
// routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/auth", authRoutes);

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
