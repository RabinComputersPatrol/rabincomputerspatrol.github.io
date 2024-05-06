import Head from 'next/head';
import rabinLogoSmall from "../../public/assets/rabin-logo-small.png";
import rabinLogo from "../../public//public/assets/rabin-logo.png";

export default function SupportPage() {
  return (
    <div className="support-page">
      <div className='title-container'>
        <h1 className="title">טופס בעיות מחשבים</h1>
        <img src={rabinLogo} alt="Rabin Logo" className='logo-big' />
        <img src={rabinLogoSmall} alt="Rabin Logo Small" className='logo-small' />
      </div>
    </div>
  );
}
