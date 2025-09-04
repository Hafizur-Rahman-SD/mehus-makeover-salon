import { useEffect, useState } from "react";
import axios from "axios";
import generateReceipt from "./ReceiptPrint";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Receipts() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    date: "",
    customer_name: "",
    phone: "",
    service: "",
    total: "",
    advance: ""
  });

  const load = () => axios.get(`${API}/api/receipts`).then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/api/receipts`, form);
    setForm({ date:"", customer_name:"", phone:"", service:"", total:"", advance:"" });
    load();
  };

  const confirm = async (id) => {
    await axios.put(`${API}/api/receipts/${id}/confirm`);
    load();
  };

  const printOne = (r) => {
    const doc = generateReceipt(r);
    doc.save(`receipt_${r.id}.pdf`);
  };

  return (
    <div className="container py-4">
      <div className="p-4 mb-4 text-white rounded" style={{background:"linear-gradient(90deg,#c2185b,#f06292)"}}>
        <h2 className="mb-0">💖 Manage Receipts</h2>
        <small>Save, Confirm & Print all customer bills</small>
      </div>

      {/* Create Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">➕ Create New Receipt</h5>
        </div>
        <div className="card-body">
          <form className="row g-3" onSubmit={onSubmit}>
            <div className="col-md-2">
              <label className="form-label">Date</label>
              <input type="date" className="form-control"
                value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Customer Name</label>
              <input className="form-control" required
                value={form.customer_name} onChange={e=>setForm(f=>({...f,customer_name:e.target.value}))} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Phone</label>
              <input className="form-control"
                value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
            </div>
            <div className="col-md-3">
  <label className="form-label">Service</label>
  <select
    className="form-select"
    value={form.service}
    onChange={e=>setForm(f=>({...f, service:e.target.value}))}
  >
    <option value="">Select Service</option>
    <option value="Hair Cut">Hair Cut</option>
    <option value="Facial">Facial</option>
    <option value="Makeup">Makeup</option>
    <option value="Spa">Spa</option>
    <option value="Nail Art">Nail Art</option>
    <option value="Others">Others</option>
  </select>
  {form.service === "Others" && (
    <input
      className="form-control mt-2"
      placeholder="Enter Service Name"
      onChange={e=>setForm(f=>({...f, service:e.target.value}))}
    />
  )}
</div>

            <div className="col-md-1">
              <label className="form-label">Total</label>
              <input type="number" className="form-control" required
                value={form.total} onChange={e=>setForm(f=>({...f,total:e.target.value}))} />
            </div>
            <div className="col-md-1">
              <label className="form-label">Advance</label>
              <input type="number" className="form-control"
                value={form.advance} onChange={e=>setForm(f=>({...f,advance:e.target.value}))} />
            </div>
            <div className="col-md-12 text-end">
              <button className="btn btn-success" type="submit">💾 Save</button>
            </div>
          </form>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">📜 All Receipts</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th><th>Date</th><th>Customer</th><th>Service</th>
                <th>Total</th><th>Advance</th><th>Due</th><th>Confirmed</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{new Date(r.created_at).toLocaleDateString()}</td>
                  <td>{r.customer_name}</td>
                  <td>{r.service}</td>
                  <td>{r.total}</td>
                  <td>{r.advance}</td>
                  <td>{r.due}</td>
                  <td>{r.confirmed ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>printOne(r)}>🖨 Print</button>
                    {!r.confirmed && (
                      <button className="btn btn-sm btn-success" onClick={()=>confirm(r.id)}>✔ Confirm</button>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length===0 && (
                <tr><td colSpan="9" className="text-center text-muted">No receipts yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
