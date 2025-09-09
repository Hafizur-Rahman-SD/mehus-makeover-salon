import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="pt-4 mt-5"
      style={{
        background: "linear-gradient(135deg, #ffe6f0, #fff0f6)", // soft pink
        color: "#5a3d55",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left side - Contact info */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold mb-2 fs-5 fs-md-4 text-pink">
              Contact Us
            </h5>
            <p className="mb-1 fs-6 fs-md-5">📍 House 123, Road 4, Dhaka, Bangladesh</p>
            <p className="mb-1 fs-6 fs-md-5">📞 +880 1777236613,01605135004</p>
            <p className="mb-0 fs-6 fs-md-5">✉️ info@mehusmakeover.com</p>
          </div>

          {/* Right side - Social media */}
          <div className="col-12 col-md-6 text-md-end text-center">
            <h5 className="fw-bold mb-2 fs-5 fs-md-4 text-pink">
              Follow Us
            </h5>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="me-3 fs-4"
              style={{ color: "#d63384" }}
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="me-3 fs-4"
              style={{ color: "#e91e63" }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              className="me-3 fs-4"
              style={{ color: "#25d366" }}
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="fs-4"
              style={{ color: "#ff0000" }}
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="text-center pt-3 mt-3 fs-6 fs-md-5"
          style={{ borderTop: "1px solid #ffd6e9" }}
        >
          © 2025 <strong>Mehus Makeover</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
