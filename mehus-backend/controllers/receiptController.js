import db from "../config/db.js";

// ✅ Save receipt only (no finance entry yet)
export const createReceipt = (req, res) => {
  const { customer_name, phone, service, total, advance = 0, date } = req.body;
  const due = Number(total) - Number(advance);

  const sql = `
    INSERT INTO receipts (customer_name, phone, service, total, advance, due, created_at, confirmed)
    VALUES (?,?,?,?,?,?,?,0)
  `;
  db.query(sql, [customer_name, phone, service, total, advance, due, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ success: true, id: result.insertId });
  });
};

// ✅ Confirm receipt → add to finance
export const confirmReceipt = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM receipts WHERE id=?", [id], (e1, rows) => {
    if (e1) return res.status(500).json({ error: e1.sqlMessage });
    if (rows.length === 0) return res.status(404).json({ error: "Receipt not found" });

    const r = rows[0];

    // Update confirmed
    db.query("UPDATE receipts SET confirmed=1 WHERE id=?", [id], (e2) => {
      if (e2) return res.status(500).json({ error: e2.sqlMessage });

      // Insert into finance
      db.query(
        "INSERT INTO finance (type, amount, note) VALUES ('Income', ?, ?)",
        [r.total, `Receipt #${id} confirmed`],
        (e3) => {
          if (e3) return res.status(500).json({ error: e3.sqlMessage });
          res.json({ success: true, message: "Receipt confirmed & Finance updated" });
        }
      );
    });
  });
};

// ✅ List all receipts
export const listReceipts = (req, res) => {
  db.query("SELECT * FROM receipts ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(rows);
  });
};
