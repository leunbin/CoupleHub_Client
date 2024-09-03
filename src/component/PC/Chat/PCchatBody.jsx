import React from "react";
import './PCchatBody.scss';

const PCchatBody = ({ messages }) => {
  return (
    <div className="message__container">
      {messages.map((message, index) => (
        <div className="message__chats" key={index}>
          <div className={`message__${message.sender === 'You' ? 'sender' : 'recipient'}`}>
            <span>{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PCchatBody;
