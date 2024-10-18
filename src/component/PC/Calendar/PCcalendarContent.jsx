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
  handleOpenModal
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
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
};

export default PCcalendarContent;
