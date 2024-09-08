import React from "react";
import "./PCschedule.scss";

const PCschedule = () => {
  const schedules = [
    {
      id: 1,
      time: "09:00 - 10:00",
      event: "팀 미팅",
      location: "회사 3층 회의실 A",
      note: "08:30까지 회의 자료 준비",
    },
    {
      id: 2,
      time: "10:30 - 12:00",
      event: "고객사 방문",
      location: "서울시 강남구 테헤란로 123, ABC빌딩 5층",
      note: "10:00까지 프레젠테이션 검토",
    },
    {
      id: 3,
      time: "",
      event: "점심 식사",
      location: "회사 근처 식당",
      note: null, // 데드라인이 없는 경우
    },
    {
      id: 4,
      time: "14:00 - 16:00",
      event: "프로젝트 보고서 작성",
      location: "개인 사무실",
      note: "16:00까지 보고서 초안 제출",
    },
    {
      id: 5,
      time: "16:30 - 17:30",
      event: "부서 회의",
      location: "회사 2층 회의실 B",
      note: "회의 전날 안건 검토",
    },
    {
      id: 6,
      time: "18:00 - 19:00",
      event: "외부 연사 강연",
      location: "온라인 Zoom 회의",
      note: "18:00까지 링크 접속",
    },
    {
      id: 7,
      time: "19:30 - 20:30",
      event: "팀 디너",
      location: "강남구 이탈리안 레스토랑",
      note: "예약은 미리 확인",
    },
    {
      id: 8,
      time: "08:00 - 09:00",
      event: "아침 운동",
      location: "회사 헬스장",
      note: "07:50까지 준비",
    },
    {
      id: 9,
      time: "11:00 - 12:00",
      event: "연구 발표 준비",
      location: "개인 사무실",
      note: "발표 자료 확인",
    },
    {
      id: 10,
      time: "15:00 - 16:00",
      event: "클라이언트 미팅",
      location: "서울시 중구 종로로 45, D 타워 8층",
      note: "미팅 안건 사전 공유",
    },
  ];

  return (
    <div className="PCschedule_root">
      <div className="PCschedule_title">Check Off Your Goals!</div>
      <div className="PCschedule_content">
        {schedules.map((schedule) => (
          <div className="PCschedule_item" key={schedule.id}>
            <div className="PCschedule_item_event">{schedule.event}</div>
            <div className="PCschedule_item_time">{schedule.time === "" ? "ALL DAY" : schedule.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PCschedule;
