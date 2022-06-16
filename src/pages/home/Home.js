import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useCreateEvent } from '../../hooks/useCreateEvent'

// styles
import styles from './Home.module.css'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {
  const { createEvent } = useCreateEvent()
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  return (

    <div>
      <button className="btn" onClick={createEvent} >Create Event</button>
    
    <div className={styles.container}>
       
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
    </div>
  )
}
