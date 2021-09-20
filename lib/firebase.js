import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyB5mMzr2_aDDjGoiyghix9lzG4eGV9aGpY",
    authDomain: "fireshipblog-cac80.firebaseapp.com",
    projectId: "fireshipblog-cac80",
    storageBucket: "fireshipblog-cac80.appspot.com",
    messagingSenderId: "427033772003",
    appId: "1:427033772003:web:8e7807ee507486a5312ad6",
    measurementId: "G-MMMK4BNMT7"
}


const app = initializeApp(firebaseConfig);


export const auth = getAuth(getApp());
export const storage = getStorage()
export const db = getFirestore(app)


