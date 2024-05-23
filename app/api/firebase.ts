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

export { auth }

// Write document to Firestore
export async function writeDoc(collectionName: string, data: any, docId: string = "NONE") {
    try {
        await setDoc(doc(firestore, collectionName, docId), data);
    } catch (error) {
    }
}

// Store a user in database
export async function addUser(collectionName: string, data: any, docId: string = "NONE") {
    try {
        await setDoc(doc(firestore, collectionName, docId), data);
    } catch (error) {
    }
}

// Add document to Firestore collection
export async function addDocument(collectionName: string, data: any) {
    try {
        const docRef = await addDoc(collection(firestore, collectionName), data);
        return docRef.id;
    } catch (error) {
        return null;
    }
}

// Get all documents from a collection with caching
export async function getAllDocuments(collectionName: string) {
    const cacheKey = `documents_${collectionName}`;
    const cacheExpiryKey = `${cacheKey}_expiry`;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedExpiry = localStorage.getItem(cacheExpiryKey);

    if (cachedData && cachedExpiry && Date.now() < Number(cachedExpiry)) {
        return JSON.parse(cachedData);
    }

    try {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        localStorage.setItem(cacheKey, JSON.stringify(documents));

        localStorage.setItem(cacheExpiryKey, (Date.now() + 10).toString()); // 10 Seconds update

        return documents;
    } catch (error) {
        return [];
    }
}


// Delete a document from Firestore
export async function deleteDocument(collectionName: string, docId: string) {
    try {
        await deleteDoc(doc(firestore, collectionName, docId));
    } catch (error) {
    }
}