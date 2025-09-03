export default function About() {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="h3 section-title mb-3">About Us</h1>
        <p className="text-secondary">
          We are a passionate salon team focused on quality services and a delightful experience. 
          Our mission is to help you look and feel your best.
        </p>

        <div className="row g-3 mt-3">
          {[1, 2, 3].map(i => (
            <div className="col-md-4" key={i}>
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top"
                  src={`https://picsum.photos/seed/staff-${i}/400/300`}
                  alt={`Team member ${i}`}
                />
                <div className="card-body">
                  <h5 className="card-title">Team Member {i}</h5>
                  <p className="card-text small text-secondary">
                    Certified stylist and makeup artist.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
