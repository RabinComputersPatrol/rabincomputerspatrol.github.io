import Head from 'next/head';
import { useRef } from 'react';
import { useTheme } from 'next-themes';


export default function Support() {
    const formRef = useRef<HTMLFormElement>(null);
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
        const formData = new FormData(formRef.current);
        const roomNumber = formData.get('roomNumber');
        const phoneNumber = formData.get('phoneNumber');
        const name = formData.get('name');
        const problemDescription = formData.get('problemDescription');

        formRef.current?.reset
        }
    };


    const formatPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;
        if (inputValue.length > 12) {
            inputValue = inputValue.slice(0, 12);
        }
        if (inputValue.length === 3 || inputValue.length === 7) {
            inputValue += '-';
        }
        event.target.value = inputValue;
        return inputValue;
    };
    
    const formatRoomNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, ''); 
        if (inputValue.length > 3) {
            inputValue = inputValue.slice(0, 3); 
        }
        event.target.value = inputValue;
        return inputValue;
    };
    

    return (
        <div className="support-page">
            <Head>
                <title>טופס בעיות מחשבים</title>
            </Head>
            <h1 className="title">טופס בעיות מחשבים</h1>
            <img src="./rabin-logo.png" alt="Rabin Logo" className='logo'/>
            <form ref={formRef} onSubmit={handleSubmit} className="support-form">
                <label htmlFor="roomNumber">מספר החדר/הכיתה:</label>
                <input type="number" id="roomNumber" name="roomNumber" placeholder="דוגמה: 26" required 
                onInput={formatRoomNumber} aria-label="Room Number" autoComplete="off" inputMode="numeric" />

                <label htmlFor="phoneNumber" dir="rtl">מספר טלפון:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="דוגמה: 123-456-7890" dir="rtl" 
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required onInput={formatPhoneNumber} aria-label="Phone Number" 
                autoComplete="off"/>

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
