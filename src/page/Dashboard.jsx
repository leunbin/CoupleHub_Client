import React, { useEffect, useState } from "react";
import PCheader from "../component/PC/PCbasic/PCheader";
import PCsidenav from "../component/PC/PCbasic/PCsidenav";
import PCfooter from "../component/PC/PCbasic/PCfooter";
import "./Dashboard.scss";
import Weekplan from "../component/PC/Dashboard/Weekplan";
import BaseMap from "../component/chat/Base/BaseMap";
import { Link } from "react-router-dom";

const Dashboard = ({ socket }) => {
  return (
    <div className="dashboard_root">
      <PCsidenav>
        <PCheader />
        <div className="dashboard_main">
          <div className="dashboard_line1">
            <div className="dashboard_weekplan">
              <Weekplan />
            </div>
          </div>
          <div className="dashboard_line2">
            <div className="dashboard_map">
              <BaseMap />
              sdfe
            </div>
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default Dashboard;
