import { io } from 'socket.io-client';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const URL = process.env.NODE_ENV === 'production' ? undefined : `${serverUrl}`;
export const socket = io(URL,{
    autoConnect :false
});
