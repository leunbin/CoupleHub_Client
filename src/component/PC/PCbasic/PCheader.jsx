import React, { useEffect } from "react";
import "./PCheader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const PCheader = () => {
  const today = new Date().toLocaleDateString();
  const todayData = new Date();
  const couple = new Date("2024-04-03");
  const differenceInTime = todayData.getTime() - couple.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  const location = useLocation();
  const path = location.pathname;

  const getTitle = () => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/calendar":
        return "Calendar";
      case "/map":
        return "Map";
      case "/memo":
        return "Memo";
    }
  };

  return (
    <div className="PCheader_root">
      <div className="PCheader_title">
        <h1 className="title">{getTitle()}</h1>
        <div className="PCheader_navigation">
          <div className="PCheader_info">
            <Link to="/dashboard">
              <span>Dashboard</span>
            </Link>

            <Link to="/calendar">
              <span>Calendar</span>
            </Link>

            <Link to="/map">
              <span>Map</span>
            </Link>

            <Link to="/memo">
              <span>Memo</span>
            </Link>

          </div>
          <div className="date">
            <div className="content">
              <span>{today}</span>
              <span className="PCheader_user">hi, @@@</span>
            </div>
            <div className="couple_date">
              <FontAwesomeIcon icon={faHeart} />
              {differenceInDays}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCheader;
