import { useState } from "react";

export default function Services() {
  const [services, setServices] = useState([
    { id: 1, name: "Bridal Makeup", price: 6000 },
    { id: 2, name: "Haircut & Style", price: 700 },
    { id: 3, name: "Facial Spa", price: 1200 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function addService(e) {
    e.preventDefault();
    if (!name.trim() || !price) return;
    const next = { id: Math.max(0, ...services.map(s => s.id)) + 1, name: name.trim(), price: Number(price) };
    setServices([next, ...services]);
    setName(""); setPrice(""); setShowModal(false);
  }

  function deleteService(id) {
    if (!confirm("Delete this service?")) return;
    setServices(services.filter(s => s.id !== id));
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Services</h2>
        <div>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>Add Service</button>
        </div>
      </div>

      <table className="table table-striped shadow-sm">
        <thead>
          <tr><th>#</th><th>Service</th><th>Price (৳)</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.price}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteService(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog" onClick={() => setShowModal(false)}>
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <form onSubmit={addService}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Service</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Service Name</label>
                    <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price (৳)</label>
                    <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
