import jsPDF from "jspdf";
import brand from "../config/brand"; // তোমার লোগো/নেম এখানে কনফিগ করা যাবে

export default function generateReceipt(receipt) {
  const doc = new jsPDF("p", "mm", "a4");
  const margin = 10;
  const boxW = 100, boxH = 140;
  const x = margin, y = margin;

  // Border box
  doc.roundedRect(x, y, boxW, boxH, 3, 3);

  // Header
  doc.setFontSize(14).setFont("helvetica", "bold");
  doc.text(brand.name || "Mehus Makeover Salon & Cosmetics", x + 5, y + 10);

  doc.setFontSize(9).setFont("helvetica", "normal");
  doc.text(`${brand.address || ""} | ${brand.phone || ""}`, x + 5, y + 18);

  let cy = y + 30;
  const row = (label, value) => {
    doc.setFont("helvetica", "bold").text(`${label}:`, x + 5, cy);
    doc.setFont("helvetica", "normal").text(String(value ?? ""), x + 35, cy);
    cy += 6;
  };

  row("Receipt #", receipt.id);
  row("Date", new Date(receipt.created_at || Date.now()).toLocaleDateString());
  row("Customer", receipt.customer_name);
  row("Phone", receipt.phone);
  row("Service", receipt.service);
  row("Total", `${receipt.total} TK`);
  row("Advance", `${receipt.advance} TK`);
  row("Due", `${receipt.due} TK`);

  cy += 10;
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for choosing us 💖", x + 5, cy);

  return doc;
}
