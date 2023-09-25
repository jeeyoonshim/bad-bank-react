// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIwcApPgoGlUP9TCUXAzG96sLT66MruyY",
  authDomain: "bad-bank-react-eb4cf.firebaseapp.com",
  databaseURL: "https://bad-bank-react-eb4cf-default-rtdb.firebaseio.com",
  projectId: "bad-bank-react-eb4cf",
  storageBucket: "bad-bank-react-eb4cf.appspot.com",
  messagingSenderId: "490203148561",
  appId: "1:490203148561:web:945ec07e7b67ddefe35cb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Initialize the database

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    db // Export the initialized database
};