import generateReceipt from "./ReceiptPrint";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings")
      .then(res => {
        console.log("📥 Bookings data:", res.data); // Debug
        setBookings(res.data);
      })
      .catch(err => console.error("❌ Error fetching bookings:", err))
      .finally(() => setLoading(false));
  }, []);
  // ✅ Status Update Function
  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status: newStatus })
      .then(() => {
        console.log(`✅ Booking ${id} updated to ${newStatus}`);
        setBookings(); // reload bookings without page refresh
      })
      .catch(err => console.error("❌ Error updating status:", err));
  };

  if (loading) {
    return <p className="text-center py-5">Loading bookings...</p>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Manage Bookings</h2>
      <table className="table table-striped shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.phone}</td>
                <td>
                  {/* ✅ Dropdown for status update */}
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                  </select>
                </td>
                <td>
                  {/* ✅ এখানে receipt এর জন্য নতুন button */}
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => {
                      const advance = prompt("Enter Advance:");
                      const due = prompt("Enter Due:");
                      const total = prompt("Enter Total:");
                      axios.put(`http://localhost:5000/api/receipts/${b.id}/confirm`, { advance, due, total })
                        .then(() => alert("✅ Receipt Confirmed & Finance Updated"))
                        .catch(err => console.error("❌ Error:", err));
                    }}
                  >
                    Generate Receipt
                  </button>

                  {/* ✅ Print Receipt button */}
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => generateReceipt(b)} //b =booking object
                  >
                    Print Receipt
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
