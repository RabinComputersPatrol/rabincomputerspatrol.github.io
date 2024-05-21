import SupportPage from './support.server';
import SupportForm from './support.client';
import { ReportPage } from '../dashboard/reports/report';

export default function Support() {
  return (
    <div>
      <SupportPage />
      <SupportForm />
      <footer className="footer">
        © 2024 נועם ולט. כל הזכויות שמורות.
      </footer>
    </div>
  );
}
