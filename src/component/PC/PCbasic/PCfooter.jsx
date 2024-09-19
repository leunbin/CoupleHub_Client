import React, { useEffect, useState } from "react";
import PCchatModal from "../Chat/PCchatModal";
import './PCfooter.scss';

const PCfooter = ({ socket }) => {
  const [isChat, setIsChat] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });


  useEffect(() => {

    socket.on('messageResponse', (data) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
        sessionStorage.setItem('messages', JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.off('messageResponse');
    };
  }, [socket, messages]);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setIsChat((pre)=>!pre);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="PCfooter_root">
      {isChat && <PCchatModal socket={socket} messages={messages} setMessages={setMessages} className='custom-chat' />}
    </div>
  );
};

export default PCfooter;
