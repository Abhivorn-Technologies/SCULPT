import { IReceiptData } from "@/app/receipt/[id]/ReceiptClient";

/**
 * Dynamically loads jsPDF from CDN without adding heavy dependencies to bundle.
 */
export function loadJsPdf(): Promise<any> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }

    if ((window as any).jspdf?.jsPDF) {
      resolve((window as any).jspdf.jsPDF);
      return;
    }

    const existing = document.querySelector('script[src*="jspdf.umd.min.js"]');
    if (existing) {
      existing.addEventListener("load", () => {
        resolve((window as any).jspdf?.jsPDF);
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    script.onload = () => {
      resolve((window as any).jspdf?.jsPDF);
    };
    script.onerror = () => {
      console.warn("Failed to load jsPDF CDN, falling back to window.print()");
      resolve(null);
    };
    document.body.appendChild(script);
  });
}

/**
 * Generates an official, pixel-perfect branded PDF invoice directly in memory
 * and triggers a direct browser file download to the user's Downloads folder.
 * (Zero print dialog, zero canvas, zero CSS color errors).
 */
export async function downloadDirectInvoicePdf(receipt: IReceiptData): Promise<boolean> {
  try {
    const jsPDF = await loadJsPdf();
    if (!jsPDF) {
      window.print();
      return false;
    }

    // A4 dimensions in points: 595.28 x 841.89
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const primaryColor = [230, 102, 58]; // #E6663A (Sculpt Orange)
    const darkColor = [21, 21, 21];      // #151515
    const grayColor = [102, 102, 102];   // #666666
    const lightBg = [248, 246, 242];     // #F8F6F2
    const emeraldColor = [16, 149, 100]; // Green

    // 1. Top Decorative Brand Bar
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 595.28, 8, "F");

    // 2. Header: Clinic Brand
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("THE SCULPT AESTHETICS", 40, 48);

    doc.setFontSize(8);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("CLINICAL EXCELLENCE IN DERMATOLOGY, TRICHOLOGY & AESTHETICS", 40, 62);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("1st Floor, Sri Rama Arcade, Beside ICICI Bank, Pragathi Nagar, Hyderabad - 500090", 40, 76);
    doc.text("Phone: +91 96396 35454 | Email: thesculptaesthetics@gmail.com", 40, 88);

    // 3. Invoice Badge & Metadata (Right Aligned)
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.roundedRect(380, 28, 175, 70, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
    doc.text("PAYMENT CONFIRMED", 395, 48);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("Invoice Number:", 395, 63);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(receipt.invoiceNumber, 395, 75);

    const formattedDate = new Date(receipt.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedTime = new Date(receipt.createdAt).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(`Date: ${formattedDate}, ${formattedTime}`, 395, 88);

    // Divider
    doc.setDrawColor(239, 232, 224);
    doc.line(40, 110, 555, 110);

    // 4. Patient Information Box
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("PATIENT INFORMATION", 40, 130);

    doc.setFontSize(11);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(receipt.fullName, 40, 146);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(`Phone: ${receipt.phone}`, 40, 160);
    if (receipt.email) {
      doc.text(`Email: ${receipt.email}`, 40, 172);
    }

    // 5. Transaction & Gateway Information (Right side)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("PAYMENT GATEWAY DETAILS", 340, 130);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("Gateway: Razorpay 256-bit Secure Gateway", 340, 146);
    if (receipt.razorpayPaymentId) {
      doc.text(`Payment ID: ${receipt.razorpayPaymentId}`, 340, 160);
    }
    if (receipt.razorpayOrderId) {
      doc.text(`Order ID: ${receipt.razorpayOrderId}`, 340, 172);
    }

    // Divider
    doc.line(40, 195, 555, 195);

    // 6. Service / Consultation Itemized Table Header
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.rect(40, 205, 515, 24, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("DESCRIPTION", 50, 220);
    doc.text("STANDARD FEE", 330, 220);
    doc.text("DISCOUNT", 420, 220);
    doc.text("NET PAID", 495, 220);

    // Table Content Row
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("Doctor Consultation & Aesthetic Evaluation", 50, 248);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(`Service Focus: ${receipt.service}`, 50, 262);
    if (receipt.message) {
      const truncatedNote = receipt.message.length > 60 ? receipt.message.slice(0, 57) + "..." : receipt.message;
      doc.text(`Patient Goal: "${truncatedNote}"`, 50, 274);
    }

    const discountAmount = Math.max(0, receipt.originalFee - receipt.amountPaid);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(`Rs. ${receipt.originalFee.toLocaleString("en-IN")}`, 330, 252);

    doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
    doc.text(discountAmount > 0 ? `-Rs. ${discountAmount.toLocaleString("en-IN")}` : "0", 420, 252);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`Rs. ${receipt.amountPaid.toLocaleString("en-IN")}`, 495, 252);

    // Table Bottom Border
    doc.line(40, 290, 555, 290);

    // 7. Total Breakdown Card
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.roundedRect(340, 305, 215, 95, 6, 6, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("Consultation Subtotal:", 355, 325);
    doc.text(`Rs. ${receipt.originalFee.toLocaleString("en-IN")}`, 495, 325);

    if (discountAmount > 0) {
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.text(`Website Courtesy (${receipt.discountPercent}%):`, 355, 340);
      doc.text(`-Rs. ${discountAmount.toLocaleString("en-IN")}`, 495, 340);
    }

    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("Taxes (GST):", 355, 355);
    doc.text("Included", 495, 355);

    doc.setDrawColor(220, 215, 205);
    doc.line(355, 365, 540, 365);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("TOTAL AMOUNT PAID:", 355, 385);
    doc.text(`Rs. ${receipt.amountPaid.toLocaleString("en-IN")}`, 485, 385);

    // 8. Included Privileges Box (Left of Total)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("Priority Consultation Privileges Included:", 40, 320);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("- Direct 1-on-1 evaluation with certified aesthetic dermatologists.", 40, 335);
    doc.text("- Personalized skin, hair or facial assessment & treatment roadmap.", 40, 348);
    doc.text("- Dedicated care coordinator assistance for booking schedule.", 40, 361);
    doc.text("- Balance Due: Rs. 0.00 (Fully Settled Online via Razorpay).", 40, 374);

    // 9. Digital Stamp & Security Verification
    doc.setDrawColor(230, 102, 58);
    doc.roundedRect(40, 420, 240, 50, 6, 6, "D");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("THE SCULPT AESTHETICS", 55, 440);
    doc.setFontSize(7.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("AUTHORIZED DIGITAL CLINICAL STAMP", 55, 455);

    // 10. Footer Instructions
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("Clinic Instructions:", 40, 500);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text("Please show this digital receipt or printed slip at the front desk when arriving for your consultation.", 40, 513);
    doc.text("To reschedule or adjust appointment timing, kindly contact +91 96396 35454 at least 4 hours in advance.", 40, 524);
    doc.text("This computer-generated document is officially validated under The Sculpt Aesthetics consultation records.", 40, 535);

    // Bottom Decorative Bar
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 833.89, 595.28, 8, "F");

    // SAVE DIRECT FILE TO DOWNLOADS FOLDER!
    const cleanFileName = `Invoice_${receipt.invoiceNumber}_${receipt.fullName.replace(/\s+/g, "_")}.pdf`;
    doc.save(cleanFileName);

    return true;
  } catch (err) {
    console.error("Direct PDF generation error:", err);
    window.print();
    return false;
  }
}
