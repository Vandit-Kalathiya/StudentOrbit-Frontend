// Chatbot.js
import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage"; // Import ChatMessage component
import ChatInput from "./ChatInput"; // Import ChatInput component

const colorPalette = [
  { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
  { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }, // Blue
  { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" }, // Green
  { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" }, // Purple
  // Add more colors as needed
];

function Chatbot() {
  const members = [
    { id: 1, name: "01" },
    { id: 2, name: "02" },
    { id: 3, name: "03" },
    { id: 4, name: "04" },
  ];

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sentByMe: true, senderId: 1 },
    { id: 2, text: "Hi there!", sentByMe: false, senderId: 2 },
    { id: 3, text: "How are you?", sentByMe: true, senderId: 1 },
    { id: 4, text: "I'm good, thanks!", sentByMe: false, senderId: 3 },
    { id: 5, text: "I'm good!", sentByMe: false, senderId: 4 },
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
    const colorIndex = (memberId) % colorPalette.length; // Use modulo to cycle through colors
    return colorPalette[colorIndex];
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
