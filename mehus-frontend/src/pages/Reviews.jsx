import { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      name: "Nadia Islam", 
      rating: 5, 
      comment: "My bridal makeup was absolutely perfect! Meher did an amazing job. Highly recommended!",
      date: "15 Feb 2024",
      service: "Bridal Makeup",
      avatarColor: "#ff4081"
    },
    { 
      id: 2, 
      name: "Rafia Ahmed", 
      rating: 5, 
      comment: "Excellent haircut and hair treatment. Staff is very friendly and professional.",
      date: "10 Feb 2024",
      service: "Hair Styling",
      avatarColor: "#ff85a2"
    },
    { 
      id: 3, 
      name: "Tasnima Khan", 
      rating: 5, 
      comment: "Facial service was outstanding. My skin feels smooth and refreshed. Will definitely come back!",
      date: "05 Feb 2024",
      service: "Premium Facial",
      avatarColor: "#e91e63"
    },
    { 
      id: 4, 
      name: "Zara Malik", 
      rating: 4, 
      comment: "Good service quality but waiting time was a bit long. Overall satisfied with the results.",
      date: "28 Jan 2024",
      service: "Manicure Pedicure",
      avatarColor: "#9c27b0"
    },
    { 
      id: 5, 
      name: "Mehjabin Haque", 
      rating: 5, 
      comment: "Threading and waxing service was painless and quick. Very hygienic and professional.",
      date: "20 Jan 2024",
      service: "Threading & Waxing",
      avatarColor: "#ff9800"
    },
    { 
      id: 6, 
      name: "Samia Rahman", 
      rating: 5, 
      comment: "Complete salon package for my daughter's wedding. Everyone loved the results. Thank you team!",
      date: "15 Jan 2024",
      service: "Full Salon Package",
      avatarColor: "#2196f3"
    }
  ]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [service, setService] = useState("");
  const [ok, setOk] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Bridal Makeup",
    "Hair Styling",
    "Premium Facial",
    "Manicure Pedicure",
    "Threading & Waxing",
    "Hair Coloring",
    "Skin Care Treatment",
    "Full Body Spa",
    "Other Services"
  ];

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  // Character counter for comment
  const commentLength = comment.length;
  const maxCommentLength = 500;

  function addReview(e) {
    e.preventDefault();
    
    if (!name.trim()) {
      setOk({ 
        type: "danger", 
        msg: "Please enter your name.",
        icon: "❌"
      });
      return;
    }

    if (!comment.trim()) {
      setOk({ 
        type: "danger", 
        msg: "Please write your review.",
        icon: "❌"
      });
      return;
    }

    if (comment.length > maxCommentLength) {
      setOk({ 
        type: "danger", 
        msg: `Review must be less than ${maxCommentLength} characters.`,
        icon: "❌"
      });
      return;
    }

    const newReview = { 
      id: Math.max(0, ...reviews.map(r => r.id)) + 1, 
      name: name.trim(), 
      rating: Number(rating), 
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      service: service || "General Service",
      avatarColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };

    setReviews([newReview, ...reviews]);
    setName(""); 
    setRating(5); 
    setComment("");
    setService("");
    setSubmitted(true);
    
    setOk({ 
      type: "success", 
      msg: "Thank you! Your review has been submitted successfully.",
      icon: "🎉"
    });
    
    setTimeout(() => {
      setOk(null);
      setSubmitted(false);
    }, 3000);
  }

  // Scroll to reviews after submission
  useEffect(() => {
    if (submitted) {
      const reviewsSection = document.querySelector('.reviews-list');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [submitted]);

  return (
    <section className="reviews-section py-5 py-lg-7" style={{
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
              <i className="bi bi-chat-heart-fill me-2"></i>
              Customer Testimonials
            </span>
          </div>
          
          <h1 className="display-4 fw-bold mb-3" style={{
            background: "linear-gradient(90deg, #8a5a6d 0%, #ff4081 50%, #ff85a2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            What Our Customers Say
          </h1>
          
          {/* Rating Summary */}
          <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
            <div className="text-center">
              <div className="display-3 fw-bold" style={{ color: "#ff4081" }}>{averageRating}</div>
              <div className="d-flex justify-content-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
              </div>
              <div className="small" style={{ color: "#8a5a6d" }}>{reviews.length} Reviews</div>
            </div>
          </div>
        </div>

        {/* Success/Error Message */}
        {ok && (
          <div className={`alert ${ok.type === 'success' ? 'alert-success' : 'alert-danger'} 
                          alert-dismissible fade show rounded-3 shadow-sm`}
               style={{
                 maxWidth: "800px",
                 margin: "0 auto 2rem auto",
                 border: ok.type === 'success' ? 
                        "1px solid rgba(37, 211, 102, 0.3)" : 
                        "1px solid rgba(255, 107, 107, 0.3)"
               }}>
            <div className="d-flex align-items-center">
              <span className="fs-4 me-3">{ok.icon}</span>
              <div>
                <strong className="d-block">{ok.type === 'success' ? 'Success!' : 'Warning'}</strong>
                {ok.msg}
              </div>
            </div>
            <button type="button" className="btn-close" onClick={() => setOk(null)}></button>
          </div>
        )}

        <div className="row g-5">
          {/* Left Column - Review Form */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
              <div className="card-body p-4 p-lg-5">
                <div className="text-center mb-4">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{
                         width: "70px",
                         height: "70px",
                         backgroundColor: "rgba(255, 133, 162, 0.15)"
                       }}>
                    <i className="bi bi-pencil-square fs-2" style={{ color: "#ff4081" }}></i>
                  </div>
                  <h3 className="fw-bold mb-2" style={{ color: "#8a5a6d" }}>
                    Share Your Experience
                  </h3>
                  <p className="text-muted">
                    Your feedback helps us improve our services
                  </p>
                </div>

                <form onSubmit={addReview}>
                  {/* Name Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-2" style={{ color: "#8a5a6d" }}>
                      <i className="bi bi-person me-1"></i>
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      className="form-control rounded-3"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{
                        borderColor: "#ff85a2",
                        backgroundColor: "#fff9fb",
                        padding: "0.75rem 1rem"
                      }}
                    />
                  </div>

                  {/* Service Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-2" style={{ color: "#8a5a6d" }}>
                      <i className="bi bi-scissors me-1"></i>
                      Service Received
                    </label>
                    <select 
                      className="form-select rounded-3"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      style={{
                        borderColor: "#ff85a2",
                        backgroundColor: "#fff9fb",
                        padding: "0.75rem 1rem"
                      }}
                    >
                      <option value="">Select a service</option>
                      {services.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-2 d-block" style={{ color: "#8a5a6d" }}>
                      <i className="bi bi-star me-1"></i>
                      Your Rating
                    </label>
                    <div className="d-flex justify-content-center gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`btn ${rating >= star ? 'btn-warning' : 'btn-outline-warning'} 
                                     rounded-pill px-3 py-2 d-flex align-items-center justify-content-center`}
                          style={{ 
                            minWidth: "60px",
                            transition: "all 0.3s ease"
                          }}
                          onClick={() => setRating(star)}
                        >
                          <i className="bi bi-star-fill me-1"></i>
                          <span>{star}</span>
                        </button>
                      ))}
                    </div>
                    <div className="text-center">
                      <div className="fw-bold mb-1" style={{ color: "#ff4081", fontSize: "1.1rem" }}>
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </div>
                      <div className="text-muted small">
                        {rating === 5 ? "Excellent" : 
                         rating === 4 ? "Good" : 
                         rating === 3 ? "Average" : 
                         rating === 2 ? "Poor" : "Very Poor"}
                      </div>
                    </div>
                  </div>

                  {/* Review Field */}
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-2" style={{ color: "#8a5a6d" }}>
                      <i className="bi bi-chat-left-text me-1"></i>
                      Your Review
                    </label>
                    <textarea 
                      className="form-control rounded-3"
                      rows="4"
                      placeholder="Share your experience with us..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      maxLength={maxCommentLength}
                      style={{
                        borderColor: "#ff85a2",
                        backgroundColor: "#fff9fb",
                        padding: "0.75rem 1rem",
                        resize: "vertical"
                      }}
                    ></textarea>
                    <div className="d-flex justify-content-between mt-2">
                      <small className={`${commentLength > maxCommentLength ? 'text-danger' : 'text-muted'}`}>
                        {commentLength} / {maxCommentLength} characters
                      </small>
                      <small className="text-muted">
                        Required
                      </small>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn w-100 py-3 fw-bold rounded-3 shadow-sm"
                    disabled={commentLength > maxCommentLength}
                    style={{
                      background: commentLength > maxCommentLength 
                        ? "linear-gradient(135deg, #cccccc, #dddddd)" 
                        : "linear-gradient(135deg, #ff4081, #ff85a2)",
                      color: "white",
                      border: "none",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease",
                      cursor: commentLength > maxCommentLength ? "not-allowed" : "pointer"
                    }}
                    onMouseOver={(e) => {
                      if (commentLength <= maxCommentLength) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 25px rgba(255, 64, 129, 0.3)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (commentLength <= maxCommentLength) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    <i className="bi bi-send-check me-2"></i>
                    Submit Review
                  </button>
                </form>

                {/* Form Note */}
                <div className="mt-4 text-center">
                  <p className="small text-muted mb-0">
                    <i className="bi bi-info-circle me-1"></i>
                    All reviews are verified before publishing
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reviews List */}
          <div className="col-lg-7 reviews-list">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold mb-0" style={{ color: "#8a5a6d" }}>
                <i className="bi bi-chat-square-quote me-2"></i>
                Customer Reviews
              </h3>
              <span className="badge rounded-pill px-3 py-2" style={{
                backgroundColor: "rgba(255, 133, 162, 0.15)",
                color: "#ff4081",
                fontSize: "0.9rem"
              }}>
                Total: {reviews.length} Reviews
              </span>
            </div>

            <div className="row g-4">
              {reviews.map((review) => (
                <div className="col-12" key={review.id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100"
                       style={{
                         transition: "all 0.3s ease",
                         backgroundColor: "rgba(255, 255, 255, 0.9)",
                         border: "1px solid rgba(255, 182, 193, 0.2)"
                       }}
                       onMouseOver={(e) => {
                         e.currentTarget.style.transform = "translateY(-5px)";
                         e.currentTarget.style.boxShadow = "0 15px 35px rgba(138, 90, 109, 0.15)";
                       }}
                       onMouseOut={(e) => {
                         e.currentTarget.style.transform = "translateY(0)";
                         e.currentTarget.style.boxShadow = "0 4px 12px rgba(138, 90, 109, 0.1)";
                       }}>
                    <div className="card-body p-4">
                      <div className="d-flex align-items-start gap-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                               style={{
                                 width: "60px",
                                 height: "60px",
                                 backgroundColor: review.avatarColor,
                                 color: "white",
                                 fontSize: "1.25rem",
                                 fontWeight: "bold",
                                 border: "3px solid white"
                               }}>
                            {review.name.charAt(0)}
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>
                                {review.name}
                              </h6>
                              <div className="d-flex align-items-center gap-2">
                                <span className="badge rounded-pill px-3 py-1" style={{
                                  backgroundColor: "rgba(255, 133, 162, 0.15)",
                                  color: "#ff4081",
                                  fontSize: "0.8rem",
                                  fontWeight: "500"
                                }}>
                                  <i className="bi bi-scissors me-1"></i>
                                  {review.service}
                                </span>
                                <small className="text-muted">
                                  <i className="bi bi-calendar me-1"></i>
                                  {review.date}
                                </small>
                              </div>
                            </div>
                            
                            {/* Rating Stars */}
                            <div className="d-flex align-items-center">
                              <div className="me-2">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'} 
                                              ${i < review.rating ? 'text-warning' : 'text-light'}`}
                                    style={{ 
                                      fontSize: "0.9rem"
                                    }}
                                  ></i>
                                ))}
                              </div>
                              <span className="fw-bold" style={{ color: "#ff4081", fontSize: "1.1rem" }}>
                                {review.rating}.0
                              </span>
                            </div>
                          </div>

                          <p className="mb-0 mt-3" style={{ 
                            color: "#5a4a5a",
                            lineHeight: "1.6",
                            fontSize: "0.95rem"
                          }}>
                            "{review.comment}"
                          </p>

                          {/* Verified Badge */}
                          <div className="mt-3 pt-3 border-top" style={{ borderColor: "rgba(255, 182, 193, 0.3)" }}>
                            <span className="badge px-2 py-1" style={{
                              backgroundColor: "rgba(37, 211, 102, 0.1)",
                              color: "#25d366",
                              fontSize: "0.75rem"
                            }}>
                              <i className="bi bi-patch-check-fill me-1"></i>
                              Verified Review
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mt-5">
              <div className="col-md-4">
                <div className="text-center p-4 rounded-3 shadow-sm" style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(255, 182, 193, 0.3)"
                }}>
                  <div className="fw-bold display-6 mb-2" style={{ color: "#ff4081" }}>98%</div>
                  <div className="small fw-medium" style={{ color: "#8a5a6d" }}>Satisfied Customers</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-4 rounded-3 shadow-sm" style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(255, 182, 193, 0.3)"
                }}>
                  <div className="fw-bold display-6 mb-2" style={{ color: "#ff4081" }}>{averageRating}/5</div>
                  <div className="small fw-medium" style={{ color: "#8a5a6d" }}>Average Rating</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-4 rounded-3 shadow-sm" style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(255, 182, 193, 0.3)"
                }}>
                  <div className="fw-bold display-6 mb-2" style={{ color: "#ff4081" }}>500+</div>
                  <div className="small fw-medium" style={{ color: "#8a5a6d" }}>Successful Services</div>
                </div>
              </div>
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
        
        .btn-outline-warning {
          border-color: #ffc107;
          color: #ffc107;
        }
        
        .btn-outline-warning:hover {
          background-color: #ffc107;
          color: #000;
          transform: translateY(-2px);
        }
        
        .btn-outline-warning.active {
          background-color: #ffc107;
          color: #000;
          border-color: #ffc107;
        }
        
        @media (max-width: 991.98px) {
          .col-lg-5, .col-lg-7 {
            margin-bottom: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          
          .display-6 {
            font-size: 2.5rem !important;
          }
          
          .d-flex.justify-content-center.gap-2.mb-3 {
            flex-wrap: wrap;
          }
          
          .btn.rounded-pill {
            margin-bottom: 0.5rem;
          }
        }
        
        /* Character counter warning */
        .text-danger {
          color: #ff4081 !important;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}