import {io} from 'socket.io-client';

export const socket = io('http://your-socket-server-url', {
  autoConnect: false,
  reconnectionAttempts: 5,
});
