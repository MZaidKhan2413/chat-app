import { useState } from "react";
import "./Contact.css";

const Contact = ({ currentUser, contacts, chatChange }) => {
  const [currentSelected, setCurrentSelected] = useState(-1);

  const changeCurrentChat = (index, contact) =>{
    setCurrentSelected(index);
    chatChange(contact);
  }

  return (
    <>
      <h1 className="contact-header py-2 text-xl">{currentUser.username}</h1>
      {contacts.map((contact, index) => (
        <div
          key={index}
          className={`contact-item rounded-md py-2 my-2 text-lg ${ index === currentSelected ? "selected bg-slate-600" : "" }`}
          onClick={()=>changeCurrentChat(index, contact)}
        >
          {contact.username}
        </div>
      ))}
    </>
  );
};

export default Contact;
