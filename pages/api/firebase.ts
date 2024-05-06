// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
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
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBD5wyW9A1cTpErpWeS_5d_pHe3DufjXpY",
    authDomain: "computerpatrol-5c961.firebaseapp.com",
    projectId: "computerpatrol-5c961",
    storageBucket: "computerpatrol-5c961.appspot.com",
    messagingSenderId: "458287013012",
    appId: "1:458287013012:web:1c5550b31f5449c4a72881"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const db = getDatabase();

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