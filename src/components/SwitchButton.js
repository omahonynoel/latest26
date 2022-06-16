import React from 'react'
import styles from './SwitchButton.module.css'






export default function SwitchButton({isChecked}) {
  
 
  const  handleSwitchButtonClick=()=>
  {
    console.log({isChecked})
    console.log("switch clicked")
  }

  return (
    <div>


<label className={styles.switch}>
        <input onClick={handleSwitchButtonClick}type="checkbox" checked = {isChecked}/>
        <span className ={styles.slider}></span>
      </label>



    </div>
  );
}
