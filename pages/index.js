import { useState } from 'react';
import PostFeed from '../components/PostFeed'
import styles from '../styles/Home.module.css'
import { getUserWithUsername } from '../lib/firebase'
import { useEffect } from 'react'
import { startAfter, query, where, getDocs, getDoc, limit, doc, orderBy, collectionGroup, Timestamp } from 'firebase/firestore';
import { db, postToJSON } from '../lib/firebase';
import Loader from '../components/Loader';



const LIMIT = 1;

export async function getServerSideProps(context) {
  const postsRef = collectionGroup(db, 'posts')
  const nq = query(postsRef, where('published', '==', true), limit(LIMIT), orderBy('createdAt', 'desc'));

  let posts = []

  const postsSnapshot = await getDocs(nq);

  postsSnapshot.forEach(doc => {
    posts.push(postToJSON(doc))
  })

  return {
    props: { posts }, // will be passed to the page component as props
  };
}


export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;

    const postsRef = collectionGroup(db, 'posts')
    const nq = query(postsRef, where('published', '==', true), limit(LIMIT), orderBy('createdAt', 'desc'), startAfter(cursor));

    let newPosts = []

    const postsSnapshot = await getDocs(nq);

    postsSnapshot.forEach(doc => {
      newPosts.push(postToJSON(doc))
    })


    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };


  return (
    <main >

      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  )
}
