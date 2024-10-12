import React, { useEffect, useState } from "react";
import "./MemoModal.scss";
import fetchMemoByDuedate from "../../../api/memo/fetchMemoByDuedate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import defaultimage from '../../../assets/defaultimage.jpg';

const MemoModal = () => {
  const [name, setName] = useState(null);
  const [memos, setMemos] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedMemoId, setSelectedMemoId] = useState(null);

  const today = new Date();
  const date = today.toLocaleDateString();

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        setName(user.name);
      } catch (error) {
        console.error("Error parsing user-info:", error);
      }
    }
  }, []);

  const getMemo = async (date) => {
    try {
      const result = await fetchMemoByDuedate(date);
      const memos = result?.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
      setMemos(memos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (memoId, index) => {
    const key = `${memoId}_${index}`;
    const newCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newCheckedItems);
  };

  const handleTitleClick = (memoId) => {
    if (selectedMemoId === memoId) {
      setSelectedMemoId("");
    } else {
      setSelectedMemoId(memoId);
    }
  };

  useEffect(() => {
    getMemo(date);
  }, [date]);

  return (
    <div className="MemoModal_root">
      <div className="MemoModal_content">
        {memos.length === 0 ? (
          <div className="MemoModal_noMemos">
            <img src={defaultimage} alt="기본 이미지" />
          </div>
        ) : (
          memos
            .filter((memo) => memo.author === name)
            .map((memo) => (
              <div key={memo._id} className="MemoModal_memoItem">
                <div
                  className={`MemoModal_info ${
                    memo._id === selectedMemoId ? "active" : ""
                  }`}
                >
                  <span
                    className="MemoModal_memoTitle"
                    onClick={() => handleTitleClick(memo._id)}
                  >
                    <div
                      className={`memoItem_type ${
                        memo.type === "Checklist" ? "checklist" : "note"
                      }`}
                    >
                      {memo.type === "Note" ? (
                        <FontAwesomeIcon icon={faNoteSticky} />
                      ) : (
                        <FontAwesomeIcon icon={faCircleCheck} />
                      )}
                    </div>
                    {memo.title}
                  </span>
                  <span className="MemoModal_memoDueDate">
                    {Math.ceil(
                      (new Date(memo.dueDate).getTime() - today.getTime()) /
                        (1000 * 3600 * 24)
                    ) === 0
                      ? "오늘"
                      : `${Math.ceil(
                          (new Date(memo.dueDate).getTime() - today.getTime()) /
                            (1000 * 3600 * 24)
                        )}일 전`}
                  </span>
                </div>
                {selectedMemoId === memo._id && (
                  <>
                    {memo.type === "Checklist" ? (
                      <ul className="MemoModal_checklist">
                        {memo.content.map((item, index) => (
                          <li
                            key={index}
                            className={`CheckboxList_item ${
                              checkedItems[`${memo._id}_${index}`]
                                ? "completed"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checkedItems[`${memo._id}_${index}`]}
                              onChange={() =>
                                handleCheckboxChange(memo._id, index)
                              }
                            />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="MemoModal_note">
                        {memo.content.map((text, index) => (
                          <p key={index} className="MemoModal_noteText">
                            {text}
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default MemoModal;
