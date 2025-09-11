import { useEffect, useState } from "react";
import axios from "axios";

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/offers")
      .then(res => setOffers(res.data))
      .catch(err => console.error("❌ Error fetching offers:", err));
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="section-title mb-4 text-center">✨ Our Special Offers ✨</h1>

        {offers.length === 0 ? (
          <div className="alert alert-info text-center">
            No active offers right now. Check back soon!
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {offers.map(o => (
              <div className="col" key={o.id}>
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  {o.image && (
                    <img
                      src={`http://localhost:5000${o.image}`}
                      alt={o.title}
                      className="card-img-top rounded-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-pink">{o.title}</h5>
                    <p className="card-text text-muted">{o.description}</p>
                    <p className="fw-bold text-success">৳ {o.price}</p>
                    <p className="text-secondary">
                      {o.start_date} → {o.end_date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
