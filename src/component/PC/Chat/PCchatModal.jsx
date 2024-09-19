import React, { useEffect, useState } from "react";
import PCchatBody from "./PCchatBody";
import PCchatFooter from "./PCchatFooter";
import "./PCchatModal.scss";

const PCchatModal = ({ socket, className, messages, setMessages }) => {

  return (
    <div className={`chat ${className}`}>
      <PCchatBody messages={messages} />
      <PCchatFooter socket={socket} />
    </div>
  );
};

export default PCchatModal;
