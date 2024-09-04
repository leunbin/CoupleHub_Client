import React from "react";
import { Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../../hook/useKakaoLoader";

const BaseMap = () => {
  useKakaoLoader();

  return(
    <Map center={{ lat: 33.450701,
      lng: 126.570667,}} style={{width:'100vw', height:'100vh', zIndex:0}} level={3} />
  )
}

export default BaseMap;