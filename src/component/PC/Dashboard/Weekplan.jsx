import React, { useEffect, useState } from "react";
import "./Weekplan.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Weekplan = () => {
  const [weekDays, setWeekDays] = useState([""]);

  useEffect(() => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      daysArray.push(`${nextDay.getDate()}일`);
    }

    setWeekDays(daysArray);
  }, []);

  return (
    <Link to="/calendar">
      <div className="Weekplan_root">
        <div className="Weekplan_week">
          {weekDays.map((day, index) => (
            <div key={index} className="Weekplan_content">
              <div className="Weekplan_day">{day}</div>
              <div className="Weekplan_day_schedule">schedule</div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Weekplan;
