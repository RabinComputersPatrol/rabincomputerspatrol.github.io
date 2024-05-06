"use client"

import React from 'react';
import { useRef } from 'react';
import { formatPhoneNumber, formatRoomNumber, handleSubmit } from './supportFormHandlers';

export default function SupportForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
<form ref={formRef} onSubmit={(event) => handleSubmit(event, formRef)} className="support-form">
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
    <select name="priority" id="priority" aria-required autoComplete="off" required  defaultValue={'DEFAULT'}>   
        <option value="DEFAULT" disabled >אנא בחר את הדחיפות של הבעיה</option>
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
  );
}
