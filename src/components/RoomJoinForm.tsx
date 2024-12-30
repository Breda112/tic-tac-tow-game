import React from 'react';
import { useGameStore } from '../store/gameStore';
import { createRoom, joinRoom } from '../lib/socket';

const RoomJoinForm: React.FC = () => {
  const { username, roomId, setUsername, setRoomId } = useGameStore();

  const handleCreateRoom = () => {
    if (!username) {
      alert('Please set a username before creating a room.');
      return;
    }
    createRoom(roomId, username);
  };

  const handleJoinRoom = () => {
    if (!username) {
      alert('Please set a username before joining a room.');
      return;
    }
    joinRoom(roomId, username);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 mb-12">
      <div className="space-y-2">
        <label className="block text-white text-sm font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-white text-sm font-medium">Room ID</label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleCreateRoom}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Create Room
        </button>
        <button
          onClick={handleJoinRoom}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomJoinForm;