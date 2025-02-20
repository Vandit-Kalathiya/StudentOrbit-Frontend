const ChatMessage = ({ message, members, getAvatarStyle, username }) => {
  const sender = members.find(
    (member) => member.username.toUpperCase() === message.sender.toUpperCase()
  );
  const avatarStyle = getAvatarStyle(parseInt(sender.username.substring(4)));
  // console.log(sender);

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

      <div
        className={`relative max-w-[60%] p-2 rounded-lg order-2`}
        style={{
          border: `2px solid ${
            message.sender ? avatarStyle.border : avatarStyle.border
          }`,
          backgroundColor: message.sender
            ? avatarStyle.backgroundColor
            : "#d6e4ff",
          color: message.sender ? avatarStyle.color : "#1d39c4",
        }}
      >
        {message.content}
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
