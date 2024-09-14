import React from "react";
import "./MemoList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCrown,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

const MemoList = ({ memos, clickMemo }) => {
  const sortedMemos = memos.sort((a, b) => b.priority - a.priority);
  return (
    <div className="List_root">
      {sortedMemos.map((memo) => (
        <div className="List_item" key={memo._id} onClick={() => clickMemo(memo._id)}>
          <div className="List_item_title">{memo.title}</div>
          <div className="List_item_info">
            <span className="List_item_date">
              {new Date(memo.createdDate).toLocaleDateString()
              }
            </span>
            <span className={`List_item_type ${memo.type}`}>
              {memo.type === "Checklist" ? (
                <>
                  <FontAwesomeIcon icon={faCircleCheck} /> Checklist
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faNoteSticky} /> Note
                </>
              )}
              {memo.priority && (
                <FontAwesomeIcon icon={faCrown} className="List_item_crown" />
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoList;
