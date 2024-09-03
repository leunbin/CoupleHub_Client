import React, { useEffect, useState } from "react";
import useGeolocation from "../../../hook/useGeolocation";
import useConvertCoords from "../../../hook/useConvertCoords";
import fetchWeather from "../../../api/weather/fetchWeather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain, faCloudSun, faCloudSunRain, faSnowflake, faSpinner, faSun } from "@fortawesome/free-solid-svg-icons";
import './Weather.scss';

const getBase = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const today = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const yesterday = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate() - 1).padStart(2, '0')}`;

  const time = hours * 100 + minutes;

  let baseTime = '0200';
  let baseDate = today;

  switch (true) {
    case (time >= 0 && time <= 210):
      baseTime = '2300';
      baseDate = yesterday;
      break;
    case (time >= 211 && time <= 510):
      baseTime = '0200';
      baseDate = today;
      break;
    case (time >= 511 && time <= 810):
      baseTime = '0500';
      baseDate = today;
      break;
    case (time >= 811 && time <= 1110):
      baseTime = '0800';
      baseDate = today;
      break;
    case (time >= 1111 && time <= 1410):
      baseTime = '1100';
      baseDate = today;
      break;
    case (time >= 1411 && time <= 1710):
      baseTime = '1400';
      baseDate = today;
      break;
    case (time >= 1711 && time <= 2010):
      baseTime = '1700';
      baseDate = today;
      break;
    case (time >= 2011 && time <= 2310):
      baseTime = '2000';
      baseDate = today;
      break;
    default:
      baseTime = '0200';
      baseDate = today;
      break;
  }

  return { time: baseTime, date: baseDate };
};

const Weather = () => {
  const [baseDate, setBaseDate] = useState('');
  const [baseTime, setBaseTime] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [tmp, setTmp] = useState('');
  const [sky, setSky] = useState('');
  const [rain, setRain] = useState('');
  const location = useGeolocation();
  const geoCoords = location.coordinates;
  const convertedCoords = useConvertCoords({ lat: geoCoords.lat, lng: geoCoords.lng }).convertCoords;

  useEffect(() => {
    const { date, time } = getBase();
    setBaseDate(date);
    setBaseTime(time);
  }, []);

  useEffect(() => {
    if (convertedCoords && geoCoords) {
      const { nx, ny } = convertedCoords;
      fetchWeather({ date: baseDate, time: baseTime, nx, ny })
        .then(data => {
          const filterdData = data?.filter(item =>
            ['PTY', 'SKY', 'TMP'].includes(item.category))
            setWeatherData(filterdData);
        })
        .catch(error => console.error('Error setting weather data:', error));
    }
  }, [baseDate, baseTime, geoCoords, convertedCoords]);

  useEffect(() => {
      const ptyData = weatherData?.find(item => item.category === 'PTY');
      const skyData = weatherData?.find(item => item.category === 'SKY');
      const tmpData = weatherData?.find(item => item.category === 'TMP');

      const tmp = tmpData?.fcstValue;
      let pty='알 수 없음';
      let sky='알 수 없음';


      if (ptyData) {
        switch (parseInt(ptyData.fcstValue, 10)) { 
          case 0:
            pty = '없음';
            break;
          case 1:
            pty = '비';
            break;
          case 2:
            pty = '비/눈';
            break;
          case 3:
            pty = '눈';
            break;
          case 4:
            pty = '소나기';
            break;
          default:
            pty = '알 수 없음';
        }
      }

      if (skyData) {
        switch (parseInt(skyData.fcstValue, 10)) {
          case 1:
            sky = '맑음';
            break;
          case 3:
            sky = '구름많음';
            break;
          case 4:
            sky = '흐림';
            break;
          default:
            sky = '알 수 없음';
        }
      }

      setRain(pty);
      setSky(sky);
      setTmp(tmp);
  },[weatherData])

  let icon;

  if(rain === '비') {
    icon = (<>
      <FontAwesomeIcon icon={faCloudRain} />
    </>)
  } else if (rain === '비/눈' || rain === '눈') {
    icon = (<>
      <FontAwesomeIcon icon={faSnowflake} />
    </>)
  } else if (rain === '소나기') {
    icon = (
      <>
        <FontAwesomeIcon icon={faCloudSunRain} />
      </>
    )
  } else if (sky === '맑음') {
    icon = (
      <>
        <FontAwesomeIcon icon={faSun} style={{color: '#FF0000'}} />
      </>
    )
  } else if(sky === '구름많음') {
    icon = (
      <>
        <FontAwesomeIcon icon={faCloudSun} />
      </>
    )
  } else if (sky === '흐림') {
    icon = (
      <>
        <FontAwesomeIcon icon={faCloud} />
      </>
    )
  } else if (rain === '알 수 없음' && sky==='알 수 없음') {
    icon = null;
  }

  return (
    <div>
      {weatherData ? (
        <div className='Weather_root'>
          <div className='Weather_icon'>{icon}</div>
          <div className="Weather_info">
            {(rain === '알 수 없음' || rain === '없음') ? null : <span>{rain}</span>}
            {sky === '알 수 없음' ? null : <span>{sky}</span>}
            <span>{tmp}°C</span>
          </div>
        </div>
      ) : (
        <FontAwesomeIcon icon={faSpinner} />
      )}
    </div>
  );
};

export default Weather;
