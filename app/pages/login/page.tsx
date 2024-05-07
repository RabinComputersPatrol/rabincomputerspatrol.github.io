import SupportPage from './signup.server.';
import SignupForm from './signup.client';
import { Logout } from './signup.client';
import Signup from './signup.server.';

export default function Support() {
  return (
    <div>
      <SignupForm />
      <Logout/>
      <Signup/>
      <footer className="footer">
        © 2024 נועם ולט. כל הזכויות שמורות.
      </footer>
    </div>
  );
}
