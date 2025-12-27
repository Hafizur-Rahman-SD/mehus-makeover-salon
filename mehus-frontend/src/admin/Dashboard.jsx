import { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaCalendarCheck, 
  FaMoneyBillWave, 
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH,
  FaChartLine,
  FaChartPie,
  FaChartBar
} from "react-icons/fa";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('week');
  const [loading, setLoading] = useState(false);

  // Stats Data
  const statsData = [
    {
      id: 1,
      title: "Total Bookings",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: <FaCalendarCheck className="fs-2" />,
      color: "#ff4081",
      detail: "Last 30 days"
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "৳3,45,200",
      change: "+18.2%",
      trend: "up",
      icon: <FaMoneyBillWave className="fs-2" />,
      color: "#ff85a2",
      detail: "Monthly revenue"
    },
    {
      id: 3,
      title: "Active Customers",
      value: "428",
      change: "+8.3%",
      trend: "up",
      icon: <FaUsers className="fs-2" />,
      color: "#9c27b0",
      detail: "Registered users"
    },
    {
      id: 4,
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: <FaStar className="fs-2" />,
      color: "#ff9800",
      detail: "Out of 5.0"
    }
  ];

  // Recent Bookings
  const bookings = [
    { 
      id: 1, 
      name: "Nadia Islam", 
      service: "Bridal Makeup Package", 
      date: "2024-03-15", 
      time: "02:00 PM",
      phone: "+880 1712 345678", 
      status: "confirmed",
      amount: "৳12,500"
    },
    { 
      id: 2, 
      name: "Rafia Ahmed", 
      service: "Hair Styling & Coloring", 
      date: "2024-03-15", 
      time: "11:00 AM",
      phone: "+880 1812 345679", 
      status: "pending",
      amount: "৳4,500"
    },
    { 
      id: 3, 
      name: "Tasnima Khan", 
      service: "Premium Facial", 
      date: "2024-03-14", 
      time: "04:30 PM",
      phone: "+880 1912 345680", 
      status: "confirmed",
      amount: "৳2,500"
    },
    { 
      id: 4, 
      name: "Zara Malik", 
      service: "Manicure & Pedicure", 
      date: "2024-03-14", 
      time: "03:00 PM",
      phone: "+880 1612 345681", 
      status: "completed",
      amount: "৳1,800"
    },
    { 
      id: 5, 
      name: "Mehjabin Haque", 
      service: "Threading & Waxing", 
      date: "2024-03-13", 
      time: "01:00 PM",
      phone: "+880 1512 345682", 
      status: "cancelled",
      amount: "৳800"
    }
  ];

  // Quick Actions
  const quickActions = [
    { label: "Add New Service", icon: "bi-plus-circle", color: "#ff4081" },
    { label: "Create Offer", icon: "bi-tag", color: "#ff85a2" },
    { label: "Send Notification", icon: "bi-bell", color: "#9c27b0" },
    { label: "Generate Report", icon: "bi-file-earmark-text", color: "#2196f3" }
  ];

  // Top Services
  const topServices = [
    { name: "Bridal Makeup", bookings: 124, revenue: "৳15,50,000", percentage: 83 },
    { name: "Hair Coloring", bookings: 89, revenue: "৳8,45,500", percentage: 67 },
    { name: "Premium Facial", bookings: 76, revenue: "৳5,67,000", percentage: 58 },
    { name: "Full Body Spa", bookings: 65, revenue: "৳4,32,000", percentage: 45 }
  ];

  // Revenue Data (for manual chart)
  const revenueData = [
    { month: "Jan", amount: "৳1,20,000" },
    { month: "Feb", amount: "৳1,90,000" },
    { month: "Mar", amount: "৳1,50,000" },
    { month: "Apr", amount: "৳2,40,000" },
    { month: "May", amount: "৳2,10,000" },
    { month: "Jun", amount: "৳3,45,200" }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: { bg: "rgba(37, 211, 102, 0.1)", color: "#25d366", label: "Confirmed" },
      pending: { bg: "rgba(255, 193, 7, 0.1)", color: "#ffc107", label: "Pending" },
      completed: { bg: "rgba(33, 150, 243, 0.1)", color: "#2196f3", label: "Completed" },
      cancelled: { bg: "rgba(244, 67, 54, 0.1)", color: "#f44336", label: "Cancelled" }
    };
    return styles[status] || styles.pending;
  };

  // Manual Chart Rendering
  const renderManualChart = () => {
    const maxAmount = 345200; // Maximum amount for scaling
    return (
      <div className="manual-chart" style={{ height: "200px", position: "relative" }}>
        <div className="d-flex h-100 align-items-end justify-content-between">
          {revenueData.map((item, index) => {
            const height = (parseInt(item.amount.replace(/[^0-9]/g, '')) / maxAmount) * 100;
            return (
              <div key={index} className="d-flex flex-column align-items-center" style={{ width: "14%" }}>
                <div 
                  className="rounded-top" 
                  style={{ 
                    width: "30px",
                    height: `${height}%`,
                    backgroundColor: "#ff4081",
                    opacity: 0.8,
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                ></div>
                <div className="mt-2">
                  <div className="small fw-bold" style={{ color: "#8a5a6d" }}>{item.month}</div>
                  <div className="small text-muted">{item.amount}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between" style={{ pointerEvents: "none" }}>
          {[0, 25, 50, 75, 100].map((line) => (
            <div key={line} className="border-top" style={{ opacity: 0.1 }}></div>
          ))}
        </div>
      </div>
    );
  };

  // Service Distribution Visualization
  const renderServiceDistribution = () => {
    const total = topServices.reduce((sum, service) => sum + service.percentage, 0);
    
    return (
      <div className="service-distribution">
        {topServices.map((service, index) => {
          const colors = ["#ff4081", "#ff85a2", "#9c27b0", "#2196f3"];
          const width = (service.percentage / 100) * 100;
          
          return (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="small fw-medium" style={{ color: "#495057" }}>{service.name}</span>
                <span className="small fw-bold" style={{ color: colors[index] }}>{service.percentage}%</span>
              </div>
              <div className="progress" style={{ height: "8px", borderRadius: "4px" }}>
                <div 
                  className="progress-bar rounded-pill" 
                  style={{ 
                    width: `${width}%`,
                    backgroundColor: colors[index],
                    transition: "width 1s ease"
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>Dashboard Overview</h2>
          <p className="text-muted mb-0">Welcome back! Here's what's happening with your salon today.</p>
        </div>
        <div className="d-flex gap-2">
          <select 
            className="form-select form-select-sm" 
            style={{ width: "120px", borderColor: "#ff85a2" }}
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn btn-sm" style={{ backgroundColor: "rgba(255, 64, 129, 0.1)", color: "#ff4081" }}>
            <i className="bi bi-download me-1"></i>
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {statsData.map(stat => (
          <div className="col-md-6 col-lg-3" key={stat.id}>
            <div className="card border-0 shadow-sm h-100" style={{ transition: "all 0.3s ease" }}
                 onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                 onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="text-muted small mb-2">{stat.title}</div>
                    <h3 className="fw-bold mb-0" style={{ color: stat.color }}>{stat.value}</h3>
                    <div className="d-flex align-items-center mt-2">
                      {stat.trend === 'up' ? (
                        <FaArrowUp className="me-1" style={{ color: "#25d366", fontSize: "0.8rem" }} />
                      ) : (
                        <FaArrowDown className="me-1" style={{ color: "#f44336", fontSize: "0.8rem" }} />
                      )}
                      <span className={`small ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="small text-muted mt-1">{stat.detail}</div>
                  </div>
                  <div className="p-3 rounded-3" style={{ backgroundColor: `${stat.color}15` }}>
                    <span style={{ color: stat.color }}>
                      {stat.icon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        {/* Revenue Chart */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100" style={{ transition: "all 0.3s ease" }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>
                  <FaChartLine className="me-2" />
                  Revenue Overview
                </h6>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm" style={{ backgroundColor: "rgba(255, 64, 129, 0.1)", color: "#ff4081", fontSize: "0.75rem" }}>
                    Monthly
                  </button>
                  <button className="btn btn-sm btn-light" style={{ fontSize: "0.75rem" }}>
                    Weekly
                  </button>
                </div>
              </div>
              {renderManualChart()}
            </div>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100" style={{ transition: "all 0.3s ease" }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <h6 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>
                <FaChartPie className="me-2" />
                Service Distribution
              </h6>
              {renderServiceDistribution()}
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="row g-4">
        {/* Recent Bookings */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100" style={{ transition: "all 0.3s ease" }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>Recent Bookings</h6>
                <button className="btn btn-sm" style={{ backgroundColor: "rgba(255, 64, 129, 0.1)", color: "#ff4081", fontSize: "0.75rem" }}>
                  View All
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600" }}>ID</th>
                      <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600" }}>Customer</th>
                      <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600" }}>Service</th>
                      <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600" }}>Date & Time</th>
                      <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600" }}>Amount</th>
                      <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600" }}>Status</th>
                      <th style={{ color: "#8a5a6d", fontSize: "0.85rem", fontWeight: "600" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => {
                      const status = getStatusBadge(booking.status);
                      return (
                        <tr key={booking.id} style={{ cursor: "pointer" }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 64, 129, 0.05)"}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                          <td className="fw-medium" style={{ color: "#6c757d", fontSize: "0.85rem" }}>#{booking.id.toString().padStart(3, '0')}</td>
                          <td>
                            <div>
                              <div className="fw-medium" style={{ color: "#495057", fontSize: "0.85rem" }}>{booking.name}</div>
                              <small className="text-muted">{booking.phone}</small>
                            </div>
                          </td>
                          <td style={{ color: "#6c757d", fontSize: "0.85rem" }}>{booking.service}</td>
                          <td>
                            <div style={{ color: "#6c757d", fontSize: "0.85rem" }}>{booking.date}</div>
                            <small className="text-muted">{booking.time}</small>
                          </td>
                          <td className="fw-bold" style={{ color: "#ff4081", fontSize: "0.85rem" }}>{booking.amount}</td>
                          <td>
                            <span className="badge px-2 py-1" style={{ 
                              backgroundColor: status.bg, 
                              color: status.color,
                              fontSize: "0.75rem"
                            }}>
                              {status.label}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm p-0" style={{ color: "#6c757d" }}>
                              <FaEllipsisH />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-4">
          {/* Quick Actions */}
          <div className="card border-0 shadow-sm mb-4" style={{ transition: "all 0.3s ease" }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <h6 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>Quick Actions</h6>
              <div className="row g-2">
                {quickActions.map((action, idx) => (
                  <div className="col-6" key={idx}>
                    <button className="btn w-100 py-2 d-flex flex-column align-items-center justify-content-center rounded-3"
                            style={{
                              backgroundColor: `${action.color}15`,
                              border: `1px solid ${action.color}30`,
                              color: action.color,
                              transition: "all 0.3s ease"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = action.color;
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = `${action.color}15`;
                              e.currentTarget.style.color = action.color;
                              e.currentTarget.style.transform = "translateY(0)";
                            }}>
                      <i className={`bi ${action.icon} fs-4 mb-1`}></i>
                      <small className="fw-medium">{action.label}</small>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Services */}
          <div className="card border-0 shadow-sm" style={{ transition: "all 0.3s ease" }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <h6 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>
                <FaChartBar className="me-2" />
                Top Services
              </h6>
              <div className="list-group list-group-flush">
                {topServices.map((service, idx) => {
                  const colors = ["#ff4081", "#ff85a2", "#9c27b0", "#2196f3"];
                  return (
                    <div key={idx} className="list-group-item border-0 px-0 py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-medium" style={{ color: "#495057", fontSize: "0.9rem" }}>{service.name}</div>
                          <small className="text-muted">{service.bookings} bookings</small>
                        </div>
                        <div className="fw-bold" style={{ color: colors[idx], fontSize: "0.9rem" }}>
                          {service.revenue}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="progress" style={{ height: "4px" }}>
                          <div 
                            className="progress-bar rounded-pill" 
                            style={{ 
                              width: `${service.percentage}%`,
                              backgroundColor: colors[idx]
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx="true">{`
        .dashboard-container {
          padding: 0;
        }
        
        .card {
          transition: transform 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(138, 90, 109, 0.15) !important;
        }
        
        .progress-bar {
          transition: width 0.3s ease;
        }
        
        .table-hover tbody tr:hover {
          background-color: rgba(255, 64, 129, 0.05) !important;
        }
        
        .manual-chart {
          min-height: 200px;
        }
        
        @media (max-width: 768px) {
          .card-body {
            padding: 1rem !important;
          }
          
          .d-flex.justify-content-between.align-items-center.mb-4 {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}