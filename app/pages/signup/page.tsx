import SupportPage from './signup.server.';
import SignupForm from './signup.client';

export default function Support() {
  return (
    <div>
      <SignupForm />
      <footer className="footer">
        © 2024 נועם ולט. כל הזכויות שמורות.
      </footer>
    </div>
  );
}
