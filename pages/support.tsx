import Head from 'next/head';
import { useRef } from 'react';
import formatTime from '@/public/utils';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyBD5wyW9A1cTpErpWeS_5d_pHe3DufjXpY",
    authDomain: "computerpatrol-5c961.firebaseapp.com",
    projectId: "computerpatrol-5c961",
    storageBucket: "computerpatrol-5c961.appspot.com",
    messagingSenderId: "458287013012",
    appId: "1:458287013012:web:1c5550b31f5449c4a72881"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)


export default function Support() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const {roomNumber, phoneNumber, name, priority, problemDescription } = Object.fromEntries(formData.entries());
            const date = formatTime();
            console.log({ date, roomNumber, phoneNumber, name, priority, problemDescription });

            try {
                const docRef = await addDoc(collection(db,"reports"), {
                    date: date, 
                    roomNumber: roomNumber,
                    phoneNumber: phoneNumber,
                    name: name,
                    priority: priority,
                    problemDescription: problemDescription,           
                });
                console.log("Document written with ID: ", docRef.id);
             } catch (e) {
                console.error("Error adding document: ", e);
             }    


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
                <select name="priority" id="priority" aria-required autoComplete="off" required >   
                    <option value="" disabled selected>אנא בחר את הדחיפות של הבעיה</option>
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
