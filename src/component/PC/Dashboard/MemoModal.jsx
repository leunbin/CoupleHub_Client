import React, { useEffect, useState } from "react";
import "./MemoModal.scss";
import fetchMemoByDuedate from "../../../api/memo/fetchMemoByDuedate";

const MemoModal = () => {
  const [memos, setMemos] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const today = new Date();
  const date = today.toLocaleDateString();
  const name = JSON.parse(localStorage.getItem("user-info")).name;

  const getMemo = async (date) => {
    try {
      const result = await fetchMemoByDuedate(date);
      setMemos(result);
      const initialCheckedItems = result
        .filter((memo) => memo.type === "Checklist" && memo.author === name)
        .reduce((acc, memo) => {
          memo.content.forEach((item, index) => {
            acc[`${memo._id}_${index}`] = item.completed;
          });
          return acc;
        }, {});
      setCheckedItems(initialCheckedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (memoId, index) => {
    const key = `${memoId}_${index}`;
    const newCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    getMemo(date);
  }, [date]);

  return (
    <div className="MemoModal_root">
      <div className="MemoModal_title">Check off your list</div>
      <div className="MemoModal_content">
        {memos.length === 0 ? (
          <div className="MemoModa_noMemos">No schedules for today 😢</div>
        ) : (
          memos
            .filter((memo) => memo.author === name)
            .map((memo) => (
              <div key={memo._id} className="MemoModal_memoItem">
                <h3 className="MemoModal_memoTitle">{memo.title}</h3>
                {memo.type === "Checklist" ? (
                  <ul className="MemoModal_checklist">
                    {memo.content.map((item, index) => (
                      <li
                        key={index}
                        className={`CheckboxList_item ${
                          checkedItems[`${memo._id}_${index}`] ? "completed" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checkedItems[`${memo._id}_${index}`]}
                          onChange={() => handleCheckboxChange(memo._id, index)}
                        />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="MemoModal_note">
                    {memo.content.map((text, index) => (
                      <p key={index} className="MemoModal_noteText">{text}</p>
                    ))}
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default MemoModal;
