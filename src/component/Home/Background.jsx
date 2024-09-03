import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Background.scss";

const Background = () => {
  return (
    <div className="heart-container">
      <FontAwesomeIcon icon={faHeart} className="heart" />
      <FontAwesomeIcon icon={faHeart} className="heart" />
      <FontAwesomeIcon icon={faHeart} className="heart" />
      <FontAwesomeIcon icon={faHeart} className="heart" />
      <FontAwesomeIcon icon={faHeart} className="heart" />
    </div>
  );
};

export default Background;
