import SupportPage from './login.server';
import SupportForm from './login.client';
import { Signup } from './login.client';

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
