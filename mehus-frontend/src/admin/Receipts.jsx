import { useEffect, useState } from "react";
import axios from "axios";
import generateReceipt from "./ReceiptPrint";
import { 
  FaReceipt, 
  FaPlus, 
  FaPrint, 
  FaCheck, 
  FaUser, 
  FaPhone, 
  FaCalendarAlt,
  FaTag,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaEye,
  FaDownload,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import { API_URL } from "../config/api";


//const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Receipts() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    customer_name: "",
    phone: "",
    service: "",
    total: "",
    advance: ""
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/receipts`);
      setRows(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/receipts`, form);
      setForm({ 
        date: new Date().toISOString().split('T')[0],
        customer_name: "", 
        phone: "", 
        service: "", 
        total: "", 
        advance: "" 
      });
      await load();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirm = async (id) => {
    if (window.confirm("Are you sure you want to confirm this receipt?")) {
      try {
        await axios.put(`${API_URL}/api/receipts/${id}/confirm`);
        await load();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const printOne = (r) => {
    const doc = generateReceipt(r);
    doc.save(`receipt_${r.id}.pdf`);
  };

  const previewReceipt = (r) => {
    alert(`Preview receipt for ${r.customer_name}\nTotal: ${r.total}\nAdvance: ${r.advance}\nDue: ${r.due}`);
  };

  const filteredRows = rows.filter(row => {
    const matchesSearch = row.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         row.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         row.phone.includes(searchTerm);
    
    const matchesFilter = filterStatus === "all" ? true :
                         filterStatus === "confirmed" ? row.confirmed :
                         filterStatus === "pending" ? !row.confirmed : true;
    
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = rows.reduce((sum, r) => sum + parseFloat(r.total || 0), 0);
  const totalAdvance = rows.reduce((sum, r) => sum + parseFloat(r.advance || 0), 0);
  const totalDue = rows.reduce((sum, r) => sum + parseFloat(r.due || 0), 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2
    }).format(value || 0);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>
            <FaReceipt className="me-2" />
            Manage Receipts
          </h2>
          <p className="text-muted mb-0">Save, confirm and print customer bills</p>
        </div>
        <div className="d-flex gap-2">
          <button 
            className="btn d-flex align-items-center gap-2"
            style={{ 
              backgroundColor: "rgba(255, 64, 129, 0.1)", 
              color: "#ff4081",
              border: "none"
            }}
            data-bs-toggle="collapse" 
            data-bs-target="#receiptForm"
          >
            <FaPlus />
            New Receipt
          </button>
          <button className="btn d-flex align-items-center gap-2 btn-light">
            <FaDownload />
            Export
          </button>
        </div>
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
                  <div className="text-muted small mb-2">Total Revenue</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#25d366" }}>
                    {formatCurrency(totalRevenue)}
                  </h3>
                  <div className="small text-success mt-2">{rows.length} receipts</div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(37, 211, 102, 0.2)" }}>
                  <FaMoneyBillWave style={{ color: "#25d366", fontSize: "1.5rem" }} />
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
                  <div className="text-muted small mb-2">Total Advance</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#2196f3" }}>
                    {formatCurrency(totalAdvance)}
                  </h3>
                  <div className="small text-primary mt-2">Advance payments</div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(33, 150, 243, 0.2)" }}>
                  <FaFileInvoiceDollar style={{ color: "#2196f3", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100"
               style={{ 
                 background: "linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05))",
                 transition: "all 0.3s ease"
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-2">Pending Due</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#ff9800" }}>
                    {formatCurrency(totalDue)}
                  </h3>
                  <div className="small text-warning mt-2">Outstanding balance</div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(255, 152, 0, 0.2)" }}>
                  <FaReceipt style={{ color: "#ff9800", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Receipt Form */}
      <div className="collapse show" id="receiptForm">
        <div className="card border-0 shadow-sm mb-4"
             style={{ 
               borderLeft: "4px solid #ff4081",
               transition: "all 0.3s ease"
             }}>
          <div className="card-header border-0 bg-white">
            <h6 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>
              <FaPlus className="me-2" />
              Create New Receipt
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit} className="row g-3">
              <div className="col-md-2">
                <label className="form-label small fw-medium text-muted">
                  <FaCalendarAlt className="me-1" />
                  Date
                </label>
                <input 
                  type="date" 
                  className="form-control" 
                  style={{ borderColor: "#ff85a2" }}
                  value={form.date} 
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))} 
                  required 
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label small fw-medium text-muted">
                  <FaUser className="me-1" />
                  Customer Name
                </label>
                <input 
                  className="form-control" 
                  style={{ borderColor: "#9c27b0" }}
                  placeholder="Enter customer name"
                  value={form.customer_name} 
                  onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))} 
                  required 
                />
              </div>
              
              <div className="col-md-2">
                <label className="form-label small fw-medium text-muted">
                  <FaPhone className="me-1" />
                  Phone Number
                </label>
                <input 
                  className="form-control" 
                  style={{ borderColor: "#2196f3" }}
                  placeholder="+880"
                  value={form.phone} 
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} 
                />
              </div>
              
              <div className="col-md-3">
                <label className="form-label small fw-medium text-muted">
                  <FaTag className="me-1" />
                  Service
                </label>
                <select
                  className="form-select"
                  style={{ borderColor: "#ff4081" }}
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                >
                  <option value="">Select Service</option>
                  <option value="Hair Cut">Hair Cut</option>
                  <option value="Facial">Facial</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Spa">Spa</option>
                  <option value="Nail Art">Nail Art</option>
                  <option value="others">Others</option>
                </select>
                {form.service === "others" && (
                  <input
                    className="form-control mt-2"
                    style={{ borderColor: "#ff85a2" }}
                    placeholder="Enter service name"
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  />
                )}
              </div>
              
              <div className="col-md-1">
                <label className="form-label small fw-medium text-muted">Total</label>
                <input 
                  type="number" 
                  className="form-control" 
                  style={{ borderColor: "#25d366" }}
                  placeholder="0"
                  value={form.total} 
                  onChange={e => setForm(f => ({ ...f, total: e.target.value }))} 
                  required 
                />
              </div>
              
              <div className="col-md-1">
                <label className="form-label small fw-medium text-muted">Advance</label>
                <input 
                  type="number" 
                  className="form-control" 
                  style={{ borderColor: "#ff9800" }}
                  placeholder="0"
                  value={form.advance} 
                  onChange={e => setForm(f => ({ ...f, advance: e.target.value }))} 
                />
              </div>
              
              <div className="col-md-12 text-end pt-3">
                <button 
                  className="btn me-2"
                  style={{ 
                    backgroundColor: "#f5f5f5", 
                    color: "#495057",
                    border: "none"
                  }}
                  type="button"
                  data-bs-toggle="collapse" 
                  data-bs-target="#receiptForm"
                >
                  Cancel
                </button>
                <button 
                  className="btn"
                  type="submit"
                  disabled={loading}
                  style={{ 
                    backgroundColor: "#25d366", 
                    color: "white",
                    border: "none"
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Receipt"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: "300px" }}>
            <span className="input-group-text bg-white border-end-0">
              <FaSearch style={{ color: "#8a5a6d" }} />
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Search by name, service or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="dropdown">
            <button 
              className="btn d-flex align-items-center gap-2 btn-light"
              type="button" 
              data-bs-toggle="dropdown"
            >
              <FaFilter />
              Filter
            </button>
            <ul className="dropdown-menu">
              <li>
                <button 
                  className={`dropdown-item ${filterStatus === "all" ? "active" : ""}`}
                  onClick={() => setFilterStatus("all")}
                >
                  All Receipts
                </button>
              </li>
              <li>
                <button 
                  className={`dropdown-item ${filterStatus === "confirmed" ? "active" : ""}`}
                  onClick={() => setFilterStatus("confirmed")}
                >
                  Confirmed Only
                </button>
              </li>
              <li>
                <button 
                  className={`dropdown-item ${filterStatus === "pending" ? "active" : ""}`}
                  onClick={() => setFilterStatus("pending")}
                >
                  Pending Only
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="d-flex gap-2">
          <span className="small text-muted">
            Showing {filteredRows.length} of {rows.length} receipts
          </span>
        </div>
      </div>

      {/* Receipts Table */}
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
                    Date
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Customer
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Service
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Total
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Advance
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Due
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Status
                  </th>
                  <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600", padding: "1rem" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">
                      <FaReceipt className="fs-1 mb-3" style={{ color: "#dee2e6" }} />
                      <div>No receipts found</div>
                      <small className="text-muted">Create your first receipt above</small>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map(r => (
                    <tr 
                      key={r.id} 
                      style={{ cursor: "pointer" }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 64, 129, 0.05)"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td style={{ padding: "1rem", color: "#6c757d" }}>
                        <div className="fw-bold">#{r.id}</div>
                      </td>
                      <td style={{ padding: "1rem", color: "#495057" }}>
                        {new Date(r.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div className="fw-medium" style={{ color: "#495057" }}>{r.customer_name}</div>
                        {r.phone && <small className="text-muted">{r.phone}</small>}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span className="badge px-3 py-1" style={{ 
                          backgroundColor: "rgba(255, 64, 129, 0.1)", 
                          color: "#ff4081",
                          fontSize: "0.75rem"
                        }}>
                          {r.service}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div className="fw-bold" style={{ color: "#25d366" }}>
                          {formatCurrency(parseFloat(r.total))}
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div className="fw-medium" style={{ color: "#2196f3" }}>
                          {formatCurrency(parseFloat(r.advance))}
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div className="fw-medium" style={{ color: "#ff9800" }}>
                          {formatCurrency(parseFloat(r.due))}
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {r.confirmed ? (
                          <span className="badge px-3 py-2" style={{ 
                            backgroundColor: "rgba(37, 211, 102, 0.1)", 
                            color: "#25d366",
                            fontWeight: "600"
                          }}>
                            <FaCheck className="me-1" />
                            Confirmed
                          </span>
                        ) : (
                          <span className="badge px-3 py-2" style={{ 
                            backgroundColor: "rgba(255, 193, 7, 0.1)", 
                            color: "#ffc107",
                            fontWeight: "600"
                          }}>
                            Pending
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm d-flex align-items-center gap-1"
                            onClick={() => previewReceipt(r)}
                            style={{ 
                              backgroundColor: "rgba(33, 150, 243, 0.1)", 
                              color: "#2196f3",
                              border: "none"
                            }}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="btn btn-sm d-flex align-items-center gap-1"
                            onClick={() => printOne(r)}
                            style={{ 
                              backgroundColor: "rgba(255, 64, 129, 0.1)", 
                              color: "#ff4081",
                              border: "none"
                            }}
                          >
                            <FaPrint />
                          </button>
                          {!r.confirmed && (
                            <button 
                              className="btn btn-sm d-flex align-items-center gap-1"
                              onClick={() => confirm(r.id)}
                              style={{ 
                                backgroundColor: "rgba(37, 211, 102, 0.1)", 
                                color: "#25d366",
                                border: "none"
                              }}
                            >
                              <FaCheck />
                            </button>
                          )}
                        </div>
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
        
        .btn:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}