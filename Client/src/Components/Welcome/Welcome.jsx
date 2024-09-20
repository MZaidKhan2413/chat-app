import hello from "./hello.gif";

const Welcome = ({currentUser}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <img src={hello} alt="ff" className="hello_img"/>
        <h1 className="text-3xl font-bold">Welcome, <span className="text-blue-700">{currentUser.username}</span> !</h1>
        <p className="text-lg pt-2">Select any chat to start messaging</p>
    </div>
  )
}

export default Welcome