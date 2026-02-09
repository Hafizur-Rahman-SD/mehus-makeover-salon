import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL missing in .env");
}

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requires SSL in most hosted environments
  ssl: { rejectUnauthorized: false }
});

// Optional: test connection once on boot
(async () => {
  try {
    const res = await db.query("SELECT NOW() as now");
    console.log("✅ Supabase Postgres Connected:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

export default db;
