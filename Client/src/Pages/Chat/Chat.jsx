import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsres_url, host_url } from "../../utils/APIroutes";
import "./Chat.css";
import Contact from "../../Components/Contacts/Contact";
import LoadingContacts from "../../Components/Contacts/LoadingContacts";
import Welcome from "../../Components/Welcome/Welcome";
import ChatContainer from "../../Components/ChatContainer/ChatContainer";
import {io} from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContactsLoaded, setIsContactsLoaded] = useState(false);

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

  useEffect(()=>{
    if(currentUser) {
      socket.current = io(host_url, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const { data } = await axios.get(`${allUsres_url}/${currentUser._id}`);
          setContacts(data);
          setIsContactsLoaded(true);
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
    <section className="all-chats grid grid-cols-12 gap-2 h-screen sm:p-2 p-0 sm:overflow-auto overflow-y-hidden">
      <div className="contacts rounded-md px-3 py-2 md:col-span-3 sm:col-span-4 col-span-6 h-screen overflow-auto">
        {
          isContactsLoaded ? <Contact currentUser={currentUser} contacts={contacts} chatChange={handleChatChange}/> : <LoadingContacts />
        }
      </div>
      <div className="messages px-3 py-2 md:col-span-9 sm:col-span-8 col-span-6 h-screen">
        {
          isLoaded && currentChat === undefined ? 
          <Welcome currentUser={currentUser}/> :
          <ChatContainer chatUser={currentChat} currentUser={currentUser} socket={socket} />
        }
      </div>
    </section>
  );
};

export default Chat;
