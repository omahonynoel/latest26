import { useState } from "react";
import { useRef } from "react";
import { useCollection } from "../hooks/useCollection";
import Multiselect from "multiselect-react-dropdown";
import SwitchButton from "./SwitchButton";

import styles from  './Accordion.module.css'
import BasicModal from './BasicModal'
import MultiSelectDropDown from "./MultiSelectDropDown";


const AccordionItem = ({eventId,selectedPlayersOptions,faq} ) => {
  const [selectedPlayers, setSelectedPlayers] = useState([])

console.log("in accordion ITEM - event is  - ", selectedPlayersOptions)
console.log("in accordion ITEM - SP is  - ", selectedPlayers)
console.log("in accordion ITEM - faq is - ", faq)
console.log("in accordion ITEM - eventID is - ", eventId)


const { documents, error } = useCollection(
  // 'events', ["uid", "==", user.uid]
 //   'events', ["eventName", "==", 'Can you see this'], ['createdAt', 'desc']
 'events/'+ eventId +"/rounds", ["roundNo", "==",faq], ['createdAt', 'desc']
     )

console.log("in accordian item - documents  - ",{documents})


documents && console.log("in accordian item - documents  id - " + documents[0].id)
documents && console.log("in accordian item - XXXXXXXXXXXXXXXXXXXXdocuments  id - " + documents[0].isActive)

  const [clicked, setClicked] = useState(false);
  const contentEl = useRef();

  const { question, answer } = {faq};

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
  documents &&  <li className={`accordion_item ${clicked ? "active" : ""}`}>
      <button className={styles.button} onClick={handleToggle}>
    
        <span className={styles.control}>{clicked ? "— " : "+ "}  </span>
       
        {faq}
      </button>
     
     
     

      <div
        ref={contentEl}
        className={styles.answer_wrapper}
        style={
          clicked
            ? { height: contentEl.current.scrollHeight  }
            : { height: "0px" }
        }
      >
        <div className="answer"></div>
   
        {documents && 
        <div>
        <BasicModal eventId={eventId}  selectedPlayerArray={selectedPlayersOptions} roundNo={faq} roundId ={documents[0].id} ></BasicModal>
       
         </div>
         }
       
       <SwitchButton isChecked = {documents[0].isActive}></SwitchButton>
        

      </div>
      
    </li>
  );
};

export default AccordionItem;
