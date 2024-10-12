import React, { useEffect, useState } from "react";
import PCheader from "../../component/PC/PCbasic/PCheader";
import PCsidenav from "../../component/PC/PCbasic/PCsidenav";
import PCfooter from "../../component/PC/PCbasic/PCfooter";
import "./PCDashboard.scss";
import Weekplan from "../../component/PC/Dashboard/Weekplan";
import BaseMap from "../../component/Base/BaseMap";
import MapPlace from "../../component/PC/Dashboard/MapPlace";
import MemoModal from "../../component/PC/Dashboard/MemoModal";
import fetchSchedulesByDate from "../../api/schedule/fetchSchedulesByDate";
import fetchMemo from "../../api/memo/fetchMemo";
import Weather from "../../component/PC/PCbasic/Weather";
import { Link } from "react-router-dom";

const PCDashboard = ({ socket }) => {
  const [dateSchedules, setDateSchedules] = useState([]);
  const [memos, setMemos] = useState([]);
  const [toggle, setToggle] = useState("schedule");
  const [isSchedule, setIsSchedule] = useState(true);
  const [isMap, setIsMap] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const today = new Date();
  const date = today.toLocaleDateString();

  const getSchedulesByDate = async (date) => {
    try {
      const result = await fetchSchedulesByDate(date);
      setDateSchedules(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getMemos = async () => {
    try {
      const result = await fetchMemo();
      const data = result.slice(0, 4);
      setMemos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScheduleClick = () => {
    setIsMap(false);
    setIsWeather(false);
    setIsSchedule(true);
    setToggle("schedule");
  };

  const handleWeatherClick = () => {
    setIsMap(false);
    setIsWeather(true);
    setIsSchedule(false);
    setToggle("weather");
  };

  const handleMapClick = () => {
    setIsSchedule(false);
    setIsMap(true);
    setIsWeather(false);
    setToggle("map");
  };

  useEffect(() => {
    getSchedulesByDate(date);
    getMemos();
  }, [date]);

  useEffect(() => {
    console.log(memos);
  }, [date, memos]);

  return (
    <div className="PCdashboard_root">
      <PCsidenav>
        <PCheader />
        <div className="PCdashboard_main">
          <div className="PCdashboard_main_right">
            <div className="PCdashboard_title">
              <div className="PCdashboard_font1">
                <p className="PCdashboard_today-schedule">오늘의 일정</p>
                <p className="PCdashboard_today-check">을</p>
              </div>
              <p className="PCdashboard_today-check">확인해주세요.</p>
            </div>
            <div className="PCdashboard_btn_tag">
              <button
                className={`PCdashboard_schedule_btn ${
                  toggle === "schedule" ? "active" : ""
                }`}
                onClick={handleScheduleClick}
              >
                오늘의 일정
              </button>
              <button
                className={`PCdashboard_weather_btn ${
                  toggle === "weather" ? "active" : ""
                }`}
                onClick={handleWeatherClick}
              >
                오늘의 날씨
              </button>
              <button
                className={`PCdashboard_map_btn ${
                  toggle === "map" ? "active" : ""
                }`}
                onClick={handleMapClick}
              >
                오늘의 장소
              </button>
            </div>
            <div className="PCdashboard_schedule_tag">
              {isSchedule && (
                <div className="PCdashboard_schedules">
                  {dateSchedules.length === 0 && (
                    <>
                      <div className="noSchedules">여유로운 하루에요 😊</div>
                      <Link
                        to="/schedule"
                        className="PCdashboard_schedule_link"
                      >
                        일정 추가하러 가기 →
                      </Link>
                    </>
                  )}
                  {dateSchedules?.map((schedule) => (
                    <div key={schedule._id} className="PCdashboard_schedule">
                      <div className="PCdashboard_schedule_event">
                        <strong className="event_title">01 일정</strong>
                        <span className="event_content">{schedule.event}</span>
                      </div>
                      <div className="PCdashboard_schedule_time">
                        <strong className="schedule_title">02 시간</strong>
                        <div className="schedule_content">
                          {schedule.startTime && (
                            <span>{schedule.startTime}</span>
                          )}
                          {schedule.endTime && (
                            <>
                              <span>~</span>
                              <span>{schedule.endTime}</span>
                            </>
                          )}
                          {!schedule.startTime && !schedule.endTime && (
                            <span>시간 미정</span>
                          )}
                        </div>
                      </div>

                      {schedule.location && (
                        <div className="PCdashboard_schedule_location">
                          <strong className="location_title">03 위치</strong>
                          <span className="location_content">
                            {schedule.location}
                          </span>
                        </div>
                      )}
                      {schedule.note && (
                        <div className="PCdashboard_schedule_note">
                          <strong className="note_title">04 노트</strong>
                          <span className="note_content">{schedule.note}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {isWeather && <Weather />}

              {isMap && (
                <div className="PCdashboard_map_tag">
                  <div className="PCdashboard_map">
                    <BaseMap dateSchedules={dateSchedules} />
                  </div>

                  <div className="PCdashboard_place">
                    <MapPlace dateSchedules={dateSchedules} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="PCdashboard_main_left">
            <div className="PCdashboard_memo">
              <div className="PCdashboard_memo_deadline">
                <div className="PCdashboard_memo_title">마감 임박 메모</div>
                <MemoModal />
              </div>

              <div className="PCdashboard_memo_list">
                <div className="PCdashboard_memo_title">
                  <span className="title">나의 메모</span>
                  <Link to="/memo">
                    <button className="PCdashboard_memo_btn">VIEW ALL</button>
                  </Link>
                </div>

                <div className="PCdashboard_memo_content">
                  {memos?.map((item) => (
                    <div className="memos_item">
                      <div className="memo_front">
                        <div className={`memo_private ${item.private === true ? 'true' : 'false'}`}>
                          {item.private === true ? <p>개인</p> : <p>공유</p>}
                        </div>
                        <div className="memo_title"><p>{item.title}</p></div>
                      </div>
                      <div className={`memo_status ${new Date(item.dueDate) > today ? '' : 'complete'}`}>
                        {item.dueDate ? (
                          new Date(item.dueDate) > today ? (
                            <p>진행중...</p>
                          ) : (
                            <p>완료</p>
                          )
                        ) : (
                          <p>진행중...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <PCfooter socket={socket} />
      </PCsidenav>
    </div>
  );
};

export default PCDashboard;
