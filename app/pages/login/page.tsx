
import LoginForm from './login.client';
import { Logout } from './login.client';

export default function Support() {
    return (
        <div className="container">
            <LoginForm />
            <footer className="footer">
                © 2024 כל הזכויות שמורות.
            </footer>
        </div>
    );
}
