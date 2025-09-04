import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3" style={{ width: "220px" }}>
        <h5 className="mb-4">Admin Panel</h5>
        <ul className="nav flex-column gap-2">
          <li>
            <Link to="/admin/dashboard" className="nav-link text-white">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/services" className="nav-link text-white">
              Services
            </Link>
          </li>
          <li>
            <Link to="/admin/bookings" className="nav-link text-white">
              Bookings
            </Link>
          </li>
          <li>
            <Link to="/admin/finance" className="nav-link text-white">
              Finance
            </Link>
          </li>

          <li className="nav-link text-white">
            <a className="nav-link" href="/admin/receipts">Receipts</a>
          </li>

        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </main>
    </div>
  );
}
