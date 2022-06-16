import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from '../../hooks/useCollection'
import react from 'react';
import Multiselect from 'multiselect-react-dropdown';
import Accordion from '../../components/Accordion';
import Rounds from './Rounds';
import Groups from './Groups';
// styles
import styles from './EditEvent.module.css'




export default function EditEventForm({ uid, event }) {
  const [testTest, setTestTest] = useState('TestTest')
  const [eventName, setEventName] = useState('')
  const [eventCourseName, setEventCourseName] = useState('')
  const [eventStartDate, setEventStartDate] = useState('')
  const [eventRoundCount, setEventRoundCount] = useState('')
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [collectionName, setCollectionName] = useState('events')
  const selectedPlayersUserIds = []

  const { addDocument, response } = useFirestore(collectionName)



  const { documents, error } = useCollection(
    'members')

  console.log("in here")
  console.log("event is " + { event })
  console.log({ documents })



  console.log(selectedPlayers)

  const handleSubmit = (e) => {
    // setCollectionName('events/kl5SFqb2XwNJt9Rva9Uz/Rounds')
    console.log("selectedPlayers")
    e.preventDefault()

    selectedPlayers.forEach(selectedPlayer => { selectedPlayersUserIds.push(selectedPlayer.userId) })
    console.log(selectedPlayersUserIds)
    

    // window.location.href = "http://localhost:3000/MyEvents"



  }




  // reset the form fields
  useEffect(() => {

    if (response.success) {

      console.log('id is - ' + response.document.id)
      // console.log(response.id)

      setEventName('')
      setEventCourseName('')
      setEventStartDate('')
      setEventRoundCount('')
      setSelectedPlayers([])
      //setRoundID(response.document.id)  

    }



  }, [response.success])

  const selectedPlayerArray= []

event.selectedPlayersFullNames.map((PlayerName) => ( selectedPlayerArray.push({name: PlayerName })))
 
console.log("options array is - ",selectedPlayerArray)

  return (
    <>



      <h3>Update Event</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Event Name:</span>
          <input
            placeholder={event.eventName}
            type="text"
            required
            disabled
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />
        </label>
        <label>
          <span>Course:</span>
          <input
            placeholder={event.eventCourseName}
            type="text"
            required
            disabled
            onChange={(e) => setEventCourseName(e.target.value)}
            value={eventCourseName}
          />
        </label>
        <label>
          <span>Date:</span>
          <input
            type="text"
            placeholder={event.eventStartDate}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            required
            disabled
            onChange={(e) => setEventStartDate(e.target.value)}
            value={eventStartDate}
          />
        </label>
        <label>
          <span>No Of Rounds:</span>
          <input
            placeholder={event.eventRoundCount}
            type="number"
            required
            disabled
            onChange={(e) => setEventRoundCount(e.target.value)}
            value={eventRoundCount}
          />
        </label>
        <label>
          <span>Players:</span>
          {documents && <Multiselect
            //options={[{ name: 'Option 1️⃣', id: 1 }]} 
           disable
            options= {selectedPlayerArray}
            selectedValues={selectedPlayerArray}
            closeOnSelect = {true}
            // Options to display in the dropdown
            displayValue="name"  // Property name to display in the dropdown options
            onSelect={(selectedList) => setSelectedPlayers(selectedList)}
            value={selectedPlayers}

          />}

        </label>
        <span>Rounds:</span>    
        <Rounds SC={Groups} event ={event} selectedPlayersOptions={selectedPlayerArray}/>


      </form>
     


    </>

  )
}