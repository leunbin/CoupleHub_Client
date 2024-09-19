import React, { useEffect } from "react";
import "./main.scss";
import Router from "./Router";
import {socket} from './socket';
import { SidebarProvider } from "./store/SidebarContext";

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (message) => {
      console.log('Received message:', message);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
    };
  }, []);

  // const sendMessage = () => {
  //   socket.emit('message', 'Hello from client!');
  // }
  return (
    <SidebarProvider>
      <Router socket={socket} />
    </SidebarProvider>
  );
}

export default App;
