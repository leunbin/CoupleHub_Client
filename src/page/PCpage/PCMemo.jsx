import React, { useEffect, useState } from "react";
import PCheader from "../../component/PC/PCbasic/PCheader";
import PCsidenav from "../../component/PC/PCbasic/PCsidenav";
import PCfooter from "../../component/PC/PCbasic/PCfooter";
import MemoList from "../../component/PC/Memo/MemoList";
import "./PCMemo.scss";
import MemoEdit from "../../component/PC/Memo/MemoEdit";
import MemoContent from "../../component/PC/Memo/MemoContent";
import fetchMemo from "../../api/memo/fetchMemo";
import postMemo from "../../api/memo/postMemo";
import fetchMemoById from "../../api/memo/fetchMemoById";
import putMemo from "../../api/memo/putMemo";
import deleteMemo from "../../api/memo/deleteMemo";

const PCMemo = ({ socket }) => {
  const name = JSON.parse(localStorage.getItem("user-info")).name;
  const [memo, setMemo] = useState({
    title: "",
    createdDate: new Date(),
    type: "",
    content: [],
    priority: false,
    dueDate: "",
    author: name,
    private: false, // 기본적으로 전체 공유
  });
  const [memos, setMemos] = useState([]);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isVisible, setIsVisible] = useState(isEditModal);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (isEditModal) {
      setIsVisible(true); // 모달이 열리면 바로 보이도록 설정
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500); // 애니메이션이 끝난 후 숨김 처리
      return () => clearTimeout(timer);
    }
  }, [isEditModal]);

  const getMemos = async () => {
    try {
      const result = await fetchMemo();
      const filteredMemos = result.filter((memo) => {
        return memo.private ? memo.author === name : true;
      });
      setMemos(filteredMemos);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (memo._id) {
        const data = await putMemo(memo._id, memo);
        setMemo((prevMemo) => ({
          ...prevMemo,
          ...data,
        }));
      } else {
        const data = await postMemo(memo);
        setMemo((prevMemo) => ({
          ...prevMemo,
          ...data,
        }));
      }

      await getMemos();
    } catch (error) {
      console.log("저장실패", error);
    }
  };

  const clickMemo = async (id) => {
    try {
      const data = await fetchMemoById(id);
      setMemo(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (memo._id) {
        await deleteMemo(memo._id);
        setMemo({
          title: "",
          createdDate: new Date(),
          type: "",
          content: [],
          priority: false,
          dueDate: "",
          author: name,
        });
      } else {
        setMemo({
          title: "",
          createdDate: new Date(),
          type: "",
          content: [],
          priority: false,
          dueDate: "",
          author: name,
        });
      }
      await getMemos();
    } catch (error) {
      console.log("삭제 실패", error);
    }
  };

  const handleMemoEditModal = () => {
    if (isEditModal) {
      setIsEditModal(false);
    } else {
      setIsEditModal(true);
    }
  };

  const handleAdd = () => {
    setMemo({
      title: "",
      createdDate: new Date(),
      type: "",
      content: [],
      priority: false,
      dueDate: "",
      author: name,
    });

    setDate("");
  };

  useEffect(() => {
    getMemos();
  }, []);

  useEffect(() => {
    console.log(isEditModal);
  }, [isEditModal]);

  return (
    <div className="PCMemo_root">
      <PCsidenav>
        <PCheader />
        <div className="PCMemo_main">
          <div className="PCMemo_list">
            <MemoList
              memos={memos}
              clickMemo={clickMemo}
              memo={memo}
              handleAdd={handleAdd}
            />
          </div>
          <div className="PCMemo_memo">
            <MemoContent
              memo={memo}
              setMemo={setMemo}
              handleMemoEditModal={handleMemoEditModal}
              isEditModal={isEditModal}
            />
          </div>

          <div
            className={`PCMemo_edit ${isEditModal ? "slide-in" : "slide-out"} ${
              !isVisible && "hidden"
            }`}
          >
            <MemoEdit
              name={name}
              memo={memo}
              setMemo={setMemo}
              handleSave={handleSave}
              handleDelete={handleDelete}
              isEditModal={isEditModal}
              date={date}
              setDate={setDate}
            />
          </div>
        </div>

        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default PCMemo;
