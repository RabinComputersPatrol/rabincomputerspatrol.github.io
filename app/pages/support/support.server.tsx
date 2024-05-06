import Head from 'next/head';

export default function SupportPage() {
  return (
    <div className="support-page">
      <Head>
        <title>טופס בעיות מחשבים</title>
        <meta name="description" content="טופס למילוי לבקשת עזרה בנוגע בעיות מחשבים"></meta>
        <meta property="og:title" content="טופס בעיות מחשבים"></meta>
        <meta property="og:url" content="https://rabincomputerspatrol.github.io/support"></meta>
        <meta property="og:image" content="https://raw.githubusercontent.com/RabinComputersPatrol/rabincomputerspatrol.github.io/d464054ac77e202cf2e7faf6dcadbf3c60137d07/public/assets/rabin-logo.png"></meta>
      </Head>

      <div className='title-container'>
        <h1 className="title">טופס בעיות מחשבים</h1>
        <img src="/assets/rabin-logo.png" alt="Rabin Logo" className='logo-big'/>
        <img src="/assets/rabin-logo-small.png" alt="Rabin Logo Small" className='logo-small'/>
      </div>
      <footer className="footer">
        © 2024 נועם ולט. כל הזכויות שמורות.
      </footer>
    </div>
  );
}
