import { NavLink, Link } from "react-router-dom";


export default function Navbar() {
return (
<nav className="navbar navbar-expand-lg  border-bottom sticky-top py-3 " style={{backgroundColor: "#ffe6f0"}}>
<div className="container-fluid" >
<Link className="navbar-brand fw-bold text-primary fs-1" to="/">
<i className="bi bi-stars me-2"/>Mehu's Makeover Salon & Cosmetics
</Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
<span className="navbar-toggler-icon " />
</button>
<div className="collapse navbar-collapse" id="mainNav ">
<ul className="navbar-nav ms-auto align-items-lg-center">
{[
["Home", "/"],
["About", "/about"],
["Services", "/services"],
["Offers", "/offers"],
["Gallery", "/gallery"],
["Booking", "/booking"],
["Reviews", "/reviews"],
["Contact", "/contact"],
].map(([label, to]) => (
<li className="nav-item  fs-3 mx-2" key={to}>
<NavLink className={({isActive}) => `nav-link ${isActive ? "text-primary fw-semibold " : ""}`} to={to} end>
{label}
</NavLink>
</li>
))}
</ul>
<div className="ms-lg-3  ">
<a className="btn btn-primary" href="https://www.facebook.com/people/Mehus-Makeover-salon/61579639642397/" target="_blank" rel="noreferrer">
<i className="bi bi-facebook me-2 fs-3"/>Facebook Page
</a>
</div>
</div>
</div>
</nav>
);
}