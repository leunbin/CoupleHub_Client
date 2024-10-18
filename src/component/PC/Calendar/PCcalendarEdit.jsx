import React, { useEffect, useRef, useState } from "react";
import BaseMap from "../../Base/BaseMap";
import MapSearch from "../../Base/MapSearch";
import "./PCcalendarEdit.scss";
import { useLocation } from "react-router-dom";
import PCcolorModal from "./PCcolorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PCcalendarEdit = ({
  schedule,
  setSchedule,
  handleSave,
  handleDelete,
  selectedSchedule,
  setSelectedSchedule,
  setInput,
  input,
  localInput,
  setLocalInput,
  handlePrev,
}) => {
  const location = useLocation();
  const [showColorModal, setShowColorModal] = useState(false);
  const [place, setPlace] = useState("");
  const outside = useRef(null);

  const currentSchedule = selectedSchedule || schedule;

  const onChangeSchedule = (e) => {
    if (currentSchedule._id) {
      setSelectedSchedule({
        ...selectedSchedule,
        [e.target.name]: e.target.value,
      });
    } else {
      setSchedule({
        ...schedule,
        [e.target.name]: e.target.value,
      });
    }
  };

  const incrementTime = (time) => {
    let [hours, minutes] = time.split(":").map(Number);

    minutes += 30;
    if (minutes >= 60) {
      minutes = 0;
      hours += 1;
    }

    if (hours >= 24) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const decrementTime = (time) => {
    let [hours, minutes] = time.split(":").map(Number);

    minutes -= 30;
    if (minutes < 0) {
      minutes = 30;
      hours -= 1;
    }

    if (hours < 0) {
      hours = 23;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const updateStartTime = (newTime) => {
    if (currentSchedule._id) {
      setSelectedSchedule({
        ...selectedSchedule,
        startTime: newTime,
      });
    } else {
      setSchedule({
        ...schedule,
        startTime: newTime,
      });
    }
  };

  const updateEndTime = (newTime) => {
    if (currentSchedule._id) {
      setSelectedSchedule({
        ...selectedSchedule,
        endTime: newTime,
      });
    } else {
      setSchedule({
        ...schedule,
        endTime: newTime,
      });
    }
  };

  const handleColorChange = (color) => {
    if (currentSchedule._id) {
      setSelectedSchedule({
        ...selectedSchedule,
        boxcolor: color,
      });
    } else {
      setSchedule({
        ...schedule,
        boxcolor: color,
      });
    }

    setShowColorModal(false);
  };

  const handleColorShow = () => {
    setShowColorModal(!showColorModal);
  };

  const handleClose = () => {
    setShowColorModal(false);
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    setSchedule((prevSchedule) => ({
      startTime: "",
      endTime: "",
      event: "",
      location: "",
      note: "",
      boxcolor: "",
      date: prevSchedule.date, // 선택한 날짜 유지
    }));
  };

  useEffect(() => {
    if (currentSchedule._id) {
      setSelectedSchedule({
        ...selectedSchedule,
        location: place,
      });
    } else {
      setSchedule({
        ...schedule,
        location: place,
      });
    }
  }, [place]); // 수정

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
    console.log(schedule);
    console.log(place);
  }, [schedule]);

  return (
    <form className="PCcalendarEdit_root">
      <div className="PCcalendarEdit_title">
        <button type="button" className="calender_prev" onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        ADD EVENT
      </div>
      <div className="PCcalendarEdit_date"></div>

      <div className="PCcalendarEdit_input_tag">
        <label htmlFor="event" className="PCcalendarEdit_event">
          일정
        </label>
        <input
          type="text"
          name="event"
          className="PCcalendarEdit_event_input"
          placeholder="비어 있음"
          value={currentSchedule.event || ""}
          onChange={onChangeSchedule}
        />
      </div>

      <div className="PCcalendarEdit_input_tag">
        <label htmlFor="startTime" className="PCcalendarEdit_time">
          시간
        </label>
        <div className="calendar_time_div">
          <div className="calendar_start_time_div">
            <button
              type="button"
              className="calendar_time_front"
              onClick={() =>
                updateStartTime(
                  decrementTime(currentSchedule.startTime || "00:00")
                )
              }
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <input
              type="text"
              name="startTime"
              value={currentSchedule.startTime || ""}
              className="PCcalendarEdit_time_input"
              onChange={(e) => updateStartTime(e.target.value)}
            />
            <button
              type="button"
              className="calendar_time_back"
              onClick={() =>
                updateStartTime(
                  incrementTime(currentSchedule.startTime || "00:00")
                )
              }
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="calendar_end_time_div">
            <button
              type="button"
              className="calendar_time_front"
              onClick={() =>
                updateEndTime(decrementTime(currentSchedule.endTime || "00:00"))
              }
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <input
              type="text"
              name="endTime"
              value={currentSchedule.endTime || ""}
              className="PCcalendarEdit_time_input"
              onChange={(e) => updateEndTime(e.target.value)}
            />
            <button
              type="button"
              className="calendar_time_back"
              onClick={() =>
                updateEndTime(incrementTime(currentSchedule.endTime || "00:00"))
              }
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      <div className="PCcalendarEdit_input_tag">
        <label htmlFor="boxcolor" className="PCcalendarEdit_color">
          태그
        </label>
        <div className="calendar_color_div" onClick={handleColorShow}>
          <input
            type="text"
            className="PCcalendarEdit_boxcolor_input"
            placeholder={currentSchedule.boxcolor}
            value={currentSchedule.boxcolor}
            readOnly
          />
          <button type="button" className="PCcalendar_colormodal_btn">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {showColorModal && (
            <PCcolorModal
              className="Calendar_custom_color_modal"
              ref={outside}
              handleColorChange={handleColorChange}
            />
          )}
        </div>
      </div>

      <div className="PCcalendarEdit_input_tag">
        <label htmlFor="note" className="PCcalendarEdit_note">
          메모
        </label>
        <textarea
          name="note"
          value={currentSchedule.note || ""}
          onChange={onChangeSchedule}
          className="PCcalendarEdit_note_textarea"
        ></textarea>
      </div>

      <div className="PCcalendarEdit_input_tag">
        <label htmlFor="location" className="PCcalendarEdit_location">
          장소
        </label>
        <input
          type="text"
          className="PCcalendarEdit_location_input"
          placeholder="장소"
          value={currentSchedule.location || ""}
          readOnly
        />
      </div>

      <div className="PCcalendarEdit_map">
        <BaseMap
          input={input}
          setPlace={setPlace}
          place={place}
          setSchedule={setSchedule}
          schedule={schedule}
          selectedSchedule={selectedSchedule}
          localInput={localInput}
        />
        {location.pathname === "/schedule" && (
          <div className="PCcalendarEdit_MapSearch">
            <MapSearch
              input={input}
              setInput={setInput}
              localInput={localInput}
              setLocalInput={setLocalInput}
            />
          </div>
        )}
      </div>

      <footer className="PCcalendar_footer">
        <button
          type="button"
          className="PCcalendar_delete"
          onClick={handleDelete}
        >
          Delete
        </button>
        <div className="calendaredit_btn">
          <button
            type="button"
            className="PCcalendar_refresh"
            onClick={handleRefresh}
          >
            Refresh
          </button>
          <button
            type="button"
            className="PCcalendar_save"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </footer>
    </form>
  );
};

export default PCcalendarEdit;
