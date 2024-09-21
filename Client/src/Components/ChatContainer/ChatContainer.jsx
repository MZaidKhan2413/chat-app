import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"
import "./ChatContainer.css"

const ChatContainer = ({chatUser}) => {
  const handleSendMessage = (message) => {
    console.log("Sending message:", message);
  }
  return (
    <section className="h-full flex flex-col justify-between">
        <ChatHeader chatUser={chatUser} />
        <ChatMessages />
        <ChatInput handleSendMessage={handleSendMessage} />
    </section>
  )
}

export default ChatContainer