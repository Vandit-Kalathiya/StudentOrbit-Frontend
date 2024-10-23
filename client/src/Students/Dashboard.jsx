import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { MessageOutlined } from "@ant-design/icons";
import ChatPopUp from "./Chat/ChatPopUp";

function Dashboard({setLoginStatus}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatPopupRef = useRef(null);
  
  const toggleChatPopup = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setTimeout(() => setIsChatOpen(false), 300); // Match duration with CSS animation
    } else {
      setIsChatOpen(true);
    }
  };
  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatPopupRef.current && !chatPopupRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section
      id="hero"
      // className="w-full min-h-[100vh] relative items-center justify-center overflow-hidden"
    >
      <div
        // className="absolute inset-0 z-10 text-black flex justify-between overflow-x-hidden"
        className="justify-between"
      >
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
          <ChatPopUp onClose={toggleChatPopup} />
        </div>
      )}
    </section>
  );
}

export default Dashboard;
