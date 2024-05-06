import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";



export class FirebaseDatabase {
    private static firebaseConfig = {
        apiKey: "AIzaSyBD5wyW9A1cTpErpWeS_5d_pHe3DufjXpY",
        authDomain: "computerpatrol-5c961.firebaseapp.com",
        projectId: "computerpatrol-5c961",
        storageBucket: "computerpatrol-5c961.appspot.com",
        messagingSenderId: "458287013012",
        appId: "1:458287013012:web:1c5550b31f5449c4a72881"
    };

    public static app = initializeApp(FirebaseDatabase.firebaseConfig);
    public static firestore = getFirestore(FirebaseDatabase.app);
    public static db = getDatabase();
}