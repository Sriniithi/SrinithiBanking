import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOsIZF11JzPEIlQYTXcLosVO5_pwneKdw",
    authDomain: "bankmanagement-4376d.firebaseapp.com",
    projectId: "bankmanagement-4376d",
    storageBucket: "bankmanagement-4376d.appspot.com",
    messagingSenderId: "191603015902",
    appId: "1:191603015902:web:92a425254522ca6096424f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }; // Export the app and db

