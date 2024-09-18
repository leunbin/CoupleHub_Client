import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./BaseCalendar.scss";
import "react-calendar/dist/Calendar.css";

const BaseCalendar = ({
  schedule,
  setSchedule,
  schedules,
  selectedDate,
  setSelectedDate,
  setSelectedSchedule,
  selectedSchedule,
  input,
  setLocalInput,
}) => {
  const [infoArray, setInfoArray] = useState([]);

  const onChangeDate = (value) => {
    setSelectedDate(value);
    setSchedule({
      ...schedule,
      date: value,
    });
  };

  useEffect(() => {
    if (selectedSchedule) {
      setSchedule(selectedSchedule);
    }
  }, [selectedSchedule, schedules]);

  useEffect(() => {
    if (schedule._id) {
      setSchedule({
        date: "",
        startTime: "",
        endTime: "",
        event: "",
        location: "",
        note: "",
        boxcolor: "",
      });
    }
    setLocalInput("");
  }, [selectedDate]);

  useEffect(() => {
    console.log(input);
  }, [selectedDate]);

  const handleTileContent = ({ date, view }) => {
    if (view === "month") {
      const matchedSchedules = infoArray.filter(
        (item) =>
          new Date(item.date).toLocaleDateString() ===
            date.toLocaleDateString() && item._id !== selectedSchedule?._id
      );

      return (
        <>
          {matchedSchedules.length > 0 &&
            matchedSchedules.map((item) => (
              <div key={item._id} className={`scheduleTile ${item.boxcolor}`}>
                {item.event}
              </div>
            ))}
          {date.toLocaleString() === new Date(schedule.date).toLocaleString() &&
            schedule.event && (
              <div className={`scheduleTile ${schedule.boxcolor}`}>
                {schedule.event}
              </div>
            )}
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    setInfoArray([...schedules]);
  }, [schedules]);

  return (
    <Calendar
      className="custom-calendar"
      tileClassName="custom-tile"
      calendarType="gregory"
      prev2Label={null}
      next2Label={null}
      onChange={onChangeDate}
      value={selectedDate}
      prevLabel={<span>« Prev</span>}
      nextLabel={<span>Next »</span>}
      prevAriaLabel="Go to previous month"
      nextAriaLabel="Go to next month"
      tileContent={handleTileContent}
    />
  );
};

export default BaseCalendar;
