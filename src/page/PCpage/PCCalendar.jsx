import React, { useEffect, useState } from "react";
import PCsidenav from "../../component/PC/PCbasic/PCsidenav";
import PCheader from "../../component/PC/PCbasic/PCheader";
import PCfooter from "../../component/PC/PCbasic/PCfooter";
import PCschedule from "../../component/PC/Calendar/PCschedule";
import "./PCCalendar.scss";
import PCcalendarContent from "../../component/PC/Calendar/PCcalendarContent";
import PCcalendarEdit from "../../component/PC/Calendar/PCcalendarEdit";

const PCCalendar = ({ socket }) => {
  const [schedule, setSchedule] = useState({
    date:"",
    startTime: "",
    endTime:"",
    event: "",
    location: "",
    note: "",
    boxcolor:"",
  })

  return (
    <div className="PCcalendar_root">
      <PCsidenav>
        <PCheader />
        <div className="PCcalendar_main">
          <div className="PCcalendar_schedule">
            <PCschedule />
          </div>
          <div className="PCcalendar_calendar">
            <PCcalendarContent schedule={schedule} setSchedule={setSchedule} />
          </div>
          <div className="PCcalendar_edit">
            <PCcalendarEdit schedule={schedule} setSchedule={setSchedule} />
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default PCCalendar;
