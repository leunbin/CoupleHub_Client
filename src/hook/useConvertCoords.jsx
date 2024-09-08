import { useEffect, useState } from "react";

const useConvertCoords = ({ lat, lng }) => {
  const [coords, setCoords] = useState({
    loaded: false,
    convertCoords: {
      nx: 0,
      ny: 0,
    },
  });

  useEffect(() => {
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0 * (Math.PI / 180.0); // 투영 위도1(rad)
    const SLAT2 = 60.0 * (Math.PI / 180.0); // 투영 위도2(rad)
    const OLON = 126.0 * (Math.PI / 180.0); // 기준점 경도(rad)
    const OLAT = 38.0 * (Math.PI / 180.0); // 기준점 위도(rad)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기준점 Y좌표(GRID)

    const re = RE / GRID;
    const sn =
      Math.log(Math.cos(SLAT1) / Math.cos(SLAT2)) /
      Math.log(
        Math.tan(Math.PI * 0.25 + SLAT2 * 0.5) /
          Math.tan(Math.PI * 0.25 + SLAT1 * 0.5)
      );
    const sf =
      (Math.pow(Math.tan(Math.PI * 0.25 + SLAT1 * 0.5), sn) * Math.cos(SLAT1)) /
      sn;
    const ro = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + OLAT * 0.5), sn);

    const ra = re * sf / Math.pow(Math.tan(Math.PI * 0.25 + lat * (Math.PI / 180.0) * 0.5), sn);
    const theta = (lng * (Math.PI / 180.0)) - OLON;
    const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

    if (lat !== undefined && lng !== undefined) {
      setCoords({
        loaded: true,
        convertCoords: {
          nx:x,
          ny:y,
        },
      });
    } else {
      setCoords({
        loaded: true,
        error: {
          code: 0,
          message: "Fail to convert coordinates",
        },
      });
    }
  }, [lat, lng]);

  return coords;
};

export default useConvertCoords;
