import { getAllDocuments } from "./firebase";

export async function fetchReportIds() {
  try {
    // Fetch all documents from the 'reports' collection
    const reports = await getAllDocuments('reports');
    
    // Extracting IDs from the reports
    const reportIds = reports.map(report => report.id);

    return reportIds;
  } catch (error) {
    console.error("Error fetching report IDs:", error);
    return [];
  }
}
w