import React, { useEffect, useState } from "react";
import PCheader from "../component/PC/PCbasic/PCheader";
import PCsidenav from "../component/PC/PCbasic/PCsidenav";
import PCfooter from "../component/PC/PCbasic/PCfooter";
import CalendarModal from "../component/PC/Dashboard/CalendarModal";
import './Dashboard.scss';
import Weekplan from "../component/PC/Dashboard/Weekplan";
import weatherAPI from "../api/weatherAPI";

const Dashboard = ({ socket }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const data = async () => {
      try{
        const res = await weatherAPI();
        setWeather(res)
      } catch (err) {
        console.log(err)
      }
    }

    data()
  },[])

  useEffect(() => {
    console.log(weather)
  },[])
  return (
    <div className="dashboard_root">
      <PCsidenav>
        <PCheader />
        <div className="dashboard_main">
          <Weekplan />
          <CalendarModal />
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default Dashboard;
