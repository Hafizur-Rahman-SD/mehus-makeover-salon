import { useEffect, useState } from "react";
import axios from "axios";

export default function Finance() {
  const [records, setRecords] = useState([]);
  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/finance")
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/finance", { type, amount, note });
    window.location.reload();
  }

  return (
    <div className="container py-4">
      <h2>Finance Management</h2>
      <form onSubmit={handleSubmit} className="row g-2 mb-4">
        <div className="col-md-3">
          <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control" placeholder="Amount"
            value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Note"
            value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">Add</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th><th>Type</th><th>Amount</th><th>Note</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.type}</td>
              <td>{r.amount}</td>
              <td>{r.note}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
