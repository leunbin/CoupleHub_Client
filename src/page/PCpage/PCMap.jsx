import React from "react";
import PCsidenav from "../../component/PC/PCbasic/PCsidenav";
import PCheader from "../../component/PC/PCbasic/PCheader";
import PCfooter from "../../component/PC/PCbasic/PCfooter";

const PCMap = ({socket}) => {
  return (
    <div className="PCmap_root">
      <PCsidenav>
        <PCheader />
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  )
}

export default PCMap;