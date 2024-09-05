import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import PCDashboard from "./page/PCpage/PCDashboard";
import PCCalendar from "./page/PCpage/PCCalendar";
import PCMemo from "./page/PCpage/PCMemo";
import PCMap from "./page/PCpage/PCMemo";
import { PC, Mobile } from "./hook/useResponsiveStyle";

const Router = ({ socket }) => {
  return (
    <BrowserRouter>
      <PC>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PCDashboard socket={socket} />} />
          <Route path="/calendar" element={<PCCalendar socket={socket} />} />
          <Route path="/map" element={<PCMap socket={socket} />} />
          <Route path="/memo" element={<PCMemo socket={socket} />} />
        </Routes>
      </PC>

      <Mobile>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Mobile>
    </BrowserRouter>
  );
};

export default Router;
