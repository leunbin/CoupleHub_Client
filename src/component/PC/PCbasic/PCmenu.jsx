import React, { useEffect, useRef, useState } from "react";
import {
  faBars,
  faCalendar,
  faGauge,
  faList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PCmenu.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../../store/SidebarContext";

const PCmenu = () => {
  const { setIsMenuOpen} = useSidebar();
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [path, setPath] = useState('');
  const outside = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/')
  }

  useEffect(() => {
    setPath(location.pathname);
  },[location.pathname]);

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
      <div className="PCmenud_btn_tag">

      <button onClick={handleClose} className="PCmenu_bars_button">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <Link to="/dashboard" className='PCmenu_tag'>
        <button className={`PCmenu_button ${path === '/dashboard' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faGauge} />
          <span className="PCmenu_span">Dashboard</span>
        </button>
      </Link>

      <Link to="/schedule" className='PCmenu_tag'>
        <button className={`PCmenu_button ${path === '/schedule' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faCalendar} />
          <span>Schedule</span>
        </button>
      </Link>
      
      <Link to="/memo" className='PCmenu_tag'>
        <button className={`PCmenu_button ${path === '/memo' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faList} />
          <span>Memo</span>
        </button>
      </Link>
      </div>
      <button className="PCmenu_logout" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default PCmenu;