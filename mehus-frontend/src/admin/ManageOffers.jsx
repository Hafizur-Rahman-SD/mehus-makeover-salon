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
    service: "",
    otherService: "",
    terms: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  // ✅ Fetch offers + services
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/offers")
      .then((res) => setOffers(res.data))
      .catch((err) => console.error("❌ Error fetching offers:", err));

    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("❌ Error fetching services:", err));
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ Submit offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (form.service === "Other") {
        data.set("service", form.otherService);
      }

      await axios.post("http://localhost:5000/api/offers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Offer saved successfully!");

      setForm({
        title: "",
        description: "",
        price: "",
        start_date: "",
        end_date: "",
        service: "",
        otherService: "",
        terms: "",
        image: null,
      });

      const res = await axios.get("http://localhost:5000/api/offers");
      setOffers(res.data);
    } catch (err) {
      console.error("❌ Error saving offer:", err);
      alert("Error saving offer");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete offer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this offer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/offers/${id}`);
      setOffers((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error("❌ Error deleting offer:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold text-center text-primary">
        🎉 Manage Offers
      </h2>

      {/*  Offer Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg rounded-4 bg-light mb-5"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="2"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Start & End Date */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">End Date</label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Service Select */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Service</label>
            <select
              className="form-select"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Service --</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          {form.service === "Other" && (
            <div className="col-md-6">
              <label className="form-label fw-semibold">Other Service</label>
              <input
                type="text"
                className="form-control"
                name="otherService"
                value={form.otherService}
                onChange={handleChange}
                placeholder="Enter custom service"
              />
            </div>
          )}

          {/* ✅ Terms & Conditions */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Terms & Conditions</label>
            <textarea
              className="form-control"
              name="terms"
              rows="2"
              value={form.terms}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Image Upload */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Offer Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              accept="image/*"
            />
          </div>

          <div className="col-12 text-center">
            <button className="btn btn-success px-4" disabled={loading}>
              {loading ? "Saving..." : "Save Offer"}
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Offer List */}
      <h4 className="mb-3 fw-bold">📋 Current Offers</h4>
      {offers.length === 0 ? (
        <p className="text-muted">No offers available.</p>
      ) : (
        <div className="row g-4">
          {offers.map((o) => (
            <div className="col-md-4" key={o.id}>
              <div className="card shadow-lg h-100 border-0 rounded-4 p-3">
                {o.image && (
                  <img
                    src={`http://localhost:5000${o.image}`}
                    alt={o.title}
                    className="card-img-top rounded-3 mb-3"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  <h4 className="fw-bold text-primary mb-2">{o.title}</h4>
                  <p className="text-muted">{o.description}</p>

                  <p>
                    <strong>Service:</strong> {o.service || "N/A"}
                  </p>

                  <p>
                    <strong>Valid:</strong>{" "}
                    {o.start_date
                      ? new Date(o.start_date).toLocaleDateString()
                      : "—"}{" "}
                    →{" "}
                    {o.end_date
                      ? new Date(o.end_date).toLocaleDateString()
                      : "—"}
                  </p>

                  <p className="text-success fw-bold fs-5">৳ {o.price}</p>

                  {o.terms && (
                    <p className="small text-muted">
                      <strong>Terms:</strong> {o.terms}
                    </p>
                  )}

                  <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => handleDelete(o.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
