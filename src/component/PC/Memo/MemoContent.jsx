import React, { useEffect, useState } from "react";
import "./MemoContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faPencil,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faHourglass2,
  faUserCircle,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import putMemo from "../../../api/memo/putMemo";

const MemoContent = ({
  memo,
  setMemo,
  handleMemoEditModal,
  isEditModal,
  handleAdd,
}) => {
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

  const handleCheckboxChange = async (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);

    const updatedMemo = {
      ...memo,
      content: updatedItems,
    };

    try {
      await putMemo(memo._id, updatedMemo);
    } catch (error) {
      console.log(error);
    }
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
          {memo.title === "" ? "제목" : memo.title}
        </div>
        <div className="MemoContent_btn_Tag">
          {isEditModal ? null : (
            <button
              className="MemoContent_editBtn"
              onClick={handleMemoEditModal}
            >
              <FontAwesomeIcon icon={faPencil} className="editBtn_icon" />
            </button>
          )}

          {isEditModal ? null : (
            <button className="MemoContent_addBtn" onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} className="editBtn_icon" />
            </button>
          )}
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
            className={`MemoContent_type_content ${memo.type ? "" : "type"}`}
          >
            {memo.type ? memo.type : "비어 있음"}
          </div>
        </div>

        <div className="MemoContent_deadline">
          <span className="MemoContent_deadline_title">
            <FontAwesomeIcon icon={faHourglass2} /> deadline
          </span>
          <div
            className={`MemoContent_deadline_content ${
              memo.deadline ? "" : "type"
            }`}
          >
            {memo.dueDate === "" || memo.dueDate === null
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
            readOnly={isEditModal ? false : true}
          />
        )}
        {memo.type === "Checklist" && (
          <>
            {isEditModal ? (
              <input
                placeholder="여기에 체크리스트 항목을 추가하세요..."
                onKeyDown={handleAddItem}
                className="CheckboxList_input"
              />
            ) : null}

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
                      value={item._id + index}
                    />
                    <label htmlFor={item._id + index}>{item.text}</label>
                  </div>
                  <button
                    className="CheckboxList_item_delete"
                    onClick={() => handleDelete(index)}
                  >
                    {isEditModal && <FontAwesomeIcon icon={faTrashAlt} />}
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
