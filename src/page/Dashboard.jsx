import React from "react";
import PCheader from "../component/PC/PCbasic/PCheader";
import PCsidenav from "../component/PC/PCbasic/PCsidenav";
import PCfooter from "../component/PC/PCbasic/PCfooter";
import CalendarModal from "../component/PC/Dashboard/CalendarModal";

const Dashboard = ({socket}) => {
  return (
    <div className="dashboard_root">
      <PCsidenav>
        <PCheader />
        <CalendarModal />
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default Dashboard;
