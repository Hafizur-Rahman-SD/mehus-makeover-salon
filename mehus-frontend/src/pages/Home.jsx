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
<div className="d-flex justify-content-between align-items-end mb-3">
<h2 className="section-title h1">Our Popular Services:</h2>
<Link to="/services" className="btn btn-outline-secondary btn-sm">See all</Link>
</div>
<div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
{top.map(s => <ServiceCard key={s.id} service={s} />)}
</div>
</div>
</section>
</>
);
}