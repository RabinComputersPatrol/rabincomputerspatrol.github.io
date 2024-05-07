import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/api/firebase';

export const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formRef: React.RefObject<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        // Directly access email and password as strings
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        console.log({ email, password });
        createUserWithEmailAndPassword(auth, email ,password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });



        formRef.current.reset();
    }
};