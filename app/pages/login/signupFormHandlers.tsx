import React from 'react';
import { signInWithEmailAndPassword, signOut,getAuth } from "firebase/auth";

export const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formRef: React.RefObject<HTMLFormElement>) => {
  event.preventDefault();
  if (formRef.current) {
    const formData = new FormData(formRef.current);
    // Directly access email and password as strings
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log({ email, password });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    formRef.current.reset();
  }
};