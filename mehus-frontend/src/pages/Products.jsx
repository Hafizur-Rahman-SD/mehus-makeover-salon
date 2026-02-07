import { useEffect, useMemo, useState } from "react";
// import axios from "axios"; // later use

export default function Products() {
  // UI states (future API ready)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // UI controls
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all"); // all | low | mid | high

  useEffect(() => {
    // ✅ For now: demo data (same shape as DB data)
    // Later: replace this block with axios.get("http://localhost:5000/api/products")
    const demo = [
      {
        id: 1,
        title: "Hydrating Face Serum",
        price: 850,
        currency: "BDT",
        imageUrl:
          "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
        description:
          "Lightweight serum that hydrates deeply and gives a natural glow. Suitable for most skin types.",
        reasons: ["Deep hydration", "Glow boost", "Non-sticky finish"],
        tags: ["skincare", "glow"],
        stockStatus: "In Stock",
        createdAt: "2026-02-01",
      },
      {
        id: 2,
        title: "Sunscreen SPF 50+",
        price: 650,
        currency: "BDT",
        imageUrl:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80",
        description:
          "Broad spectrum protection to reduce sun damage and tanning. Comfortable for daily use.",
        reasons: ["UV protection", "Prevents tanning", "Daily wear friendly"],
        tags: ["skincare", "spf"],
        stockStatus: "Low Stock",
        createdAt: "2026-02-03",
      },
      {
        id: 3,
        title: "Matte Lipstick (Party Shade)",
        price: 420,
        currency: "BDT",
        imageUrl:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
        description:
          "Long-lasting matte lipstick with rich pigment. Smooth application and comfortable wear.",
        reasons: ["Long lasting", "High pigment", "Comfortable matte"],
        tags: ["makeup", "lip"],
        stockStatus: "In Stock",
        createdAt: "2026-02-05",
      },
    ];

    setLoading(true);
    setErr("");
    setTimeout(() => {
      setProducts(demo);
      setLoading(false);
    }, 350);
  }, []);

  const money = (n, cur = "BDT") => (cur === "BDT" ? `৳${n}` : `${n} ${cur}`);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = [...products];

    if (q) {
      list = list.filter((p) => {
        const hay = `${p.title} ${p.description} ${(p.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (priceFilter !== "all") {
      list = list.filter((p) => {
        if (priceFilter === "low") return p.price < 500;
        if (priceFilter === "mid") return p.price >= 500 && p.price <= 900;
        if (priceFilter === "high") return p.price > 900;
        return true;
      });
    }

    // sort newest first (like FB posts)
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [products, query, priceFilter]);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: "#ff4081" }}>
          Products
        </h1>
        <p className="text-muted mb-0" style={{ maxWidth: 780, margin: "0 auto" }}>
          New arrivals show first — like a feed. Search, filter, and pick your favourites.
        </p>
      </div>

      {/* Controls */}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-12 col-md-7">
          <div className="input-group">
            <span className="input-group-text bg-white" style={{ borderColor: "#ff85a2" }}>
              <i className="bi bi-search" style={{ color: "#ff4081" }}></i>
            </span>
            <input
              className="form-control"
              style={{ borderColor: "#ff85a2" }}
              placeholder="Search products (e.g., serum, lipstick, SPF)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-5">
          <select
            className="form-select"
            style={{ borderColor: "#ff85a2" }}
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All prices</option>
            <option value="low">Below ৳500</option>
            <option value="mid">৳500 - ৳900</option>
            <option value="high">Above ৳900</option>
          </select>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" aria-label="Loading"></div>
          <div className="text-muted mt-3">Loading products…</div>
        </div>
      )}

      {!loading && err && (
        <div className="alert alert-danger rounded-4" role="alert">
          {err}
        </div>
      )}

      {!loading && !err && filtered.length === 0 && (
        <div className="text-center py-5">
          <div className="text-muted">No products found.</div>
        </div>
      )}

      {/* Grid */}
      {!loading && !err && filtered.length > 0 && (
        <div className="row g-4">
          {filtered.map((p) => (
            <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
              <div
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                style={{ transition: "transform 0.2s ease" }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {/* Image */}
                <div style={{ height: 230, overflow: "hidden" }}>
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>

                {/* Body */}
                <div className="card-body p-4">
                  {/* Title + Price */}
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <h5 className="fw-bold mb-1" style={{ color: "#8a5a6d" }}>
                      {p.title}
                    </h5>

                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        background: "linear-gradient(135deg, #ff85a2, #ff4081)",
                        color: "white",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {money(p.price, p.currency)}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="mt-2">
                    <span
                      className="badge rounded-pill"
                      style={{
                        backgroundColor:
                          p.stockStatus === "In Stock"
                            ? "rgba(25, 135, 84, 0.12)"
                            : "rgba(255, 193, 7, 0.16)",
                        color: p.stockStatus === "In Stock" ? "#198754" : "#b58100",
                        border: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      {p.stockStatus}
                    </span>
                    <span className="text-muted small ms-2">Posted: {p.createdAt}</span>
                  </div>

                  {/* Description */}
                  <p className="text-muted small mt-3 mb-3">{p.description}</p>

                  {/* Reasons */}
                  {p.reasons?.length > 0 && (
                    <div className="small mb-3">
                      <div className="fw-semibold mb-2" style={{ color: "#ff4081" }}>
                        Why buy:
                      </div>
                      <ul className="mb-0 ps-3">
                        {p.reasons.slice(0, 4).map((r, idx) => (
                          <li key={idx} className="text-muted">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {p.tags?.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="badge rounded-pill"
                          style={{
                            backgroundColor: "rgba(255, 133, 162, 0.12)",
                            color: "#ff4081",
                            border: "1px solid rgba(255, 133, 162, 0.18)",
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer CTA */}
                <div className="card-footer bg-white border-0 px-4 pb-4">
                  <a
                    href="https://www.facebook.com/people/Mehus-Makeover-salon/61579639642397/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn w-100 rounded-3 fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #ff4081 0%, #9c27b0 100%)",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Order / DM on Facebook
                  </a>
                  <div className="text-center mt-2">
                    <small className="text-muted">Availability & shade info in inbox</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Soft styles */}
      <style jsx="true">{`
        .form-control:focus,
        .form-select:focus {
          border-color: #ff4081 !important;
          box-shadow: 0 0 0 0.25rem rgba(255, 64, 129, 0.18) !important;
        }
      `}</style>
    </div>
  );
}
