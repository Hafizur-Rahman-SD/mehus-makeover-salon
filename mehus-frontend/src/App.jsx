import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Offers from "./pages/Offers.jsx";
import Gallery from "./pages/Gallery.jsx";
import Booking from "./pages/Booking.jsx";
import Reviews from "./pages/Reviews.jsx";
import Contact from "./pages/Contact.jsx";
import Products from "./pages/Products.jsx";
import Checkout from "./pages/Checkout.jsx";


import AdminLayout from "./admin/AdminLayout.jsx";
import Login from "./admin/Login.jsx";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute.jsx";

import Dashboard from "./admin/Dashboard.jsx";
import ServicesAdmin from "./admin/Services.jsx";
import BookingsAdmin from "./admin/Bookings.jsx";
import Finance from "./admin/Finance.jsx";
import Receipts from "./admin/Receipts";
import ManageOffers from "./admin/ManageOffers.jsx";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Routes>
        {/* Public Layout */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/checkout/:orderId" element={<Checkout />} />

                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Admin Login (Public) */}
        <Route
          path="/admin/login"
          element={<Login onLogin={() => { window.location.href = "/admin"; }} />}
        />

        {/* ✅ Protected Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* ✅ /admin গেলে dashboard দেখাবে */}
            <Route index element={<Dashboard />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="bookings" element={<BookingsAdmin />} />
            <Route path="finance" element={<Finance />} />
            <Route path="receipts" element={<Receipts />} />
            <Route path="offers" element={<ManageOffers />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
