// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgQJ6HsUFMK4YJOKMPPsMN0MVE3JDAxKw",
    authDomain: "beyond-bite-prod.firebaseapp.com",
    projectId: "beyond-bite-prod",
    storageBucket: "beyond-bite-prod.firebasestorage.app",
    messagingSenderId: "976865612814",
    appId: "1:976865612814:web:3da50b7763abbf13a7585f",
    measurementId: "G-93BGWJPEYT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
