import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{
      backgroundColor: "#fff5f9",
      backgroundImage: "linear-gradient(to bottom, #fff5f9, #ffeef6)",
      borderBottom: "1px solid rgba(255, 182, 193, 0.3)",
      boxShadow: "0 4px 12px rgba(255, 182, 193, 0.1)"
    }}>

      <div className="container-fluid px-4">
        {/* Brand Logo Section */}
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ textDecoration: "none" }}>
          <div className="position-relative">
            <i className="bi bi-stars" style={{
              color: "#ff85a2",
              fontSize: "2.8rem",
              filter: "drop-shadow(0 2px 4px rgba(255, 133, 162, 0.3))"
            }} />

            <div style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ff4081",
              animation: "sparkle 2s infinite alternate"
            }}></div>
          </div>

          <div className="d-flex flex-column ms-3">
            <span className="fw-bold" style={{
              fontSize: "1.8rem",
              background: "linear-gradient(90deg, #ff4081, #ff85a2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.5px"
            }}>
              Mehu's Makeovers
            </span>
            <span className="text-muted" style={{
              fontSize: "0.85rem",
              fontStyle: "italic",
              color: "#d17a94 !important"
            }}>
              Beauty & Elegance Redefined
            </span>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mainNav"
          aria-label="Toggle navigation"
          style={{ color: "#ff85a2" }}
        >
          <i className="bi bi-list" style={{ fontSize: "2rem" }}></i>
        </button>

        {/* Navigation Menu */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto align-items-lg-center">
            {[
              ["Home", "/", "bi-house-door"],
              ["About", "/about", "bi-info-circle"],
              ["Services", "/services", "bi-scissors"],
              ["Offers", "/offers", "bi-gift"],
              ["Gallery", "/gallery", "bi-images"],
              ["Booking", "/booking", "bi-calendar-check"],
              ["Reviews", "/reviews", "bi-star"],
              ["Contact", "/contact", "bi-telephone"],
              ["products", "/products", "bi-bag"]
            
            ].map(([label, to, icon]) => (
              <li className="nav-item mx-1" key={to}>
                <NavLink 
                  className={({isActive}) => {
                    const baseClasses = "nav-link d-flex align-items-center py-3 px-3 rounded-pill";
                    const activeClasses = "active-link";
                    const inactiveClasses = "inactive-link";
                    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
                  }} 
                  to={to} 
                  end
                >
                  <i className={`bi ${icon} me-2`} style={{ fontSize: "1.2rem" }}></i>
                  <span className="fw-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* Facebook Button */}
          <div className="ms-lg-3 mt-3 mt-lg-0">
            <a 
              className="btn d-flex align-items-center justify-content-center rounded-pill px-4 py-3 shadow-sm"
              href="https://www.facebook.com/people/Mehus-Makeover-salon/61579639642397/" 
              target="_blank" 
              rel="noreferrer"
              style={{
                background: "linear-gradient(135deg, #ff85a2, #ff4081)",
                border: "none",
                color: "white",
                fontWeight: "600",
                transition: "all 0.3s ease",
                minWidth: "200px"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(255, 133, 162, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(255, 133, 162, 0.25)";
              }}
            >
              <i className="bi bi-facebook me-2 fs-4"></i>
              Follow Us
              <i className="bi bi-arrow-up-right ms-2" style={{ fontSize: "0.9rem" }}></i>
            </a>
          </div>
        </div>
      </div>

      {/* Add custom CSS for this component */}
      <style jsx="true">{`
        .active-link {
          background: linear-gradient(135deg, rgba(255, 133, 162, 0.15), rgba(255, 64, 129, 0.1)) !important;
          color: #ff4081 !important;
          font-weight: 600 !important;
          border: 1px solid rgba(255, 133, 162, 0.3) !important;
          box-shadow: 0 4px 8px rgba(255, 133, 162, 0.1) !important;
        }
        
        .inactive-link {
          color: #8a5a6d !important;
          transition: all 0.2s ease;
        }
        
        .inactive-link:hover {
          color: #ff4081 !important;
          background-color: rgba(255, 133, 162, 0.08) !important;
          transform: translateY(-1px);
        }
        
        .navbar-brand:hover span:first-child {
          background: linear-gradient(90deg, #ff6b9d, #ff9ab8) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        
        @keyframes sparkle {
          0% { opacity: 0.5; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .navbar-nav {
            padding-top: 1rem;
          }
          .nav-item {
            margin-bottom: 0.5rem;
          }
          .nav-link {
            justify-content: center;
          }
        }
      `}</style>
    </nav>
  );
}