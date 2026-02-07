import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaTag, 
  FaPlus, 
  FaTrash, 
  FaEdit, 
  FaCalendarAlt, 
  FaImage, 
  FaMoneyBillWave,
  FaListAlt,
  FaFileAlt,
  FaFilter,
  FaSearch
} from "react-icons/fa";

const API_URL = "http://localhost:5000";

export default function ManageOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    start_date: "",
    end_date: "",
    service: "",
    otherService: "",
    terms: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Fetch offers + services
  useEffect(() => {
    fetchOffers();
    fetchServices();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/offers`);
      setOffers(res.data);
    } catch (err) {
      console.error("❌ Error fetching offers:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/services`);
      setServices(res.data);
    } catch (err) {
      console.error("❌ Error fetching services:", err);
    }
  };

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm(prev => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== "") {
          data.append(key, form[key]);
        }
      });

      if (form.service === "Other") {
        data.set("service", form.otherService);
      }

      await axios.post(`${API_URL}/api/offers`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        start_date: "",
        end_date: "",
        service: "",
        otherService: "",
        terms: "",
        image: null,
      });
      setImagePreview(null);
      setShowForm(false);
      
      await fetchOffers();
    } catch (err) {
      console.error("❌ Error saving offer:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete offer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await axios.delete(`${API_URL}/api/offers/${id}`);
      setOffers(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      console.error("❌ Error deleting offer:", err);
    }
  };

  // Filter offers based on status
  const filterOffers = (offer) => {
    const now = new Date();
    const start = new Date(offer.start_date);
    const end = new Date(offer.end_date);
    
    if (activeFilter === "active") return now >= start && now <= end;
    if (activeFilter === "upcoming") return now < start;
    if (activeFilter === "expired") return now > end;
    return true;
  };

  // Search filter
  const searchFilter = (offer) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      offer.title.toLowerCase().includes(term) ||
      offer.description.toLowerCase().includes(term) ||
      (offer.service && offer.service.toLowerCase().includes(term))
    );
  };

  const filteredOffers = offers.filter(filterOffers).filter(searchFilter);

  // Calculate stats
  const activeOffers = offers.filter(o => {
    const now = new Date();
    const start = new Date(o.start_date);
    const end = new Date(o.end_date);
    return now >= start && now <= end;
  }).length;

  const upcomingOffers = offers.filter(o => {
    const now = new Date();
    const start = new Date(o.start_date);
    return now < start;
  }).length;

  const totalValue = offers.reduce((sum, o) => sum + parseFloat(o.price || 0), 0);

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>
            <FaTag className="me-2" />
            Manage Offers & Promotions
          </h2>
          <p className="text-muted mb-0">Create and manage special offers for your salon services</p>
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
          New Offer
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
                  <div className="text-muted small mb-2">Active Offers</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#25d366" }}>
                    {activeOffers}
                  </h3>
                  <div className="small text-success mt-2">Currently running</div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(37, 211, 102, 0.2)" }}>
                  <FaTag style={{ color: "#25d366", fontSize: "1.5rem" }} />
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
                  <div className="text-muted small mb-2">Upcoming Offers</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#ff9800" }}>
                    {upcomingOffers}
                  </h3>
                  <div className="small text-warning mt-2">Scheduled</div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(255, 152, 0, 0.2)" }}>
                  <FaCalendarAlt style={{ color: "#ff9800", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100"
               style={{ 
                 background: "linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05))",
                 transition: "all 0.3s ease"
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-2">Total Offer Value</div>
                  <h3 className="fw-bold mb-0" style={{ color: "#9c27b0" }}>
                    ৳{totalValue.toLocaleString()}
                  </h3>
                  <div className="small text-primary mt-2">Combined value</div>
                </div>
                <div className="p-3 rounded-circle" style={{ backgroundColor: "rgba(156, 39, 176, 0.2)" }}>
                  <FaMoneyBillWave style={{ color: "#9c27b0", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Creation Form */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4"
             style={{ 
               borderLeft: "4px solid #ff4081",
               transition: "all 0.3s ease"
             }}>
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>
                <FaPlus className="me-2" />
                Create New Offer
              </h6>
              <button 
                className="btn btn-sm"
                onClick={() => setShowForm(false)}
                style={{ 
                  backgroundColor: "#f44336", 
                  color: "white",
                  border: "none"
                }}
              >
                Close
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-medium text-muted">Offer Title</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ borderColor: "#ff4081" }}
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="E.g., Summer Special, Bridal Package"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-medium text-muted">Price (৳)</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ borderColor: "#25d366" }}
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Enter offer price"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-medium text-muted">Description</label>
                  <textarea
                    className="form-control"
                    style={{ borderColor: "#9c27b0" }}
                    name="description"
                    rows="2"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the offer details..."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-medium text-muted">
                    <FaCalendarAlt className="me-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ borderColor: "#2196f3" }}
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-medium text-muted">
                    <FaCalendarAlt className="me-1" />
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ borderColor: "#ff9800" }}
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-medium text-muted">
                    <FaListAlt className="me-1" />
                    Service
                  </label>
                  <select
                    className="form-select"
                    style={{ borderColor: "#ff85a2" }}
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Service --</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                {form.service === "Other" && (
                  <div className="col-md-6">
                    <label className="form-label small fw-medium text-muted">Custom Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ borderColor: "#ff85a2" }}
                      name="otherService"
                      value={form.otherService}
                      onChange={handleChange}
                      placeholder="Enter custom service name"
                    />
                  </div>
                )}

                <div className="col-md-12">
                  <label className="form-label small fw-medium text-muted">
                    <FaFileAlt className="me-1" />
                    Terms & Conditions
                  </label>
                  <textarea
                    className="form-control"
                    style={{ borderColor: "#8a5a6d" }}
                    name="terms"
                    rows="2"
                    value={form.terms}
                    onChange={handleChange}
                    placeholder="Enter terms and conditions (optional)"
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-medium text-muted">
                    <FaImage className="me-1" />
                    Offer Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    style={{ borderColor: "#ff4081" }}
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="img-thumbnail" 
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>

                <div className="col-md-12 text-end pt-2">
                  <button 
                    className="btn"
                    type="submit"
                    disabled={loading}
                    style={{ 
                      backgroundColor: "#25d366", 
                      color: "white",
                      border: "none",
                      minWidth: "120px"
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Saving...
                      </>
                    ) : (
                      "Save Offer"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2 align-items-center">
          <div className="input-group" style={{ width: "300px" }}>
            <span className="input-group-text bg-white border-end-0">
              <FaSearch style={{ color: "#8a5a6d" }} />
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="d-flex gap-1">
            <button 
              className={`btn btn-sm ${activeFilter === "all" ? "" : "btn-light"}`}
              onClick={() => setActiveFilter("all")}
              style={{ 
                backgroundColor: activeFilter === "all" ? "#ff4081" : "white",
                color: activeFilter === "all" ? "white" : "#495057",
                border: `1px solid ${activeFilter === "all" ? "#ff4081" : "#dee2e6"}`
              }}
            >
              All
            </button>
            <button 
              className={`btn btn-sm ${activeFilter === "active" ? "" : "btn-light"}`}
              onClick={() => setActiveFilter("active")}
              style={{ 
                backgroundColor: activeFilter === "active" ? "#25d366" : "white",
                color: activeFilter === "active" ? "white" : "#495057",
                border: `1px solid ${activeFilter === "active" ? "#25d366" : "#dee2e6"}`
              }}
            >
              Active
            </button>
            <button 
              className={`btn btn-sm ${activeFilter === "upcoming" ? "" : "btn-light"}`}
              onClick={() => setActiveFilter("upcoming")}
              style={{ 
                backgroundColor: activeFilter === "upcoming" ? "#ff9800" : "white",
                color: activeFilter === "upcoming" ? "white" : "#495057",
                border: `1px solid ${activeFilter === "upcoming" ? "#ff9800" : "#dee2e6"}`
              }}
            >
              Upcoming
            </button>
            <button 
              className={`btn btn-sm ${activeFilter === "expired" ? "" : "btn-light"}`}
              onClick={() => setActiveFilter("expired")}
              style={{ 
                backgroundColor: activeFilter === "expired" ? "#f44336" : "white",
                color: activeFilter === "expired" ? "white" : "#495057",
                border: `1px solid ${activeFilter === "expired" ? "#f44336" : "#dee2e6"}`
              }}
            >
              Expired
            </button>
          </div>
        </div>
        
        <div className="small text-muted">
          Showing {filteredOffers.length} of {offers.length} offers
        </div>
      </div>

      {/* Offers Grid */}
      {filteredOffers.length === 0 ? (
        <div className="text-center py-5">
          <FaTag className="fs-1 mb-3" style={{ color: "#dee2e6" }} />
          <h5 className="text-muted mb-2">No offers found</h5>
          <p className="text-muted">Create your first offer to get started</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredOffers.map((offer) => {
            const now = new Date();
            const start = new Date(offer.start_date);
            const end = new Date(offer.end_date);
            const isActive = now >= start && now <= end;
            const isUpcoming = now < start;
            const isExpired = now > end;
            
            let statusColor = "#6c757d";
            let statusText = "Inactive";
            
            if (isActive) {
              statusColor = "#25d366";
              statusText = "Active";
            } else if (isUpcoming) {
              statusColor = "#ff9800";
              statusText = "Upcoming";
            } else if (isExpired) {
              statusColor = "#f44336";
              statusText = "Expired";
            }

            return (
              <div className="col-md-4" key={offer.id}>
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div className="position-relative">
                    {offer.image && (
                      <img
                        src={`${API_URL}${offer.image}`}
                        alt={offer.title}
                        className="card-img-top"
                        style={{ 
                          height: "200px", 
                          objectFit: "cover",
                          borderTopLeftRadius: "0.5rem",
                          borderTopRightRadius: "0.5rem"
                        }}
                      />
                    )}
                    <div className="position-absolute top-0 end-0 m-2">
                      <span 
                        className="badge px-3 py-2"
                        style={{ 
                          backgroundColor: `${statusColor}20`,
                          color: statusColor,
                          fontWeight: "600"
                        }}
                      >
                        {statusText}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body p-3">
                    <h5 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>
                      {offer.title}
                    </h5>
                    <p className="text-muted small mb-3" style={{ minHeight: "40px" }}>
                      {offer.description || "No description available"}
                    </p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <span className="small text-muted">Service:</span>
                        <span className="ms-2 fw-medium" style={{ color: "#495057" }}>
                          {offer.service || "N/A"}
                        </span>
                      </div>
                      <div className="fw-bold fs-5" style={{ color: "#ff4081" }}>
                        ৳{parseFloat(offer.price || 0).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="small text-muted mb-3">
                      <FaCalendarAlt className="me-1" />
                      {new Date(offer.start_date).toLocaleDateString()} – {new Date(offer.end_date).toLocaleDateString()}
                    </div>
                    
                    {offer.terms && (
                      <div className="small text-muted mb-3">
                        <FaFileAlt className="me-1" />
                        {offer.terms.length > 60 ? `${offer.terms.substring(0, 60)}...` : offer.terms}
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <button 
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{ 
                          backgroundColor: "rgba(244, 67, 54, 0.1)", 
                          color: "#f44336",
                          border: "none"
                        }}
                        onClick={() => handleDelete(offer.id)}
                      >
                        <FaTrash />
                        Delete
                      </button>
                      
                      <span className="small text-muted">
                        ID: #{offer.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}