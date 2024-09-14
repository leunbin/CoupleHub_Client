import React, { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCrown,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CalendarModal from "../Dashboard/CalendarModal";
import "./MemoEdit.scss";

const MemoEdit = ({ memo, setMemo, handleSave, handleDelete }) => {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const outside = useRef(null);

  const onChangeMemo = (e) => {
    setMemo({
      ...memo,
      [e.target.id]: e.target.value,
    });
  };

  const handleClickPriority = () => {
    setMemo((prevMemo) => ({
      ...prevMemo,
      priority: !prevMemo.priority,
    }));
  };

  const handleCalendarShow = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = useCallback((selectedDate) => {
    setDate(selectedDate);
    setMemo((prevMemo) => ({
      ...prevMemo,
      dueDate: selectedDate.toLocaleDateString(),
    }));
    setShowCalendar(false);
  }, []);

  const handleClose = () => {
    setShowCalendar(false);
  };

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

  return (
    <form className="MemoEdit_root">
      <div className="MemoEdit_button">
        <button className="MemoEdit_save" onClick={handleSave}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>

        <button
          type="button"
          className={`MemoEdit_priority ${memo.priority ? "active" : ""}`}
          onClick={handleClickPriority}
        >
          <FontAwesomeIcon icon={faCrown} />
        </button>
      </div>

      <label htmlFor="title" className="MemoEdit_title">
        Title
      </label>
      <input
        type="text"
        id="title"
        className="MemoEdit_title_input"
        placeholder="title"
        value={memo.title}
        onChange={onChangeMemo}
      />

      <label htmlFor="type" className="MemoEdit_type">
        Type
      </label>
      <select
        id="type"
        value={memo.type || ""}
        onChange={onChangeMemo}
        className="MemoEdit_type_select"
      >
        <option value="" disabled>
          Select Type
        </option>
        <option value="Note">Note</option>
        <option value="Checklist">Checklist</option>
      </select>

      <label htmlFor="dueDate" className="MemoEdit_deadline">
        Deadline
      </label>
      <div className="Memo_deadline_div">
        <input
          id="dueDate"
          type="text"
          className="MemoList_deadline_input"
          placeholder={date ? date.toLocaleDateString() : "none"}
          value={
            memo.dueDate ? new Date(memo.dueDate).toLocaleDateString() : "none"
          }
          readOnly
        />
        <button
          type="button"
          className="MemoEdit_calendar"
          onClick={handleCalendarShow}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </button>
        {showCalendar && (
          <CalendarModal
            setDate={handleDateChange}
            className="Memo_custom_calendar_modal"
            ref={outside}
          />
        )}
      </div>

      <label htmlFor="author" className="MemoEdit_author">
        Author
      </label>
      <input
        id="author"
        type="text"
        className="MemoEdit_author_input"
        placeholder={memo.author}
        readOnly
      />

      <div className="MemoEdit_deleteTag">
        <button type="button" className={`MemoEidt_deleteBtn ${memo._id ? "active" : "" }`} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </form>
  );
};

export default MemoEdit;
