import { useState } from "react";
import { useRef } from "react";
import Multiselect from "multiselect-react-dropdown";

import styles from  './Accordion.module.css'
import BasicModal from './BasicModal'
import MultiSelectDropDown from "./MultiSelectDropDown";


const AccordionItem = ({eventId,selectedPlayersOptions,faq} ) => {
  const [selectedPlayers, setSelectedPlayers] = useState([])

console.log("in accordion ITEM - event is  - ", selectedPlayersOptions)
console.log("in accordion ITEM - SP is  - ", selectedPlayers)
console.log("in accordion ITEM - faq is - ", faq)
  const [clicked, setClicked] = useState(false);
  const contentEl = useRef();

  const { question, answer } = {faq};

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <li className={`accordion_item ${clicked ? "active" : ""}`}>
      <button className={styles.button} onClick={handleToggle}>
        {faq}
        <span className={styles.control}>{clicked ? "—" : "+"} </span>
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

        <BasicModal eventId={eventId}  selectedPlayerArray={selectedPlayersOptions} roundNo={faq}></BasicModal>
    
        

      </div>
    </li>
  );
};

export default AccordionItem;
