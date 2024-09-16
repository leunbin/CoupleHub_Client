import React, { useEffect, useState } from "react";
import "./PCheader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Weather from "./Weather";

const PCheader = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        setName(user.name);
      } catch (error) {
        console.error("Error parsing user-info:", error);
      }
    }
  }, []);

  const location = useLocation();
  const path = location.pathname;

  const today = new Date().toLocaleDateString();
  const todayData = new Date();
  const couple = new Date("2024-04-03");
  const differenceInTime = todayData.getTime() - couple.getTime();
  const differenceInDays =
    Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;

  const getTitle = () => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/calendar":
        return "Calendar";
      case "/memo":
        return "Memo";
      default:
        return "";
    }
  };

  return (
    <div className="PCheader_root">
      <div className="PCheader_title">
        <h1 className="title">{getTitle()}</h1>
        <div className="PCheader_navigation">
          <div className="PCheader_info">
            <Link to="/dashboard">
              <span className="PCheader_font">
                Dashboard
              </span>
              <div className={`PCheader_link ${path === "/dashboard" ? "active" : ""}`}></div>
            </Link>

            <Link to="/calendar">
              <span className="PCheader_font">
                Calendar
              </span>
              <div className={`PCheader_link ${path === "/calendar" ? "active" : ""}`}></div>
            </Link>

            <Link to="/memo">
              <span className="PCheader_font">
                Memo
              </span>
              <div className={`PCheader_link ${path === "/memo" ? "active" : ""}`}></div>
            </Link>
          </div>
          <div className="date">
            <div className="content">
              <span>{today}</span>
              <span className="PCheader_user">hi, {name}</span>
            </div>
            <Weather />
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
