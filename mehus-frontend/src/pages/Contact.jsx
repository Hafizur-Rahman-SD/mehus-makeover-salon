export default function Contact() {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="h3 section-title mb-3">Contact</h1>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Get in touch</h5>
                <p className="text-secondary small">
                  Phone: 01648322690 
                  <br />
                  Email: mehus makeovers@gmail.com
                  <br />
                  Address: 17/1,jononi villa,west Nakhalpara,Bonoful Road,Framgate,Dhaka
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
