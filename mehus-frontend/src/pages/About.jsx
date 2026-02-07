import { Link } from "react-router-dom";

export default function About() {
  return (
    <section
      className="py-5 py-lg-7"
      style={{
        background: "linear-gradient(135deg, #fff9fb 0%, #fff5f9 50%, #ffeef6 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: 1}}>
        <div style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 133, 162, 0.1) 0%, transparent 70%)",
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "3%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 64, 129, 0.08) 0%, transparent 70%)",
        }}></div>
      </div>

      <div className="container position-relative" style={{zIndex: 2}}>
        {/* Main Heading */}
        <div className="text-center mb-6">
          <div className="mb-3">
            <span className="badge rounded-pill px-4 py-2 mb-2" style={{
              backgroundColor: "rgba(255, 133, 162, 0.15)",
              color: "#ff4081",
              fontSize: "1rem",
              fontWeight: "600"
            }}>
              <i className="bi bi-star-fill me-2"></i>
              Our Story
            </span>
          </div>
          
          <h1 className="display-4 fw-bold mb-4" style={{
            background: "linear-gradient(90deg, #8a5a6d 0%, #ff4081 50%, #ff85a2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            About Mehu's Makeovers
          </h1>
          
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <p className="lead fs-5 mb-4" style={{
              color: "#5a4a5a",
              fontWeight: "400",
              lineHeight: "1.8"
            }}>
              At <strong className="text-pink" style={{color: "#ff4081"}}>Mehu's Makeovers</strong>, 
              we believe every woman deserves to feel beautiful, confident, and empowered. 
              Our journey began with a simple vision: to create a sanctuary where beauty meets elegance.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="row g-4 mb-6">
          <div className="col-lg-6">
            <div className="h-100 p-5 rounded-4 shadow-sm" style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 245, 249, 0.9))",
              border: "1px solid rgba(255, 182, 193, 0.3)",
              backdropFilter: "blur(10px)"
            }}>
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle p-3 me-3" style={{
                  backgroundColor: "rgba(255, 133, 162, 0.15)"
                }}>
                  <i className="bi bi-bullseye fs-2" style={{color: "#ff4081"}}></i>
                </div>
                <h3 className="fw-bold mb-0" style={{color: "#8a5a6d"}}>Our Mission</h3>
              </div>
              <p className="fs-5" style={{color: "#5a4a5a", lineHeight: "1.8"}}>
                To provide exceptional beauty services using premium products, 
                delivered by trained professionals in a hygienic and welcoming environment.
              </p>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="h-100 p-5 rounded-4 shadow-sm" style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 245, 249, 0.9))",
              border: "1px solid rgba(255, 182, 193, 0.3)",
              backdropFilter: "blur(10px)"
            }}>
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle p-3 me-3" style={{
                  backgroundColor: "rgba(255, 133, 162, 0.15)"
                }}>
                  <i className="bi bi-eye fs-2" style={{color: "#ff4081"}}></i>
                </div>
                <h3 className="fw-bold mb-0" style={{color: "#8a5a6d"}}>Our Vision</h3>
              </div>
              <p className="fs-5" style={{color: "#5a4a5a", lineHeight: "1.8"}}>
                To become Dhaka's most trusted beauty destination, 
                setting new standards in salon services and customer experience.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-7">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{
              background: "linear-gradient(90deg, #8a5a6d, #ff4081)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Why Choose Us?
            </h2>
            <p className="lead" style={{color: "#5a4a5a", maxWidth: "600px", margin: "0 auto"}}>
              Experience the difference with our premium services
            </p>
          </div>

          <div className="row g-4">
            {[
              { 
                title: "Expert Professionals", 
                description: "Certified stylists with 5+ years experience",
                icon: "bi-person-check",
                color: "#ff4081"
              },
              { 
                title: "Premium Products", 
                description: "Top international brands for best results",
                icon: "bi-gem",
                color: "#ff85a2"
              },
              { 
                title: "Hygienic Environment", 
                description: "Sterilized tools & sanitized spaces",
                icon: "bi-shield-check",
                color: "#25d366"
              },
              { 
                title: "Customized Services", 
                description: "Personalized beauty solutions for you",
                icon: "bi-heart",
                color: "#e91e63"
              },
              { 
                title: "Modern Equipment", 
                description: "Latest technology for perfect results",
                icon: "bi-tools",
                color: "#9c27b0"
              },
              { 
                title: "Affordable Pricing", 
                description: "Quality services at reasonable rates",
                icon: "bi-tag",
                color: "#ff9800"
              },
            ].map((item, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="h-100 p-4 rounded-4 border-0 shadow-sm position-relative"
                     style={{
                       backgroundColor: "rgba(255, 255, 255, 0.7)",
                       border: "1px solid rgba(255, 182, 193, 0.2)",
                       transition: "all 0.3s ease",
                       cursor: "pointer"
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.transform = "translateY(-5px)";
                       e.currentTarget.style.boxShadow = "0 10px 25px rgba(138, 90, 109, 0.15)";
                       e.currentTarget.style.backgroundColor = "white";
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.transform = "translateY(0)";
                       e.currentTarget.style.boxShadow = "0 4px 12px rgba(138, 90, 109, 0.1)";
                       e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                     }}>
                  <div className="d-flex align-items-start">
                    <div className="rounded-circle p-3 me-3 flex-shrink-0" 
                         style={{
                           backgroundColor: `${item.color}15`,
                           width: "60px",
                           height: "60px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center"
                         }}>
                      <i className={`bi ${item.icon} fs-3`} style={{color: item.color}}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2" style={{color: "#8a5a6d"}}>
                        {item.title}
                      </h5>
                      <p className="mb-0" style={{color: "#d17a94", fontSize: "0.95rem"}}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-6">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{
              background: "linear-gradient(90deg, #8a5a6d, #ff4081)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Meet Our Experts
            </h2>
            <p className="lead" style={{color: "#5a4a5a", maxWidth: "600px", margin: "0 auto"}}>
              Our certified professionals dedicated to your beauty
            </p>
          </div>

          <div className="row g-4">
            {[
              { 
                name: "Asma Hossain", 
                role: "Founder & Lead Stylist",
                experience: "10+ Years",
                specialty: "Bridal Makeup, Hair Styling",
                image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=400&h=400&fit=crop"
              },
              { 
                name: "Moon", 
                role: "Senior Makeup Artist",
                experience: "8+ Years", 
                specialty: "Glam Makeup, Skincare",
                image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&h=400&fit=crop"
              },
              { 
                name: "Meghla Ahmed", 
                role: "Hair Specialist",
                experience: "6+ Years",
                specialty: "Hair Coloring, Treatment",
                image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&h=400&fit=crop"
              },
            ].map((member, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                     style={{
                       transition: "all 0.3s ease",
                       backgroundColor: "rgba(255, 255, 255, 0.9)"
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.transform = "translateY(-8px)";
                       e.currentTarget.style.boxShadow = "0 15px 35px rgba(138, 90, 109, 0.2)";
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.transform = "translateY(0)";
                       e.currentTarget.style.boxShadow = "0 4px 12px rgba(138, 90, 109, 0.1)";
                     }}>
                  <div className="position-relative overflow-hidden" style={{height: "280px"}}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="img-fluid w-100 h-100"
                      style={{objectFit: "cover"}}
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3"
                         style={{
                           background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                           color: "white"
                         }}>
                      <div className="d-flex justify-content-between align-items-end">
                        <div>
                          <h5 className="fw-bold mb-0">{member.name}</h5>
                          <small>{member.role}</small>
                        </div>
                        <span className="badge bg-light text-dark">
                          {member.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <h6 className="fw-bold mb-2" style={{color: "#8a5a6d"}}>Specializes In:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {member.specialty.split(", ").map((skill, i) => (
                          <span key={i} className="badge rounded-pill px-3 py-1"
                                style={{
                                  backgroundColor: "rgba(255, 133, 162, 0.15)",
                                  color: "#ff4081",
                                  fontSize: "0.85rem"
                                }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-center pt-3">
                      <Link 
                        to="/booking" 
                        className="btn btn-sm rounded-pill px-4 text-decoration-none"
                        style={{
                          backgroundColor: "rgba(255, 133, 162, 0.1)",
                          color: "#ff4081",
                          border: "1px solid rgba(255, 133, 162, 0.3)",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "rgba(255, 133, 162, 0.2)";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "rgba(255, 133, 162, 0.1)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <i className="bi bi-calendar me-2"></i>
                        Book Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-6 px-4 rounded-4 shadow-sm"
             style={{
               background: "linear-gradient(135deg, rgba(255, 64, 129, 0.1), rgba(255, 133, 162, 0.05))",
               border: "1px solid rgba(255, 182, 193, 0.3)"
             }}>
          <h3 className="fw-bold mb-3" style={{color: "#8a5a6d"}}>
            Ready for Your Transformation?
          </h3>
          <p className="lead mb-4" style={{color: "#5a4a5a", maxWidth: "600px", margin: "0 auto"}}>
            Book your appointment today and experience premium beauty services
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link 
              to="/booking" 
              className="btn btn-lg rounded-pill px-5 py-3 fw-bold shadow text-decoration-none"
              style={{
                background: "linear-gradient(135deg, #ff4081, #ff85a2)",
                color: "white",
                border: "none",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 10px 25px rgba(255, 64, 129, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(255, 64, 129, 0.2)";
              }}
            >
              <i className="bi bi-calendar-check me-2"></i>
              Book Now
            </Link>
            
            <a 
              href="tel:+8801648322690" 
              className="btn btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none"
              style={{
                backgroundColor: "transparent",
                color: "#ff4081",
                border: "2px solid #ff85a2",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(255, 133, 162, 0.1)";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <i className="bi bi-telephone me-2"></i>
              Call Us <br /> 
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx="true">{`
        .text-pink {
          color: #ff4081 !important;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          
          .display-5 {
            font-size: 2rem !important;
          }
          
          .lead.fs-5 {
            font-size: 1rem !important;
          }
          
          .btn-lg {
            padding: 0.75rem 1.5rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}