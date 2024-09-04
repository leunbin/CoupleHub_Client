import React from "react";
import { Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../../hook/useKakaoLoader";
import useGeolocation from "../../../hook/useGeolocation";

const BaseMap = () => {
  useKakaoLoader();
  const location = useGeolocation();
  const coordinates = location.coordinates;

  return(
    <Map center={{ lat: coordinates.lat,
      lng: coordinates.lng,}} style={{width:'100vw', height:'100vh', zIndex:0}} level={4} />
  )
}

export default BaseMap;