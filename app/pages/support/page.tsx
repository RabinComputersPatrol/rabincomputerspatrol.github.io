import SupportPage from './support.server';
import SupportForm from './support.client';
import { Login } from './support.client';

export default function Support() {
  return (
    <div>
      <SupportPage />
      <SupportForm />
      <footer className="footer">
        © 2024 נועם ולט. כל הזכויות שמורות.
        <Login/>
      </footer>
    </div>
  );
}
