import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useLocation } from 'react-router-dom'
import { useCreateEvent } from '../../hooks/useCreateEvent'
import SwitchButton from '../../components/SwitchButton'
// styles
import styles from './EditEvent.module.css'

// components
import EditEventForm from './EditEventForm'


export default function EditEvent() {

  const location = useLocation()
  const {event} = location.state
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'events', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

console.log({event})
  
  return (

    <div>
     <SwitchButton>W</SwitchButton>
    
    <div className={styles.container}>
       
 
      <div className={styles.sidebar}>
        <EditEventForm uid={user.uid} event={event} />
        
      </div>
    </div>
    </div>
  )
}
