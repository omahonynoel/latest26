import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Multiselect from 'multiselect-react-dropdown';
import { useFirestore } from '../hooks/useFirestore';
import { useCollection } from '../hooks/useCollection';
import { useState } from 'react';

const customStyles = {
  content: {
    size: '80%',
    top: '40%',
    left: '50%',
    right: '20%',
    bottom: '10%',
    marginRight: '-10%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement');




export default function BasicModal({eventId,selectedPlayerArray,roundNo}) {

  console.log("in basic Modal - slectedPlayerArray is - ",selectedPlayerArray)
  console.log("in basic Modal - Round No  is - ",roundNo)
  console.log("in basic Modal - event id is - ",eventId)


  const { addDocument, response } = useFirestore('events/'+ eventId +"/rounds")

  const { documents, error } = useCollection(
    // 'events', ["uid", "==", user.uid]
   //   'events', ["eventName", "==", 'Can you see this'], ['createdAt', 'desc']
   'events/'+ eventId +"/rounds", ["roundNo", "==",roundNo], ['createdAt', 'desc']
       )

       console.log("in basic modal - documents is - " ,{documents})

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([])

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    
  //    console.log("selectedPlayers")
  //    console.log(e)
  //    console.log(e.target)
  //    e.preventDefault()
     
 
 
    
  //   selectedPlayers.forEach(selectedPlayer=>{
  //    selectedPlayersUserIds.push(selectedPlayer.userId)
  //    selectedPlayersFullNames.push(selectedPlayer.fullname)
 
  //  })
  //    console.log(selectedPlayersUserIds)
  const x =  addDocument(  'events/'+ eventId +"/rounds/" + documents[0].id+ "/groups",{
      
 
    selectedPlayers,
    groupNo:1
//      selectedPlayersFullNames,
    })
     
 
     
   }





  return (
    <div>
      <button onClick={openModal}>Create Group</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form onSubmit={handleSubmit}>
        <Multiselect
            options= {selectedPlayerArray}
            closeOnSelect='true'
            displayValue="name"  // Property name to display in the dropdown options
            onSelect={(selectedList) => setSelectedPlayers(selectedList)}
            value={selectedPlayers}
          />
          <button>Submit</button>
        </form>
      </Modal>
      <SwitchButton isChecked={document.isActive}>Activate Round</SwitchButton>
    </div>
  );
}

//ReactDOM.render(<App />, appElement);