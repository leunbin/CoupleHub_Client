import React from "react";
import PCheader from "../component/PC/PCbasic/PCheader";
import PCsidenav from "../component/PC/PCbasic/PCsidenav";
import PCfooter from "../component/PC/PCbasic/PCfooter";

const Memo = ({socket}) => {
  return (
    <div className="memo_root">
      <PCsidenav>
        <PCheader />
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
}

export default Memo;