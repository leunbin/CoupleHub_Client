import React, { useEffect, useRef, useState } from "react";
import './PCcalenderModal.scss';

const PCcalenderModal = ({selectedDate, setIsModal}) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [year,setYear] = useState('');
  const [text,setText] = useState('');
  const outside = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(outside.current && !outside.current.contains(e.target)){
        setIsModal(false);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => {
      document.removeEventListener("mousedown",handleClickOutside);
    };
  },[])

  useEffect(() => {
    if (selectedDate) {
      setDay(selectedDate.toLocaleDateString("ko-KO", { weekday: "long" }));
      setMonth(selectedDate.toLocaleDateString("en-US", { month: "numeric" }));
      setDate(selectedDate.getDate());
      setYear(selectedDate.getFullYear());
    }
  }, [selectedDate]);

  return(
    <div className="PCcalenderModalRoot" ref={outside}>
      <div className="dateInfo">
        {year}년 {month}월 {date}일 {day}
      </div>
      <input type="text" className="text" value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

export default PCcalenderModal;