import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import "./ChatContainer.css"
import axios from "axios";
import {sendMsg_url, getMsg_url} from "../../utils/APIroutes.js";
import { useState, useEffect, useRef } from "react";
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({chatUser, currentUser, socket}) => {
  const scrollRef = useRef();

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(()=>{
    const fetchMessages = async() =>{
      if(chatUser) {
        try {
          const response = await axios.post(getMsg_url, {
            from: currentUser._id,
            to: chatUser._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchMessages();
  }, [chatUser]);

  const handleSendMessage = async (message) => {
    const {data} = await axios.post(sendMsg_url, {
      from: currentUser._id,
      to: chatUser._id,
      message
    });

    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: chatUser._id,
      message
    });

    const msgs = [...messages];
    msgs.push({fromSelf: true, message});
    setMessages(msgs);
  }

  useEffect(()=>{
    if(socket.current) {
      socket.current.on("msg-recieve", (msg)=>{
        setArrivalMessage({fromSelf: false, message: msg});
      }) 
    }
  }, [])

  useEffect(()=>{
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  }, [messages])

  return (
    <section className="h-full flex flex-col justify-between">
        <ChatHeader chatUser={chatUser} />
        {/* <ChatMessages /> */}

        <div className="chat-messages py-2 px-3 flex flex-col gap-1 overflow-auto">
          {
            messages.map((msg)=>{
              return (
                <div key={uuidv4()} ref={scrollRef}>
                  <div className={`message flex items-center py-1 ${msg.fromSelf ? "sended":"recieved"}`}>
                    <div className="content p-2 px-3 rounded-xl">
                      <p>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        <ChatInput handleSendMessage={handleSendMessage} />
    </section>
  )
}

export default ChatContainer