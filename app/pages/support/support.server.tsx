import rabinLogoSmall from "../../public/assets/rabin-logo-small.png";
import rabinLogo from "../../public/assets/rabin-logo.png";
import { HomeButton } from "./support.client";
import { Login } from './support.client';

export default function SupportPage() {
  return (
    <div className="support-page">
      <div className="big-title-container">
        {/* <HomeButton />
        <Login /> */}
        <div className='title-container'>
          <h1 className="title">טופס בעיות מחשבים</h1>
          <div>
            <img src={rabinLogo.src} alt="Rabin Logo" className='logo-big' />
            <img src={rabinLogoSmall.src} alt="Rabin Logo Small" className='logo-small' />
          </div>
        </div>
      </div>
    </div>
  );
}

