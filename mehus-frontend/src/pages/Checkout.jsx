import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Checkout() {
  const { orderId } = useParams();
  const [agree, setAgree] = useState(false);

  // demo data for now
  const order = {
    id: orderId || "TEMP-ORDER",
    amount: 850,
    currency: "BDT",
    customerName: "Customer",
    phone: "",
    address: "",
  };

  const handleProceed = async () => {
    // ✅ Frontend-only: we cannot initiate SSLCOMMERZ securely here
    alert(
      "Payment setup needs backend. UI is ready ✅\nNext: Backend will create SSL session and return gateway URL."
    );

    // Later (when backend is ready), you will do:
    // const API = import.meta.env.VITE_API_URL;
    // const res = await fetch(`${API}/api/payments/ssl/init`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ orderId: order.id })});
    // const data = await res.json();
    // window.location.href = data.gatewayUrl;
  };

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <h2 className="fw-bold mb-2" style={{ color: "#ff4081" }}>
          Checkout
        </h2>
        <p className="text-muted mb-4">
          Order ID: <span className="fw-semibold">{order.id}</span>
        </p>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold" style={{ color: "#8a5a6d" }}>
                  Total Amount
                </div>
                <div className="text-muted small">Including any applicable charges</div>
              </div>
              <div
                className="badge rounded-pill px-3 py-2"
                style={{ background: "linear-gradient(135deg,#ff85a2,#ff4081)", color: "white" }}
              >
                ৳{order.amount}
              </div>
            </div>

            <div className="alert alert-warning rounded-4 mb-4" role="alert">
              <div className="fw-semibold">Note</div>
              <div className="small">
                SSLCOMMERZ payment requires backend integration for security. This page is UI-ready now.
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="agree">
                I confirm the order details are correct
              </label>
            </div>

            <button
              className="btn w-100 py-3 fw-bold rounded-3"
              style={{
                background: "linear-gradient(135deg, #ff4081 0%, #9c27b0 100%)",
                color: "white",
                border: "none",
                opacity: agree ? 1 : 0.7,
              }}
              disabled={!agree}
              onClick={handleProceed}
            >
              Pay with SSLCOMMERZ
            </button>

            <div className="text-center mt-3">
              <small className="text-muted">bKash / Nagad / Card options will appear after gateway redirect</small>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .form-check-input:checked {
          background-color: #ff4081;
          border-color: #ff4081;
        }
      `}</style>
    </div>
  );
}
