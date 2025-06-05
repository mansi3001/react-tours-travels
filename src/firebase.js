// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWwg-PISrhJ4k-qRzFhjTM7dllV3GaK10",
  authDomain: "tourism-booking-39ca2.firebaseapp.com",
  projectId: "tourism-booking-39ca2",
  storageBucket: "tourism-booking-39ca2.firebasestorage.app",
  messagingSenderId: "1029009783078",
  appId: "1:1029009783078:web:560a6177b2d4315baa29e7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);