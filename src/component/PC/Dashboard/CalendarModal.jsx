import React from "react";
import Calendar from 'react-calendar';
import './CalendarModal.scss';

const CalendarModal = () => {
  return(
    <div className="calendarmodal_root">
      <Calendar className="custom-calendar" calendarType="gregory" prev2Label={null} prevLabel={null} next2Label={null} nextLabel={null} />
    </div>
  )
}

export default CalendarModal