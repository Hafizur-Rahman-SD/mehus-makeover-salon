import { useState } from "react";
import axios from "axios";
import { 
  FaUser, 
  FaLock, 
  FaSignInAlt, 
  FaEye, 
  FaEyeSlash,
  FaSpinner,
  FaPalette,
  FaStore
} from "react-icons/fa";
import { API_URL } from "../config/api";


export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
const res = await axios.post(`${API_URL}/api/auth/login`, {
        username, 
        password
      });
      
      if (res.data.success) {
        localStorage.setItem("adminUser", JSON.stringify(res.data.user));
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        onLogin(true);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleDemoLogin = () => {
    setUsername("admin");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8">
          {/* Login Card */}
          <div 
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{ 
              transition: "transform 0.3s ease",
              border: "none"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {/* Gradient Header */}
            <div 
              className="py-4 px-4 text-center text-white"
              style={{ 
                background: "linear-gradient(135deg, #ff4081 0%, #9c27b0 100%)"
              }}
            >
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ 
                    width: "50px", 
                    height: "50px", 
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <FaStore size={24} />
                </div>
                <div className="text-start">
                  <h1 className="h3 fw-bold mb-0">Mehus Makeover</h1>
                  <small className="opacity-90">Salon & Cosmetics Admin</small>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="card-body p-4">
              <h2 className="fw-bold text-center mb-4" style={{ color: "#8a5a6d" }}>
                <FaSignInAlt className="me-2" />
                Admin Login
              </h2>
              
              {error && (
                <div 
                  className="alert alert-danger d-flex align-items-center rounded-3 mb-4"
                  role="alert"
                  style={{ 
                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                    border: "1px solid rgba(244, 67, 54, 0.2)",
                    color: "#f44336"
                  }}
                >
                  <div className="me-2">⚠️</div>
                  <div className="small">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="mb-4">
                  <label className="form-label small fw-medium text-muted mb-2">
                    <FaUser className="me-2" />
                    Username
                  </label>
                  <div className="input-group">
                    <span 
                      className="input-group-text border-end-0 bg-white"
                      style={{ borderColor: "#ff4081" }}
                    >
                      <FaUser style={{ color: "#ff4081" }} />
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-start-0 ps-0"
                      style={{ 
                        borderColor: "#ff4081",
                        color: "#495057"
                      }}
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label className="form-label small fw-medium text-muted mb-2">
                    <FaLock className="me-2" />
                    Password
                  </label>
                  <div className="input-group">
                    <span 
                      className="input-group-text border-end-0 bg-white"
                      style={{ borderColor: "#9c27b0" }}
                    >
                      <FaLock style={{ color: "#9c27b0" }} />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="form-control border-start-0 ps-0"
                      style={{ 
                        borderColor: "#9c27b0",
                        color: "#495057"
                      }}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <button 
                      type="button"
                      className="input-group-text bg-white border-start-0"
                      style={{ borderColor: "#9c27b0", color: "#8a5a6d" }}
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input 
                      className="form-check-input"
                      type="checkbox"
                      style={{ 
                        backgroundColor: rememberMe ? "#ff4081" : "white",
                        borderColor: "#ff4081"
                      }}
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                      id="rememberMe"
                    />
                    <label 
                      className="form-check-label small text-muted ms-2" 
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button"
                    className="btn btn-link p-0 small"
                    style={{ color: "#ff4081", textDecoration: "none" }}
                    onClick={() => alert("Please contact administrator to reset password")}
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button 
                  type="submit"
                  className="btn w-100 py-3 fw-bold rounded-3"
                  style={{ 
                    background: "linear-gradient(135deg, #ff4081 0%, #9c27b0 100%)",
                    color: "white",
                    border: "none",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="me-2 fa-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="me-2" />
                      Sign In
                    </>
                  )}
                </button>

                {/* Demo Login Button */}
                <button 
                  type="button"
                  className="btn w-100 mt-3 py-2 fw-medium rounded-3"
                  style={{ 
                    backgroundColor: "rgba(156, 39, 176, 0.1)",
                    color: "#9c27b0",
                    border: "1px solid rgba(156, 39, 176, 0.2)"
                  }}
                  onClick={handleDemoLogin}
                  disabled={loading}
                >
                  <FaPalette className="me-2" />
                  Use Demo Credentials
                </button>
              </form>

              {/* Footer */}
              <div className="text-center mt-4 pt-3 border-top">
                <small className="text-muted">
                  © {new Date().getFullYear()} Mehus Makeover Salon
                </small>
                <div className="mt-2">
                  <small className="text-muted">
                    v1.0.0 • Secure Admin Panel
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                style={{ 
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: i === 1 ? "#ff4081" : i === 2 ? "#9c27b0" : "#ff85a2",
                  opacity: 0.6
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}>
        <div 
          className="position-absolute top-0 end-0 w-50 h-100"
          style={{ 
            background: "linear-gradient(45deg, rgba(255, 64, 129, 0.03) 0%, rgba(156, 39, 176, 0.03) 100%)",
            clipPath: "polygon(100% 0, 0% 100%, 100% 100%)"
          }}
        ></div>
      </div>

      {/* Custom Styles */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .card {
          animation: float 6s ease-in-out infinite;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #ff4081 !important;
          box-shadow: 0 0 0 0.25rem rgba(255, 64, 129, 0.25) !important;
        }
        
        .input-group-text {
          transition: all 0.3s ease;
        }
        
        .input-group:focus-within .input-group-text {
          background-color: rgba(255, 64, 129, 0.1);
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .container-fluid {
            padding: 20px;
          }
          .card {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}