import React, { useEffect, useState } from "react";
import PCchatBody from "./PCchatBody";
import PCchatFooter from "./PCchatFooter";
import './PCchatModal.scss';

const PCchatModal = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    console.log(messages)
  },[messages])

  return (
    <div className="chat">
      <PCchatBody messages={messages} />
      <PCchatFooter socket={socket} />
    </div>
  );
};

export default PCchatModal;
