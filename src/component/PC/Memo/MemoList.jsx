import React from "react";
import "./MemoList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faStar,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

const MemoList = ({ memos, clickMemo, memo }) => {
  const sortedMemos = memos.sort((a, b) => b.priority - a.priority);
  return (
    <div className="List_root">
      {sortedMemos.map((item) => (
        <div
          className={`List_item ${item._id === memo._id ? "active" : ""}`}
          key={item._id}
          onClick={() => clickMemo(item._id)}
        >
          <div className="MemoList_name">
            <div className={`List_item_type ${item.type}`}>
              {item.type === "Checklist" ? (
                <FontAwesomeIcon icon={faCircleCheck} />
              ) : (
                <FontAwesomeIcon icon={faNoteSticky} />
              )}
            </div>
            <div className="List_item_title">{item.title}</div>
          </div>
          <div className="List_item_info">
            {new Date(item.createdDate).toLocaleDateString()}
            {item.priority && (
              <FontAwesomeIcon icon={faStar} className="List_item_crown" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoList;
