import jsPDF from "jspdf";
import brand from "../config/brand";

export default function generateReceipt(r) {
  const doc = new jsPDF("p", "mm", "a4");
  const x = 10, y = 10, w = 100, h = 140;

  // Border
  doc.setDrawColor(180, 50, 100);
  doc.roundedRect(x, y, w, h, 5, 5);

  // Header
  doc.setFillColor(194, 24, 91);
  doc.rect(x, y, w, 15, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(brand.name || "Mehus Makeover Salon & Cosmetics", x + 5, y + 10);

  // Body
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  let cy = y + 25;
  const row = (label, val) => {
    doc.setFont("helvetica", "bold").text(`${label}:`, x + 5, cy);
    doc.setFont("helvetica", "normal").text(String(val || ""), x + 40, cy);
    cy += 7;
  };

  row("Receipt #", r.id);
  row("Date", new Date(r.created_at || Date.now()).toLocaleDateString());
  row("Customer", r.customer_name || r.name);
  row("Phone", r.phone);
  row("Service", r.service);
  row("Total", `${r.total || 0} TK`);
  row("Advance", `${r.advance || 0} TK`);
  row("Due", `${r.due || 0} TK`);

  // Footer
  doc.setDrawColor(194, 24, 91);
  doc.line(x + 5, y + h - 20, x + w - 5, y + h - 20);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for choosing Mehus Makeover 💖", x + 5, y + h - 10);

  doc.save(`receipt_${r.id || "new"}.pdf`);
}
