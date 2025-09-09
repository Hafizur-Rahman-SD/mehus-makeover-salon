import Hero from "../components/Hero.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { SERVICES } from "../data/services.js";
import { Link } from "react-router-dom";

export default function Home() {
  const top = SERVICES.slice(0, 6);
  return (
    <>
      <Hero />

      <section className="py-5">
        <div className="container">
          {/* Title Row */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-3">
            <h2 className="section-title fs-2 fs-md-1 mb-2 mb-md-0">
              Our Popular Services:
            </h2>
            <Link
              to="/services"
              className="btn btn-outline-secondary btn-sm"
            >
              See all
            </Link>
          </div>

          {/* Service Cards */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {top.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
