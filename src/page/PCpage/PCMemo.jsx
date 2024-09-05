import React, { useEffect, useState } from "react";
import PCheader from "../../component/PC/PCbasic/PCheader";
import PCsidenav from "../../component/PC/PCbasic/PCsidenav";
import PCfooter from "../../component/PC/PCbasic/PCfooter";
import MemoList from "../../component/PC/Memo/MemoList";
import "./PCMemo.scss";
import MemoEdit from "../../component/PC/Memo/MemoEdit";
import MemoContent from "../../component/PC/Memo/MemoContent";

const PCMemo = ({ socket }) => {
  const [memo, setMemo] = useState({
    title: "",
    createdDate: new Date(),
    type: "",
    content: "",
    priority: false,
    dueDate: "",
    author: "이은빈",
  });

  useEffect(() => {
    console.log(memo)
  },[memo])

  return (
    <div className="PCMemo_root">
      <PCsidenav>
        <PCheader />
        <div className="PCMemo_main">
          <div className="PCMemo_list">
            <MemoList />
          </div>
          <div className="PCMemo_memo">
            <MemoContent memo={memo} setMemo={setMemo} />
          </div>
          <div className="PCMemo_edit">
            <MemoEdit memo={memo} setMemo={setMemo} />
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default PCMemo;
