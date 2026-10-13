import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateExecutiveBriefPdfFromElement(element: HTMLElement): Promise<jsPDF> {
  // Capture the element using html2canvas
  // We use scale: 2 for retina quality
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FFFFFF',
    logging: false
  });

  const imgData = canvas.toDataURL('image/png');

  // Calculate PDF dimensions (A4 size)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Add the image to the PDF
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  return pdf;
}
