import {
  faBars,
  faCalendar,
  faGauge,
  faList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./PCsidenav.scss";
import { Link, useNavigate } from "react-router-dom";
import PCmenu from "./PCmenu";
import { useSidebar } from "../../../store/SidebarContext";

const PCsidenav = ({ children }) => {
  const { isMenuOpen, setIsMenuOpen } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/')
  }

  return (
    <div className="sidenav_root">
      {isMenuOpen ? (
        <PCmenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      ) : (
        <div className="sidenav_button_bar">
          <div className="sidenav_button_tag">

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

          <Link to="/memo">
            <button className="sidenav_button">
              <FontAwesomeIcon icon={faList} />
            </button>
          </Link>
          </div>

          <button className="sidenav_logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      )}
      <div className={`sidenav_main ${isMenuOpen ? "isMenuOpen" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default PCsidenav;
