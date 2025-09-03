export default function Dashboard() {
  const bookings = [
    { id: 1, name: "Nadia", service: "Bridal Makeup", date: "2025-09-01", phone: "0123456789" },
    { id: 2, name: "Rafi", service: "Haircut", date: "2025-09-02", phone: "0987654321" }
  ];

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>Recent Bookings</h5>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.name}</td>
                    <td>{b.service}</td>
                    <td>{b.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>Quick Stats</h5>
            <ul>
              <li>Total Services: 8</li>
              <li>Total Bookings: {bookings.length}</li>
              <li>Admins: 1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
