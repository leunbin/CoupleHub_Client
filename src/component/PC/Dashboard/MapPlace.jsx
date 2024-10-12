import {
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./MapPlace.scss";

const MapPlace = ({ dateSchedules }) => {
  return (
    <div className="MapPlace_root">
      <div className="MapPlace_info">
        {dateSchedules?.map((item) => (
          <div className="MapPlace_item" key={item._id}>
            <div className="MapPlace_info_name">
              <FontAwesomeIcon icon={faLocationDot} /> {item.location ? item.location : "장소 정보가 제공되지 않았어요 😕"}
            </div>
            <div className="MapPlace_info_address">{item.event}</div>
          </div>
        ))}
        {dateSchedules?.length === 0 && <span className="noSchedules">일정이 없어요 😊</span>}
      </div>
    </div>
  );
};

export default MapPlace;
