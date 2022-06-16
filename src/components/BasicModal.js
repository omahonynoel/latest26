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




export default function BasicModal({ eventId, selectedPlayerArray, roundNo, roundId }) {

  console.log("in basic Modal - slectedPlayerArray is - ", selectedPlayerArray)
  console.log("in basic Modal - Round No  is - ", roundNo)
  console.log("in basic Modal - event id is - ", eventId)


  const { addDocument, response } = useFirestore('events/' + eventId + "/rounds")

  const { documents, error } = useCollection(
    // 'events', ["uid", "==", user.uid]
    //   'events', ["eventName", "==", 'Can you see this'], ['createdAt', 'desc']
    'events/' + eventId + "/rounds/" + roundId + "/groups"

  )

  documents && console.log("in basic modal - documents is - ", { documents })


  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const specificModalIsOpen = [""]
  const [refreshThis, setRefreshThis] = useState(false)

  //const [modalIsOpenMap,setModalIsOpenMap]= React.useState(new Map())
  const [modalIsOpenMap, setModalIsOpenMap] = React.useState([0])
  // 
  // var modalIsOpenMap = new Map()

  documents && documents.map((document) => (
    // modalIsOpenMap.set(document.id,false)
    modalIsOpenMap[document.roundNo] = false

  )
  )

  
  function openModal(doc) {
   
    refreshThis && setRefreshThis(false)
    console.log(refreshThis)
    !refreshThis && setRefreshThis(true)
    console.log(refreshThis)
   
    
    doc && setModalIsOpenMap(modalIsOpenMap[doc.groupNo] = true)
    doc && setModalIsOpenMap(modalIsOpenMap)

    !doc && setIsOpen(true)
   

  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(doc) {


    refreshThis && setRefreshThis(false)
    !refreshThis && setRefreshThis(true)

    doc && setModalIsOpenMap(modalIsOpenMap[doc.groupNo] = false)

    doc && setModalIsOpenMap(modalIsOpenMap)

    !doc && setIsOpen(false)

  }

  const handleSubmit = (e) => {

    
    const x = addDocument('events/' + eventId + "/rounds/" + roundId + "/groups", {


      selectedPlayers,
      groupNo: documents.length + 1
      //      selectedPlayersFullNames,
    })

    closeModal()

  }





  return (
    <div>
      <button onClick={() => openModal()}>Create Group</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={() => closeModal()}>close</button>
        <div>I am a modal</div>
        <form onSubmit={handleSubmit}>
          <Multiselect
            options={selectedPlayerArray}
            closeOnSelect='true'
            displayValue="name"  // Property name to display in the dropdown options
            onSelect={(selectedList) => setSelectedPlayers(selectedList)}
            value={selectedPlayers}
          />
          <button>Submit</button>
        </form>
      </Modal>


      {documents && documents.map((document) => (
        <li key={document.id}>
          <button onClick={() => openModal(document)}>{"Group " + document.id}</button>
          {console.log(document.id, modalIsOpenMap[document.groupNo])}
          {document.groupNo && <Modal
            key={document.id}
            id={document.id}
            // isOpen={modalIsOpen}
            //isOpen ={modalIsOpenMap.get(document.id)}
            isOpen={modalIsOpenMap[document.groupNo]}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{"Group - " + document.id}</h2>
            <button onClick={() => closeModal(document)}>close</button>

            <form onSubmit={handleSubmit}>
              <Multiselect
                options={document.selectedPlayers}
                closeOnSelect='true'
                displayValue="name"  // Property name to display in the dropdown options
                onSelect={(selectedList) => setSelectedPlayers(selectedList)}
                value={selectedPlayers}
              />
              <button>Submit</button>
            </form>
          </Modal>
          }

        </li>
      ))}

     
        






    </div>
  );
}

//ReactDOM.render(<App />, appElement);