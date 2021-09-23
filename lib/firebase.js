import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, getDoc, limit, doc, orderBy } from 'firebase/firestore';
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

// helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(q);
    let item, itemRef

    querySnapshot.forEach((doc) => {
        itemRef = doc
        item = { ...doc.data(), uid: doc.id }
    });
    // -----

    // const sq = query(item, where('username', '==', username), limit(1));

    return item
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}
