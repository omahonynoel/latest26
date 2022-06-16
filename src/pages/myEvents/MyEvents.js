import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useCreateEvent } from '../../hooks/useCreateEvent'

// styles
import styles from './MyEvents.module.css'

// components
//import TransactionForm from './TransactionForm'
import EventList from './EventList'

export default function MyEvents() {
  const { createEvent } = useCreateEvent()
  const { user } = useAuthContext()
  
  
  const { documents, error } = useCollection(
 // 'events', ["uid", "==", user.uid]
//   'events', ["eventName", "==", 'Can you see this'], ['createdAt', 'desc']
'events', ["selectedPlayersUserIds", "array-contains",user.uid]
    )

  

console.log("Running Myevents")
console.log(documents)

  return (

    <div>
    <div className={styles.container}>
       
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <EventList events={documents} />}

      </div>
   
    </div>
    </div>
  )
}
