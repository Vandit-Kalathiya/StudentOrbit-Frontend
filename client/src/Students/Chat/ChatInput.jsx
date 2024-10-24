import { FiSend } from 'react-icons/fi';

const ChatInput = ({ inputMessage, setInputMessage, sendMessage }) => {
  return (
    <div className="p-4 bg-white border-gray-300">
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-md focus:border-[#5B6DF3] focus:outline-none transition duration-300"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="ml-4 bg-[#5B6DF3] text-white px-4 py-2 rounded-md"
          onClick={sendMessage}
        >
          <FiSend className="mr-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
