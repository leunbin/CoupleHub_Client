import React, { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faStar,
  faTrash,
  faChevronDown,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import CalendarModal from "../Dashboard/CalendarModal";
import "./MemoEdit.scss";
import MemoTypeModal from "./MemoTypeModal";

const MemoEdit = ({
  memo,
  setMemo,
  handleSave,
  handleDelete,
  isEditModal,
  date,
  setDate,
  handleMemoEditModal
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const outside = useRef(null);
  const [isPravite, setIsPrivate] = useState(false);

  useEffect(() => {
    setIsPrivate(memo.private || false);
  }, [memo.private]);

  const togglePublic = () => {
    setIsPrivate((prevState) => {
      const updatedPrivate = !prevState;
      setMemo((prevMemo) => ({
        ...prevMemo,
        private: !prevMemo.private,
      }));
      return updatedPrivate;
    });
  };

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

  const handleTypeShow = () => {
    setShowTypeModal(!showTypeModal);
  };

  const handleDateChange = useCallback((selectedDate) => {
    setDate(selectedDate);
    setMemo((prevMemo) => ({
      ...prevMemo,
      dueDate: selectedDate.toLocaleDateString(),
    }));
    setShowCalendar(false);
  }, []);

  const handleTypeChange = (type) => {
    setMemo((pre) => ({
      ...pre,
      type: type,
    }));

    setShowTypeModal(false);
  };

  const handleClose = () => {
    setShowCalendar(false);
    setShowTypeModal(false);
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
    <form className={`MemoEdit_root ${isEditModal ? "slide-in" : "slide-out"}`}>
      <div className="MemoEdit_button">
        <button
          className={`MemoEdit_save ${
            memo.title && memo.type && memo.content.length > 0 ? "active" : ""
          }`}
          onClick={handleSave}
          disabled={memo.title.length > 0 ? false : true}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>

        <div className="toggle-wrapper">
          <label htmlFor="inpLock" className={`btn-lock ${isPravite ? "lock" : ""}`}>
            <input
              id="inpLock"
              className="toggle-checkbox"
              type="checkbox"
              checked={isPravite}
              onChange={togglePublic}
            />
            <FontAwesomeIcon className="lock-icon" icon={isPravite ? faLock : faUnlock} />
          </label>
        </div>
      </div>

      <label htmlFor="title" className="MemoEdit_title">
        제목
      </label>
      <div className="MemoEidt_title_tag">
        <input
          type="text"
          id="title"
          className="MemoEdit_title_input"
          placeholder="제목"
          value={memo.title}
          onChange={onChangeMemo}
        />
        <button
          type="button"
          className={`MemoEdit_priority ${memo.priority ? "active" : ""}`}
          onClick={handleClickPriority}
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>

      <label htmlFor="type" className="MemoEdit_type">
        타입
      </label>
      <div className="Memo_type_div" onClick={handleTypeShow}>
        <input
          id="type"
          type="text"
          className="MemoList_type_input"
          placeholder={memo.type ? memo.type : "비어 있음"}
          value={memo.type}
          readOnly
        />
        <button type="button" className="MemoEdit_typemodal_btn">
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showTypeModal && (
          <MemoTypeModal
            handleTypeChange={handleTypeChange}
            className="Memo_custom_type_modal"
            ref={outside}
          />
        )}
      </div>

      <label htmlFor="dueDate" className="MemoEdit_deadline">
        마감기한
      </label>
      <div className="Memo_deadline_div" onClick={handleCalendarShow}>
        <input
          id="dueDate"
          type="text"
          className="MemoList_deadline_input"
          placeholder={date ? date.toLocaleDateString() : "비어 있음"}
          value={
            memo.dueDate ? new Date(memo.dueDate)?.toLocaleDateString() : ""
          }
          readOnly
        />
        <FontAwesomeIcon icon={faCalendar} className="MemoEdit_calendar" />
        {showCalendar && (
          <CalendarModal
            setDate={handleDateChange}
            className="Memo_custom_calendar_modal"
            ref={outside}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      <label htmlFor="author" className="MemoEdit_author">
        작성자
      </label>
      <input
        id="author"
        type="text"
        className="MemoEdit_author_input"
        placeholder={memo.author}
        readOnly
      />

      <div className="MemoEdit_button_sec">
        <button
          type="button"
          className={`MemoEdit_deleteBtn ${memo._id ? "active" : ""}`}
          onClick={handleDelete}
          disabled={memo._id ? false : true}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </form>
  );
};

export default MemoEdit;
