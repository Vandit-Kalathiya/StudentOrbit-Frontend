const ChatMessage = ({ message, members, getAvatarStyle }) => {
  const sender = members.find((member) => member.id === message.senderId);
  const avatarStyle = getAvatarStyle(sender.id);

  return (
    <div className={`flex ${message.sentByMe ? "justify-end" : "justify-start"} items-center space-x-2`}>
      {!message.sentByMe && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center border-2" style={avatarStyle}>
          {sender.name}
        </div>
      )}

      <div
        className={`relative max-w-[60%] p-2 rounded-lg ${
          message.sentByMe ? "border-y-2 border-[#5B6DF3]" : "border-y-2 border-[#fa541c] text-black"
        }`}
      >
        {message.text}
      </div>

      {message.sentByMe && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center border-2" style={avatarStyle}>
          {sender.name}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
