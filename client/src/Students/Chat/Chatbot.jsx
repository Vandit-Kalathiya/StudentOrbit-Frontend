// Chatbot.js
import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage"; // Import ChatMessage component
import ChatInput from "./ChatInput"; // Import ChatInput component

const colorCombinations = {
  coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
  blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },  // Blue
};

function Chatbot() {
  const members = [
    { id: 1, name: "01" },
    { id: 2, name: "02" },
    { id: 3, name: "03" },
  ];

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sentByMe: true, senderId: 1 },
    { id: 2, text: "Hi there!", sentByMe: false, senderId: 2 },
    { id: 3, text: "How are you?", sentByMe: true, senderId: 1 },
    { id: 4, text: "I'm good, thanks!", sentByMe: false, senderId: 3 },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sentByMe: true,
      senderId: 1,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
  };

  const getAvatarStyle = (memberId) => {
    const isOdd = memberId % 2 !== 0;
    const colors = isOdd ? colorCombinations.blue : colorCombinations.coral;
    return {
      backgroundColor: colors.backgroundColor,
      borderColor: colors.border,
      color: colors.color,
    };
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = ""; 
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar p-4 pb-14 space-y-2">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              members={members} 
              getAvatarStyle={getAvatarStyle} 
            />
          ))}
        </div>
      </div>
      <ChatInput 
        inputMessage={inputMessage} 
        setInputMessage={setInputMessage} 
        sendMessage={sendMessage} 
      />
    </div>
  );
}

export default Chatbot;
