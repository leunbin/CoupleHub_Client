import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./MapSearch.scss";

const MapSearch = ({ input, setInput, localInput, setLocalInput }) => {

  const handleInputChange = (e) => {
    setLocalInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setInput(localInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="MapSearch_root">
      <input
        type="text"
        className="MapSearch_input"
        value={localInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}  // 엔터 키 이벤트 핸들러 추가
      />
      <button className="MapSearch_button" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} className="MapSearch_icon" />
      </button>
    </div>
  );
};

export default MapSearch;
