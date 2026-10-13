import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateExecutiveBriefPdfFromElement(element: HTMLElement): Promise<jsPDF> {
  // Captura el elemento con scale 1.5 para mantener nitidez de texto y gráficos sin disparar el peso
  const canvas = await html2canvas(element, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: '#FFFFFF',
    logging: false
  });

  // Usamos JPEG a 0.85 de calidad para comprimir la imagen a ~200-300KB en vez de 8MB de PNG crudo
  const imgData = canvas.toDataURL('image/jpeg', 0.85);

  // Dimensiones del PDF en A4
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Añadir la imagen comprimida
  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

  return pdf;
}
