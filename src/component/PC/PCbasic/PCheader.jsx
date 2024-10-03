import React, { useEffect, useRef, useState } from "react";
import "./PCheader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Weather from "./Weather";

const PCheader = () => {
  const [name, setName] = useState(null);
  const [prevOffsetLeft, setPrevOffsetLeft] = useState(0);
  const sliderRef = useRef(null);
  const linksRef = useRef([]);

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

  useEffect(() => {
    const activeLink = linksRef.current.find(
      (link) => link.dataset.path === path
    );

    if (activeLink) {
      const { offsetWidth } = activeLink;
      const { offsetLeft } = activeLink;

      sliderRef.current.style.width = `${offsetWidth}px`;
      sliderRef.current.style.left = `${offsetLeft}px`;
      sliderRef.current.style.transition =
        "left 0.3s ease-in-out, width 0.3s ease-in-out";

      setPrevOffsetLeft(offsetLeft);
      console.log(offsetLeft);
    }
  }, [path]);

  useEffect(() => {
    console.log("prevOffset", prevOffsetLeft);
  }, [prevOffsetLeft]);

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
      case "/schedule":
        return "Schedule";
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
            <div
              className="PCheader_link_tag"
              ref={(el) => (linksRef.current[0] = el)}
              data-path="/dashboard"
            >
              <Link to="/dashboard">
                <span className="PCheader_font">Dashboard</span>
              </Link>
            </div>

            <div
              className="PCheader_link_tag"
              ref={(el) => (linksRef.current[1] = el)}
              data-path="/schedule"
            >
              <Link to="/schedule">
                <span className="PCheader_font">Schedule</span>
              </Link>
            </div>

            <div
              className="PCheader_link_tag"
              ref={(el) => (linksRef.current[2] = el)}
              data-path="/memo"
            >
              <Link to="/memo">
                <span className="PCheader_font">Memo</span>
              </Link>
            </div>
            <div className="PCheader_slider" ref={sliderRef}></div>
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
