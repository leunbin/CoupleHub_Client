import React, { useEffect, useState } from "react";
import './PCchatBody.scss';

const PCchatBody = ({ messages }) => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        setName(user.name);
      } catch (error) {
        console.error("Error parsing user-info:", error);
      }
    }
  }, []);

  return (
    <div className="message__container">
      {messages.map((message, index) => (
        <div className="message__chats" key={index}>
          <div className={`message__${message.sender === name ? 'sender' : 'recipient'}`}>
            <span>{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PCchatBody;
