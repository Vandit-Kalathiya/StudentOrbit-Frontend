import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Chatbot from './Chatbot';
import { useEffect, useState } from 'react';

function ChatPopUp({ onClose }) {
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
    <div className={`fixed top-10 md:right-80 right-10  z-50 bg-white border border-gray-300 shadow-xl rounded-2xl md:w-[60%] h-[90%] overflow-hidden chat-popup ${isVisible ? 'chat-popup-enter' : ''} ${isClosing ? 'chat-popup-exit' : ''}`}>
      <div className="flex justify-between items-center px-3 py-3 bg-[#5B6DF3] text-white">
        <span>Chat with Friends</span>
        <Button type="text" className='text-white' icon={<CloseOutlined />} onClick={handleClose} />
      </div>
      <div className="h-[92%]">
        <Chatbot />
      </div>
    </div>
  );
}

export default ChatPopUp;
