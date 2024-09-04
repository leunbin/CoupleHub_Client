import React from "react";
import './MemoModal.scss';

const MemoModal = () => {
  return (
    <div className="MemoModal_root">
      <div className="MemoModal_content">
        <div className="MemoModal_title">Memo</div>
        <textarea
          className="MemoModal_textarea"
          placeholder="Write your memo here..."
        ></textarea>
        <button className="MemoModal_button">Save</button>
      </div>
    </div>
  );
};

export default MemoModal;
