import { useState } from "react";
import axios from "axios";

export default function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        name,
        phone,
        email,
        service,
        date,
        time,
        note,
        price: 0, // default
      });

      if (res.data.success) {
        setMessage({ type: "success", text: "✅ Booking saved successfully!" });
        // reset form
        setName(""); setPhone(""); setEmail("");
        setService(""); setDate(""); setTime(""); setNote("");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage({ type: "danger", text: "❌ Error saving booking" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Book Your Service</h2>
        {message && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6">
  <select
    className="form-control"
    value={service}
    onChange={(e) => setService(e.target.value)}
    required
  >
    <option value="">-- Select Service --</option>
    <option value="Haircut">Haircut</option>
    <option value="Facial">Facial</option>
    <option value="Bridal Makeup">Bridal Makeup</option>
    <option value="Nail Art">Nail Art</option>
    <option value="Spa">Spa</option>
  </select>
</div>

          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Notes (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Submit Booking"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
