import React, { useEffect, useState } from "react";
import "./MemoContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faHourglass2,
  faUserCircle,
  faTrashAlt
} from "@fortawesome/free-regular-svg-icons";

const MemoContent = ({ memo, setMemo }) => {
  const [items, setItems] = useState(memo.content || []);
  const onChangeMemo = (e) => {
    setMemo({
      ...memo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setItems(memo.content || []);
  }, [memo]);

  useEffect(() => {
    setMemo({ ...memo, content: items });
  }, [items, setMemo]);

  const handleCheckboxChange = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const handleAddItem = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        setItems([...items, { text: value, completed: false }]);
        e.target.value = "";
      }
    }
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="MemoContent_root">
      <div className="MemoContent_info">
        <div className="MemoContent_title_content">
          {memo.title === "" ? "제 목" : memo.title}
        </div>
        <div className="MemoContent_createdDate">
          <span className="MemoContent_createdDate_title">
            <FontAwesomeIcon icon={faClock} /> 날짜
          </span>
          <div className="MemoContent_createdDate_content">
            {memo.createdDate &&
              new Date(memo.createdDate).toLocaleDateString()}
          </div>
        </div>

        <div className="MemoContent_author">
          <span className="MemoContent_author_title">
            {" "}
            <FontAwesomeIcon icon={faUserCircle} /> 작성자
          </span>
          <div className="MemoContent_author_content">{memo.author}</div>
        </div>

        <div className="MemoContent_type">
          <span className="MemoContent_type_title">
            <FontAwesomeIcon icon={faHashtag} /> 타입
          </span>
          <div
            className={`MemoContent_type_content ${
              memo.type ? "" : "type"
            }`}
          >
            {memo.type ? memo.type : "비어 있음"}
          </div>
        </div>

        <div className="MemoContent_deadline">
          <span className="MemoContent_deadline_title">
            <FontAwesomeIcon icon={faHourglass2} /> deadline
          </span>
          <div className={`MemoContent_deadline_content ${
              memo.deadline ? "" : "type"
            }`}>
            {memo.dueDate === ''
              ? "비어 있음"
              : new Date(memo.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="MemoContent_note_content">
        {memo.type === "Note" && (
          <textarea
            name="content"
            className="MemoContent_note_content_content"
            value={memo.content}
            onChange={onChangeMemo}
            placeholder={"여기에 메모를 추가하세요..."}
          ></textarea>
        )}
        {memo.type === "Checklist" && (
          <>
            <input
              placeholder="여기에 체크리스트 항목을 추가하세요..."
              onKeyDown={handleAddItem}
              className="CheckboxList_input"
            ></input>

            <div className="CheckboxList_items">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`CheckboxList_item ${
                    item.completed ? "completed" : ""
                  }`}
                >
                  <div className="CheckboxList_item_content">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <span>{item.text}</span>
                  </div>
                  <button
                    className="CheckboxList_item_delete"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MemoContent;
