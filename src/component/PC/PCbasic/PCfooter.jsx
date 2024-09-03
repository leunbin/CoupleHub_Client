import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PCchatModal from "../Chat/PCchatModal";
import './PCfooter.scss';
import { faComments } from "@fortawesome/free-solid-svg-icons";

const PCfooter = ({socket}) => {
  const [isChat, setIsChat] = useState(false);
  
  return (
    <div className="PCfooter_root">
      <button className="cheating" onClick={()=>setIsChat(!isChat)}>
        <FontAwesomeIcon icon={faComments} />
      </button>
      {isChat ? <PCchatModal socket={socket} /> : null}
    </div>
  )
}

export default PCfooter;