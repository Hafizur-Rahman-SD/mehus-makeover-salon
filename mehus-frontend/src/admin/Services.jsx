import { useState, useEffect } from "react";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTag,
  FaMoneyBillWave
} from "react-icons/fa";

export default function Services() {
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: "Bridal Makeup Package", 
      price: 12500, 
      category: "Makeup",
      duration: "3-4 hours",
      popularity: 95,
      status: "active",
      description: "Complete bridal makeup with premium products",
      createdAt: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Haircut & Styling", 
      price: 700, 
      category: "Hair",
      duration: "1 hour",
      popularity: 88,
      status: "active",
      description: "Professional haircut and styling",
      createdAt: "2024-01-10"
    },
    { 
      id: 3, 
      name: "Premium Facial", 
      price: 1500, 
      category: "Skincare",
      duration: "1.5 hours",
      popularity: 92,
      status: "active",
      description: "Deep cleansing facial treatment",
      createdAt: "2024-01-05"
    },
    { 
      id: 4, 
      name: "Manicure & Pedicure", 
      price: 1200, 
      category: "Nails",
      duration: "1.5 hours",
      popularity: 85,
      status: "inactive",
      description: "Complete nail care service",
      createdAt: "2024-01-03"
    },
    { 
      id: 5, 
      name: "Threading & Waxing", 
      price: 500, 
      category: "Hair Removal",
      duration: "45 mins",
      popularity: 90,
      status: "active",
      description: "Professional hair removal service",
      createdAt: "2024-01-01"
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterCategory, setFilterCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    duration: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Categories
  const categories = ["all", "Makeup", "Hair", "Skincare", "Nails", "Hair Removal", "Spa", "Other"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    if (editingId) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingId 
          ? { ...service, ...formData, price: Number(formData.price) }
          : service
      ));
    } else {
      // Add new service
      const newService = { 
        id: Math.max(0, ...services.map(s => s.id)) + 1, 
        ...formData, 
        price: Number(formData.price),
        popularity: 75,
        status: "active",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setServices([newService, ...services]);
    }

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      duration: "",
      description: ""
    });
    setEditingId(null);
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      price: service.price,
      category: service.category,
      duration: service.duration,
      description: service.description || ""
    });
    setEditingId(service.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setServices(services.filter(s => s.id !== id));
  };

  const toggleStatus = (id) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === "active" ? "inactive" : "active" }
        : service
    ));
  };

  // Filter and sort services
  const filteredServices = services
    .filter(service => 
      (filterCategory === "all" || service.category === filterCategory) &&
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       service.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => sortOrder === "desc" ? b.price - a.price : a.price - b.price);

  const totalRevenue = services.reduce((sum, service) => sum + service.price, 0);
  const activeServices = services.filter(s => s.status === "active").length;

  return (
    <div className="services-management">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>Services Management</h2>
          <p className="text-muted mb-0">Manage all salon services and pricing</p>
        </div>
        <button 
          className="btn d-flex align-items-center gap-2 py-2 px-4"
          onClick={() => { resetForm(); setShowModal(true); }}
          style={{
            background: "linear-gradient(135deg, #ff4081, #ff85a2)",
            color: "white",
            border: "none",
            fontWeight: "600",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(255, 64, 129, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          <FaPlus />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Total Services</div>
                <h3 className="fw-bold mb-0" style={{ color: "#ff4081" }}>{services.length}</h3>
              </div>
              <div className="p-2 rounded-3" style={{ backgroundColor: "rgba(255, 64, 129, 0.1)" }}>
                <FaTag style={{ color: "#ff4081" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Active Services</div>
                <h3 className="fw-bold mb-0" style={{ color: "#25d366" }}>{activeServices}</h3>
              </div>
              <div className="p-2 rounded-3" style={{ backgroundColor: "rgba(37, 211, 102, 0.1)" }}>
                <FaTag style={{ color: "#25d366" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Total Value</div>
                <h3 className="fw-bold mb-0" style={{ color: "#9c27b0" }}>৳{totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="p-2 rounded-3" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)" }}>
                <FaMoneyBillWave style={{ color: "#9c27b0" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Avg. Price</div>
                <h3 className="fw-bold mb-0" style={{ color: "#2196f3" }}>৳{(totalRevenue/services.length).toFixed(0)}</h3>
              </div>
              <div className="p-2 rounded-3" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)" }}>
                <FaMoneyBillWave style={{ color: "#2196f3" }} />
              </div>
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
                  placeholder="Search services..."
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
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{ borderColor: "#ff85a2" }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <button 
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                style={{ 
                  backgroundColor: "rgba(255, 64, 129, 0.1)", 
                  color: "#ff4081",
                  border: "1px solid #ff85a2"
                }}
              >
                {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
                Sort by Price
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr style={{ backgroundColor: "rgba(255, 64, 129, 0.05)" }}>
                  <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>SERVICE</th>
                  <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>CATEGORY</th>
                  <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>PRICE</th>
                  <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>DURATION</th>
                  <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>STATUS</th>
                  <th style={{ color: "#8a5a6d", fontWeight: "600", padding: "1rem" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map(service => (
                  <tr key={service.id} style={{ cursor: "pointer" }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 64, 129, 0.03)"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                    <td style={{ padding: "1rem" }}>
                      <div className="fw-medium" style={{ color: "#495057" }}>{service.name}</div>
                      <small className="text-muted">{service.description}</small>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span className="badge px-3 py-1" style={{ 
                        backgroundColor: "rgba(255, 64, 129, 0.1)", 
                        color: "#ff4081",
                        fontWeight: "500"
                      }}>
                        {service.category}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div className="fw-bold" style={{ color: "#ff4081" }}>৳{service.price.toLocaleString()}</div>
                    </td>
                    <td style={{ padding: "1rem", color: "#6c757d" }}>{service.duration}</td>
                    <td style={{ padding: "1rem" }}>
                      <button 
                        className={`btn btn-sm px-3 ${service.status === "active" ? "btn-success" : "btn-secondary"}`}
                        onClick={() => toggleStatus(service.id)}
                        style={{ fontSize: "0.75rem" }}
                      >
                        {service.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm d-flex align-items-center gap-1"
                          onClick={() => handleEdit(service)}
                          style={{ 
                            backgroundColor: "rgba(33, 150, 243, 0.1)", 
                            color: "#2196f3",
                            border: "none"
                          }}
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button 
                          className="btn btn-sm d-flex align-items-center gap-1"
                          onClick={() => handleDelete(service.id)}
                          style={{ 
                            backgroundColor: "rgba(244, 67, 54, 0.1)", 
                            color: "#f44336",
                            border: "none"
                          }}
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: "#8a5a6d" }}>
                  {editingId ? "Edit Service" : "Add New Service"}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => { setShowModal(false); resetForm(); }}
                  style={{ backgroundColor: "rgba(255, 64, 129, 0.1)" }}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body py-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Service Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          style={{ borderColor: "#ff85a2" }}
                        />
                        <label htmlFor="name" style={{ color: "#d17a94" }}>Service Name *</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          placeholder="Price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          style={{ borderColor: "#ff85a2" }}
                        />
                        <label htmlFor="price" style={{ color: "#d17a94" }}>Price (৳) *</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          style={{ borderColor: "#ff85a2" }}
                        >
                          <option value="">Select Category</option>
                          {categories.filter(c => c !== "all").map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <label htmlFor="category" style={{ color: "#d17a94" }}>Category *</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="duration"
                          name="duration"
                          placeholder="Duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          style={{ borderColor: "#ff85a2" }}
                        />
                        <label htmlFor="duration" style={{ color: "#d17a94" }}>Duration (e.g., 1 hour)</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="3"
                          style={{ borderColor: "#ff85a2", height: "100px" }}
                        ></textarea>
                        <label htmlFor="description" style={{ color: "#d17a94" }}>Description</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button 
                    type="button" 
                    className="btn px-4"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    style={{ 
                      backgroundColor: "rgba(108, 117, 125, 0.1)", 
                      color: "#6c757d",
                      border: "none"
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn px-4"
                    style={{ 
                      background: "linear-gradient(135deg, #ff4081, #ff85a2)",
                      color: "white",
                      border: "none"
                    }}
                  >
                    {editingId ? "Update Service" : "Add Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx="true">{`
        .services-management {
          padding: 0;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #ff85a2 !important;
          box-shadow: 0 0 0 0.25rem rgba(255, 133, 162, 0.25) !important;
        }
        
        .btn-close:focus {
          box-shadow: 0 0 0 0.25rem rgba(255, 133, 162, 0.25) !important;
        }
        
        .modal-content {
          animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .d-flex.justify-content-between.align-items-center.mb-4 {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .modal-dialog {
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
}