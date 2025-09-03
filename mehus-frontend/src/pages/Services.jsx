import { useMemo, useState } from "react";
import { SERVICES } from "../data/services.js";
import ServiceCard from "../components/ServiceCard.jsx";

export default function Services() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(SERVICES.map(s => s.category)))],
    []
  );

  const filtered = SERVICES.filter(
    s =>
      (cat === "All" || s.category === cat) &&
      (q.trim() === "" || s.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="h3 section-title mb-3">Services</h1>

        <div className="row g-3 align-items-end mb-3">
          <div className="col-md-6">
            <label className="form-label">Search</label>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              className="form-control"
              placeholder="e.g., Bridal, Haircut"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={cat}
              onChange={e => setCat(e.target.value)}
            >
              {cats.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          {filtered.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
