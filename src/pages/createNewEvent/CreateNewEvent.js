import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useCreateEvent } from '../../hooks/useCreateEvent'

// styles
import styles from './CreateNewEvent.module.css'

// components
import NewEventForm from './NewEventForm'


export default function CreateNewEvent() {
  const { createEvent } = useCreateEvent()
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'events', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  return (

    <div>
     
    
    <div className={styles.container}>
       
 
      <div className={styles.sidebar}>
        <NewEventForm uid={user.uid} />
        
      </div>
    </div>
    </div>
  )
}
