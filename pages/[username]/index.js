import { useEffect } from 'react';
import { collection, query, where, getDocs, getDoc, limit, doc, orderBy, collec } from 'firebase/firestore';

import { getUserWithUsername, db, postToJSON } from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';




export async function getServerSideProps({ query: { username } }) {


    const userDoc = await getUserWithUsername(username);

    // If no user, short circuit to 404 page
    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    let user = null;
    let posts = [];

    if (userDoc) {
        user = userDoc;

        const docRef = doc(db, "users", userDoc.uid);
        const nq = query(collection(docRef, "posts"), where('published', '==', true), limit(5), orderBy('createdAt', 'desc'));
        const postsSnapshot = await getDocs(nq);

        postsSnapshot.forEach(doc => {
            posts.push(postToJSON(doc))
        })

    }

    return {
        props: { user, posts },
        // will be passed to the page component as props
    };
}


export default function UserProfilePage({ user, posts }) {
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    );
}
