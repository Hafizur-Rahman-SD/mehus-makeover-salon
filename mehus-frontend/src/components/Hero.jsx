import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Hero() {
  const [salonStatus, setSalonStatus] = useState({
    isOpen: false,
    statusText: "",
    nextOpeningTime: "",
    currentDay: ""
  });

  // Debug: Current time info
  const [debugTime, setDebugTime] = useState("");

  // AM/PM format এ time declear.
  const openingHours = {
    0: { isOpen: true, open: "11:00 AM", close: "11:00 PM" }, // Sunday
    1: { isOpen: true, open: "11:00 AM", close: "11:00 PM" }, // Monday
    2: { isOpen: true, open: "11:00 AM", close: "11:00 PM" }, // Tuesday
    3: { isOpen: true, open: "11:00 AM", close: "11:00 PM" }, // Wednesday
    4: { isOpen: true, open: "11:00 AM", close: "11:00 PM" }, // Thursday
    5: { isOpen: true, open: "11:00 AM", close: "11:00 PM" }, // Friday
    6: { isOpen: true, open: "11:00 AM", close: "11:00 PM" }, // Saturday
  };

  // Convert AM/PM to 24-hour format (FIXED VERSION)
  const timeTo24Hour = (timeStr) => {
    try {
      // Remove spaces and convert to uppercase
      timeStr = timeStr.trim().toUpperCase();
      
      // Split time and AM/PM
      let timePart = timeStr;
      let modifier = "";
      
      if (timeStr.includes("AM") || timeStr.includes("PM")) {
        timePart = timeStr.substring(0, timeStr.length - 2).trim();
        modifier = timeStr.includes("AM") ? "AM" : "PM";
      }
      
      // Split hours and minutes
      const [hoursStr, minutesStr = "00"] = timePart.split(':');
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      
      // Convert to 24-hour format
      if (modifier === "PM" && hours < 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }
      
      // Debug log
      console.log(`Converting ${timeStr} -> hours: ${hours}, minutes: ${minutes}`);
      
      return { hours, minutes };
    } catch (error) {
      console.error("Error converting time:", timeStr, error);
      return { hours: 0, minutes: 0 };
    }
  };

  // Format time for display
  const formatTimeDisplay = (timeStr) => {
    return timeStr; // Keep as is (11:00 AM format)
  };

  // Check if current time is within opening hours
  const checkSalonStatus = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Debug information
    const debugInfo = `Current: ${currentHour}:${currentMinute}, Day: ${currentDay}`;
    setDebugTime(debugInfo);
    console.log(debugInfo);
    
    const todayHours = openingHours[currentDay];
    console.log("Today's hours:", todayHours);
    
    if (!todayHours.isOpen) {
      setSalonStatus({
        isOpen: false,
        statusText: "Closed Today",
        nextOpeningTime: "Tomorrow at 11:00 AM",
        currentDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDay]
      });
      return;
    }
    
    // Convert opening and closing times to 24-hour format
    const openTime = timeTo24Hour(todayHours.open);
    const closeTime = timeTo24Hour(todayHours.close);
    
    console.log(`Open time (24h): ${openTime.hours}:${openTime.minutes}`);
    console.log(`Close time (24h): ${closeTime.hours}:${closeTime.minutes}`);
    
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const openTimeInMinutes = openTime.hours * 60 + openTime.minutes;
    const closeTimeInMinutes = closeTime.hours * 60 + closeTime.minutes;
    
    console.log(`Current minutes: ${currentTimeInMinutes}`);
    console.log(`Open minutes: ${openTimeInMinutes}`);
    console.log(`Close minutes: ${closeTimeInMinutes}`);
    
    let isOpenNow = false;
    let statusText = "";
    let nextOpeningTime = "";
    
    // Check if current time is within opening hours
    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
      // Salon is currently OPEN
      isOpenNow = true;
      statusText = `Open • Closes at ${formatTimeDisplay(todayHours.close)}`;
      console.log("Status: OPEN");
    } else if (currentTimeInMinutes < openTimeInMinutes) {
      // Salon will open later today
      isOpenNow = false;
      statusText = `Closed • Opens at ${formatTimeDisplay(todayHours.open)}`;
      nextOpeningTime = `Today at ${formatTimeDisplay(todayHours.open)}`;
      console.log("Status: CLOSED (opens later today)");
    } else {
      // Salon closed for today (after closing time)
      isOpenNow = false;
      
      // Find next open day (always tomorrow in this case since open daily)
      const tomorrow = (currentDay + 1) % 7;
      statusText = `Closed • Opens tomorrow at ${formatTimeDisplay(openingHours[tomorrow].open)}`;
      nextOpeningTime = `Tomorrow at ${formatTimeDisplay(openingHours[tomorrow].open)}`;
      console.log("Status: CLOSED (opens tomorrow)");
    }
    
    setSalonStatus({
      isOpen: isOpenNow,
      statusText: statusText,
      nextOpeningTime: nextOpeningTime,
      currentDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDay]
    });
  };

  // Update status every minute and on initial load
  useEffect(() => {
    checkSalonStatus();
    const interval = setInterval(checkSalonStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section py-5 py-lg-7" style={{
      background: "linear-gradient(135deg, #fff9fb 0%, #fff5f9 50%, #ffeef6 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: 1}}>
        <div style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 133, 162, 0.1) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 64, 129, 0.08) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite 1s"
        }}></div>
      </div>

      <div className="container py-4 py-lg-5 position-relative" style={{zIndex: 2}}>
        {/* Debug Info (Remove in production) */}
        <div className="text-center mb-3 small text-muted" style={{display: 'none'}}>
          Debug: {debugTime} | Status: {salonStatus.isOpen ? 'Open' : 'Closed'}
        </div>
        
        <div className="row align-items-center g-5 g-lg-6">
          {/* Left Content Column */}
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="mb-4">
              {/* Dynamic Status Badge */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className={`badge rounded-pill px-3 py-2 d-flex align-items-center ${salonStatus.isOpen ? 'bg-success' : 'bg-secondary'}`}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600"
                  }}>
                  <i className={`bi ${salonStatus.isOpen ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-2`}></i>
                  {salonStatus.isOpen ? "Open Now" : "Closed Now"}
                </span>
                
                <span className="badge rounded-pill px-3 py-2" style={{
                  backgroundColor: "rgba(255, 133, 162, 0.15)",
                  color: "#ff4081",
                  fontSize: "0.9rem",
                  fontWeight: "600"
                }}>
                  <i className="bi bi-star-fill me-2"></i>
                  Open 7 Days • 11AM-11PM
                </span>
              </div>
              
              <h1 className="display-4 fw-bold mb-4" style={{
                background: "linear-gradient(90deg, #8a5a6d 0%, #ff4081 50%, #ff85a2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.2"
              }}>
                Glow With <span className="d-block d-md-inline">Confidence ✨</span>
              </h1>
              
              {/* Status Message - Show only when closed */}
              {!salonStatus.isOpen && salonStatus.statusText.includes("Closed") && (
                <div className="alert alert-info d-flex align-items-center mb-4 p-3 rounded-3" 
                  style={{
                    backgroundColor: "rgba(255, 133, 162, 0.1)",
                    border: "1px solid rgba(255, 133, 162, 0.3)",
                    color: "#8a5a6d"
                  }}>
                  <i className="bi bi-info-circle-fill fs-4 me-3" style={{color: "#ff4081"}}></i>
                  <div>
                    <strong>We are currently closed</strong>
                    <div className="small mt-1">
                      But you can book online for {salonStatus.nextOpeningTime || "tomorrow"}. 
                      Your appointment will be confirmed.
                    </div>
                  </div>
                </div>
              )}
              
              <p className="lead mb-4 fs-5" style={{
                color: "#5a4a5a",
                fontWeight: "400",
                maxWidth: "90%"
              }}>
                Where beauty meets elegance. Professional hair styling, flawless makeup, and rejuvenating skincare treatments tailored just for you.
              </p>
            </div>

            {/* Stats Counter */}
            <div className="row mb-5 g-3">
              {[
                { number: "500+", label: "Happy Clients" },
                { number: "50+", label: "Services" },
                { number: "4.9", label: "Rating" },
                { number: "7", label: "Days Open" }
              ].map((stat, index) => (
                <div className="col-6 col-sm-3" key={index}>
                  <div className="text-center p-3 rounded-4" style={{
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 182, 193, 0.2)"
                  }}>
                    <div className="fw-bold fs-3" style={{ color: "#ff4081" }}>{stat.number}</div>
                    <div className="small" style={{ color: "#8a5a6d" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons with Dynamic Text */}
            <div className="d-flex flex-column flex-sm-row gap-3 gap-lg-4">
              <Link 
                to="/booking" 
                className="btn d-flex align-items-center justify-content-center gap-2 rounded-pill px-5 py-3 fw-bold shadow"
                style={{
                  background: "linear-gradient(135deg, #ff4081 0%, #ff85a2 100%)",
                  color: "white",
                  fontSize: "1.1rem",
                  border: "none",
                  transition: "all 0.3s ease",
                  minWidth: "220px"
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
                <i className="bi bi-calendar-check fs-5"></i>
                {salonStatus.isOpen ? "Book Appointment" : "Pre-book Online"}
              </Link>
              
              <Link 
                to="/services" 
                className="btn d-flex align-items-center justify-content-center gap-2 rounded-pill px-5 py-3 fw-bold"
                style={{
                  backgroundColor: "transparent",
                  color: "#ff4081",
                  fontSize: "1.1rem",
                  border: "2px solid #ff85a2",
                  transition: "all 0.3s ease",
                  minWidth: "200px"
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
                <i className="bi bi-scissors fs-5"></i>
                Browse Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-5 pt-3 d-flex align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i key={star} className="bi bi-star-fill text-warning me-1"></i>
                  ))}
                </div>
                <div className="small ms-2" style={{ color: "#8a5a6d" }}>
                  <span className="fw-bold">4.9/5</span> from 200+ reviews
                </div>
              </div>
              
              <div className="vr d-none d-sm-block" style={{ color: "#ffd6e9" }}></div>
              
              <div className="d-flex align-items-center">
                <i className="bi bi-shield-check text-success me-1"></i>
                <div className="small" style={{ color: "#8a5a6d" }}>
                  Safe & Hygienic
                </div>
              </div>
              
              <div className="vr d-none d-sm-block" style={{ color: "#ffd6e6" }}></div>
              
              <div className="d-flex align-items-center">
                <i className={`bi ${salonStatus.isOpen ? 'bi-clock' : 'bi-clock-history'} me-1`} 
                   style={{color: salonStatus.isOpen ? "#25d366" : "#ff6b6b"}}></i>
                <div className="small" style={{ color: "#8a5a6d" }}>
                  {salonStatus.statusText}
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="col-lg-6 order-1 order-lg-2">
            <div className="position-relative">
              {/* Background gradient shape */}
              <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                style={{
                  background: "linear-gradient(45deg, #ff4081, #ff85a2)",
                  transform: "rotate(3deg)",
                  opacity: "0.1"
                }}>
              </div>
              
              {/* Main Image */}
              <img 
                className="img-fluid rounded-4 shadow-lg position-relative" 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop" 
                alt="Professional Salon Interior"
                style={{
                  border: "8px solid white",
                  boxShadow: "0 20px 40px rgba(138, 90, 109, 0.15)",
                  transition: "transform 0.5s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.02)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
              
              {/* Floating Card - Now Dynamic */}
              <div className="position-absolute bottom-0 end-0 p-3 rounded-4 shadow"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${salonStatus.isOpen ? 'rgba(37, 211, 102, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`,
                  maxWidth: "220px",
                  transform: "translate(-20px, 20px)",
                  animation: "float 5s ease-in-out infinite 0.5s"
                }}>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-2 me-3" 
                    style={{ 
                      backgroundColor: salonStatus.isOpen 
                        ? "rgba(37, 211, 102, 0.2)" 
                        : "rgba(255, 107, 107, 0.2)" 
                    }}>
                    <i className={`bi ${salonStatus.isOpen ? 'bi-door-open' : 'bi-door-closed'} fs-4`}
                       style={{color: salonStatus.isOpen ? "#25d366" : "#ff6b6b"}}></i>
                  </div>
                  <div>
                    <div className="fw-bold" style={{ 
                      color: salonStatus.isOpen ? "#25d366" : "#ff6b6b" 
                    }}>
                      {salonStatus.isOpen ? "Open Now" : "Closed"}
                    </div>
                    <div className="small" style={{ color: "#8a5a6d" }}>
                      Everyday: 11:00 AM - 11:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translate(-20px, 20px) rotate(0deg); }
          50% { transform: translate(-20px, 10px) rotate(0deg); }
        }
        
        .alert-info {
          --bs-alert-bg: rgba(255, 133, 162, 0.1);
          --bs-alert-border-color: rgba(255, 133, 162, 0.3);
          --bs-alert-color: #8a5a6d;
        }
        
        @media (max-width: 992px) {
          .position-absolute.bottom-0.end-0 {
            position: relative !important;
            transform: none !important;
            margin-top: 1rem;
            max-width: 100% !important;
            animation: none !important;
          }
          
          .hero-section {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          
          h1.display-4 {
            font-size: 2.5rem !important;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 576px) {
          h1.display-4 {
            font-size: 2rem !important;
          }
          
          .lead.fs-5 {
            font-size: 1rem !important;
          }
          
          .btn {
            font-size: 1rem !important;
            padding: 0.75rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}