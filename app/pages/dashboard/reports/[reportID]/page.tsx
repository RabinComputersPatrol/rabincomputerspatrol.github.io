

export default function ReportDetails() {
  return <h1>Report Details:</h1>
}

export async function generateStaticParams() {
  const reports = await fetch('https://localhost:3000/pages/dashboard/reports').then((res) => res.json());

  return reports.map((report) => ({
    reportID: report.reportID,
  }))

}