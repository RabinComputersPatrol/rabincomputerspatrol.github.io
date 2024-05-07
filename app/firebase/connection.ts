import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import the auth module

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

let app;
let db;
let auth;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app); // Initialize Firebase Auth
    console.log("Logged in correctly to firebase!");
} catch (e) {
    console.error("Error while logging in: ", e);
}

// Check if the user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is logged in: ", user);
    } else {
        console.log("No user is logged in.");
    }
});

export { app, db, auth }; // Export the app, db, and auth instances
