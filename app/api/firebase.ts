// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { app, db } from '../firebase/connection';
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    updateDoc,
    deleteDoc,
    deleteField,
    getDocs,
    addDoc,
    QuerySnapshot,
    DocumentData,
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const firestore = getFirestore(app);
const auth = getAuth(app);

export {auth}

// Write document to Firestore
export async function writeDoc(collectionName: string, data: any, docId: string = "NONE") {
    try {
        await setDoc(doc(firestore, collectionName, docId), data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

// Add document to Firestore collection
export async function addDocument(collectionName: string, data: any) {
    try {
        const docRef = await addDoc(collection(firestore, collectionName), data);
        console.log("Document added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        return null;
    }
}

// Get all documents from a collection
export async function getAllDocuments(collectionName: string) {
    try {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        // console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

// Delete a document from Firestore
export async function deleteDocument(collectionName: string, docId: string) {
    try {
        await deleteDoc(doc(firestore, collectionName, docId));
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}