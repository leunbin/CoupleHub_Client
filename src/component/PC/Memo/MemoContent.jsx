import React, { useEffect, useState } from "react";
import "./MemoContent.scss";

const MemoContent = ({ memo, setMemo }) => {
  const [items, setItems] = useState(memo.content || []);
  const onChangeMemo = (e) => {
    setMemo({
      ...memo,
      [e.target.name]: e.target.value,
    });
  };

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

  return (
    <div className="MemoContent_root">
      <div className="MemoContent_info">
        <div className="MemoContent_createdDate">
          <span className="MemoContent_createdDate_title">CreatedDate</span>
          <div className="MemoContent_createdDate_content">
            {memo.createdDate.toLocaleDateString()}
          </div>
        </div>

        <div className="MemoContent_author">
          <span className="MemoContent_author_title">Author</span>
          <div className="MemoContent_author_content">{memo.author}</div>
        </div>

        <div className="MemoContent_title">
          <span className="MemoContent_title_title">Title</span>
          <div className="MemoContent_title_content">{memo.title}</div>
        </div>

        <div className="MemoContent_type">
          <span className="MemoContent_type_title">Type</span>
          {memo.type !== "" ? (
            <div className="MemoContent_type_content">{memo.type}</div>
          ) : null}
        </div>

        {memo.dueDate !== "" ? (
          <div className="MemoContent_deadline">
            <span className="MemoContent_deadline_title">deadline</span>
            <div className="MemoContent_deadline_content">{memo.dueDate}</div>
          </div>
        ) : null}
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
            <textarea
              placeholder="여기에 체크리스트 항목을 추가하세요..."
              onKeyDown={handleAddItem}
              className="CheckboxList_input"
            ></textarea>

            <div className="CheckboxList_items">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`CheckboxList_item ${
                    item.completed ? "completed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span>{item.text}</span>
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
