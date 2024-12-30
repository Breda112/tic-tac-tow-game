import { io } from 'socket.io-client';

// Create socket instance with error handling
export const socket = io('http://127.0.0.1:5001', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Add connection status logging
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

export const createRoom = (roomId: string, username: string) => {
  console.log('Creating room:', { roomId, username });
  socket.emit('create_room', { room_id: roomId, username });
};

export const joinRoom = (roomId: string, username: string) => {
  console.log('Joining room:', { roomId, username });
  socket.emit('join_room', { room_id: roomId, username });
};

export const makeMove = (roomId: string, username: string, action: [number, number]) => {
  console.log('Making move:', { roomId, username, action });
  socket.emit('make_move', { room_id: roomId, username, action });
};

export const resetGame = (roomId: string) => {
  console.log('Resetting game:', { roomId });
  socket.emit('reset_game', { room_id: roomId });
};