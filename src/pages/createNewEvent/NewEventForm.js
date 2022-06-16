import { useState, useEffect} from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from '../../hooks/useCollection'
import react from 'react';
import Multiselect from 'multiselect-react-dropdown';
import MemberSelect from './MemberSelect'




  

export default function NewEventForm({ uid }) {
   const [eventName, setEventName] = useState('')
  const [eventCourseName, setEventCourseName] = useState('')
  const [eventStartDate, setEventStartDate] = useState('')
  const [eventRoundCount, setEventRoundCount] = useState('')
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [collectionName, setCollectionName] = useState('events')
  const [roundCounter,setRoundCounter]=useState(0)
  const[roundsAdded,setRoundsAdded]=useState(false)
  const selectedPlayersUserIds = []
  const selectedPlayersFullNames = []
 
 
  const { addDocument, response } = useFirestore(collectionName)



  const { documents, error } = useCollection(   
    'members')

  
    
    


  console.log("in here")
  console.log({ documents })



  console.log(selectedPlayers)





  const handleSubmit = (e) => {
   // setCollectionName('events/kl5SFqb2XwNJt9Rva9Uz/Rounds')
    console.log("selectedPlayers")
    console.log(e)
    console.log(e.target)
    e.preventDefault()
    

   console.log(eventStartDate)
   
   selectedPlayers.forEach(selectedPlayer=>{
    selectedPlayersUserIds.push(selectedPlayer.userId)
    selectedPlayersFullNames.push(selectedPlayer.fullname)

  })
    console.log(selectedPlayersUserIds)
   const x =  addDocument( collectionName,{
     
      uid,
      eventName,
      eventCourseName,
      eventStartDate,
      eventRoundCount,
      selectedPlayersUserIds,
      selectedPlayersFullNames,
    })

    

    
  }



  const createRounds = (createdDocId,eventRoundCount) => {
    
    for (let i = 1; i <= eventRoundCount; i++) {
     console.group(" Great Success!!        ", createdDocId)
     console.log(roundCounter)
     addDocument( "events/" + createdDocId +"/rounds/" + i  ,{ "Status": "Inactive", "roundNo": i })
    }
    window.location.href = "http://localhost:3000/MyEvents"
   
   }

  // reset the form fieldss
  useEffect(() => {
    console.log(roundCounter,"        ",eventRoundCount)
  
    if (response.success && roundsAdded!=true) {
      setRoundsAdded(true)
      createRounds(response.addedDocId,eventRoundCount)

      console.log('id is - ', {response})
     // console.log(response.id)
     
      setEventName('')
      setEventCourseName('')
      setEventStartDate('')
     // setEventRoundCount('')
      setSelectedPlayers([])
      setRoundCounter(roundCounter +1)
      //setRoundID(response.document.id)  

 
    
    }



  }, [response.success])

  return (
    <>
      <h3>Create a New Event</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Event Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />
        </label>
        <label>
          <span>Course:</span>
          <input
            type="text"
            required
            onChange={(e) => setEventCourseName(e.target.value)}
            value={eventCourseName}
          />
        </label>
        <label>
          <span>Date:</span>
          <input
            type="date"
            required
            onChange={(e) => setEventStartDate(e.target.value)}
            value={eventStartDate}
          />
        </label>
        <label>
          <span>No Of Rounds:</span>
          <input
            type="number"
            required
            onChange={(e) => setEventRoundCount(e.target.value)}
            value={eventRoundCount}
          />
        </label>
        <label>
          <span>Players:</span>
          {documents && <Multiselect
           //options={[{ name: 'Option 1️⃣', id: 1 }]} 
            options= {documents} 
            closeOnSelect= "True"
          // Options to display in the dropdown
          displayValue="fullname"  // Property name to display in the dropdown options
          onSelect={(selectedList) => setSelectedPlayers(selectedList)}
          value={selectedPlayers}
   
        />}
         
        </label>

        <button>Create Event</button>
      </form>
    </>
  )
}