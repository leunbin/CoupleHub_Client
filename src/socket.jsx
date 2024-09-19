import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SERVER_URL === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL);