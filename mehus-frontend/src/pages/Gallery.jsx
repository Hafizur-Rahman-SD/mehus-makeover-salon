export default function Gallery() {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="h3 section-title mb-3">Gallery</h1>
        <div className="row row-cols-2 row-cols-md-3 g-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="col" key={i}>
              <img
                className="img-fluid rounded-3 shadow-sm"
                src={`https://picsum.photos/seed/mehus-${i}/600/400`}
                alt="Gallery"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
