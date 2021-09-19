import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <button onClick={() => { toast.success("Hello Toast") }}  >Click for toast</button>
    </div>
  )
}
