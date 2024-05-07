"use client"

import React from 'react';
import { useRef } from 'react';
import { handleSubmit } from './signupFormHandlers';
import { auth } from '@/app/api/firebase';
import { signOut } from 'firebase/auth';


export default function SignupForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form ref={formRef} onSubmit={(event) => handleSubmit(event, formRef)} className="signup-form">
            <label htmlFor="email" className='input-field' dir="ltr">Email</label>
            <input type="email" id="email" name="email" placeholder="Joe125@cooljoe.com" required
                autoComplete="off" className='input-field' />

            <label htmlFor="password" dir="ltr">Password</label>
            <input type="password" id="password" name="password" placeholder="JoeTheKing125" dir="ltr"
                required autoComplete="off" className='input-field' />

            <button type="submit" className='input-field' >אישור</button>
        </form>
    );
}
export const Logout = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
            // Optionally, redirect the user or perform other actions after logout
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
  
    return (
        <button onClick={handleLogout}>Logout</button>
    );
  };
