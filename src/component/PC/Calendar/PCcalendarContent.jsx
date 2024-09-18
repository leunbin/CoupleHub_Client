import React from "react";
import BaseCalendar from "../../Base/BaseCalendar";
import "./PCcalendarContent.scss";

const PCcalendarContent = ({
  schedule,
  setSchedule,
  schedules,
  selectedDate,
  setSelectedDate,
  selectedSchedule,
  setSelectedSchedule,
  setInput,
  input,
  setLocalInput,
}) => {
  return (
    <div className="PCcalendarContent_root">
      <BaseCalendar
        schedule={schedule}
        setSchedule={setSchedule}
        schedules={schedules}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedSchedule={setSelectedSchedule}
        selectedSchedule={selectedSchedule}
        setInput={setInput}
        input={input}
        setLocalInput={setLocalInput}
      />
    </div>
  );
};

export default PCcalendarContent;
