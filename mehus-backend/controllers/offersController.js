import db from "../config/db.js";

// ✅ Get all offers
export const getOffers = (req, res) => {
  db.query("SELECT * FROM offers ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// ✅ Create new offer
export const createOffer = (req, res) => {
  const { title, description, price, start_date, end_date } = req.body;
  let image = null;
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const sql = `
    INSERT INTO offers (title, description, price, start_date, end_date, image)
    VALUES (?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [title, description, price, start_date, end_date, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database insert error" });
      res.json({ id: result.insertId, message: "Offer created successfully" });
    }
  );
};

// ✅ Update offer
export const updateOffer = (req, res) => {
  const { id } = req.params;
  const { title, description, price, start_date, end_date } = req.body;
  let image = req.body.image;

  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const sql = `
    UPDATE offers SET title=?, description=?, price=?, start_date=?, end_date=?, image=? WHERE id=?
  `;

  db.query(
    sql,
    [title, description, price, start_date, end_date, image, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Database update error" });
      res.json({ message: "Offer updated successfully" });
    }
  );
};

// ✅ Delete offer
export const deleteOffer = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM offers WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Database delete error" });
    res.json({ message: "Offer deleted successfully" });
  });
};
