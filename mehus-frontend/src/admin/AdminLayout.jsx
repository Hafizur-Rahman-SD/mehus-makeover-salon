import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaTachometerAlt, 
  FaCut, 
  FaCalendarCheck, 
  FaMoneyBillWave, 
  FaReceipt, 
  FaTag,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("");

  // Update active item based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("dashboard")) setActiveItem("dashboard");
    else if (path.includes("services")) setActiveItem("services");
    else if (path.includes("bookings")) setActiveItem("bookings");
    else if (path.includes("finance")) setActiveItem("finance");
    else if (path.includes("receipts")) setActiveItem("receipts");
    else if (path.includes("offers")) setActiveItem("offers");
  }, [location]);

  const menuItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: <FaTachometerAlt />, 
      path: "/admin/dashboard" 
    },
    { 
      id: "services", 
      label: "Services", 
      icon: <FaCut />, 
      path: "/admin/services" 
    },
    { 
      id: "bookings", 
      label: "Bookings", 
      icon: <FaCalendarCheck />, 
      path: "/admin/bookings" 
    },
    { 
      id: "finance", 
      label: "Finance", 
      icon: <FaMoneyBillWave />, 
      path: "/admin/finance" 
    },
    { 
      id: "receipts", 
      label: "Receipts", 
      icon: <FaReceipt />, 
      path: "/admin/receipts" 
    },
    { 
      id: "offers", 
      label: "Offers", 
      icon: <FaTag />, 
      path: "/admin/offers" 
    },
  ];

  const handleLogout = () => {
    // ✅ Clear login session
    localStorage.removeItem("adminUser");
    localStorage.removeItem("rememberMe"); // optional, but safe
    // ✅ Go to admin login
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Mobile Toggle Button */}
      <button 
        className="d-lg-none position-fixed top-3 start-3 z-3 btn btn-primary rounded-circle p-2 shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ zIndex: 1000 }}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`bg-white shadow-lg ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`} 
             style={{ 
               width: "280px", 
               transition: "all 0.3s ease",
               position: "fixed",
               height: "100vh",
               zIndex: 999
             }}>
        {/* Sidebar Header */}
        <div className="p-4 border-bottom" style={{ 
          background: "linear-gradient(135deg, #ff4081, #ff85a2)",
          color: "white"
        }}>
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-white p-2 me-3 d-flex align-items-center justify-content-center"
                 style={{ width: "45px", height: "45px" }}>
              <span className="fw-bold fs-4" style={{ color: "#ff4081" }}>M</span>
            </div>
            <div>
              <h5 className="fw-bold mb-0">Mehu's Makeovers</h5>
              <small className="opacity-75">Admin Panel</small>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <div className="bg-white rounded-circle p-1 me-2">
                <i className="bi bi-person-fill text-pink"></i>
              </div>
              <div>
                <div className="small">Admin User</div>
                <div className="small opacity-75">Super Administrator</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-3">
          <ul className="nav flex-column gap-2">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link 
                  to={item.path}
                  className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded-3 ${activeItem === item.id ? 'active-menu' : ''}`}
                  style={{
                    textDecoration: "none",
                    color: activeItem === item.id ? "#ff4081" : "#6c757d",
                    backgroundColor: activeItem === item.id ? "rgba(255, 64, 129, 0.1)" : "transparent",
                    borderLeft: activeItem === item.id ? "4px solid #ff4081" : "4px solid transparent",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    if (activeItem !== item.id) {
                      e.currentTarget.style.backgroundColor = "rgba(255, 64, 129, 0.05)";
                      e.currentTarget.style.color = "#ff4081";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeItem !== item.id) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#6c757d";
                    }
                  }}
                >
                  <span className="fs-5" style={{ 
                    color: activeItem === item.id ? "#ff4081" : "#adb5bd",
                    width: "24px"
                  }}>
                    {item.icon}
                  </span>
                  <span className="fw-medium">{item.label}</span>
                  {activeItem === item.id && (
                    <span className="ms-auto">
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#ff4081"
                      }}></div>
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Quick Stats */}
          <div className="mt-5 pt-3 border-top">
            <h6 className="fw-bold mb-3 px-3" style={{ color: "#6c757d" }}>Today's Stats</h6>
            <div className="px-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small style={{ color: "#adb5bd" }}>New Bookings</small>
                <span className="fw-bold" style={{ color: "#ff4081" }}>12</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small style={{ color: "#adb5bd" }}>Revenue</small>
                <span className="fw-bold" style={{ color: "#ff4081" }}>৳25,400</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <small style={{ color: "#adb5bd" }}>Pending</small>
                <span className="fw-bold" style={{ color: "#ff4081" }}>3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="position-absolute bottom-0 start-0 w-100 p-3 border-top">
          <button 
            onClick={handleLogout}
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3"
            style={{
              backgroundColor: "rgba(255, 64, 129, 0.1)",
              color: "#ff4081",
              border: "1px solid rgba(255, 64, 129, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ff4081";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 64, 129, 0.1)";
              e.currentTarget.style.color = "#ff4081";
            }}
          >
            <FaSignOutAlt />
            <span className="fw-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow-1" style={{ 
        marginLeft: sidebarOpen ? "280px" : "0",
        transition: "margin-left 0.3s ease"
      }}>
        {/* Top Navigation Bar */}
        <nav className="navbar navbar-light bg-white shadow-sm py-3 px-4">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <button 
                className="btn d-lg-none me-3"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <FaBars />
              </button>
              <h4 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>
                {menuItems.find(item => item.id === activeItem)?.label || "Dashboard"}
              </h4>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              {/* Notifications */}
              <button className="btn position-relative p-2 rounded-circle"
                      style={{ backgroundColor: "rgba(255, 64, 129, 0.1)" }}>
                <i className="bi bi-bell" style={{ color: "#ff4081" }}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                  3
                </span>
              </button>
              
              {/* Date */}
              <div className="d-none d-md-block">
                <div className="text-end">
                  <div className="small text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</div>
                  <div className="fw-bold" style={{ color: "#8a5a6d" }}>
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="p-4">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb bg-transparent p-0">
              <li className="breadcrumb-item">
                <Link to="/admin/dashboard" style={{ color: "#ff4081", textDecoration: "none" }}>
                  Admin
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: "#8a5a6d" }}>
                {menuItems.find(item => item.id === activeItem)?.label || "Dashboard"}
              </li>
            </ol>
          </nav>

          {/* Page Content */}
          <div className="bg-white rounded-4 shadow-sm p-4" style={{ minHeight: "calc(100vh - 200px)" }}>
            <Outlet />
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <small className="text-muted">
              © {new Date().getFullYear()} Mehu's Makeovers Admin Panel v1.0
            </small>
          </div>
        </div>
      </main>

      {/* Custom CSS */}
      <style jsx="true">{`
        .active-menu {
          font-weight: 600 !important;
        }
        
        .text-pink {
          color: #ff4081 !important;
        }
        
        @media (max-width: 991.98px) {
          aside {
            position: fixed !important;
            left: ${sidebarOpen ? '0' : '-280px'};
            transition: left 0.3s ease;
          }
          
          main {
            margin-left: 0 !important;
          }
        }
        
        /* Scrollbar Styling */
        aside::-webkit-scrollbar {
          width: 6px;
        }
        
        aside::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        aside::-webkit-scrollbar-thumb {
          background: #ff85a2;
          border-radius: 3px;
        }
        
        aside::-webkit-scrollbar-thumb:hover {
          background: #ff4081;
        }
      `}</style>
    </div>
  );
}
