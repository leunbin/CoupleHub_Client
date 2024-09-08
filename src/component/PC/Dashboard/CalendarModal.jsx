import React, { forwardRef } from "react";
import Calendar from "react-calendar";
import "./CalendarModal.scss";

const CalendarModal = forwardRef(({ setDate, className, ...props }, ref) => {
  return (
    <div className={`calendar-modal ${className}`} ref={ref} {...props}>
      <Calendar
        className="custom-calendar"
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        onClickDay={(day) => setDate(day)}
      />
    </div>
  );
});

export default CalendarModal;
