import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hook/useKakaoLoader";
import useGeolocation from "../../hook/useGeolocation";
import { useLocation } from "react-router-dom";
import "./BaseMap.scss";

const BaseMap = ({
  input,
  setPlace,
  place,
  dateSchedules,
  selectedSchedule,
}) => {
  useKakaoLoader();
  const userLocation = useGeolocation();
  const location = useLocation();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const coordinates = userLocation.coordinates;
  const { kakao } = window;
  const Geocoder = new kakao.maps.services.Geocoder();
  const Place = new kakao.maps.services.Places();

  useEffect(() => {
    console.log(input)
  },[input])

  useEffect(() => {
    if (selectedSchedule && selectedSchedule.location !== "" && map && input === '') {
      Geocoder.addressSearch(selectedSchedule.location, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const coords = new kakao.maps.LatLng(data[0].y, data[0].x);

          const marker = {
            position: { lat: coords.getLat(), lng: coords.getLng() },
            content: data[0].address_name,
          };

          setMarkers((prevMarkers) => [...prevMarkers, marker]);
          bounds.extend(coords);
          map.setBounds(bounds);
        }
      });
    }
  }, [selectedSchedule]);

  useEffect(() => {
    if (!map || !input) return;
    console.log('input', input)

    Geocoder.addressSearch(input, (data, status) => {
      if (
        status === kakao.maps.services.Status.OK &&
        location.pathname === "/schedule"
      ) {
        const bounds = new kakao.maps.LatLngBounds();
        const coords = new kakao.maps.LatLng(data[0].y, data[0].x);

        const marker = {
          position: { lat: coords.getLat(), lng: coords.getLng() },
          content: data[0].address_name,
        };

        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        bounds.extend(coords);
        map.setBounds(bounds);
      } else if (data.length === 0) {
        Place.keywordSearch(input, (data, status) => {
          if (
            status === kakao.maps.services.Status.OK &&
            location.pathname === "/schedule"
          ) {
            const bounds = new kakao.maps.LatLngBounds();

            const markers = data.map((item) => {
              const coords = new kakao.maps.LatLng(item.y, item.x);
              bounds.extend(coords);

              return {
                position: {
                  lat: coords.getLat(),
                  lng: coords.getLng(),
                },
                content: item.address_name,
              };
            });
            setMarkers(markers);
            map.setBounds(bounds);
          }
        });
      }
    });
  }, [map, input, location.pathname, place]);

  useEffect(() => {
    if (location.pathname === "/dashboard" && dateSchedules) {
      const bounds = new kakao.maps.LatLngBounds();

      dateSchedules.forEach((item) => {
        if (item.location) {
          Geocoder.addressSearch(item.location, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(data[0].y, data[0].x);

              const marker = {
                position: { lat: coords.getLat(), lng: coords.getLng() },
                content: data[0].address_name,
              };

              setMarkers((prevMarkers) => [...prevMarkers, marker]);
              bounds.extend(coords);
              map.setBounds(bounds);
            }
          });
        }
      });
    }
  }, [dateSchedules, location.pathname]);

  return (
    <div className="BaseMap_root">
      <Map
        center={{
          lat: coordinates.lat || 33.450701,
          lng: coordinates.lng || 126.570667,
        }}
        className="BaseMap_map"
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`marker-${index}`}
            position={marker.position}
            onClick={() => setPlace(marker.content)}
          >
            <div style={{ padding: "5px", color: "#000" }}>
              {marker.content}
            </div>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default BaseMap;
