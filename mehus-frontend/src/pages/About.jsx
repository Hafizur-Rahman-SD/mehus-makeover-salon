export default function About() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #ffe6f0, #fff0f6)",
      }}
    >
      <div className="container">
        {/* Heading */}
        <h1
          className="mb-5 text-center fw-bold fs-1 fs-md-1"
          style={{
            background: "linear-gradient(90deg, #ff4e8c, #ff94c2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 8px rgba(255, 0, 100, 0.3)",
          }}
        >
          About Us
        </h1>

        {/* Paragraph */}
        <p
          className="text-center mx-auto fs-4 fs-md-5"
          style={{
            maxWidth: "750px",
            color: "#5a3d55",
            lineHeight: "1.9",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          At <strong>Mehus Makeover Salon & Cosmetics</strong>, we bring out the
          elegance in every woman. Our expert stylists and beauty professionals
          are dedicated to giving you a luxurious experience where confidence
          meets beauty. 💖
        </p>

        {/* Why Choose Us */}
        <div className="row g-4 mt-5 text-center">
          {[
            { title: "Experienced Staff", icon: "💇‍♀️" },
            { title: "Premium Products", icon: "🌸" },
            { title: "Hygienic Salon", icon: "🧼" },
            { title: "Affordable Packages", icon: "💖" },
          ].map((item, idx) => (
            <div className="col-6 col-md-3" key={idx}>
              <div
                className="p-4 rounded-4 shadow-lg h-100"
                style={{
                  background: "white",
                  border: "1px solid #ffd6e9",
                  transition: "transform 0.3s ease",
                }}
              >
                <div className="fs-1 mb-3">{item.icon}</div>
                <h5
                  className="fw-semibold fs-6 fs-md-5"
                  style={{
                    color: "#d63384",
                    textShadow: "1px 1px 3px rgba(214,51,132,0.2)",
                  }}
                >
                  {item.title}
                </h5>
              </div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <h2
          className="text-center mt-5 mb-4 fw-bold fs-3 fs-md-2"
          style={{
            color: "#c2185b",
            textShadow: "2px 2px 6px rgba(194,24,91,0.3)",
          }}
        >
          Meet Our Team
        </h2>
        <div className="row g-4">
          {[1, 2, 3].map((i) => (
            <div className="col-12 col-md-4" key={i}>
              <div className="card h-100 shadow-lg border-0 rounded-4">
                <img
                  className="card-img-top rounded-top img-fluid"
                  src={`https://picsum.photos/seed/staff-${i}/400/300`}
                  alt={`Team member ${i}`}
                />
                <div className="card-body text-center">
                  <h5
                    className="card-title fw-bold fs-6 fs-md-5"
                    style={{
                      color: "#e91e63",
                      textShadow: "1px 1px 3px rgba(233,30,99,0.3)",
                    }}
                  >
                    Team Member {i}
                  </h5>
                  <p className="card-text text-secondary fs-6">
                    Our Certified stylist and makeover expert ✨
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
