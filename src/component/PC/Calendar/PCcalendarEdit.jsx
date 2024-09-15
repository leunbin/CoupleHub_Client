import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import BaseMap from "../../Base/BaseMap";
import MapSearch from "../../Base/MapSearch";
import "./PCcalendarEdit.scss";
import { useLocation } from "react-router-dom";

const PCcalendarEdit = ({ schedule, setSchedule, handleSave, handleDelete, selectedSchedule }) => {
  const location = useLocation();
  const [input, setInput] = useState("");
  const [place, setPlace] = useState("");

  const currentSchedule = selectedSchedule || schedule;

  const onChangeSchedule = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (e) => {
    setSchedule({
      ...schedule,
      boxcolor: e.target.value,
    });
  };

  useEffect(() => {
    setSchedule({
      ...schedule,
      location: place,
    });
  }, [place]);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <form className="PCcalendarEdit_root">
      <div className="PCcalendarEdit_button">
        <button className="PCcalendarEdit_save" type="button" onClick={handleSave}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>

        <button className="PCcalendarEdit_delete" type="button" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <label htmlFor="event" className="PCcalendarEdit_event">Event</label>
      <input
        type="text"
        name="event"
        className="PCcalendarEdit_event_input"
        placeholder="Event"
        value={currentSchedule.event || ""}
        onChange={onChangeSchedule}
      />

      <div className="PCcalendarEdit_time_wrapper">
        <label htmlFor="startTime" className="PCcalendarEdit_time">Time</label>
        <div className="PCcalendarEdit_time_wrapper_content">
          <input
            type="time"
            name="startTime"
            value={currentSchedule.startTime || ""}
            onChange={onChangeSchedule}
            className="PCcalendarEdit_time_input"
          />
          <span>~</span>
          <input
            type="time"
            name="endTime"
            value={currentSchedule.endTime || ""}
            onChange={onChangeSchedule}
            className="PCcalendarEdit_time_input"
          />
        </div>
      </div>

      <label htmlFor="boxcolor" className="PCcalendarEdit_color">Color</label>
      <select
        name="boxcolor"
        className="PCcalendarEdit_color_select"
        value={currentSchedule.boxcolor}
        onChange={handleColorChange}
      >
        <option value="Black">Black</option>
        <option value="Red">Red</option>
        <option value="Orange">Orange</option>
        <option value="Green">Green</option>
        <option value="Purple">Purple</option>
      </select>

      <label htmlFor="note" className="PCcalendarEdit_note">Note</label>
      <textarea
        name="note"
        value={currentSchedule.note || ""}
        onChange={onChangeSchedule}
        className="PCcalendarEdit_note_textarea"
      ></textarea>

      <label htmlFor="location" className="PCcalendarEdit_location">Location</label>
      <input
        type="text"
        className="PCcalendarEdit_location_input"
        placeholder="Location"
        value={currentSchedule.location || ""}
        readOnly
      />

      <div className="PCcalendarEdit_map">
        <BaseMap input={input} setPlace={setPlace} setSchedule={setSchedule} schedule={schedule} />
        {location.pathname === "/calendar" && (
          <div className="PCcalendarEdit_MapSearch">
            <MapSearch input={input} setInput={setInput} />
          </div>
        )}
      </div>
    </form>
  );
};

export default PCcalendarEdit;
