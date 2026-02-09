import db from "../config/db.js";

// Save receipt only (no finance entry yet)
export const createReceipt = async (req, res) => {
  const { customer_name, phone, service, total, advance = 0, date } = req.body;
  const due = Number(total) - Number(advance);

  const sql = `
    INSERT INTO receipts (customer_name, phone, service, total, advance, due, created_at, confirmed)
    VALUES ($1,$2,$3,$4,$5,$6,$7,false)
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [customer_name, phone, service, total, advance, due, date]);
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Confirm receipt → add to finance (transaction)
export const confirmReceipt = async (req, res) => {
  const { id } = req.params;

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const receiptRes = await client.query("SELECT * FROM receipts WHERE id=$1", [id]);
    if (receiptRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Receipt not found" });
    }

    const r = receiptRes.rows[0];

    await client.query("UPDATE receipts SET confirmed=true WHERE id=$1", [id]);

    await client.query(
      "INSERT INTO finance (type, amount, note) VALUES ('Income', $1, $2)",
      [r.total, `Receipt #${id} confirmed`]
    );

    await client.query("COMMIT");
    res.json({ success: true, message: "Receipt confirmed & Finance updated" });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

// List all receipts
export const listReceipts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM receipts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
