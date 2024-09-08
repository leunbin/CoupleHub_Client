import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./BaseCalendar.scss";
import "react-calendar/dist/Calendar.css";

const BaseCalendar = ({schedule, setSchedule}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onChangeDate = (value) => {
    setSelectedDate(value);
    setSchedule({
      ...schedule,
      date: value
    })
  }

  const handleTileContent = (({date, view}) => {
    if(view === 'month') {
      if(date.toLocaleString() === schedule.date.toLocaleString()) {
        return <div className={`scheduleTile ${schedule.boxcolor}`}>{schedule.event}</div>
      }
    }
    return null;
  })

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <Calendar
      className="custom-calendar"
      tileClassName={() => "custom-tile"}
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
