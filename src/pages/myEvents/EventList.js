import { Link } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import { useState } from 'react'
import { FirebaseAddDocument } from '../../components/Firebase'
import { useTest } from '../../hooks/useTest'


// styles
import styles from './MyEvents.module.css'
import EditEvent from '../editEvent/EditEvent'




export default function EventList({ events }) {
  const [collectionName, setCollectionName] = useState('temp')
  const [testTest, setTestTest] = useState('TestTest')

  

  console.log('running event list start')
  console.log(collectionName)
  console.log(collectionName)


 

  return (
    <div>
      <ul className={styles.events} >
        {events.map((event) => (
          <li key={event.id}>
            <p className={styles.eventName}>{event.eventName}</p>
            <p className={styles.eventDate}>Starts: {event.eventStartDate}</p>
            {/* <p><button className={styles.eventButton} onClick={() => handleEditEvent(event)}>Edit</button></p> */}
           
            <Link
              to={{
                pathname: "/EditEvent",
                state: { event } // your data array of objects
              }}
             
            >Edit </Link>
         

          </li>
        ))}

      </ul>

    </div>

  )


}