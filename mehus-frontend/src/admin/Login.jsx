import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username, password
      });
      if (res.data.success) {
        localStorage.setItem("adminUser", JSON.stringify(res.data.user));
        onLogin(true);
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Login failed");
    }
  }

  return (
    <div className="container py-5">
      <h2>Admin Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="col-md-4">
        <input type="text" className="form-control mb-2"
          placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="form-control mb-2"
          placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
