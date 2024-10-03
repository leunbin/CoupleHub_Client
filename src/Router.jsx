import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import PCDashboard from "./page/PCpage/PCDashboard";
import PCCalendar from "./page/PCpage/PCCalendar";
import PCMemo from "./page/PCpage/PCMemo";
import { PC, Mobile } from "./hook/useResponsiveStyle";
import ProtectedRoute from "./util/ProtectedRoute";
import GuestRoute from "./util/GuestRoute";

const Router = ({ socket }) => {
  return (
    <BrowserRouter>
      <PC>
        <Routes>
          <Route path="/" element={<GuestRoute component={Home} />} />
          <Route path="/dashboard" element={<ProtectedRoute component={PCDashboard} socket={socket} />} />
          <Route path="/schedule" element={<ProtectedRoute component={PCCalendar} socket={socket} />} />
          <Route path="/memo" element={<ProtectedRoute component={PCMemo} socket={socket} />} />
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
