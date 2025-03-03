import { useState, useEffect, useRef, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import NoMessages from "../../assets/No_messages.gif";
import {
  getMessagess,
  getUsernameFromToken,
  joinChatApi,
} from "../../../authToken";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { openNotification } from "../../Utils/Notification";
import ChatSkeletonModern from "../../skeleton/ChatSkeletonModern";

const COLOR_PALETTE = [
  { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
  { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" },
  { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" },
];

const Chatbot = ({ roomId, members }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const currentUser = getUsernameFromToken();

  const getAvatarStyle = useCallback((memberId) => {
    const hash = (s) => {
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash) % COLOR_PALETTE.length;
    };

    const colorIndex = hash(memberId.toString());
    return COLOR_PALETTE[colorIndex];
  }, []);

  const connectWebSocket = useCallback(() => {
    try {
      const sock = new SockJS("http://localhost:1821/chat");
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        console.log("Connected to WebSocket");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });

      return () => {
        if (client.connected) {
          client.disconnect();
        }
      };
    } catch (error) {
      console.error("WebSocket connection failed:", error);
    }
  }, [roomId]);

  const loadMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Joining room...");
      await joinChatApi(roomId);
      console.log("Loading messages...");
      const loadedMessages = await getMessagess(roomId);
      setMessages(loadedMessages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  }, [roomId]);

  const sendMessage = useCallback(async () => {
    if (!stompClient || !inputMessage.trim()) {
      openNotification(
        "error",
        "Can't send Message",
        "You are not allowed to send messages outside the group"
      );
      return;
    }

    try {
      const message = {
        sender: currentUser,
        content: inputMessage.trim(),
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [stompClient, inputMessage, currentUser, roomId]);

  const smoothScrollTo = useCallback((target) => {
    if (!chatBoxRef.current) return;

    const startPosition = chatBoxRef.current.scrollTop;
    const distance = target - startPosition;
    const duration = 100;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      chatBoxRef.current.scrollTop =
        startPosition + distance * easeOutCubic(progress);
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const formatDateHeader = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const formatted = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${day}, ${formatted}`;
  };

  const groupMessagesByDate = () => {
    const grouped = [];
    let lastDate = null;

    messages.forEach((message) => {
      const date = new Date(message.timeStamp).toDateString();
      if (date !== lastDate) {
        grouped.push({
          type: "date",
          date: formatDateHeader(message.timeStamp),
        });
        lastDate = date;
      }
      grouped.push({ type: "message", message });
    });

    return grouped;
  };

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (roomId) {
      const cleanup = connectWebSocket();
      loadMessages();
      return cleanup;
    }
  }, [roomId, connectWebSocket, loadMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    if (chatBoxRef.current) {
      smoothScrollTo(chatBoxRef.current.scrollHeight);
    }
  }, [messages, smoothScrollTo]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const scrollAmount = -e.deltaY * 20;
      const targetScrollTop = chatBoxRef.current.scrollTop + scrollAmount;

      smoothScrollTo(targetScrollTop);
    };

    if (chatBoxRef.current) {
      chatBoxRef.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.removeEventListener("wheel", handleWheel, {
          passive: false,
        });
      }
    };
  }, [smoothScrollTo]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100); 
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {isLoading && <ChatSkeletonModern />}
      <div className="flex flex-col overflow-hidden mb-14">
        <div
          ref={chatBoxRef}
          className="overflow-hidden max-h-full p-4 space-y-2 text-sm md:text-[1rem]"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full pt-16">
              <img
                src={NoMessages}
                alt="No messages"
                className="w-48 h-48 mb-4 opacity-80"
              />
              <p className="text-gray-500 font-semibold text-lg">
                No messages yet
              </p>
              <p className="text-gray-400 text-sm">
                Start a conversation by sending a message!
              </p>
            </div>
          ) : (
            groupMessagesByDate().map((item, index) =>
              item.type === "date" ? (
                <div
                  key={index}
                  className="text-center text-gray-500 text-sm my-2"
                >
                  {item.date}
                </div>
              ) : (
                <ChatMessage
                  key={item.message.id}
                  message={item.message}
                  members={members}
                  getAvatarStyle={getAvatarStyle}
                  username={currentUser}
                />
              )
            )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="absolute w-full bottom-0">
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chatbot;
