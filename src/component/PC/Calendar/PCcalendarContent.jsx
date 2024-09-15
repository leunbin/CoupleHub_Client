import React from "react";
import BaseCalendar from '../../Base/BaseCalendar';
import './PCcalendarContent.scss';

const PCcalendarContent = ({schedule, setSchedule, schedules, selectedDate, setSelectedDate}) => {
  return (
    <div className="PCcalendarContent_root">
      <BaseCalendar schedule={schedule} setSchedule={setSchedule} schedules={schedules} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  )
}

export default PCcalendarContent;