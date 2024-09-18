import React, { useState } from "react";
import "./PCtimeModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const generateTimes = () => {
  const times = [];
  let hour = 0;
  let minute = 0;

  while (hour < 24) {
    const timeString = `${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}`;
    times.push(timeString);

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return times;
};

const PCtimeModal = React.forwardRef(
  (
    {
      showstartTimeModal,
      showendTimeModal,
      setStartTime,
      setEndTime,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedTime, setSelectedTime] = useState({
      start: null,
      end: null,
    });
    const times = generateTimes();

    const handleClick = (time) => {
      if (showstartTimeModal) {
        setStartTime(time);
        setSelectedTime((prev) => ({ ...prev, start: time }));
      } else if (showendTimeModal) {
        setEndTime(time);
        setSelectedTime((prev) => ({ ...prev, end: time }));
      }
    };

    return (
      <div className={`PCtimeModal_root ${className}`} ref={ref} {...props}>
        <div className="PCtimeModal_title">
          <FontAwesomeIcon icon={faClock} /> 시간 선택
        </div>
        <div className="PCtimeModal_btn">
          {times.map((time) => (
            <button
              type="button"
              key={time}
              className={`time-button ${
                selectedTime.start === time || selectedTime.end === time
                  ? "active"
                  : ""
              }`}
              onClick={() => handleClick(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

export default PCtimeModal;
