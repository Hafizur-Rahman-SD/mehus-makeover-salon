import db from "../config/db.js";

export const addBooking = (req, res) => {
  const { name, phone, email, service, date, time, note } = req.body;
  const price = req.body.price || 0;

  // Debug log
  console.log("📥 Incoming Booking:", req.body);

  // see Correct SQL query
  const sql = `
    INSERT INTO bookings 
    (name, phone, email, service, date, time, note, price, status) 
    VALUES (?,?,?,?,?,?,?,?, 'Pending')
  `;

  db.query(sql, [name, phone, email, service, date, time, note, price], (err, result) => {
    if (err) {
      console.error("❌ DB Insert Error:", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json({ success: true, id: result.insertId });
  });
};

export const getBookings = (req, res) => {
  const sql = "SELECT * FROM bookings ORDER BY created_at DESC";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("❌ DB Fetch Error:", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json(rows);
  });
};
// 👉 Booking Status Update 
export const updateBookingStatus = (req, res) => {
  const { id } = req.params;     // booking id cames from URL params
  const { status } = req.body;   // New status comes from request body

  const sql = "UPDATE bookings SET status=? WHERE id=?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("❌ DB Update Error:", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json({ success: true });
  });
};
