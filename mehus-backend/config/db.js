import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",            // in XAMPP  default password is empty 
  database: "mehus_makeover"  // your DB Name here
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected to mehus_makeover...");
});

export default db;
