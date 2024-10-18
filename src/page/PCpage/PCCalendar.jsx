import React, { useEffect, useRef, useState } from "react";
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
import deleteSchedule from "../../api/schedule/deleteSchedule";

const PCCalendar = ({ socket }) => {
  const outside = useRef();
  const [schedule, setSchedule] = useState({
    date: "",
    startTime: "",
    endTime: "",
    event: "",
    location: "",
    note: "",
    boxcolor: "",
  }); // 생성하는 스케줄
  const [input, setInput] = useState(""); // 지도에 보내는 검색
  const [localInput, setLocalInput] = useState(""); // 검색창에 들어가는 input
  const [isModal, setIsModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState(null); // 수정하는 스케줄

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

      const sortedSchedules = result.sort((a, b) => {
        if (!a.startTime) return -1;
        if (!b.startTime) return 1;
        const dateA = new Date(date + " " + a.startTime);
        const dateB = new Date(date + " " + b.startTime);
        return dateA - dateB;
      });

      setDateSchedules(sortedSchedules);
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

      // setIsModal(false);
      // setIsAdd(false);
      // setSchedule({
      //   date: "",
      //   startTime: "",
      //   endTime: "",
      //   event: "",
      //   location: "",
      //   note: "",
      //   boxcolor: "",
      // });

      setLocalInput("");

      await getSchedulesByDate(date);
      await getSchedules();

      window.alert("성공적으로 저장했습니다 😊");
    } catch (error) {
      console.log("저장실패", error);
      window.alert("저장에 실패하였습니다 😢");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const date = selectedDate.toLocaleDateString();
      if (selectedSchedule._id) {
        await deleteSchedule(selectedSchedule._id);
        setSelectedSchedule(null);
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
      window.alert("성공적으로 삭제했습니다 😊");
    } catch (error) {
      console.log("삭제 실패", error);
      window.alert("삭제 실패하였습니다 😢");
    }
  };

  const handleOpenModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleOpenAddModal = () => {
    setIsModal((prev) => !prev);
    setIsAdd((prev) => !prev);
  };

  const handleClose = () => {
    setIsModal(false);
    setIsAdd(false);
    setSelectedSchedule(null);
    setSchedule({
      date: "",
      startTime: "",
      endTime: "",
      event: "",
      location: "",
      note: "",
      boxcolor: "",
    });
  };

  const handlePrev = () => {
    console.log("handlePrev 실행됨");
    setSelectedSchedule(null);
    setIsAdd(false);
    setIsModal(true);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (outside.current && !outside.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getSchedules();
  }, []);

  useEffect(() => {
    const date = selectedDate.toLocaleDateString();
    getSchedulesByDate(date);
    setSelectedSchedule(null);
  }, [selectedDate]);

  return (
    <div className="PCcalendar_root">
      <PCsidenav>
        <PCheader />
        <div className="PCcalendar_main">
          {isModal && !selectedSchedule && (
            <>
              <div className="PCcalendar_Modal_Overlay"></div>
              <div className="PCcalendar_Add_modal" ref={outside}>
                <PCschedule
                  dateSchedules={dateSchedules}
                  setSelectedSchedule={setSelectedSchedule}
                  selectedSchedule={selectedSchedule}
                  selectedDate={selectedDate}
                  handleOpenAddModal={handleOpenAddModal}
                />
              </div>
            </>
          )}
          {(isAdd || selectedSchedule) && (
            <>
              <div className="PCcalendar_Modal_Overlay"></div>
              <div className="PCcalendar_Add_modal" ref={outside}>
                <PCcalendarEdit
                  schedule={schedule}
                  setSchedule={setSchedule}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  selectedSchedule={selectedSchedule}
                  setSelectedSchedule={setSelectedSchedule}
                  input={input}
                  setInput={setInput}
                  localInput={localInput}
                  setLocalInput={setLocalInput}
                  handlePrev={handlePrev}
                />
              </div>
            </>
          )}
          {/* </div> */}
          <div className="PCcalendar_calendar">
            <PCcalendarContent
              schedule={schedule}
              setSchedule={setSchedule}
              schedules={schedules}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedSchedule={selectedSchedule}
              setSelectedSchedule={setSelectedSchedule}
              setInput={setInput}
              input={input}
              setLocalInput={setLocalInput}
              handleOpenModal={handleOpenModal}
            />
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default PCCalendar;
