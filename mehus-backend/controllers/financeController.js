import db from "../config/db.js";

export const addFinance = (req, res) => {
  const { type, amount, note } = req.body;
  const sql = "INSERT INTO finance (type, amount, note) VALUES (?,?,?)";
  db.query(sql, [type, amount, note], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ success: true, id: result.insertId });
  });
};

export const getFinance = (req, res) => {
  db.query("SELECT * FROM finance ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(rows);
  });
};
