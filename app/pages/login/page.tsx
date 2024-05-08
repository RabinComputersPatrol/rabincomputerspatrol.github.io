
import SignupForm from './signup.client';
import { Logout } from './signup.client';
import { SignupLogin } from './signup.client';
export default function Support() {
  return (
    <div>
      <SignupLogin/>
      <SignupForm />
      <Logout/>
      <footer className="footer">
        © 2024 נועם ולט. כל הזכויות שמורות.
      </footer>
    </div>
  );
}
