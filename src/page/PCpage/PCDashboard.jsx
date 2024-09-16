import React, { useEffect, useState } from "react";
import PCheader from "../../component/PC/PCbasic/PCheader";
import PCsidenav from "../../component/PC/PCbasic/PCsidenav";
import PCfooter from "../../component/PC/PCbasic/PCfooter";
import "./PCDashboard.scss";
import Weekplan from "../../component/PC/Dashboard/Weekplan";
import BaseMap from "../../component/Base/BaseMap";
import MapPlace from "../../component/PC/Dashboard/MapPlace";
import MemoModal from "../../component/PC/Dashboard/MemoModal";
import fetchSchedulesByDate from "../../api/schedule/fetchSchedulesByDate";

const PCDashboard = ({ socket }) => {
  const [dateSchedules, setDateSchedules] = useState([]);
  const today = new Date();
  const date = today.toLocaleDateString();

  const getSchedulesByDate = async (date) => {
    try {
      const result = await fetchSchedulesByDate(date);
      setDateSchedules(result);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getSchedulesByDate(date);
  },[date]);

  return (
    <div className="PCdashboard_root">
      <PCsidenav>
        <PCheader />
        <div className="PCdashboard_main">
          <div className="PCdashboard_main_right">
            <div className="PCdashboard_line1">
              <div className="PCdashboard_weekplan">
                <Weekplan />
              </div>
            </div>
            <div className="PCdashboard_line2">
              <div className="PCdashboard_map">
                <BaseMap dateSchedules={dateSchedules} />
              </div>

              <div className="PCdashboard_place">
                <MapPlace dateSchedules={dateSchedules} />
              </div>
            </div>
          </div>

          <div className="PCdashboard_main_left">
            <div className="PCdashboard_memo">
              <MemoModal />
            </div>
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default PCDashboard;
