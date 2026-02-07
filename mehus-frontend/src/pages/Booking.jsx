import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialService = queryParams.get('serviceId') || queryParams.get('offerId') || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: initialService,
    date: "",
    time: "",
    note: "",
    guests: 1
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableServices] = useState([
    { id: "hair", name: "Haircut & Styling", price: "800" },
    { id: "makeup", name: "Bridal Makeup", price: "12,500" },
    { id: "facial", name: "Premium Facial", price: "1,500" },
    { id: "spa", name: "Full Body Spa", price: "3,500" },
    { id: "manicure", name: "Manicure & Pedicure", price: "1,200" },
    { id: "threading", name: "Threading & Waxing", price: "500" },
    { id: "hair-color", name: "Hair Coloring", price: "2,500" },
    { id: "skin-care", name: "Skin Care Treatment", price: "2,000" }
  ]);

  const [availableTimes] = useState([
    "10:00 AM", "11:00 AM", "12:00 PM", 
    "02:00 PM", "03:00 PM", "04:00 PM", 
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ]);

  // Get tomorrow's date as minimum date
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get max date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        ...formData,
        price: 0,
      });

      if (res.data.success) {
        setMessage({ 
          type: "success", 
          text: "🎉 Your booking has been confirmed! We'll contact you shortly." 
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          date: "",
          time: "",
          note: "",
          guests: 1
        });
      }
    } catch (err) {
      setMessage({ 
        type: "danger", 
        text: "❌ Unable to process booking. Please try again or call us." 
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedService = availableServices.find(s => s.id === formData.service);

  return (
    <section className="booking-section py-5 py-lg-7" style={{
      background: "linear-gradient(135deg, #fff9fb 0%, #fff5f9 50%, #ffeef6 100%)",
      minHeight: "100vh"
    }}>
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="mb-3">
            <span className="badge rounded-pill px-4 py-2" style={{
              backgroundColor: "rgba(255, 133, 162, 0.15)",
              color: "#ff4081",
              fontSize: "1rem",
              fontWeight: "600"
            }}>
              <i className="bi bi-calendar-check me-2"></i>
              Book Your Appointment
            </span>
          </div>
          
          <h1 className="display-4 fw-bold mb-4" style={{
            background: "linear-gradient(90deg, #8a5a6d 0%, #ff4081 50%, #ff85a2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            Schedule Your Beauty Session
          </h1>
          
          <p className="lead fs-5" style={{
            color: "#5a4a5a",
            fontWeight: "400",
            maxWidth: "700px",
            margin: "0 auto 2rem auto"
          }}>
            Fill out the form below to book your appointment. Our team will confirm within 24 hours.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} 
                          alert-dismissible fade show rounded-3 shadow-sm`}
               style={{
                 maxWidth: "800px",
                 margin: "0 auto 2rem auto",
                 border: message.type === 'success' ? 
                        "1px solid rgba(37, 211, 102, 0.3)" : 
                        "1px solid rgba(255, 107, 107, 0.3)"
               }}>
            <div className="d-flex align-items-center">
              <i className={`bi ${message.type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} 
                           me-3 fs-4`}></i>
              <div>
                <strong className="d-block">{message.type === 'success' ? 'Booking Confirmed!' : 'Booking Failed'}</strong>
                {message.text}
              </div>
            </div>
            <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
          </div>
        )}

        {/* Booking Form */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Left Side - Form */}
                <div className="col-lg-7 p-4 p-lg-5">
                  <form onSubmit={handleSubmit} className="booking-form">
                    <div className="row g-3">
                      {/* Personal Info Section */}
                      <div className="col-12">
                        <h5 className="fw-bold mb-3" style={{ color: "#8a5a6d", borderBottom: "2px solid #ffeef6", paddingBottom: "0.5rem" }}>
                          <i className="bi bi-person-circle me-2"></i>
                          Personal Information
                        </h5>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control rounded-3"
                            id="name"
                            name="name"
                            placeholder="Your Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb"
                            }}
                          />
                          <label htmlFor="name" style={{ color: "#d17a94" }}>
                            <i className="bi bi-person me-1"></i> Full Name
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="tel"
                            className="form-control rounded-3"
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb"
                            }}
                          />
                          <label htmlFor="phone" style={{ color: "#d17a94" }}>
                            <i className="bi bi-phone me-1"></i> Phone Number
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control rounded-3"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb"
                            }}
                          />
                          <label htmlFor="email" style={{ color: "#d17a94" }}>
                            <i className="bi bi-envelope me-1"></i> Email Address (Optional)
                          </label>
                        </div>
                      </div>

                      {/* Booking Details Section */}
                      <div className="col-12 mt-4">
                        <h5 className="fw-bold mb-3" style={{ color: "#8a5a6d", borderBottom: "2px solid #ffeef6", paddingBottom: "0.5rem" }}>
                          <i className="bi bi-calendar3 me-2"></i>
                          Booking Details
                        </h5>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating">
                          <select
                            className="form-select rounded-3"
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb"
                            }}
                          >
                            <option value="">Select a Service</option>
                            {availableServices.map(service => (
                              <option key={service.id} value={service.id}>
                                {service.name} - ৳{service.price}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="service" style={{ color: "#d17a94" }}>
                            <i className="bi bi-scissors me-1"></i> Select Service
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control rounded-3"
                            id="guests"
                            name="guests"
                            placeholder="Number of Guests"
                            min="1"
                            max="5"
                            value={formData.guests}
                            onChange={handleChange}
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb"
                            }}
                          />
                          <label htmlFor="guests" style={{ color: "#d17a94" }}>
                            <i className="bi bi-people me-1"></i> Number of Guests
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="date"
                            className="form-control rounded-3"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={getMinDate()}
                            max={getMaxDate()}
                            required
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb"
                            }}
                          />
                          <label htmlFor="date" style={{ color: "#d17a94" }}>
                            <i className="bi bi-calendar-date me-1"></i> Preferred Date
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating">
                          <select
                            className="form-select rounded-3"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb"
                            }}
                          >
                            <option value="">Select Time Slot</option>
                            {availableTimes.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                          <label htmlFor="time" style={{ color: "#d17a94" }}>
                            <i className="bi bi-clock me-1"></i> Preferred Time
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control rounded-3"
                            id="note"
                            name="note"
                            placeholder="Special Requests or Notes"
                            value={formData.note}
                            onChange={handleChange}
                            rows="3"
                            style={{
                              borderColor: "#ff85a2",
                              backgroundColor: "#fff9fb",
                              height: "100px"
                            }}
                          ></textarea>
                          <label htmlFor="note" style={{ color: "#d17a94" }}>
                            <i className="bi bi-chat-left-text me-1"></i> Special Requests (Optional)
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="col-12 mt-4">
                        <button 
                          type="submit" 
                          className="btn w-100 py-3 fw-bold rounded-3 shadow-sm"
                          disabled={loading}
                          style={{
                            background: loading ? 
                              "linear-gradient(135deg, #ff85a2, #ffb6c1)" : 
                              "linear-gradient(135deg, #ff4081, #ff85a2)",
                            color: "white",
                            border: "none",
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease"
                          }}
                          onMouseOver={(e) => {
                            if (!loading) {
                              e.target.style.transform = "translateY(-2px)";
                              e.target.style.boxShadow = "0 8px 25px rgba(255, 64, 129, 0.3)";
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!loading) {
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow = "0 4px 15px rgba(255, 64, 129, 0.2)";
                            }
                          }}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Processing Booking...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Confirm Booking
                            </>
                          )}
                        </button>
                      </div>

                      {/* Terms Note */}
                      <div className="col-12 mt-3">
                        <p className="text-center small" style={{ color: "#d17a94" }}>
                          <i className="bi bi-info-circle me-1"></i>
                          By booking, you agree to our terms. A confirmation call will be made within 24 hours.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Right Side - Info Panel */}
                <div className="col-lg-5 p-4 p-lg-5" style={{
                  background: "linear-gradient(135deg, rgba(255, 64, 129, 0.1), rgba(255, 133, 162, 0.05))",
                  borderLeft: "1px solid rgba(255, 182, 193, 0.3)"
                }}>
                  <div className="sticky-top" style={{ top: "2rem" }}>
                    <h4 className="fw-bold mb-4" style={{ color: "#8a5a6d" }}>
                      <i className="bi bi-info-circle me-2"></i>
                      Booking Information
                    </h4>

                    {/* Selected Service Preview */}
                    {selectedService && (
                      <div className="mb-4 p-3 rounded-3" style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        border: "1px solid rgba(255, 182, 193, 0.3)"
                      }}>
                        <h6 className="fw-bold mb-2" style={{ color: "#ff4081" }}>
                          Selected Service
                        </h6>
                        <p className="mb-1 fw-bold" style={{ color: "#8a5a6d" }}>
                          {selectedService.name}
                        </p>
                        <p className="mb-0" style={{ color: "#d17a94" }}>
                          Price: <span className="fw-bold">৳{selectedService.price}</span>
                        </p>
                      </div>
                    )}

                    {/* Booking Summary */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>
                        <i className="bi bi-list-check me-2"></i>
                        What's Included
                      </h6>
                      <ul className="list-unstyled" style={{ color: "#5a4a5a" }}>
                        <li className="mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          Professional Service by Experts
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          Premium Quality Products
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          Sanitized & Hygienic Environment
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          Free Consultation
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          24/7 Customer Support
                        </li>
                      </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="p-3 rounded-3" style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      border: "1px solid rgba(255, 182, 193, 0.3)"
                    }}>
                      <h6 className="fw-bold mb-3" style={{ color: "#ff4081" }}>
                        <i className="bi bi-headset me-2"></i>
                        Need Help?
                      </h6>
                      <div className="mb-2">
                        <i className="bi bi-telephone text-pink me-2"></i>
                        <span style={{ color: "#8a5a6d" }}>+880 1648322690</span>
                      </div>
                      <div className="mb-2">
                        <i className="bi bi-clock text-pink me-2"></i>
                        <span style={{ color: "#8a5a6d" }}>Open: 11:00 AM - 11:00 PM</span>
                      </div>
                      <div>
                        <i className="bi bi-geo-alt text-pink me-2"></i>
                        <span style={{ color: "#8a5a6d" }}> Road No-05,Nikunja-02,Khilkhet, Dhaka</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="row mt-5">
          <div className="col-md-4 mb-3">
            <div className="text-center p-3 rounded-3" style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 182, 193, 0.3)"
            }}>
              <i className="bi bi-shield-check fs-1 mb-3" style={{ color: "#ff4081" }}></i>
              <h6 className="fw-bold" style={{ color: "#8a5a6d" }}>Safe & Hygienic</h6>
              <p className="small mb-0" style={{ color: "#d17a94" }}>Sterilized equipment & sanitized spaces</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-center p-3 rounded-3" style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 182, 193, 0.3)"
            }}>
              <i className="bi bi-arrow-clockwise fs-1 mb-3" style={{ color: "#ff4081" }}></i>
              <h6 className="fw-bold" style={{ color: "#8a5a6d" }}>Easy Reschedule</h6>
              <p className="small mb-0" style={{ color: "#d17a94" }}>Change your booking 24 hours before</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-center p-3 rounded-3" style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 182, 193, 0.3)"
            }}>
              <i className="bi bi-credit-card fs-1 mb-3" style={{ color: "#ff4081" }}></i>
              <h6 className="fw-bold" style={{ color: "#8a5a6d" }}>Flexible Payment</h6>
              <p className="small mb-0" style={{ color: "#d17a94" }}>Pay at salon or online booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx="true">{`
        .form-control:focus, .form-select:focus {
          border-color: #ff85a2 !important;
          box-shadow: 0 0 0 0.25rem rgba(255, 133, 162, 0.25) !important;
        }
        
        .text-pink {
          color: #ff4081 !important;
        }
        
        @media (max-width: 991.98px) {
          .col-lg-5 {
            border-left: none !important;
            border-top: 1px solid rgba(255, 182, 193, 0.3) !important;
          }
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          
          .lead.fs-5 {
            font-size: 1rem !important;
          }
          
          .card {
            margin: 0 -1rem;
          }
        }
        
        /* Floating label focus state */
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: #ff4081;
        }
      `}</style>
    </section>
  );
}