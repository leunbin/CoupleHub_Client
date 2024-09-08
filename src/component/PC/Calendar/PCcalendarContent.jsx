import React from "react";
import BaseCalendar from '../../Base/BaseCalendar';
import './PCcalendarContent.scss';

const PCcalendarContent = ({schedule, setSchedule}) => {
  return (
    <div className="PCcalendarContent_root">
      <BaseCalendar schedule={schedule} setSchedule={setSchedule} />
    </div>
  )
}

export default PCcalendarContent;