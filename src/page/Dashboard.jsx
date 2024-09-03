import React, { useEffect, useState } from "react";
import PCheader from "../component/PC/PCbasic/PCheader";
import PCsidenav from "../component/PC/PCbasic/PCsidenav";
import PCfooter from "../component/PC/PCbasic/PCfooter";
import CalendarModal from "../component/PC/Dashboard/CalendarModal";
import "./Dashboard.scss";
import Weekplan from "../component/PC/Dashboard/Weekplan";
import Weather from "../component/PC/Dashboard/Weather";

const Dashboard = ({ socket }) => {
  return (
    <div className="dashboard_root">
      <PCsidenav>
        <PCheader />
        <div className="dashboard_main">
          <div className="dashboard_line1">
            <Weekplan />
            <Weather />
          </div>
          {/* <CalendarModal /> */}
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default Dashboard;
