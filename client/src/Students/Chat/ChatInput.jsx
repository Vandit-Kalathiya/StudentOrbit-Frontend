import { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const ChatInput = ({ inputMessage, setInputMessage, sendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const textareaRef = useRef(null); 
  
  // Function to toggle emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const scrollToBottom = () => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  const addEmoji = (emoji) => {
    setInputMessage((prevInput) => {
      const newInput = prevInput + emoji;
      setTimeout(scrollToBottom, 0); 
      return newInput;
    });
    setShowEmojiPicker(false); 
    textareaRef.current.focus(); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.preventDefault();
        setInputMessage((prevInput) => {
          const newInput = prevInput + "\n";
          setTimeout(scrollToBottom, 0); 
          return newInput;
        });
      } else {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const handleChange = (e) => {
    if(e.target.value) {
      setInputMessage(e.target.value);
      setTimeout(scrollToBottom, 0); 
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 pb-3 pt-2 bg-white border-gray-300 relative w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <div className="flex w-full items-center bg-gray-100 rounded-lg p-1 relative">
        <textarea
          ref={textareaRef}
          className="flex-grow p-2 bg-transparent border-none focus:outline-none w-full resize-none"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleChange} 
          onKeyDown={handleKeyDown}
          rows="1"
          style={{
            minHeight: "40px",
            maxHeight: "100px",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
          }}
        />
        <button
          className="ml-2 p-2 rounded-full bg-transparent hover:bg-gray-200 transition"
          onClick={toggleEmojiPicker}
        >
          <BsEmojiSmile className="h-6 w-6 text-gray-600" />
        </button>
        <button
          className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          <FiSend className="h-6 w-6" />
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-12 left-0 sm:left-auto sm:right-0 z-[9999] bg-white shadow-lg rounded-md border border-gray-300"
          >
            <EmojiPicker
              onEmojiClick={(emojiData) => addEmoji(emojiData.emoji)}
              previewConfig={{ showPreview: false }}
              skinTonesDisabled
              autoFocusSearch={false}
              style={{ WebkitOverflowScrolling: "touch" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
