import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateMonthlyReportPDF(orders = [], settings = {}, monthName = '') {
  const doc = new jsPDF('p', 'mm', 'a4');
  const now = new Date();
  const currentMonthStr = monthName || now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Calculations
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const codOrders = orders.filter(o => o.paymentMethod === 'cod');
  const codAmount = codOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const bkashOrders = orders.filter(o => o.paymentMethod === 'bkash');
  const bkashAmount = bkashOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const totalDeliveryFees = orders.reduce((sum, o) => sum + (Number(o.deliveryFee) || 0), 0);

  // 1. Header Banner (Jet Black Brand Background)
  doc.setFillColor(11, 15, 25); // #0B0F19
  doc.rect(0, 0, 210, 42, 'F');

  // Accent Line
  doc.setFillColor(6, 182, 212); // #06B6D4 Cyan
  doc.rect(0, 41, 210, 1.5, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('GALAXY GADGETS', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('PREMIUM GADGETS & ELECTRONICS STORE', 14, 24);
  doc.text(`Email: ${settings.email || 'gadgetsgalaxy2026gg@gmail.com'} | Hotline: ${settings.hotline || '+880 1322-302319'}`, 14, 30);
  doc.text(`Location: ${settings.address || 'Bangladesh'} | bKash Personal: ${settings.bkashNumber || '01749765271'}`, 14, 35);

  // Document Title Box (Right Top)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(34, 197, 94); // Emerald 500
  doc.text('MONTHLY REPORT', 196, 18, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(currentMonthStr, 196, 25, { align: 'right' });

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 196, 31, { align: 'right' });

  // 2. Financial Metrics Summary Cards
  let yPos = 50;

  // Background box for summary
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.roundedRect(14, yPos, 182, 32, 3, 3, 'FD');

  // 4 KPI Summary Columns
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);

  // Col 1: Total Orders
  doc.text('TOTAL ORDERS', 22, yPos + 10);
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(totalOrders.toString(), 22, yPos + 22);

  // Col 2: Gross Sales
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('TOTAL REVENUE', 68, yPos + 10);
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129); // Emerald 600
  doc.text(`BDT ${totalRevenue.toLocaleString()}`, 68, yPos + 22);

  // Col 3: COD vs bKash
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('PAYMENT BREAKDOWN', 125, yPos + 10);
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`COD: BDT ${codAmount.toLocaleString()} (${codOrders.length})`, 125, yPos + 18);
  doc.setTextColor(226, 19, 110); // bKash Pink
  doc.text(`bKash: BDT ${bkashAmount.toLocaleString()} (${bkashOrders.length})`, 125, yPos + 25);

  // Col 4: Delivery Fees
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('DELIVERY CHARGES', 165, yPos + 10);
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`BDT ${totalDeliveryFees.toLocaleString()}`, 165, yPos + 22);

  // 3. Orders Table
  const tableRows = orders.map((o, idx) => {
    const itemsSummary = (o.items || [])
      .map(item => `${item.product?.name || 'Item'} (x${item.quantity}) [${item.selectedColor || 'Standard'}]`)
      .join('\n');

    const paymentInfo = o.paymentMethod === 'bkash'
      ? `bKash\nSender: ${o.bkashSender || 'N/A'}\nTrxID: ${o.bkashTrxId || 'N/A'}`
      : 'Cash On Delivery';

    return [
      idx + 1,
      o.orderTrackingId || o.id || 'N/A',
      `${o.customerName || 'N/A'}\n${o.phone || ''}`,
      `${o.address || 'N/A'}\nZone: ${o.deliveryZone === 'outside_dhaka' ? 'Outside Dhaka' : 'Inside Dhaka'}`,
      itemsSummary || 'N/A',
      paymentInfo,
      o.status || 'Pending',
      `BDT ${(Number(o.totalAmount) || 0).toLocaleString()}`
    ];
  });

  autoTable(doc, {
    startY: yPos + 40,
    head: [['#', 'Order ID', 'Customer', 'Delivery Address', 'Ordered Items', 'Payment', 'Status', 'Total']],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      cellPadding: 2.5
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 8 },
      1: { fontStyle: 'bold', halign: 'center', cellWidth: 20 },
      2: { cellWidth: 26 },
      3: { cellWidth: 32 },
      4: { cellWidth: 42 },
      5: { cellWidth: 24 },
      6: { halign: 'center', cellWidth: 16 },
      7: { halign: 'right', fontStyle: 'bold', cellWidth: 18 }
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { left: 14, right: 14 }
  });

  // Footer & Disclaimer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Galaxy Gadgets Confidential Financial Statement | Page ${i} of ${pageCount} | Agency: Webcraft BD`,
      105,
      290,
      { align: 'center' }
    );
  }

  // Trigger download
  const cleanFilename = `Galaxy_Gadgets_Sales_Report_${currentMonthStr.replace(/\s+/g, '_')}.pdf`;
  doc.save(cleanFilename);
}
