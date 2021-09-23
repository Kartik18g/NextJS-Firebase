import { async } from '@firebase/util';
import { useEffect, useState, useCallback } from 'react';
import { getUserWithUsername, db, postToJSON } from '../../lib/firebase';
import { collection, collectionGroup, query, where, getDocs, getDoc, limit, doc, orderBy } from 'firebase/firestore';
import path from 'path';
import { useDocumentData } from 'react-firebase-hooks/firestore';



export async function getStaticProps({ params }) {
    const { username, slug } = params;


    const userDoc = await getUserWithUsername(username)
    const docRef = doc(db, "users", userDoc.uid);
    const postRef = doc(docRef, "posts", slug);
    const post = await getDoc(postRef);

    return {
        props: { post: postToJSON(post), path: postRef.path },
        revalidate: 100,
    };
}

export async function getStaticPaths() {
    const postsRef = collectionGroup(db, 'posts')
    const postsSnapshot = await getDocs(postsRef)
    var paths = []
    postsSnapshot.forEach((doc) => {
        const { slug, username } = doc.data();
        paths.push({
            params: { username, slug },
        });
    });

    return {

        paths,
        fallback: 'blocking',
    };
}



const PostPage = (props) => {
    const [post, setPost] = useState(props.post)

    const fetchData = useCallback(
        async () => {
            const postRef = doc(db, props.path)
            const postDoc = await getDoc(postRef)
            setPost(postDoc.data())
        },
        [],
    )

    useEffect(() => {
        fetchData()
    }, [fetchData, props.path])

    console.log(post)
    // fetchData()

    return (<main>
        <h1></h1>
    </main>)
}

export default PostPage