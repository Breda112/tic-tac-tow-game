import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { makeMove as makeOnlineMove } from '../lib/socket';
import { cn } from '../lib/utils';



const GameBoard = () => {
  const navigate = useNavigate();
  const {
    board,
    username,
    roomId,
    gameOver,
    gameMode,
    currentPlayer,
    winner,
    makeMove, // Offline mode move function
    resetGame,
    makeMoveWithAI
  } = useGameStore();


  const handleCellClick = (i: number, j: number) => {
  
    if (gameOver || (!username && gameMode === 'online')) return;
  
    if (gameMode === 'online') {
      if (!username) return;
      makeOnlineMove(roomId, username, [i, j]);
    } else if (gameMode === 'AI') {
      makeMoveWithAI(i, j); // Use AI-specific function
    } else {
      makeMove(i, j);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-blue-300 transition-colors"
          >
            <Home className="w-6 h-6 mr-2" />
            Dashboard
          </button>
          {gameOver && (
            <button
              onClick={resetGame}
              className="flex items-center text-white hover:text-blue-300 transition-colors"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Play Again
            </button>
          )}
        </div>

        {/* Status Display */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {gameMode === 'online' ? 'Online Game' : 'Local Game'}
          </h2>
          {gameOver ? (
            <p className="text-xl text-blue-200 mt-4">
              {winner ? `${winner} Wins!` : "It's a Draw!"}
            </p>
          ) : (
            <p className="text-lg text-blue-200 mt-2">
              Current Player: {currentPlayer}
            </p>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                className={cn(
                  "h-24 bg-white/5 backdrop-blur-sm rounded-lg",
                  "flex items-center justify-center text-4xl font-bold",
                  "transition-all duration-200",
                  "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  "disabled:cursor-not-allowed disabled:hover:bg-white/5",
                  cell === 'X' ? 'text-blue-400' : 'text-red-400'
                )}
                disabled={!!cell || gameOver}
              >
                {cell}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
