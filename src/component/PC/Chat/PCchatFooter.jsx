import React, { useEffect, useState } from "react";
import "./PCchatFooter.scss";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PCchatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [isSubmitBtn, setIsSubmitBtn] = useState(false);
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: name,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      };

      socket.emit("message", newMessage);

      setMessage(""); // 메세지 입력 창 메세지
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      setIsSubmitBtn(true);
    } else {
      setIsSubmitBtn(false);
    }
  }, [message]);

  return (
    <div className="chat_footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className={`submit ${isSubmitBtn ? "" : "invisible"}`}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default PCchatFooter;
