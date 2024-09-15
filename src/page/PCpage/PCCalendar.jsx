import React, { useEffect, useState } from "react";
import PCsidenav from "../../component/PC/PCbasic/PCsidenav";
import PCheader from "../../component/PC/PCbasic/PCheader";
import PCfooter from "../../component/PC/PCbasic/PCfooter";
import PCschedule from "../../component/PC/Calendar/PCschedule";
import "./PCCalendar.scss";
import PCcalendarContent from "../../component/PC/Calendar/PCcalendarContent";
import PCcalendarEdit from "../../component/PC/Calendar/PCcalendarEdit";
import postSchedule from "../../api/schedule/postSchedule";
import putSchedule from "../../api/schedule/putSchedule";
import fetchSchedules from "../../api/schedule/fetchSchedules";
import fetchSchedulesByDate from "../../api/schedule/fetchSchedulesByDate";
import deleteSchedule from '../../api/schedule/deleteSchedule';

const PCCalendar = ({ socket }) => {
  const [schedule, setSchedule] = useState({
    date: "",
    startTime: "",
    endTime: "",
    event: "",
    location: "",
    note: "",
    boxcolor: "",
  });

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateSchedules, setDateSchedules] = useState([]);

  const getSchedules = async () => {
    try {
      const result = await fetchSchedules();
      setSchedules(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getSchedulesByDate = async (date) => {
    try {
      const result = await fetchSchedulesByDate(date);
      setDateSchedules(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const date = selectedDate.toLocaleDateString();
      if (schedule._id) {
        const data = await putSchedule(schedule._id, schedule);
        setSchedule((pre) => ({
          ...pre,
          ...data,
        }));
      } else {
        const data = await postSchedule(schedule);
        setSchedule((pre) => ({
          ...pre,
          ...data,
        }));
      }
      setSchedule({
        date: "",
        startTime: "",
        endTime: "",
        event: "",
        location: "",
        note: "",
        boxcolor: "",
      });
      await getSchedulesByDate(date);
      await getSchedules();
    } catch (error) {
      console.log("저장실패", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const date = selectedDate.toLocaleDateString();
      if(selectedSchedule._id) {
        await deleteSchedule(selectedSchedule._id);
        setSelectedSchedule(null)
      } else {
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
      await getSchedulesByDate(date);
      await getSchedules();
    } catch (error) {
      console.log("삭제 실패", error);
    }
  }

  useEffect(() => {
    getSchedules();
  }, []);

  useEffect(() => {
    const date = selectedDate.toLocaleDateString();
    getSchedulesByDate(date);
    setSelectedSchedule(null);
  },[selectedDate]);

  return (
    <div className="PCcalendar_root">
      <PCsidenav>
        <PCheader />
        <div className="PCcalendar_main">
          <div className="PCcalendar_schedule">
            <PCschedule dateSchedules={dateSchedules} setSelectedSchedule={setSelectedSchedule} />
          </div>
          <div className="PCcalendar_calendar">
            <PCcalendarContent
              schedule={schedule}
              setSchedule={setSchedule}
              schedules={schedules}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="PCcalendar_edit">
            <PCcalendarEdit
              schedule={schedule}
              setSchedule={setSchedule}
              handleSave={handleSave}
              handleDelete={handleDelete}
              selectedSchedule={selectedSchedule}
            />
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default PCCalendar;
