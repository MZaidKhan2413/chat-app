import { IoMdSend } from "react-icons/io";
import {useState} from 'react'

const ChatInput = ({handleSendMessage}) => {
  const [message, setMessage] = useState("");

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    if(message.length > 0) {
      handleSendMessage(message)
      setMessage("")
    }
  }

  const handleMessage = (e) => {
    setMessage(e.target.value);
  }
  
  return (
      <form className="flex items-center justify-between p-2 bg-slate-900 rounded-3xl" onSubmit={(e)=>handleMsgSubmit(e)}>
        <input type="text" placeholder="Type a message..." className="w-4/5 p-2 bg-transparent focus:outline-none" onChange={handleMessage} value={message} />
        <button type="submit" className="send-btn px-6 py-1 text-3xl rounded-3xl"><IoMdSend /></button>
      </form>
  )
}

export default ChatInput