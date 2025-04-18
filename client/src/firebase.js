// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsIhLNIqYWriaq9ftR05WP0QiNONIN_MU",
  authDomain: "trailgearsupportchat.firebaseapp.com",
  projectId: "trailgearsupportchat",
  storageBucket: "trailgearsupportchat.firebasestorage.app",
  messagingSenderId: "883647171147",
  appId: "1:883647171147:web:ec84cdb51e1fc978669bce",
  measurementId: "G-LF5EJY3WQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
