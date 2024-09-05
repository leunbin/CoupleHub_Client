import React from "react";
import "./MemoList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

const MemoList = () => {
  const memos = [
    {
      id: 1,
      title: "Grocery Shopping",
      createdDate: "2024-09-05",
      type: "checklist",
    },
    {
      id: 2,
      title: "Project Ideas",
      createdDate: "2024-09-04",
      type: "note",
    },
    {
      id: 3,
      title: "Workout Plan",
      createdDate: "2024-09-03",
      type: "checklist",
    },
    {
      id: 4,
      title: "Travel Itinerary",
      createdDate: "2024-09-02",
      type: "note",
    },
    {
      id: 5,
      title: "Meeting Agenda",
      createdDate: "2024-09-01",
      type: "note",
    },
    {
      id: 6,
      title: "Book Reading List",
      createdDate: "2024-08-31",
      type: "checklist",
    },
    {
      id: 7,
      title: "House Chores",
      createdDate: "2024-08-30",
      type: "checklist",
    },
    {
      id: 8,
      title: "Birthday Gift Ideas",
      createdDate: "2024-08-29",
      type: "note",
    },
    {
      id: 9,
      title: "Weekend Plans",
      createdDate: "2024-08-28",
      type: "checklist",
    },
    {
      id: 10,
      title: "Movie Watchlist",
      createdDate: "2024-08-27",
      type: "note",
    },
    {
      id: 11,
      title: "Holiday Preparations",
      createdDate: "2024-08-26",
      type: "checklist",
    },
    {
      id: 12,
      title: "Work Deadlines",
      createdDate: "2024-08-25",
      type: "note",
    },
    {
      id: 13,
      title: "Grocery List",
      createdDate: "2024-08-24",
      type: "checklist",
    },
    {
      id: 14,
      title: "Vacation Spots",
      createdDate: "2024-08-23",
      type: "note",
    },
    {
      id: 15,
      title: "Personal Goals",
      createdDate: "2024-08-22",
      type: "note",
    },
    {
      id: 16,
      title: "Fitness Routine",
      createdDate: "2024-08-21",
      type: "checklist",
    },
    {
      id: 17,
      title: "Shopping List",
      createdDate: "2024-08-20",
      type: "checklist",
    },
    {
      id: 18,
      title: "Recipe Ideas",
      createdDate: "2024-08-19",
      type: "note",
    },
    {
      id: 19,
      title: "House Renovation",
      createdDate: "2024-08-18",
      type: "checklist",
    },
    {
      id: 20,
      title: "Music Playlist",
      createdDate: "2024-08-17",
      type: "note",
    },
  ];

  return (
    <div className="List_root">
      {memos.map((memo) => (
        <div className="List_item" key={memo.id}>
          <div className="List_item_title">{memo.title}</div>
          <div className="List_item_info">
            <span className="List_item_date">{memo.createdDate}</span>
            <span className={`List_item_type ${memo.type}`}>
              {memo.type === "checklist" ? <><FontAwesomeIcon icon={faCircleCheck} /> Checklist</> : <><FontAwesomeIcon icon={faNoteSticky} /> Note </>}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoList;
