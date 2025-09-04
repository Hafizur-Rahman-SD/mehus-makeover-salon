
import jsPDF from "jspdf";

export default function generateReceipt(booking) {
  const doc = new jsPDF("p", "mm", "a4");
  
  // A4 page 210mm wide → 1/4 অংশ ধরবো
  doc.setFontSize(14);
  doc.text("💇‍♀️ Mehus Makeover Salon & Cosmetics", 10, 20);
  doc.setFontSize(10);
  doc.text("Customer Receipt", 10, 30);

  doc.line(10, 35, 200, 35); // separator

  // Booking Info
  doc.text(`Name: ${booking.name}`, 10, 45);
  doc.text(`Service: ${booking.service}`, 10, 55);
  doc.text(`Date: ${booking.date}   Time: ${booking.time}`, 10, 65);
  doc.text(`Phone: ${booking.phone}`, 10, 75);

  // Billing Info
  doc.text(`Advance: ${booking.advance} TK`, 10, 90);
  doc.text(`Due: ${booking.due} TK`, 10, 100);
  doc.text(`Total: ${booking.total} TK`, 10, 110);

  doc.line(10, 120, 200, 120);
  doc.text("Thank you for choosing us 💖", 10, 130);

  doc.save(`receipt_${booking.id}.pdf`);
}
