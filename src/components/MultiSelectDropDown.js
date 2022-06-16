import Multiselect from 'multiselect-react-dropdown';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement');

export default function MultiSelectDropDown() {

  return(
  <Multiselect
            options={[{ name: 'Option 1️⃣', id: 1 }]} 
           // options= {selectedPlayerArray}
           // selectedValues={selectedPlayerArray}
            closeOnSelect={true}
            // Options to display in the dropdown
            displayValue="name"  // Property name to display in the dropdown options
           // onSelect={(selectedList) => setSelectedPlayers(selectedList)}
            //value={selectedPlayers}

          />
  )
  
}

//ReactDOM.render(<App />, appElement);