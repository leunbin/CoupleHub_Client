import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "./BaseCalendar.scss";
import '../dimmed.scss';
import PCcalenderModal from "./PC/PCcalenderModal";

const BaseCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModal, setIsModal] = useState(false);


  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div className={`"calendarRoot" ${isModal ? 'background' : ''}`}>
      <Calendar
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        onChange={setSelectedDate}
        onClickDay={() => setIsModal(true)}
        value={selectedDate}
          
      />
      {isModal && <PCcalenderModal selectedDate={selectedDate} setIsModal={setIsModal} />}
    </div>
  );
};

export default BaseCalendar;
