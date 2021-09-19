import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Loader show="true" />
    </div>
  )
}
