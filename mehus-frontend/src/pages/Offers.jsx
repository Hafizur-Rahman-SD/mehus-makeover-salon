import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
axios.get(`${API_URL}/api/offers`)
      .then(res => {
        setOffers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching offers:", err);
        setLoading(false);
      });
  }, []);

  // Sample offers if API fails (for UI demonstration)
  const sampleOffers = [
    {
      id: 1,
      title: "Bridal Makeover Package",
      description: "Complete bridal makeup, hairstyling, and mehndi design for your special day",
      price: "12,500",
      originalPrice: "18,000",
      discount: "30% OFF",
      start_date: "2024-03-01",
      end_date: "2024-06-30",
      image: "https://images.unsplash.com/photo-1519415711931-702deacf5be8?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Weekend Spa Special",
      description: "Full body massage, facial, and manicure-pedicure combo",
      price: "4,999",
      originalPrice: "7,500",
      discount: "35% OFF",
      start_date: "2024-03-01",
      end_date: "2024-05-31",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Hair Care Package",
      description: "Haircut, coloring, and treatment for shiny, healthy hair",
      price: "3,500",
      originalPrice: "5,200",
      discount: "25% OFF",
      start_date: "2024-03-01",
      end_date: "2024-04-30",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop"
    },
  ];

  const displayOffers = offers.length > 0 ? offers : sampleOffers;

  return (
    <section className="py-5 py-lg-7" style={{
      background: "linear-gradient(135deg, #fff9fb 0%, #fff5f9 50%, #ffeef6 100%)",
      minHeight: "100vh"
    }}>
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="mb-3">
            <span className="badge rounded-pill px-4 py-2 mb-2" style={{
              backgroundColor: "rgba(255, 133, 162, 0.15)",
              color: "#ff4081",
              fontSize: "1rem",
              fontWeight: "600"
            }}>
              <i className="bi bi-gift-fill me-2"></i>
              Limited Time Offers
            </span>
          </div>
          
          <h1 className="display-4 fw-bold mb-4" style={{
            background: "linear-gradient(90deg, #8a5a6d 0%, #ff4081 50%, #ff85a2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            Exclusive Beauty Offers
          </h1>
          
          <p className="lead fs-5" style={{
            color: "#5a4a5a",
            fontWeight: "400",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            Treat yourself with our premium salon services at special discounted prices. 
            Limited period offers for our valued customers.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-pink" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: "#8a5a6d" }}>Loading offers...</p>
          </div>
        )}

        {/* Offers Grid */}
        {!loading && (
          <div className="row g-4">
            {displayOffers.map(offer => (
              <div className="col-lg-4 col-md-6" key={offer.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative"
                     style={{
                       transition: "all 0.3s ease",
                       backgroundColor: "rgba(255, 255, 255, 0.9)",
                       border: "1px solid rgba(255, 182, 193, 0.2)"
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.transform = "translateY(-10px)";
                       e.currentTarget.style.boxShadow = "0 20px 40px rgba(138, 90, 109, 0.2)";
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.transform = "translateY(0)";
                       e.currentTarget.style.boxShadow = "0 8px 25px rgba(138, 90, 109, 0.1)";
                     }}>
                  
                  {/* Discount Badge */}
                  <div className="position-absolute top-0 end-0 m-3 z-2">
                    <span className="badge rounded-pill px-3 py-2 fw-bold shadow"
                          style={{
                            backgroundColor: "#ff4081",
                            color: "white",
                            fontSize: "0.9rem"
                          }}>
                      <i className="bi bi-lightning-fill me-1"></i>
                      {offer.discount || "SPECIAL OFFER"}
                    </span>
                  </div>
                  
                  {/* Image Section */}
                  <div className="position-relative overflow-hidden" style={{ height: "250px" }}>
                    <img
                      src={offer.image || `http://localhost:5000${offer.image}`}
                      alt={offer.title}
                      className="img-fluid w-100 h-100"
                      style={{ 
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3"
                         style={{
                           background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
                         }}>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="card-body p-4">
                    {/* Title */}
                    <h5 className="fw-bold mb-3" style={{ 
                      color: "#8a5a6d",
                      fontSize: "1.3rem",
                      minHeight: "3rem"
                    }}>
                      {offer.title}
                    </h5>
                    
                    {/* Description */}
                    <p className="mb-4" style={{ 
                      color: "#d17a94",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      minHeight: "4.5rem"
                    }}>
                      {offer.description}
                    </p>
                    
                    {/* Price Section */}
                    <div className="mb-4">
                      <div className="d-flex align-items-end">
                        <div className="me-3">
                          <div className="text-muted small" style={{ color: "#ff85a2" }}>
                            Special Price
                          </div>
                          <div className="fw-bold" style={{ 
                            color: "#ff4081",
                            fontSize: "1.8rem",
                            lineHeight: "1"
                          }}>
                            ৳{offer.price}
                          </div>
                        </div>
                        
                        {offer.originalPrice && (
                          <div>
                            <div className="text-muted small text-decoration-line-through" style={{ color: "#d17a94" }}>
                              ৳{offer.originalPrice}
                            </div>
                            <div className="small text-success fw-bold">
                              Save ৳{(parseInt(offer.originalPrice.replace(/,/g, '')) - parseInt(offer.price.replace(/,/g, ''))).toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Validity Period */}
                    <div className="mb-4 p-3 rounded-3" style={{
                      backgroundColor: "rgba(255, 133, 162, 0.1)",
                      border: "1px solid rgba(255, 133, 162, 0.2)"
                    }}>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-calendar2-week me-3" style={{ color: "#ff4081" }}></i>
                        <div>
                          <div className="small fw-bold" style={{ color: "#8a5a6d" }}>
                            Valid Until
                          </div>
                          <div className="small" style={{ color: "#d17a94" }}>
                            {offer.end_date || "Limited Period"}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <Link 
                        to={`/booking?offerId=${offer.id}`}
                        className="btn flex-grow-1 rounded-pill py-2 fw-bold text-decoration-none"
                        style={{
                          background: "linear-gradient(135deg, #ff4081, #ff85a2)",
                          color: "white",
                          border: "none",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 6px 20px rgba(255, 64, 129, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <i className="bi bi-cart-check me-2"></i>
                        Book This Offer
                      </Link>
                      
                      <button className="btn rounded-circle"
                              style={{
                                width: "45px",
                                height: "45px",
                                backgroundColor: "rgba(255, 133, 162, 0.1)",
                                color: "#ff4081",
                                border: "1px solid rgba(255, 133, 162, 0.3)"
                              }}
                              onClick={() => alert(`Share offer: ${offer.title}`)}>
                        <i className="bi bi-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Offers Message */}
        {!loading && displayOffers.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-emoji-frown fs-1" style={{ color: "#ff85a2" }}></i>
            </div>
            <h4 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>
              No Active Offers Available
            </h4>
            <p className="mb-4" style={{ color: "#d17a94", maxWidth: "500px", margin: "0 auto" }}>
              We're currently preparing some amazing offers for you. 
              Please check back soon or subscribe to get notified about new offers.
            </p>
            <Link 
              to="/services"
              className="btn rounded-pill px-4 py-2 fw-bold"
              style={{
                backgroundColor: "rgba(255, 133, 162, 0.1)",
                color: "#ff4081",
                border: "1px solid rgba(255, 133, 162, 0.3)"
              }}
            >
              <i className="bi bi-scissors me-2"></i>
              Browse All Services
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-6 pt-5">
          <div className="p-5 rounded-4 shadow-sm" style={{
            background: "linear-gradient(135deg, rgba(255, 64, 129, 0.1), rgba(255, 133, 162, 0.05))",
            border: "1px solid rgba(255, 182, 193, 0.3)"
          }}>
            <h3 className="fw-bold mb-3" style={{ color: "#8a5a6d" }}>
              Want Customized Offers?
            </h3>
            <p className="lead mb-4" style={{ color: "#5a4a5a", maxWidth: "600px", margin: "0 auto" }}>
              Contact us for personalized beauty packages tailored to your needs
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link 
                to="/contact"
                className="btn btn-lg rounded-pill px-5 py-3 fw-bold shadow text-decoration-none"
                style={{
                  background: "linear-gradient(135deg, #ff4081, #ff85a2)",
                  color: "white",
                  border: "none"
                }}
              >
                <i className="bi bi-telephone me-2"></i>
                Contact Us
              </Link>
              <a 
                href="https://wa.me/8801648322690"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  border: "none"
                }}
              >
                <i className="bi bi-whatsapp me-2"></i>
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx="true">{`
        .text-pink {
          color: #ff4081 !important;
        }
        
        .card:hover img {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          
          .lead.fs-5 {
            font-size: 1rem !important;
          }
          
          .btn-lg {
            padding: 0.75rem 1.5rem !important;
            font-size: 1rem !important;
          }
          
          .card-body {
            padding: 1.5rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .d-flex.justify-content-center.gap-3 {
            flex-direction: column;
            gap: 1rem !important;
          }
          
          .btn-lg {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}