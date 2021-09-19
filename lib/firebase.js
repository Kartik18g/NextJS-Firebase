import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyB5mMzr2_aDDjGoiyghix9lzG4eGV9aGpY",
    authDomain: "fireshipblog-cac80.firebaseapp.com",
    projectId: "fireshipblog-cac80",
    storageBucket: "fireshipblog-cac80.appspot.com",
    messagingSenderId: "427033772003",
    appId: "1:427033772003:web:8e7807ee507486a5312ad6",
    measurementId: "G-MMMK4BNMT7"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore() 