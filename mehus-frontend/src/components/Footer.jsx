import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pt-5 pb-4" style={{
      background: "linear-gradient(135deg, #fff5f9, #ffeef6)", // Navbar-র সাথে exact match
      color: "#8a5a6d", // Navbar-র inactive link color
      borderTop: "1px solid rgba(255, 182, 193, 0.3)" // Navbar-র border match
    }}>
      <div className="container">
        {/* Top Section - 4 Columns */}
        <div className="row">
          {/* Column 1 - Brand & Description */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-stars me-2" style={{
                color: "#ff85a2",
                fontSize: "2rem",
                filter: "drop-shadow(0 2px 4px rgba(255, 133, 162, 0.3))"
              }} />
              <h4 className="fw-bold mb-0" style={{
                background: "linear-gradient(90deg, #ff4081, #ff85a2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Mehu's
              </h4>
            </div>
            <p className="text-muted" style={{ color: "#d17a94 !important" }}>
              Your beauty is our passion. Professional salon services with a personal touch.
            </p>
            <div className="mt-3">
              <h6 className="fw-bold mb-2" style={{ color: "#ff4081" }}>Opening Hours</h6>
              <p className="mb-1">Mon - Sat: 9:00 AM - 8:00 PM</p>
              <p className="mb-0">Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: "#ff4081" }}>Quick Links</h5>
            <ul className="list-unstyled">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Gallery", "/gallery"],
                ["Booking", "/booking"],
                ["About Us", "/about"],
                ["Contact", "/contact"],
                ["Offers", "/offers"],
                ["Reviews", "/reviews"]
              ].map(([label, path]) => (
                <li key={path} className="mb-2">
                  <Link 
                    to={path} 
                    className="text-decoration-none d-flex align-items-center"
                    style={{ 
                      color: "#8a5a6d",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#ff4081";
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#8a5a6d";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    <i className="bi bi-chevron-right me-2" style={{ fontSize: "0.8rem" }}></i>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: "#ff4081" }}>Contact Info</h5>
            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-geo-alt me-3 mt-1" style={{ color: "#ff85a2" }}></i>
              <div>
                <h6 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>Address</h6>
                <p className="mb-0" style={{ color: "#d17a94" }}>
                  House 17/1, Jononi Villa<br />
                  West Nakhalpara, Bonoful Road<br />
                  Farmgate, Dhaka
                </p>
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-telephone me-3" style={{ color: "#ff85a2" }}></i>
              <div>
                <h6 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>Phone</h6>
                <p className="mb-0" style={{ color: "#d17a94" }}>
                  +880 1777 236613<br />
                  +880 1605 135004
                </p>
              </div>
            </div>
            
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope me-3" style={{ color: "#ff85a2" }}></i>
              <div>
                <h6 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>Email</h6>
                <p className="mb-0" style={{ color: "#d17a94" }}>
                  info@mehusmakeover.com
                </p>
              </div>
            </div>
          </div>

          {/* Column 4 - Social Media & Newsletter */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: "#ff4081" }}>Stay Updated</h5>
            
            {/* Newsletter Subscription */}
            <div className="mb-4">
              <p className="mb-2" style={{ color: "#8a5a6d" }}>
                Subscribe for offers & beauty tips
              </p>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control rounded-start-pill" 
                  placeholder="Your email"
                  style={{
                    borderColor: "#ff85a2",
                    color: "#8a5a6d"
                  }}
                />
                <button 
                  className="btn rounded-end-pill"
                  style={{
                    backgroundColor: "#ff4081",
                    color: "white",
                    borderColor: "#ff4081"
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media - Navbar button style match */}
            <h6 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>Follow Us</h6>
            <div className="d-flex gap-3">
              {[
                { icon: <FaFacebook />, color: "#1877F2", href: "https://facebook.com/people/Mehus-Makeover-salon/61579639642397/" },
                { icon: <FaInstagram />, color: "#E4405F", href: "https://instagram.com" },
                { icon: <FaWhatsapp />, color: "#25D366", href: "https://wa.me/8801777236613" },
                { icon: <FaYoutube />, color: "#FF0000", href: "https://youtube.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "white",
                    color: social.color,
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    border: "2px solid #ff85a2",
                    boxShadow: "0 4px 8px rgba(255, 133, 162, 0.2)"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = social.color;
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 6px 12px rgba(255, 133, 162, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = social.color;
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 8px rgba(255, 133, 162, 0.2)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="text-center pt-4 mt-4" style={{ 
          borderTop: "1px solid rgba(255, 182, 193, 0.3)",
          color: "#d17a94"
        }}>
          <p className="mb-2">
            © {currentYear} <strong style={{ color: "#ff4081" }}>Mehu's Makeovers</strong>. All rights reserved.
          </p>
          <p className="mb-0 small" style={{ color: "#d17a94" }}>
            Designed with <i className="bi bi-heart-fill text-danger mx-1"></i> for your beauty
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx="true">{`
        .form-control:focus {
          border-color: #ff85a2;
          box-shadow: 0 0 0 0.25rem rgba(255, 133, 162, 0.25);
        }
        
        @media (max-width: 768px) {
          .row > div {
            margin-bottom: 2rem;
          }
          .text-lg-start {
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}