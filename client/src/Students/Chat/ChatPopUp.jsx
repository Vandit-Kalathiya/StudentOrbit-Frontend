import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Chatbot from "./Chatbot";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";

function ChatPopUp({ onClose, roomId, members }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed top-24 md:right-80 right-10 bg-white border border-gray-300 shadow-xl rounded-2xl w-[80%] md:w-[60%] h-[88%] overflow-hidden chat-popup z-[100] ${
        isVisible ? "chat-popup-enter" : ""
      } ${isClosing ? "chat-popup-exit" : ""}`}
    >
      <div className="flex justify-center items-center px-3 py-3 bg-[#5B6DF3] text-white">
        <div
          className="flex items-center space-x-2 mt-1 justify-center m-auto text-xl bg-[#6f7ff4] px-3 py-1 rounded-lg"
        >
          <div>Connect with Your Team </div>
          <div>
            <BsFillPeopleFill />
          </div>
        </div>
        <Button
          type="text"
          className="text-white"
          icon={<CloseOutlined />}
          onClick={handleClose}
        />
      </div>
      <div className="h-[92%]">
        <Chatbot roomId={roomId} members={members} />
      </div>
    </div>
  );
}

export default ChatPopUp;
