import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const contactInfo = {
    phone: "+880 1777 236613",
    phone2: "+880 1605 135004",
    email: "info@mehusmakeover.com",
    address: "House 17/1, Jononi Villa, West Nakhalpara, Bonoful Road, Farmgate, Dhaka",
    hours: "Everyday: 11:00 AM - 11:00 PM"
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
    setSubmitMessage(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitMessage({
        type: "success",
        title: "Message Sent Successfully!",
        text: "Thank you for contacting us. We'll get back to you within 24 hours."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <section className="contact-section py-5 py-lg-7" style={{
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
              <i className="bi bi-chat-dots-fill me-2"></i>
              Get In Touch
            </span>
          </div>
          
          <h1 className="display-4 fw-bold mb-4" style={{
            background: "linear-gradient(90deg, #8a5a6d 0%, #ff4081 50%, #ff85a2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            Contact Us
          </h1>
          
          <p className="lead fs-5" style={{
            color: "#5a4a5a",
            fontWeight: "400",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            Have questions or ready to book? Reach out to us through any of these channels
          </p>
        </div>

        {/* Success Message */}
        {submitMessage && (
          <div className={`alert ${submitMessage.type === 'success' ? 'alert-success' : 'alert-danger'} 
                          alert-dismissible fade show rounded-3 shadow-sm`}
               style={{
                 maxWidth: "800px",
                 margin: "0 auto 2rem auto",
                 border: submitMessage.type === 'success' ? 
                        "1px solid rgba(37, 211, 102, 0.3)" : 
                        "1px solid rgba(255, 107, 107, 0.3)"
               }}>
            <div className="d-flex align-items-center">
              <i className={`bi ${submitMessage.type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} 
                           me-3 fs-4`}></i>
              <div>
                <strong className="d-block">{submitMessage.title}</strong>
                {submitMessage.text}
              </div>
            </div>
            <button type="button" className="btn-close" onClick={() => setSubmitMessage(null)}></button>
          </div>
        )}

        <div className="row g-5">
          {/* Left Column - Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-4 p-lg-5">
                <h3 className="fw-bold mb-4" style={{ color: "#8a5a6d" }}>
                  <i className="bi bi-envelope-paper me-2"></i>
                  Send Us a Message
                </h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control rounded-3"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          style={{
                            borderColor: "#ff85a2",
                            backgroundColor: "#fff9fb"
                          }}
                        />
                        <label htmlFor="name" style={{ color: "#d17a94" }}>
                          <i className="bi bi-person me-1"></i> Your Name
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control rounded-3"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            borderColor: "#ff85a2",
                            backgroundColor: "#fff9fb"
                          }}
                        />
                        <label htmlFor="email" style={{ color: "#d17a94" }}>
                          <i className="bi bi-envelope me-1"></i> Email Address
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

                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          className="form-select rounded-3"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          style={{
                            borderColor: "#ff85a2",
                            backgroundColor: "#fff9fb"
                          }}
                        >
                          <option value="">Select Subject</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="service">Service Information</option>
                          <option value="pricing">Pricing Question</option>
                          <option value="feedback">Feedback & Review</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                        <label htmlFor="subject" style={{ color: "#d17a94" }}>
                          <i className="bi bi-chat-left-text me-1"></i> Subject
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control rounded-3"
                          id="message"
                          name="message"
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5"
                          required
                          style={{
                            borderColor: "#ff85a2",
                            backgroundColor: "#fff9fb",
                            height: "150px"
                          }}
                        ></textarea>
                        <label htmlFor="message" style={{ color: "#d17a94" }}>
                          <i className="bi bi-chat-left-dots me-1"></i> Your Message
                        </label>
                      </div>
                    </div>

                    <div className="col-12 mt-3">
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
                            e.target.style.boxShadow = "none";
                          }
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send-check me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info & Map */}
          <div className="col-lg-5">
            {/* Contact Info Cards */}
            <div className="mb-4">
              <h3 className="fw-bold mb-4" style={{ color: "#8a5a6d" }}>
                <i className="bi bi-info-circle me-2"></i>
                Contact Information
              </h3>
              
              <div className="row g-3">
                {/* Phone */}
                <div className="col-12">
                  <div className="d-flex align-items-start p-3 rounded-3 shadow-sm"
                       style={{
                         backgroundColor: "rgba(255, 255, 255, 0.9)",
                         border: "1px solid rgba(255, 182, 193, 0.3)",
                         transition: "all 0.3s ease",
                         cursor: "pointer"
                       }}
                       onMouseOver={(e) => {
                         e.currentTarget.style.transform = "translateY(-3px)";
                         e.currentTarget.style.boxShadow = "0 8px 20px rgba(138, 90, 109, 0.15)";
                       }}
                       onMouseOut={(e) => {
                         e.currentTarget.style.transform = "translateY(0)";
                         e.currentTarget.style.boxShadow = "0 4px 12px rgba(138, 90, 109, 0.1)";
                       }}
                       onClick={() => window.location.href = `tel:${contactInfo.phone}`}>
                    <div className="rounded-circle p-2 me-3 flex-shrink-0" 
                         style={{ backgroundColor: "rgba(255, 64, 129, 0.1)" }}>
                      <FaPhone className="fs-4" style={{ color: "#ff4081" }} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>Call Us</h6>
                      <p className="mb-1" style={{ color: "#d17a94" }}>{contactInfo.phone}</p>
                      <p className="mb-0 small" style={{ color: "#d17a94" }}>{contactInfo.phone2}</p>
                      <small className="text-muted">Click to call directly</small>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="d-flex align-items-start p-3 rounded-3 shadow-sm"
                       style={{
                         backgroundColor: "rgba(255, 255, 255, 0.9)",
                         border: "1px solid rgba(255, 182, 193, 0.3)",
                         transition: "all 0.3s ease",
                         cursor: "pointer"
                       }}
                       onMouseOver={(e) => {
                         e.currentTarget.style.transform = "translateY(-3px)";
                         e.currentTarget.style.boxShadow = "0 8px 20px rgba(138, 90, 109, 0.15)";
                       }}
                       onMouseOut={(e) => {
                         e.currentTarget.style.transform = "translateY(0)";
                         e.currentTarget.style.boxShadow = "0 4px 12px rgba(138, 90, 109, 0.1)";
                       }}
                       onClick={() => window.location.href = `mailto:${contactInfo.email}`}>
                    <div className="rounded-circle p-2 me-3 flex-shrink-0" 
                         style={{ backgroundColor: "rgba(255, 133, 162, 0.1)" }}>
                      <FaEnvelope className="fs-4" style={{ color: "#ff85a2" }} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>Email Us</h6>
                      <p className="mb-0" style={{ color: "#d17a94" }}>{contactInfo.email}</p>
                      <small className="text-muted">Click to send email</small>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="col-12">
                  <div className="d-flex align-items-start p-3 rounded-3 shadow-sm"
                       style={{
                         backgroundColor: "rgba(255, 255, 255, 0.9)",
                         border: "1px solid rgba(255, 182, 193, 0.3)"
                       }}>
                    <div className="rounded-circle p-2 me-3 flex-shrink-0" 
                         style={{ backgroundColor: "rgba(156, 39, 176, 0.1)" }}>
                      <FaMapMarkerAlt className="fs-4" style={{ color: "#9c27b0" }} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>Visit Us</h6>
                      <p className="mb-0" style={{ color: "#d17a94" }}>{contactInfo.address}</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="col-12">
                  <div className="d-flex align-items-start p-3 rounded-3 shadow-sm"
                       style={{
                         backgroundColor: "rgba(255, 255, 255, 0.9)",
                         border: "1px solid rgba(255, 182, 193, 0.3)"
                       }}>
                    <div className="rounded-circle p-2 me-3 flex-shrink-0" 
                         style={{ backgroundColor: "rgba(33, 150, 243, 0.1)" }}>
                      <FaClock className="fs-4" style={{ color: "#2196f3" }} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>Opening Hours</h6>
                      <p className="mb-0" style={{ color: "#d17a94" }}>{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-4">
              <h5 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>Follow Us</h5>
              <div className="d-flex gap-3">
                <a 
                  href="https://facebook.com/people/Mehus-Makeover-salon/61579639642397/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "white",
                    color: "#1877F2",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    border: "2px solid #1877F2",
                    boxShadow: "0 4px 8px rgba(24, 119, 242, 0.2)"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#1877F2";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 6px 12px rgba(24, 119, 242, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#1877F2";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 8px rgba(24, 119, 242, 0.2)";
                  }}
                >
                  <FaFacebook />
                </a>
                
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "white",
                    color: "#E4405F",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    border: "2px solid #E4405F",
                    boxShadow: "0 4px 8px rgba(228, 64, 95, 0.2)"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#E4405F";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 6px 12px rgba(228, 64, 95, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#E4405F";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 8px rgba(228, 64, 95, 0.2)";
                  }}
                >
                  <FaInstagram />
                </a>
                
                <a 
                  href="https://wa.me/8801777236613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "white",
                    color: "#25D366",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    border: "2px solid #25D366",
                    boxShadow: "0 4px 8px rgba(37, 211, 102, 0.2)"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#25D366";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 6px 12px rgba(37, 211, 102, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#25D366";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 8px rgba(37, 211, 102, 0.2)";
                  }}
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    title="Salon Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.837240932881!2d90.40625977597225!3d23.794556778639182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0x97856381e88e311!2sFarmgate%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-3 text-center" style={{ backgroundColor: "rgba(255, 245, 249, 0.8)" }}>
                  <small className="text-muted">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    Click for directions
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact CTA */}
        <div className="text-center mt-6 pt-5">
          <div className="p-4 rounded-4 shadow-sm d-inline-block" style={{
            background: "linear-gradient(135deg, rgba(255, 64, 129, 0.1), rgba(255, 133, 162, 0.05))",
            border: "1px solid rgba(255, 182, 193, 0.3)"
          }}>
            <h5 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>Need Immediate Assistance?</h5>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a href="tel:+8801648322690" className="btn btn-success rounded-pill px-4">
                <i className="bi bi-telephone me-2"></i>
                Call Now
              </a>
              <a href="https://wa.me/8801648322690" target="_blank" rel="noopener noreferrer" 
                 className="btn rounded-pill px-4" style={{ backgroundColor: "#25D366", color: "white" }}>
                <i className="bi bi-whatsapp me-2"></i>
                WhatsApp
              </a>
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
        
        .card {
          transition: transform 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
        }
        
        @media (max-width: 991.98px) {
          .col-lg-7, .col-lg-5 {
            margin-bottom: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          
          .d-flex.flex-wrap.justify-content-center.gap-3 {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
    </section>
  );
}