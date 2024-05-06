import Head from 'next/head';

export default function SupportPage() {
  return (
    <div className="support-page">
      <div className='title-container'>
        <h1 className="title">טופס בעיות מחשבים</h1>
        <img src="@/app/public/assets/rabin-logo.png" alt="Rabin Logo" className='logo-big'/>
        <img src="@/app/public/assets/rabin-logo-small.png" alt="Rabin Logo Small" className='logo-small'/>
      </div>
    </div>
  );
}
