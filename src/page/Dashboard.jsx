import React, { useEffect, useState } from "react";
import PCheader from "../component/PC/PCbasic/PCheader";
import PCsidenav from "../component/PC/PCbasic/PCsidenav";
import PCfooter from "../component/PC/PCbasic/PCfooter";
import "./Dashboard.scss";
import Weekplan from "../component/PC/Dashboard/Weekplan";
import BaseMap from "../component/chat/Base/BaseMap";
import MapPlace from "../component/PC/Dashboard/MapPlace";
import MemoModal from "../component/PC/Dashboard/MemoModal";

const Dashboard = ({ socket }) => {
  return (
    <div className="dashboard_root">
      <PCsidenav>
        <PCheader />
        <div className="dashboard_main">
          <div className="dashboard_main_right">
            <div className="dashboard_line1">
              <div className="dashboard_weekplan">
                <Weekplan />
              </div>
            </div>
            <div className="dashboard_line2">
              <div className="dashboard_map">
                <BaseMap />
              </div>

              <div className="dashboard_place">
                <MapPlace />
              </div>
            </div>
          </div>

          <div className="dashboard_main_left">
            <div className="dashboard_memo">
              <MemoModal />
            </div>
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default Dashboard;
