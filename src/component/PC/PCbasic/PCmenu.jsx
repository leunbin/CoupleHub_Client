import React, { useEffect, useRef, useState } from "react";
import {
  faBars,
  faCalendar,
  faGauge,
  faList,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PCmenu.scss";
import { Link } from "react-router-dom";
import { useSidebar } from "../../../store/SidebarContext";

const PCmenu = () => {
  const {isMenuOpen, setIsMenuOpen} = useSidebar();
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const outside = useRef(null);

  const handleClose = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (outside.current && !outside.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`PCmenuRoot ${isMenuClosing ? "slide-out" : "slide-in"}`}
      ref={outside}
    >
      <button onClick={handleClose} className="PCmenu_bars_button">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <Link to="/dashboard" className='PCmenu_tag'>
        <button className="PCmenu_button">
          <FontAwesomeIcon icon={faGauge} />
          <span>Dashboard</span>
        </button>
      </Link>

      <Link to="/calendar" className='PCmenu_tag'>
        <button className="PCmenu_button">
          <FontAwesomeIcon icon={faCalendar} />
          <span>Calendar</span>
        </button>
      </Link>

      <Link to="/map" className='PCmenu_tag'>
        <button className="PCmenu_button">
          <FontAwesomeIcon icon={faMap} />
          <span>Map</span>
        </button>
      </Link>
      
      <Link to="/memo" className='PCmenu_tag'>
        <button className="PCmenu_button">
          <FontAwesomeIcon icon={faList} />
          <span>Memo</span>
        </button>
      </Link>
    </div>
  );
};

export default PCmenu;