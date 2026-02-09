import db from "../config/db.js";

// ✅ Get all offers
export const getOffers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM offers ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

// ✅ Create new offer
export const createOffer = async (req, res) => {
  const { title, description, price, start_date, end_date } = req.body;

  let image = null;
  if (req.file) image = `/uploads/${req.file.filename}`;

  const sql = `
    INSERT INTO offers (title, description, price, start_date, end_date, image)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [title, description, price, start_date, end_date, image]);
    res.json({ id: result.rows[0].id, message: "Offer created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database insert error", details: err.message });
  }
};

// ✅ Update offer
export const updateOffer = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, start_date, end_date } = req.body;

  let image = req.body.image;
  if (req.file) image = `/uploads/${req.file.filename}`;

  const sql = `
    UPDATE offers
    SET title=$1, description=$2, price=$3, start_date=$4, end_date=$5, image=$6
    WHERE id=$7
  `;

  try {
    await db.query(sql, [title, description, price, start_date, end_date, image, id]);
    res.json({ message: "Offer updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database update error", details: err.message });
  }
};

// ✅ Delete offer
export const deleteOffer = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM offers WHERE id=$1", [id]);
    res.json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database delete error", details: err.message });
  }
};
