import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { MessageOutlined } from "@ant-design/icons";
import ChatPopUp from "./Chat/ChatPopUp";
import { useLocation } from "react-router-dom";

function Dashboard({ setLoginStatus }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatPopupRef = useRef(null);
  const location = useLocation();
  const [roomId, setRoomId] = useState("");
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    if (location.state) {
      setRoomId(location.state.uniqueGroupId);
      setMembers(location.state.students);
    }
  });

  const toggleChatPopup = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setTimeout(() => setIsChatOpen(false), 300);
    } else {
      setIsChatOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatPopupRef.current &&
        !chatPopupRef.current.contains(event.target)
      ) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section id="hero">
      <div className="justify-between">
        <Sidebar setLoginStatus={setLoginStatus} />
      </div>
      <div
        className="fixed bottom-8 right-8 z-50 bg-[#5B6DF3] text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={toggleChatPopup}
      >
        <MessageOutlined style={{ fontSize: "24px" }} />
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

      {isChatOpen && (
        <div ref={chatPopupRef} className="z-50">
          <ChatPopUp roomId={roomId} members={members} onClose={toggleChatPopup} />
        </div>
      )}
    </section>
  );
}

export default Dashboard;
