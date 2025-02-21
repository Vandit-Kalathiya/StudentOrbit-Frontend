import { useMemo } from "react";

const ChatMessage = ({ message, members, getAvatarStyle, username }) => {
  const sender = members.find(
    (member) => member.username.toUpperCase() === message.sender.toUpperCase()
  );
  const avatarStyle = getAvatarStyle(
    parseInt(sender?.username.substring(4) || "0")
  );

  const formattedTime = useMemo(() => {
    if (!message.timeStamp) return "";

    const date = new Date(message.timeStamp);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }); // e.g., "10:30 AM"
  }, [message.timeStamp]);

  // Determine if the message is short (1 or 2 characters)
  const isShortMessage = message.content.length <= 2;

  return (
    <div
      className={`flex ${
        message.sender === username ? "justify-end" : "justify-start"
      } items-center space-x-2`}
    >
      {message.sender !== username && sender && (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm order-1"
          style={{
            borderColor: avatarStyle.border,
            background: avatarStyle.backgroundColor,
          }}
        >
          {message.sender.substring(4)}
        </div>
      )}

      <div className="flex flex-col order-2 max-w-[70%]">
        <div
          className={`relative p-2 rounded-lg ${
            isShortMessage ? "text-center w-auto" : "w-full"
          }`}
          style={{
            border: `2px solid ${avatarStyle.border}`,
            backgroundColor: message.sender
              ? avatarStyle.backgroundColor
              : "#d6e4ff",
            color: message.sender ? avatarStyle.color : "#1d39c4",
            wordBreak: "break-word", // Ensures long words break to the next line
          }}
        >
          {message.content}
        </div>
        {formattedTime && (
          <span
            className={`text-xs text-gray-500 mt-1 ${
              message.sender === username ? "self-end" : "self-start"
            }`}
          >
            {formattedTime}
          </span>
        )}
      </div>

      {message.sender === username && (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm order-3"
          style={{
            borderColor: avatarStyle.border,
            background: avatarStyle.backgroundColor,
          }}
        >
          {username.substring(4)}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
