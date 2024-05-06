import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

try {
    const app = initializeApp(firebaseConfig);
    console.log("Logged in correctly to firebase! ", );
} catch (e) {
    console.error("Error while logging in: ", e);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app};
export {db};