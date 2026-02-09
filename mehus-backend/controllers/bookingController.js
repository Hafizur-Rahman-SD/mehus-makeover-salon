import db from "../config/db.js";

export const addBooking = async (req, res) => {
  const { name, phone, email, service, date, time, note } = req.body;
  const price = req.body.price || 0;

  console.log("📥 Incoming Booking:", req.body);

  const sql = `
    INSERT INTO bookings
    (name, phone, email, service, date, time, note, price, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'Pending')
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [name, phone, email, service, date, time, note, price]);
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error("❌ DB Insert Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bookings ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DB Fetch Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 👉 Booking Status Update
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.query("UPDATE bookings SET status=$1 WHERE id=$2", [status, id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ DB Update Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
