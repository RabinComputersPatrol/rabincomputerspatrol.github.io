import React, { useRef } from 'react';
import formatDate from '../../utils';
import { db } from '../../firebase/connection';
import { collection, getDoc, setDoc, doc } from "firebase/firestore";


/***
 * @param event The event you want to handle
 * @param formRef The form you want to handle, it should be a React.RefObject<HTMLFormElement>
 * 
 */
export const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formRef: React.RefObject<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        const { roomNumber, phoneNumber, name, priority, problemDescription } = Object.fromEntries(formData.entries());
        const date = formatDate();
        console.log({ date, roomNumber, phoneNumber, name, priority, problemDescription });

        // Debugging: Log the data being sent to Firestore
        console.log("Data to be written to Firestore:", {
            date: date, 
            roomNumber: parseInt(roomNumber.toString()),
            phoneNumber: phoneNumber,
            name: name,
            priority: parseInt(priority.toString()),
            problemDescription: problemDescription,   
            completed: false,        
        });

        const docRef = doc(db,"backend data","Main");
        const docSnap = await getDoc(docRef);
        var lastID = 0;


        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            lastID = docSnap.get("last-report-id");
          } else {
            console.log("No such document!");
          }

        try {
            const docRef = await setDoc(doc(db, "reports", lastID.toString()), {
                date: date, 
                roomNumber: parseInt(roomNumber.toString()),
                phoneNumber: phoneNumber,
                name: name,
                priority: parseInt(priority.toString()),
                problemDescription: problemDescription,
                completed: false,
            });

            const backendDoc = await setDoc(doc(db, "backend data", "Main"), {
                "last-report-id": lastID+1 
            });


            console.log("Document written with ID: ", lastID);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        formRef.current.reset();
    }
};


export const formatPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, '').slice(0, 12);
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    event.target.value = inputValue;
};

export const formatRoomNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, '').slice(0, 3);
    event.target.value = inputValue;
};