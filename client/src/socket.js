import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : `${serverUrl}`;
export const socket = io(URL,{
    autoConnect :false
});
