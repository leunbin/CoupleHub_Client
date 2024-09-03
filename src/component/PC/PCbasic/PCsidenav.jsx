import {
  faBars,
  faCalendar,
  faGauge,
  faList,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./PCsidenav.scss";
import { Link } from "react-router-dom";
import PCmenu from "./PCmenu";
import { useSidebar } from "../../../store/SidebarContext";

const PCsidenav = ({ children }) => {
  const { isMenuOpen, setIsMenuOpen } = useSidebar();

  return (
    <div className="sidenav_root">
      {isMenuOpen ? (
        <PCmenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      ) : (
        <div className="sidenav_button_bar">
          <button
            className="sidenav_button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <Link to="/dashboard">
            <button className="sidenav_button">
              <FontAwesomeIcon icon={faGauge} />
            </button>
          </Link>

          <Link to="/calendar">
            <button className="sidenav_button">
              <FontAwesomeIcon icon={faCalendar} />
            </button>
          </Link>

          <Link to="/map">
            <button className="sidenav_button">
              <FontAwesomeIcon icon={faMap} />
            </button>
          </Link>
          <Link to="/memo">
            <button className="sidenav_button">
              <FontAwesomeIcon icon={faList} />
            </button>
          </Link>
        </div>
      )}
      <div className={`sidenav_main ${isMenuOpen ? "isMenuOpen" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default PCsidenav;
