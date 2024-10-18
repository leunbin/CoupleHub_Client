import React from "react";
import "./PCschedule.scss";
import fetchScheduleById from "../../../api/schedule/fetchScheduleById";

const PCschedule = ({
  dateSchedules,
  setSelectedSchedule,
  selectedSchedule,
  selectedDate,
  handleOpenAddModal
}) => {
  const handleScheduleItem = async (id) => {
    const result = await fetchScheduleById(id);
    setSelectedSchedule(result);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('ko-KR', { 
      month: 'long', 
      day: '2-digit' 
    }).format(date);
  };

  return (
    <div className="PCschedule_root">
      <div className="PCschedule_title">{formatDate(selectedDate)} 일정</div>
      <div className="PCschedule_content">
        {dateSchedules?.length > 0 ? (
          dateSchedules.map((schedule) => (
            <div
              className={`PCschedule_item ${
                schedule._id === selectedSchedule?._id ? "active" : ""
              } `}
              key={schedule.id ? schedule._id : Math.random()}
              onClick={() => handleScheduleItem(schedule._id)}
            >
              <div className={`PCschedule_item_event ${schedule.boxcolor}`}>
                {schedule.event}
              </div>
              <div className="PCschedule_item_time">
                {schedule.startTime === "" && schedule.endTime === ""
                  ? "ALL DAY"
                  : `${schedule.startTime} ~ ${schedule.endTime}`}
              </div>
              <div className="PCschedule_item_location">
                {schedule.location}
              </div>
            </div>
          ))
        ) : (
          <div className="PCschedule_no_schedules">
            No schedules for today 😢
          </div>
        )}
      </div>

    <footer className="PCschedule_footer">
      <button className="PCschedule_add_btn" onClick={handleOpenAddModal}>
        ADD EVENT
      </button>
    </footer>
    </div>
  );
};

export default PCschedule;
