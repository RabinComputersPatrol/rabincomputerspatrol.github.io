import rabinLogoSmall from "../../public/assets/rabin-logo-small.png";
import rabinLogo from "../../public/assets/rabin-logo.png";
import Image from 'next/image';

export default function SupportPage() {
  return (
    <div className="support-page">
      <div className='title-container'>
        <h1 className="title">טופס בעיות מחשבים</h1>
        <Image src={rabinLogo.src} alt="Rabin Logo" className='logo-big'/>
        <Image src={rabinLogoSmall.src} alt="Rabin Logo Small" className='logo-small' />
      </div>
    </div>
  );
}
