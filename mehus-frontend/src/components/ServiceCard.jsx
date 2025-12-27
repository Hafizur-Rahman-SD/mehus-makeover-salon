import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  const { id, name, price, description, image } = service;
  
  return (
    <div className="col mb-4">
      <div className="card h-100 border-0 shadow-hover" 
           style={{
             borderRadius: '20px',
             overflow: 'hidden',
             transition: 'all 0.3s ease',
             backgroundColor: '#fff9fb',
             border: '1px solid rgba(255, 182, 193, 0.2)'
           }}>
        
        {/* Image Container with Overlay */}
        <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
          <img 
            src={image} 
            className="card-img-top h-100 w-100" 
            alt={name}
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
          />
          
          {/* Price Badge */}
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge rounded-pill px-3 py-2 fw-bold shadow-sm"
                  style={{
                    backgroundColor: 'rgba(255, 64, 129, 0.95)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)'
                  }}>
              ৳{price}
            </span>
          </div>
          
          {/* Hover Overlay */}
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
               style={{
                 backgroundColor: 'rgba(255, 64, 129, 0.8)',
                 opacity: 0,
                 transition: 'opacity 0.3s ease'
               }}>
            <Link 
              to={`/booking?serviceId=${id}`} 
              className="btn btn-light rounded-pill px-4 py-2 fw-bold"
              style={{
                transform: 'translateY(20px)',
                transition: 'transform 0.3s ease'
              }}
            >
              <i className="bi bi-calendar-check me-2"></i>
              Book Now
            </Link>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="card-body d-flex flex-column p-4">
          {/* Service Name with Icon */}
          <div className="d-flex align-items-center mb-3">
            <div className="rounded-circle p-2 me-3" 
                 style={{
                   backgroundColor: 'rgba(255, 133, 162, 0.15)',
                   width: '45px',
                   height: '45px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
                 }}>
              <i className="bi bi-scissors fs-5" style={{ color: '#ff4081' }}></i>
            </div>
            <h4 className="card-title mb-0 fw-bold" style={{ 
              color: '#8a5a6d',
              fontSize: '1.4rem'
            }}>
              {name}
            </h4>
          </div>
          
          {/* Description */}
          <p className="card-text flex-grow-1 mb-4" style={{ 
            color: '#d17a94',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}>
            {description}
          </p>
          
          {/* Bottom Section - Button and Price */}
          <div className="d-flex justify-content-between align-items-center mt-auto pt-3"
               style={{ borderTop: '1px solid rgba(255, 182, 193, 0.3)' }}>
            
            {/* Price Display */}
            <div>
              <div className="small text-muted mb-1" style={{ color: '#ff85a2' }}>
                Starting from
              </div>
              <div className="fw-bold" style={{ 
                color: '#ff4081',
                fontSize: '1.8rem',
                lineHeight: '1'
              }}>
                ৳{price}
              </div>
            </div>
            
            {/* Book Button */}
            <Link 
              to={`/booking?serviceId=${id}`} 
              className="btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center"
              style={{
                background: 'linear-gradient(135deg, #ff4081, #ff85a2)',
                color: 'white',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 64, 129, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span className="me-2">Book</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <style jsx="true">{`
        .shadow-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(138, 90, 109, 0.15) !important;
        }
        
        .card:hover .position-absolute.top-0.start-0 {
          opacity: 1 !important;
        }
        
        .card:hover .position-absolute.top-0.start-0 .btn {
          transform: translateY(0) !important;
        }
        
        .card:hover img {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .card-body {
            padding: 1.5rem !important;
          }
          
          .position-absolute.top-0.start-0 {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}