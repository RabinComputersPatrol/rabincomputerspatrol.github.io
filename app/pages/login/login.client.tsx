"use client"

import React from 'react';
import { useRef } from 'react';
import { handleSubmit } from './loginFormHandlers';
import { auth } from '@/app/api/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form ref={formRef} onSubmit={(event) => handleSubmit(event, formRef)} className="login-form">
            <label htmlFor="name" className='input-field' dir="ltr">:שם</label>
            <input type="text" id="name" name="name" placeholder="Joe125@cooljoe.com" required
                autoComplete="off" className='input-field' />

            <label htmlFor="password" dir="ltr">:סיסמה</label>
            <input type="password" id="password" name="password" placeholder="JoeTheKing125" dir="ltr"
                required autoComplete="off" className='input-field' minLength={6} />

            <button type="submit" className='input-field'>אישור</button>
        </form>
    );
}

export const Logout = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
            router.replace("/pages/support");
        } catch (error: any) {
            console.error('Error signing out:', error.message);
            // Handle error gracefully, show to the user if needed
        }
    };
  
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};
