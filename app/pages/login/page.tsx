
import LoginForm from './login.client';
import { Logout } from './login.client';

// import { SignupLogin } from './signup.client';
export default function Support() {
  return (
    <div>
      {/* <SignupLogin/> */}
      <LoginForm />
      <Logout/>
      <footer className="footer">
        © 2024 נועם ולט. כל הזכויות שמורות.
      </footer>
    </div>
  );
}
