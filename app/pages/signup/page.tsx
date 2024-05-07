import SupportPage from './signup.server.';
import SupportForm from './signup.client';
import { Login } from './signup.client';

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
