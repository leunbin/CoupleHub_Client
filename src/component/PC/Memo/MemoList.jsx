import React from "react";
import "./MemoList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faStar,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

const MemoList = ({ memos, clickMemo }) => {
  const sortedMemos = memos.sort((a, b) => b.priority - a.priority);
  return (
    <div className="List_root">
      {sortedMemos.map((memo) => (
        <div
          className="List_item"
          key={memo._id}
          onClick={() => clickMemo(memo._id)}
        >
          <div className="MemoList_name">
            <div className={`List_item_type ${memo.type}`}>
              {memo.type === "Checklist" ? (
                <FontAwesomeIcon icon={faCircleCheck} />
              ) : (
                <FontAwesomeIcon icon={faNoteSticky} />
              )}
            </div>
            <div className="List_item_title">{memo.title}</div>
          </div>
          <div className="List_item_info">
            {new Date(memo.createdDate).toLocaleDateString()}
            {memo.priority && (
              <FontAwesomeIcon icon={faStar} className="List_item_crown" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoList;
