import db from "../config/db.js";

export const addFinance = async (req, res) => {
  const { type, amount, note } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO finance (type, amount, note) VALUES ($1,$2,$3) RETURNING id",
      [type, amount, note]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFinance = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM finance ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
