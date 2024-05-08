import React from 'react';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { addUser, auth, getAllDocuments } from '@/app/api/firebase';
import { convertHebrewToEnglish, getEmailWithoutProvider } from '@/app/utils';

export const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formRef: React.RefObject<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        // Directly access name/email and password as strings
        var baseName = formData.get('name')! as string;
        const name = baseName.replace(/ /g, "_");   
        var basePassword = formData.get('password')! as string;
        const password = convertHebrewToEnglish(basePassword);
        let email;
        let username;
        if (name != null && name.includes("@")) {
         email = name;
         username = getEmailWithoutProvider(email)!; 
        } else {
          email = convertHebrewToEnglish(name)!+"@rabincomputerpatrol.com";
          username = getEmailWithoutProvider(email)!; 
        }

        console.log({ email, password });   

        const users = await getAllDocuments("users");
        for (const user of users) {
            if (user.id == username) {
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                });
                formRef.current.reset();
                return;
            }
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                addUser("users",{
                    name: baseName,
                    email: email,
                    password: password
                },username)
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
        formRef.current.reset();
    }
};