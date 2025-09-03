import db from "../config/db.js";

export const login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=? AND password=?";
  db.query(sql, [username, password], (err, rows) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.json({ success: true, user: rows[0] });
  });
};
