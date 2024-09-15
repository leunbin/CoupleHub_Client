import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import BaseMap from "../../Base/BaseMap";
import MapSearch from "../../Base/MapSearch";
import "./PCcalendarEdit.scss";
import { useLocation } from "react-router-dom";

const PCcalendarEdit = ({ schedule, setSchedule, handleSave, handleDelete }) => {
  const location = useLocation();
  const [input, setInput] = useState("");
  const [place, setPlace] = useState("");

  const onChangeSchedule = (e) => {
    setSchedule({
      ...schedule,
      [e.target.id]: e.target.value,
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
    })
  },[place])

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <form className="PCcalendarEdit_root">
      <div className="PCcalendarEdit_button">
        <button className="PCcalendarEdit_save" onClick={handleSave}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>

        <button className="PCcalendarEdit_delete" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <label htmlFor="event" className="PCcalendarEdit_event">
        Event
      </label>
      <input
        type="text"
        id="event"
        className="PCcalendarEdit_event_input"
        placeholder="event"
        value={schedule.event}
        onChange={onChangeSchedule}
      />
      <div className="PCcalendarEdit_time_wrapper">
        <label htmlFor="time" className="PCcalendarEdit_time">
          Time
        </label>
        <div className="PCcalendarEdit_time_wrapper_content">
          <input
            type="time"
            name="start-time"
            id="startTime"
            value={schedule.startTime}
            onChange={onChangeSchedule}
            className="PCcalendarEdit_time_input"
          />

          <span>~</span>

          <input
            type="time"
            name="end-time"
            id="endTime"
            value={schedule.endTime}
            onChange={onChangeSchedule}
            className="PCcalendarEdit_time_input"
          />
        </div>
      </div>

      <label htmlFor="color" className="PCcalendarEdit_color">
        Color
      </label>
      <select name="color" id="color" className="PCcalendarEdit_color_select" onChange={handleColorChange}>
        <option value="Black">Black</option>
        <option value="Red">Red</option>
        <option value="Orange">Orange</option>
        <option value="Green">Green</option>
        <option value="Purple">Purple</option>
      </select>

      <label htmlFor="note" className="PCcalendarEdit_note">
        Note
      </label>
      <textarea
        name="note"
        id="note"
        value={schedule.note}
        onChange={onChangeSchedule}
        className="PCcalendarEdit_note_textarea"
      ></textarea>

      <label htmlFor="location" className="PCcalendarEdit_location">
        Location
      </label>

      <input
        id="location"
        type="text"
        className="PCcalendarEdit_location_input"
        placeholder={schedule.location}
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
