import { io } from 'socket.io-client';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const socket = io(serverUrl,{
    autoConnect :false
});
