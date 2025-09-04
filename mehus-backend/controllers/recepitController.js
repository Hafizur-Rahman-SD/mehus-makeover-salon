import db from "../config/db.js";

export const confirmBookingAndGenerateReceipt = (req, res) => {
  const { id } = req.params;
  const { advance, due, total } = req.body;

  // ✅ Update booking with billing info
  const sql1 = "UPDATE bookings SET advance=?, due=?, total=?, status='Confirmed', receipt_generated=1 WHERE id=?";
  db.query(sql1, [advance, due, total, id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    // ✅ Add to Finance (Income)
    const sql2 = "INSERT INTO finance (type, amount, note) VALUES ('Income', ?, ?)";
    db.query(sql2, [total, `Booking ID: ${id} payment`], (err2) => {
      if (err2) return res.status(500).json({ error: err2.sqlMessage });

      res.json({ success: true, message: "Receipt confirmed & added to finance" });
    });
  });
};
