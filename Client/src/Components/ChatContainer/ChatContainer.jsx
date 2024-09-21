import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"
import "./ChatContainer.css"
import axios from "axios";
import {sendMsg_url, getMsg_url} from "../../utils/APIroutes.js";
import { useState, useEffect } from "react";

const ChatContainer = ({chatUser, currentUser}) => {

  const [messages, setMessages] = useState([]);

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
    })
    console.log(data);
  }
  return (
    <section className="h-full flex flex-col justify-between">
        <ChatHeader chatUser={chatUser} />
        {/* <ChatMessages /> */}

        <div className="chat-messages py-2 px-3 flex flex-col gap-1 overflow-auto">
          {
            messages.map((msg, idx)=>{
              return (
                <div key={idx}>
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