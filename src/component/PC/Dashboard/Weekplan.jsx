import React, { useEffect, useState } from "react";
import "./Weekplan.scss";
import fetchSchedulesByDate from "../../../api/schedule/fetchSchedulesByDate";

const Weekplan = () => {
  const [weekDays, setWeekDays] = useState([
    {
      day:'',
      schedules:[]
    }
  ]);

  useEffect(() => {
    const fetchWeekSchedules = async () => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const schedules = await fetchSchedulesByDate(nextDay.toLocaleDateString());
      daysArray.push({
        day: `${nextDay.getMonth() + 1}월 ${nextDay.getDate()}일`, // 'MM월 DD일' 형식
        schedules: schedules
      });
    };

    setWeekDays(daysArray);
  }

  fetchWeekSchedules();
  }, []);

  useEffect(() => {
    console.log(weekDays)
  },[weekDays])
  return (
    <div className="Weekplan_root">
      <div className="Weekplan_week">
        {weekDays.map((item, index) => (
          <div key={index} className="Weekplan_content">
            <div className="Weekplan_day">{item.day}</div>
            <div className="Weekplan_day_schedule">
              {item.schedules.length > 0 ? item.schedules.map((item) => (
                <span className="Weekplan_item_event">{item.event}</span>
              )) : <span className="Weekplan_no_events">No events 😢</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weekplan;
