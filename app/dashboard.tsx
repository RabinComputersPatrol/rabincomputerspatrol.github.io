import Head from 'next/head';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from './api/firebase';
import { getAll } from 'firebase/remote-config';
import { getDatabase, ref, child, get } from "firebase/database";


export default function Dashboard() {
    return (
        <div className='dashboard-page'>
            <Head><title>Dashboard</title></Head>
            Dashboard
        </div>);
}