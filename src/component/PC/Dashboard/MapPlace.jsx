import {
  faCalendarDay,
  faLocationDot,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./MapPlace.scss";

const MapPlace = ({ dateSchedules }) => {
  const today = new Date();

  return (
    <div className="MapPlace_root">
      <div className="MapPlace_day">
        <FontAwesomeIcon icon={faThumbTack} className="faThumbTack" />
        <span>
          {today.getMonth() + 1}월 {today.getDate()}일
        </span>
      </div>
      <div className="MapPlace_info">
        {dateSchedules?.map((item) => (
          <div className="MapPlace_item">
            <div className="MapPlace_info_name">
              <FontAwesomeIcon icon={faLocationDot} /> {item.location}
            </div>
            <div className="MapPlace_info_address">{item.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPlace;
