import React from "react";
import PCsidenav from "../component/PC/PCbasic/PCsidenav";
import PCheader from "../component/PC/PCbasic/PCheader";
import PCfooter from "../component/PC/PCbasic/PCfooter";

const Map = ({socket}) => {
  return (
    <div className="map_root">
      <PCsidenav>
        <PCheader />
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  )
}

export default Map;