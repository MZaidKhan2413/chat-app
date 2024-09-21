import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsres_url } from "../../utils/APIroutes";
import "./Chat.css";
import Contact from "../../Components/Contacts/Contact";
import Welcome from "../../Components/Welcome/Welcome";
import ChatContainer from "../../Components/ChatContainer/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")));
        setIsLoaded(true);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const { data } = await axios.get(`${allUsres_url}/${currentUser._id}`);
          setContacts(data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  } 

  return (
    <section className="all-chats grid grid-cols-12 gap-2 h-screen p-2 overflow-x-hidden">
      <div className="contacts rounded-md px-3 py-2 md:col-span-3 sm:col-span-4 col-span-12 h-full">
        <Contact currentUser={currentUser} contacts={contacts} chatChange={handleChatChange}/>
      </div>
      <div className="messages px-3 py-2 md:col-span-9 sm:col-span-8 col-span-12 h-full">
        {
          isLoaded && currentChat === undefined ? 
          <Welcome currentUser={currentUser}/> :
          <ChatContainer chatUser={currentChat} />
        }
      </div>
    </section>
  );
};

export default Chat;
