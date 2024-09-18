import React from "react";
import "./PCcolorModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const PCcolorModal = React.forwardRef(
  ({ handleColorChange, className, ...props }, ref) => {
    return (
      <div className={`PCcolorModal_root ${className}`} ref={ref} {...props}>
        <button
          className="color_black"
          type="button"
          onClick={() => handleColorChange("Black")}
        >
          <FontAwesomeIcon icon={faCircle} />
          Balck
        </button>
        <button
          className="color_red"
          type="button"
          onClick={() => handleColorChange("Red")}
        >
          <FontAwesomeIcon icon={faCircle} />
          Red
        </button>
        <button
          className="color_orange"
          type="button"
          onClick={() => handleColorChange("Orange")}
        >
          <FontAwesomeIcon icon={faCircle} />
          Orange
        </button>
        <button
          className="color_green"
          type="button"
          onClick={() => handleColorChange("Green")}
        >
          <FontAwesomeIcon icon={faCircle} />
          Green
        </button>
        <button
          className="color_purple"
          type="button"
          onClick={() => handleColorChange("Purple")}
        >
          <FontAwesomeIcon icon={faCircle} />
          Purple
        </button>
      </div>
    );
  }
);

export default PCcolorModal;
