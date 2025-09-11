import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    start_date: "",
    end_date: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  const loadOffers = () => {
    axios.get("http://localhost:5000/api/offers")
      .then(res => setOffers(res.data))
      .catch(err => console.error("❌ Error loading offers:", err));
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (editingId) {
      // ✅ Update
      axios.put(`http://localhost:5000/api/offers/${editingId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          loadOffers();
          resetForm();
        })
        .catch(err => console.error("❌ Error updating offer:", err));
    } else {
      // ✅ Create
      axios.post("http://localhost:5000/api/offers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          loadOffers();
          resetForm();
        })
        .catch(err => console.error("❌ Error creating offer:", err));
    }
  };

  const handleEdit = (offer) => {
    setForm({
      title: offer.title,
      description: offer.description,
      price: offer.price,
      start_date: offer.start_date,
      end_date: offer.end_date,
      image: null,
    });
    setEditingId(offer.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    axios.delete(`http://localhost:5000/api/offers/${id}`)
      .then(() => loadOffers())
      .catch(err => console.error("❌ Error deleting offer:", err));
  };

  const resetForm = () => {
    setForm({ title: "", description: "", price: "", start_date: "", end_date: "", image: null });
    setEditingId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manage Offers</h2>

      {/* Offer Form */}
      <form className="mb-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" name="title" className="form-control"
              placeholder="Offer Title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="number" name="price" className="form-control"
              placeholder="Price" value={form.price} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="file" name="image" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input type="date" name="start_date" className="form-control"
              value={form.start_date} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input type="date" name="end_date" className="form-control"
              value={form.end_date} onChange={handleChange} />
          </div>
          <div className="col-12">
            <textarea name="description" className="form-control"
              placeholder="Description" value={form.description} onChange={handleChange} />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-primary">{editingId ? "Update Offer" : "Save Offer"}</button>
            {editingId && (
              <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Offer List */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Start - End</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">No offers found</td>
            </tr>
          ) : (
            offers.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.title}</td>
                <td>৳ {o.price}</td>
                <td>{o.start_date} → {o.end_date}</td>
                <td>
                  {o.image && (
                    <img src={`http://localhost:5000${o.image}`} alt="offer" style={{ width: "80px" }} />
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(o)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(o.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
