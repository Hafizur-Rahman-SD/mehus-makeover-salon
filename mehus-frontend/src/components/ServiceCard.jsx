import { Link } from "react-router-dom";


export default function ServiceCard({ service }) {
const { id, name, price, description, image } = service;
return (
<div className="col">
<div className="card h-100 shadow-sm">
<img src={image} className="card-img-top" alt={name} />
<div className="card-body d-flex flex-column">
<h5 className="card-title">{name}</h5>
<p className="card-text text-secondary small flex-grow-1">{description}</p>
<div className="d-flex justify-content-between align-items-center">
<span className="fw-bold">৳{price}</span>
<Link to={`/booking?serviceId=${id}`} className="btn btn-primary btn-sm">Book</Link>
</div>
</div>
</div>
</div>
);
}