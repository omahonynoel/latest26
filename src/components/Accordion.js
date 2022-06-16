
import AccordionItem from "./AccordionItem";
// styles
import styles from  './Accordion.module.css'



const Accordion = (key,faqs) => {




  return (
    <div><button ></button>
    <ul className={styles.accordion}>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} faq={faq} />
      ))}
    </ul>
    </div>
  );
};

export default Accordion;