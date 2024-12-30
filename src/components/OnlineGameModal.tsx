// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useGameStore } from '../store/gameStore';
// import { getInitialState } from '../lib/api';

// const OnlineGameModal: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setGameMode, setRoomId, setUsername, } = useGameStore();


//   const handleCreateRoom = async () => {
//     console.log("####################################")
//     try {
//       setLoading(true);
//       setError(null);
//       const initialState = await getInitialState();
//       //setRoomStatus(null);
//       navigate(`/game/${newRoomId}`);
//     } catch (err) {
//       setError('Failed to create room. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleJoinRoom = () => {
//     if (!roomId.trim()) {
//       setError('Please enter a room ID');
//       return;
//     }
//     setGameId(roomId);
//     setRoomStatus(null);
//     navigate(`/game/${roomId}`);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
//         <button
//           onClick={() => setRoomStatus(null)}
//           className="absolute right-4 top-4 text-gray-400 hover:text-white"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <h2 className="text-2xl font-bold text-white mb-6">
//           {roomStatus === 'creating' ? 'Create Room' : 'Join Room'}
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
//             {error}
//           </div>
//         )}

//         {roomStatus === 'creating' ? (
//           <button
//             onClick={handleCreateRoom}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Creating Room...' : 'Create New Room'}
//           </button>
//         ) : (
//           <div className="space-y-4">
//             <input
//               type="text"
//               value={roomId}
//               onChange={(e) => setRoomId(e.target.value)}
//               placeholder="Enter Room ID"
//               className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleJoinRoom}
//               disabled={loading}
//               className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Join Room
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OnlineGameModal;