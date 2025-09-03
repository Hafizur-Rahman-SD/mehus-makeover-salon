import { useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Nadia", rating: 5, comment: "Amazing bridal makeup!" },
    { id: 2, name: "Rafi", rating: 4, comment: "Great haircut and friendly staff." }
  ]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [ok, setOk] = useState(null);

  function addReview(e) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setOk({ type: "danger", msg: "Name and comment are required." });
      return;
    }
    const next = { id: Math.max(0, ...reviews.map(r => r.id)) + 1, name: name.trim(), rating: Number(rating), comment: comment.trim() };
    setReviews([next, ...reviews]);
    setName(""); setRating(5); setComment("");
    setOk({ type: "success", msg: "Thank you — your review is added." });
    setTimeout(() => setOk(null), 2500);
  }

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="h3 section-title mb-3">Customer Reviews</h1>
        {ok && <div className={`alert alert-${ok.type}`}>{ok.msg}</div>}

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <form onSubmit={addReview} className="card p-3">
              <h5 className="mb-3">Leave a Review</h5>
              <input className="form-control mb-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              <select className="form-select mb-2" value={rating} onChange={(e) => setRating(e.target.value)}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
              </select>
              <textarea className="form-control mb-2" rows="4" placeholder="Your review" value={comment} onChange={(e) => setComment(e.target.value)} required />
              <button className="btn btn-primary" type="submit">Submit Review</button>
            </form>
          </div>

          <div className="col-md-6">
            <div className="row g-3">
              {reviews.map(r => (
                <div className="col-12" key={r.id}>
                  <div className="card p-3">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <strong>{r.name}</strong>
                      <small>{'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</small>
                    </div>
                    <p className="mb-0 text-secondary">{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
