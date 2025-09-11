import express from "express";
import multer from "multer";
import mysql from "mysql2/promise";

const router = express.Router();

// ✅ MySQL connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",   // তোমার MySQL user
  password: "",   // যদি password থাকে সেটাও দাও
  database: "mehus_makeover",
});

// ✅ Multer storage (local uploads folder এ save হবে)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // root এর ভেতরে uploads folder থাকতে হবে
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/* ===============================
   1. Get all offers
================================ */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM offers ORDER BY start_date DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching offers:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ===============================
   2. Create new offer
================================ */
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, price, start_date, end_date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await db.execute(
      "INSERT INTO offers (title, description, price, start_date, end_date, image) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, price, start_date, end_date, image]
    );
    res.json({ id: result.insertId, title, description, price, start_date, end_date, image });
  } catch (err) {
    console.error("❌ Error creating offer:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ===============================
   3. Update offer
================================ */
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { title, description, price, start_date, end_date } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  try {
    await db.execute(
      "UPDATE offers SET title=?, description=?, price=?, start_date=?, end_date=?, image=? WHERE id=?",
      [title, description, price, start_date, end_date, image, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error updating offer:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ===============================
   4. Delete offer
================================ */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM offers WHERE id=?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting offer:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
