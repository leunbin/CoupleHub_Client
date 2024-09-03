import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Dashboard from './page/Dashboard';
import Calendar from './page/Calendar';
import Memo from './page/Memo';
import Map from './page/Map';

const Router = ({socket}) => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<Dashboard socket={socket}/>} />
        <Route path='/calendar' element={<Calendar socket={socket} />} />
        <Route path='/map' element={<Map socket={socket} />} />
        <Route path='/memo' element={<Memo socket={socket} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;