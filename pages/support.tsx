import Head from 'next/head';
import { useRef } from 'react';

export default function Support() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const { roomNumber, phoneNumber, name, problemDescription } = Object.fromEntries(formData.entries());
            console.log({ roomNumber, phoneNumber, name, problemDescription });
            formRef.current.reset();
        }
    };

    const formatPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value.replace(/\D/g, '').slice(0, 12);
        inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        event.target.value = inputValue;
    };

    const formatRoomNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value.replace(/\D/g, '').slice(0, 3);
        event.target.value = inputValue;
    };

    return (
        <div className="support-page">
            <Head>
                <title>טופס בעיות מחשבים</title>
                <meta name="description" content="טופס למילוי לבקשת עזרה בנוגע בעיות מחשבים"></meta>
                <meta property="og:title" content="טופס בעיות מחשבים"></meta>
                <meta property="og:url" content="https://rabincomputerspatrol.github.io/support"></meta>
                <meta property="og:image" content="https://github.com/RabinComputersPatrol/rabincomputerspatrol.github.io/blob/d464054ac77e202cf2e7faf6dcadbf3c60137d07/public/assets/rabin-logo.png"></meta>
            </Head>

            <div className='title-container'>
            <h1 className="title">טופס בעיות מחשבים</h1>
            <img src="/assets/rabin-logo.png" alt="Rabin Logo" className='logo-big'/>
            <img src="/assets/rabin-logo-small.png" alt="Rabin Logo Small" className='logo-small'/>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="support-form">
                <label htmlFor="roomNumber">מספר החדר/הכיתה:</label>
                <input type="text" id="roomNumber" name="roomNumber" placeholder="דוגמה: 26" required
                    onInput={formatRoomNumber} aria-label="Room Number" autoComplete="off" inputMode="numeric" />

                <label htmlFor="phoneNumber" dir="rtl">מספר טלפון:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="דוגמה: 123-456-7890" dir="rtl"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required onInput={formatPhoneNumber} aria-label="Phone Number"
                    autoComplete="off" />

                <label htmlFor="name">שם:</label>
                <input type="text" id="name" name="name" placeholder="הזן שם" required aria-label="Name" autoComplete="off" />

                <label htmlFor="priority">דחיפות:</label>
                <select name="priority" id="priority" aria-required autoComplete="off" >
                    <option value="5">דחוף מאוד</option>
                    <option value="4">דחוף</option>
                    <option value="3">חשוב</option>
                    <option value="2">רגיל</option>
                    <option value="1">לא דחוף</option>
                </select>

                <label htmlFor="problemDescription">תיאור הבעיה:</label>
                <textarea id="problemDescription" name="problemDescription"
                    placeholder="תאר את הבעיה" style={{ resize: 'none', fontFamily: 'Open Sans, sans-serif' }}
                    autoComplete="off" aria-label="Problem Description"></textarea>

                <button type="submit">אישור</button>
            </form>

            <footer className="footer">
                © 2024 נועם ולט. כל הזכויות שמורות.
            </footer>
        </div>
    );
}
