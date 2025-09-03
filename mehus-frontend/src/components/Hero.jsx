import { Link } from "react-router-dom";


export default function Hero() {
return (
<section className="hero py-5 py-lg-6 border-bottom">
<div className="container py-4">
<div className="row align-items-center g-4">
<div className="col-lg-6">
<h1 className="display-5 fw-bold mb-5 ">Glow with confidence ✨</h1>
<p className="lead text-secondary mb-5">
Professional salon services — hair, makeup, skincare. Book your appointment online in minutes.
</p>
<div className="d-flex gap-2">
<Link to="/booking" className="btn btn-primary btn-lg">Book Appointment</Link>
<Link to="/services" className="btn btn-outline-secondary btn-lg">Browse Services</Link>
</div>
</div>
<div className="col-lg-6">
<img className="img-fluid rounded-5 shadow-sm" src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop" alt="Salon" />
</div>
</div>
</div>
</section>
);
}