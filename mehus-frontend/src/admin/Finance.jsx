import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaMoneyBillWave, 
  FaArrowUp, 
  FaArrowDown, 
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaFileExport
} from "react-icons/fa";

export default function Finance() {
  const [records, setRecords] = useState([]);
  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  async function fetchRecords() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/finance");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/finance", { type, amount, note });
      await fetchRecords();
      setAmount("");
      setNote("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredRecords = filter === "all" 
    ? records 
    : records.filter(r => r.type === filter);

  const totalIncome = records
    .filter(r => r.type === "Income")
    .reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);

  const totalExpense = records
    .filter(r => r.type === "Expense")
    .reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);

  const netBalance = totalIncome - totalExpense;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>
            <FaMoneyBillWave className="me-2" />
            Finance Management
          </h2>
          <p className="text-muted mb-0">Track your salon's income and expenses</p>
        </div>
        <button 
          className="btn d-flex align-items-center gap-2"
          style={{ 
            backgroundColor: "rgba(255, 64, 129, 0.1)", 
            color: "#ff4081",
            border: "none"
          }}
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus />
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100" 
               style={{ 
                 background: "linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(37, 211, 102, 0.05))",
                 transition: "all 0.3s ease"
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-2">Total Income</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#25d366" }}>
                    {formatCurrency(totalIncome)}
                  </h3>
                  <div className="d-flex align-items-center mt-2">
                    <FaArrowUp className="me-1" style={{ color: "#25d366" }} />
                    <span className="small text-success">From all sources</span>
                  </div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(37, 211, 102, 0.2)" }}>
                  <FaArrowUp style={{ color: "#25d366", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100"
               style={{ 
                 background: "linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(244, 67, 54, 0.05))",
                 transition: "all 0.3s ease"
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-2">Total Expense</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#f44336" }}>
                    {formatCurrency(totalExpense)}
                  </h3>
                  <div className="d-flex align-items-center mt-2">
                    <FaArrowDown className="me-1" style={{ color: "#f44336" }} />
                    <span className="small text-danger">All expenses</span>
                  </div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(244, 67, 54, 0.2)" }}>
                  <FaArrowDown style={{ color: "#f44336", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100"
               style={{ 
                 background: "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05))",
                 transition: "all 0.3s ease"
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-2">Net Balance</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#2196f3" }}>
                    {formatCurrency(netBalance)}
                  </h3>
                  <div className="d-flex align-items-center mt-2">
                    {netBalance >= 0 ? (
                      <>
                        <FaArrowUp className="me-1" style={{ color: "#25d366" }} />
                        <span className="small text-success">Positive balance</span>
                      </>
                    ) : (
                      <>
                        <FaArrowDown className="me-1" style={{ color: "#f44336" }} />
                        <span className="small text-danger">Negative balance</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(33, 150, 243, 0.2)" }}>
                  <FaMoneyBillWave style={{ color: "#2196f3", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4" 
             style={{ 
               borderLeft: "4px solid #ff4081",
               transition: "all 0.3s ease"
             }}>
          <div className="card-body p-3">
            <h6 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>Add New Transaction</h6>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-3">
                <select 
                  className="form-select" 
                  style={{ borderColor: "#ff4081" }}
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div className="col-md-3">
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Amount" 
                  style={{ borderColor: "#ff85a2" }}
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  required 
                />
              </div>
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Note (optional)" 
                  style={{ borderColor: "#9c27b0" }}
                  value={note} 
                  onChange={(e) => setNote(e.target.value)} 
                />
              </div>
              <div className="col-md-2 d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn flex-grow-1"
                  disabled={loading}
                  style={{ 
                    backgroundColor: "#25d366", 
                    color: "white",
                    border: "none"
                  }}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
                <button 
                  type="button" 
                  className="btn"
                  onClick={() => setShowForm(false)}
                  style={{ 
                    backgroundColor: "#f44336", 
                    color: "white",
                    border: "none"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter and Actions */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <button 
            className={`btn ${filter === "all" ? "" : "btn-light"}`}
            onClick={() => setFilter("all")}
            style={{ 
              backgroundColor: filter === "all" ? "#ff4081" : "white",
              color: filter === "all" ? "white" : "#495057",
              border: `1px solid ${filter === "all" ? "#ff4081" : "#dee2e6"}`
            }}
          >
            All Transactions
          </button>
          <button 
            className={`btn ${filter === "Income" ? "" : "btn-light"}`}
            onClick={() => setFilter("Income")}
            style={{ 
              backgroundColor: filter === "Income" ? "#25d366" : "white",
              color: filter === "Income" ? "white" : "#495057",
              border: `1px solid ${filter === "Income" ? "#25d366" : "#dee2e6"}`
            }}
          >
            Income
          </button>
          <button 
            className={`btn ${filter === "Expense" ? "" : "btn-light"}`}
            onClick={() => setFilter("Expense")}
            style={{ 
              backgroundColor: filter === "Expense" ? "#f44336" : "white",
              color: filter === "Expense" ? "white" : "#495057",
              border: `1px solid ${filter === "Expense" ? "#f44336" : "#dee2e6"}`
            }}
          >
            Expense
          </button>
        </div>
        <button className="btn d-flex align-items-center gap-2">
          <FaFileExport />
          Export Report
        </button>
      </div>

      {/* Transactions Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: "rgba(138, 90, 109, 0.05)" }}>
                <tr>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    #
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Type
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Amount
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Note
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r, index) => (
                    <tr 
                      key={r.id} 
                      style={{ cursor: "pointer" }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 64, 129, 0.05)"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td style={{ padding: "1rem", color: "#6c757d" }}>
                        {index + 1}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span 
                          className="badge px-3 py-2"
                          style={{ 
                            backgroundColor: r.type === "Income" ? "rgba(37, 211, 102, 0.1)" : "rgba(244, 67, 54, 0.1)",
                            color: r.type === "Income" ? "#25d366" : "#f44336",
                            fontWeight: "600"
                          }}
                        >
                          {r.type}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div className="fw-bold" style={{ 
                          color: r.type === "Income" ? "#25d366" : "#f44336" 
                        }}>
                          {formatCurrency(parseFloat(r.amount))}
                        </div>
                      </td>
                      <td style={{ padding: "1rem", color: "#495057" }}>
                        {r.note || "-"}
                      </td>
                      <td style={{ padding: "1rem", color: "#6c757d" }}>
                        {new Date(r.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx="true">{`
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(138, 90, 109, 0.15) !important;
        }
        
        .table-hover tbody tr:hover {
          background-color: rgba(255, 64, 129, 0.05) !important;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #ff4081;
          box-shadow: 0 0 0 0.25rem rgba(255, 64, 129, 0.25);
        }
        
        .badge {
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
}