const ChatMessage = ({ message, members, getAvatarStyle }) => {
  const sender = members.find((member) => member.id === message.senderId);
  const avatarStyle = getAvatarStyle(sender.id);

  return (
    <div className={`flex ${message.sentByMe ? "justify-end" : "justify-start"} items-center space-x-2`}>
      {!message.sentByMe && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center border-2" style={{ borderColor: avatarStyle.border, background: avatarStyle.backgroundColor }}>
          {sender.name}
        </div>
      )}

      <div
        className={`relative max-w-[60%] p-2 rounded-lg`}
        style={{
          border: `2px solid ${message.sentByMe ? avatarStyle.border : avatarStyle.border}`,
          // borderBottom: `2px solid ${message.sentByMe ? avatarStyle.border : avatarStyle.border}`,
          backgroundColor: message.sentByMe ? "#d6e4ff" : avatarStyle.backgroundColor,
          color: message.sentByMe ? "#1d39c4" : avatarStyle.color,
        }}
      >
        {message.text}
      </div>

      {message.sentByMe && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center border-2" style={{ borderColor: avatarStyle.border, background: avatarStyle.backgroundColor }}>
          {sender.name}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
