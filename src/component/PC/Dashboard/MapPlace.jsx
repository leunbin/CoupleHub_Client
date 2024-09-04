import {
  faCalendarDay,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./MapPlace.scss";

const MapPlace = () => {
  const today = new Date();

  return (
    <Link to="/map">
      <div className="MapPlace_root">
        <div className="MapPlace_day">
          <FontAwesomeIcon icon={faCalendarDay} />
          <span>
            {today.getMonth() + 1}월 {today.getDate()}일
          </span>
        </div>
        <div className="MapPlace_info">
          <div className="MapPlace_info_name">
            <FontAwesomeIcon icon={faLocationDot} /> place name
          </div>

          <div className="MapPlace_info_address">place address</div>
        </div>
      </div>
    </Link>
  );
};

export default MapPlace;
