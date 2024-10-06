import React, { useEffect, useRef, useState } from "react";
import BaseMap from "../../Base/BaseMap";
import MapSearch from "../../Base/MapSearch";
import "./PCcalendarEdit.scss";
import { useLocation } from "react-router-dom";
import PCcolorModal from "./PCcolorModal";
import PCtimeModal from "./PCtimeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";

import {
  faArrowRotateLeft,
  faChevronDown,
  faTrash,
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
}) => {
  const location = useLocation();
  const [showColorModal, setShowColorModal] = useState(false);
  const [showstartTimeModal, setShowstartTimeModal] = useState(false);
  const [showendTimeModal, setShowendTimeModal] = useState(false);
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

  const updateStartTime = (startTime) => {
    if (currentSchedule._id) {
      setSelectedSchedule({
        ...selectedSchedule,
        startTime: startTime,
      });
    } else {
      setSchedule({
        ...schedule,
        startTime: startTime,
      });
    }
    setShowstartTimeModal(false);
  };

  const updateEndTime = (endTime) => {
    if (currentSchedule._id) {
      setSelectedSchedule({
        ...selectedSchedule,
        endTime: endTime,
      });
    } else {
      setSchedule({
        ...schedule,
        endTime: endTime,
      });
    }
    setShowendTimeModal(false);
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

  const handleStartTimeShow = () => {
    setShowstartTimeModal(!showstartTimeModal);
  };

  const handleEndTimeShow = () => {
    setShowendTimeModal(!showendTimeModal);
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
  }, [schedule]);

  return (
    <form className="PCcalendarEdit_root">
      <div className="PCcalendarEdit_button">
        <button
          className={`PCcalendarEdit_save ${schedule.event ? "active" : ""}`}
          type="button"
          onClick={handleSave}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>

        {selectedSchedule ? (
          <button
            className={`PCcalendarEdit_delete ${
              selectedSchedule ? "active" : ""
            }`}
            type="button"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        ) : (
          <button
            type="button"
            className={`PCcalendarEdit_refresh ${
              schedule.event !== "" || schedule.location !== "" ? "active" : ""
            }`}
            onClick={(e) => handleRefresh(e)}
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
          </button>
        )}
      </div>

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

      <label htmlFor="startTime" className="PCcalendarEdit_time">
        시간
      </label>
      <div className="calendar_time_div">
        <div className="calendar_start_time_div" onClick={handleStartTimeShow}>
          <input
            type="text"
            name="startTime"
            value={currentSchedule.startTime || ""}
            className="PCcalendarEdit_time_input"
            readOnly
          />
          <button type="button" className="time_btn">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {showstartTimeModal && (
            <PCtimeModal
              showstartTimeModal={showstartTimeModal}
              showendTimeModal={showendTimeModal}
              setStartTime={updateStartTime}
              setEndTime={updateEndTime}
              className="custom_time_modal"
              ref={outside}
            />
          )}
        </div>
        <span>~</span>
        <div className="calendar_end_time_div" onClick={handleEndTimeShow}>
          <input
            type="text"
            name="endTime"
            value={currentSchedule.endTime || ""}
            className="PCcalendarEdit_time_input"
            readOnly
          />
          <button type="button" className="time_btn">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {showendTimeModal && (
            <PCtimeModal
              showstartTimeModal={showstartTimeModal}
              showendTimeModal={showendTimeModal}
              setStartTime={updateStartTime}
              setEndTime={updateEndTime}
              className="custom_time_modal"
              ref={outside}
            />
          )}
        </div>
      </div>

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

      <label htmlFor="note" className="PCcalendarEdit_note">
        메모
      </label>
      <textarea
        name="note"
        value={currentSchedule.note || ""}
        onChange={onChangeSchedule}
        className="PCcalendarEdit_note_textarea"
      ></textarea>

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
    </form>
  );
};

export default PCcalendarEdit;
