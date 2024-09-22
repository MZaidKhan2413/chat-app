import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

const ChatHeader = ({ chatUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("chat-user");
    navigate("/login");
  };

  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      {chatUser && (
        <div className="flex items-center justify-between px-5 py-2 bg-slate-900 rounded-xl">
          <span className="cursor-pointer text-2xl" onClick={reloadPage}><IoMdArrowRoundBack /></span>
          <h2 className="text-2xl font-semibold">{chatUser.username}</h2>
          <span
            className="bg-red-500 p-2 px-4 rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            <FaPowerOff />
          </span>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
