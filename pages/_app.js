import '../styles/globals.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  console.log(pageProps)
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
