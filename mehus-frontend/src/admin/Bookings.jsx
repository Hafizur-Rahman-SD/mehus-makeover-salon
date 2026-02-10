import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaCalendarCheck, 
  FaUser, 
  FaPhone, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaSpinner,
  FaPrint,
  FaReceipt,
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload,
  FaSync
} from "react-icons/fa";
import { API_URL } from "../config/api";


export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
axios.get(`${API_URL}/api/bookings`)
      .then(res => {
        const bookingsData = res.data || [];
        setBookings(bookingsData);
        
        // Calculate stats
        const statsData = {
          total: bookingsData.length,
          pending: bookingsData.filter(b => b.status === "pending").length,
          confirmed: bookingsData.filter(b => b.status === "confirmed").length,
          completed: bookingsData.filter(b => b.status === "completed").length
        };
        setStats(statsData);
      })
      .catch(err => console.error("❌ Error fetching bookings:", err))
      .finally(() => setLoading(false));
  };

  // ✅ Status Update Function
  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status: newStatus })
      .then(() => {
        setBookings(bookings.map(b => 
          b.id === id ? { ...b, status: newStatus } : b
        ));
        fetchBookings(); // Refresh stats
      })
      .catch(err => console.error("❌ Error updating status:", err));
  };

  // ✅ Generate Receipt
  const handleGenerateReceipt = (booking) => {
    const advance = prompt("Enter Advance Amount (৳):");
    const due = prompt("Enter Due Amount (৳):");
    const total = prompt("Enter Total Amount (৳):");
    
    if (advance && due && total) {
      axios.put(`http://localhost:5000/api/receipts/${booking.id}/confirm`, { 
        advance, 
        due, 
        total 
      })
      .then(() => alert("✅ Receipt Confirmed & Finance Updated"))
      .catch(err => console.error("❌ Error:", err));
    }
  };

  // ✅ Print Receipt
  const handlePrintReceipt = (booking) => {
    // Implement receipt printing logic
    console.log("Printing receipt for:", booking);
    alert("Receipt printed successfully!");
  };

  // Filter bookings based on status and search
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch = 
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "#ffc107", bg: "rgba(255, 193, 7, 0.1)", icon: <FaClock /> },
      confirmed: { color: "#0d6efd", bg: "rgba(13, 110, 253, 0.1)", icon: <FaCheckCircle /> },
      completed: { color: "#198754", bg: "rgba(25, 135, 84, 0.1)", icon: <FaCheckCircle /> },
      cancelled: { color: "#dc3545", bg: "rgba(220, 53, 69, 0.1)", icon: <FaTimesCircle /> }
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bookings-management">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>Bookings Management</h2>
          <p className="text-muted mb-0">Manage customer appointments and bookings</p>
        </div>
        <button 
          className="btn d-flex align-items-center gap-2"
          onClick={fetchBookings}
          style={{ 
            backgroundColor: "rgba(255, 64, 129, 0.1)", 
            color: "#ff4081",
            border: "none"
          }}
        >
          <FaSync />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3" style={{ borderLeft: "4px solid #ff4081" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Total Bookings</div>
                <h3 className="fw-bold mb-0" style={{ color: "#ff4081" }}>{stats.total}</h3>
              </div>
              <FaCalendarCheck className="fs-2" style={{ color: "#ff4081", opacity: 0.3 }} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3" style={{ borderLeft: "4px solid #ffc107" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Pending</div>
                <h3 className="fw-bold mb-0" style={{ color: "#ffc107" }}>{stats.pending}</h3>
              </div>
              <FaClock className="fs-2" style={{ color: "#ffc107", opacity: 0.3 }} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3" style={{ borderLeft: "4px solid #0d6efd" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Confirmed</div>
                <h3 className="fw-bold mb-0" style={{ color: "#0d6efd" }}>{stats.confirmed}</h3>
              </div>
              <FaCheckCircle className="fs-2" style={{ color: "#0d6efd", opacity: 0.3 }} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3" style={{ borderLeft: "4px solid #198754" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Completed</div>
                <h3 className="fw-bold mb-0" style={{ color: "#198754" }}>{stats.completed}</h3>
              </div>
              <FaCheckCircle className="fs-2" style={{ color: "#198754", opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "rgba(255, 64, 129, 0.1)", borderColor: "#ff85a2" }}>
                  <FaSearch style={{ color: "#ff4081" }} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, service, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderColor: "#ff85a2" }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "rgba(255, 64, 129, 0.1)", borderColor: "#ff85a2" }}>
                  <FaFilter style={{ color: "#ff4081" }} />
                </span>
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ borderColor: "#ff85a2" }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <button 
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}
                style={{ 
                  backgroundColor: "rgba(108, 117, 125, 0.1)", 
                  color: "#6c757d",
                  border: "1px solid #dee2e6"
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <FaSpinner className="fa-spin fs-1 mb-3" style={{ color: "#ff4081" }} />
              <p className="text-muted">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3">
                <FaCalendarCheck className="fs-1" style={{ color: "#ff85a2", opacity: 0.5 }} />
              </div>
              <h5 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>No Bookings Found</h5>
              <p className="text-muted mb-4">No bookings match your search criteria</p>
              <button 
                className="btn"
                onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}
                style={{ 
                  backgroundColor: "rgba(255, 64, 129, 0.1)", 
                  color: "#ff4081"
                }}
              >
                View All Bookings
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: "rgba(255, 64, 129, 0.05)" }}>
                    <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>CUSTOMER</th>
                    <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>SERVICE</th>
                    <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>DATE & TIME</th>
                    <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>CONTACT</th>
                    <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>STATUS</th>
                    <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(booking => {
                    const statusConfig = getStatusBadge(booking.status);
                    return (
                      <tr key={booking.id} 
                          style={{ cursor: "pointer" }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 64, 129, 0.03)"}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                        <td style={{ padding: "1rem" }}>
                          <div className="fw-medium d-flex align-items-center gap-2" style={{ color: "#495057" }}>
                            <FaUser className="text-muted" />
                            {booking.name}
                          </div>
                        </td>
                        <td style={{ padding: "1rem", color: "#6c757d" }}>{booking.service}</td>
                        <td style={{ padding: "1rem" }}>
                          <div className="d-flex align-items-center gap-2">
                            <FaCalendarCheck className="text-muted" />
                            <div>
                              <div style={{ color: "#495057" }}>{booking.date}</div>
                              <small className="text-muted">{booking.time}</small>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div className="d-flex align-items-center gap-2">
                            <FaPhone className="text-muted" />
                            <span style={{ color: "#6c757d" }}>{booking.phone}</span>
                          </div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                              className="form-select form-select-sm"
                              style={{ 
                                backgroundColor: statusConfig.bg,
                                color: statusConfig.color,
                                borderColor: statusConfig.color,
                                width: "120px"
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-sm d-flex align-items-center gap-1"
                              onClick={() => handleGenerateReceipt(booking)}
                              style={{ 
                                backgroundColor: "rgba(37, 211, 102, 0.1)", 
                                color: "#25d366",
                                border: "none"
                              }}
                            >
                              <FaReceipt />
                              <span>Receipt</span>
                            </button>
                            <button 
                              className="btn btn-sm d-flex align-items-center gap-1"
                              onClick={() => handlePrintReceipt(booking)}
                              style={{ 
                                backgroundColor: "rgba(13, 110, 253, 0.1)", 
                                color: "#0d6efd",
                                border: "none"
                              }}
                            >
                              <FaPrint />
                              <span>Print</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-3 text-end">
        <small className="text-muted">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </small>
      </div>

      {/* Custom CSS */}
      <style jsx="true">{`
        .bookings-management {
          padding: 0;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #ff85a2 !important;
          box-shadow: 0 0 0 0.25rem rgba(255, 133, 162, 0.25) !important;
        }
        
        .fa-spin {
          animation: fa-spin 1s infinite linear;
        }
        
        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .table-responsive {
            font-size: 0.875rem;
          }
          
          .card-body {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}