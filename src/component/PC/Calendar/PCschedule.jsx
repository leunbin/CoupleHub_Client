import React from "react";
import "./PCschedule.scss";
import fetchScheduleById from "../../../api/schedule/fetchScheduleById";

const PCschedule = ({ dateSchedules, setSchedule }) => {
  const handleScheduleItem = async (id) => {
    const result = await fetchScheduleById(id);
    setSchedule(result)
  }
  
  return (
    <div className="PCschedule_root">
      <div className="PCschedule_title">Today's Schedule</div>
      <div className="PCschedule_content">
        {dateSchedules?.length > 0 ? (
          dateSchedules.map((schedule) => (
            <div className="PCschedule_item" key={schedule.id} onClick={() => handleScheduleItem(schedule._id)}>
              <div className="PCschedule_item_event">{schedule.event}</div>
              <div className="PCschedule_item_time">
                {schedule.startTime === "" && schedule.endTime === ""
                  ? "ALL DAY"
                  : `${schedule.startTime} ~ ${schedule.endTime}`}
              </div>
              <div className="PCschedule_item_location">{schedule.location}</div>
            </div>
          ))
        ) : (
          <div className="PCschedule_no_schedules">No schedules for today 😢</div>
        )}
      </div>
    </div>
  );
};

export default PCschedule;
