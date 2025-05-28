const BASE_URL = import.meta.env.VITE_API_URL;

export async function downloadReportPDF(mese, anno) {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/report/pdf?mese=${mese}&anno=${anno}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Errore nel download del PDF");
  }

  const blob = await response.blob();
  const urlBlob = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = urlBlob;
  a.download = `report_${mese}_${anno}.pdf`;
  a.click();
  window.URL.revokeObjectURL(urlBlob);
}

export async function downloadReportExcel(mese, anno) {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/api/report/excel?mese=${mese}&anno=${anno}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Errore nel download dell'Excel");
  }

  const blob = await response.blob();
  const urlBlob = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = urlBlob;
  a.download = `report_${mese}_${anno}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(urlBlob);
}
