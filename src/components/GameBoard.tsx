import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw, Brain } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { makeMove as makeOnlineMove, resetGame as resetOnlineGame } from '../lib/socket';
import { cn } from '../lib/utils';



const GameBoard = () => {
  const {
    board,
    gameOver,
    currentPlayer,
    winner,
    startAIBattle,
    player1Moves,
    player2Moves,
    isAIBattleMode,
    battleInProgress
  } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-[300px_1fr_300px] gap-8">
          {/* Player 1 Panel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">AI Player 1</h2>
            </div>
            <div className="h-[400px] overflow-y-auto">
              {player1Moves.map((move, index) => (
                <div key={index} className="text-blue-200 mb-2 p-2 bg-white/5 rounded">
                  Move #{index + 1}: {move}ms
                </div>
              ))}
            </div>
          </div>

          {/* Game Board */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">AI Battle Mode</h1>
              {gameOver ? (
                <p className="text-2xl text-blue-200">
                  {winner ? `${winner} Wins!` : "It's a Draw!"}
                </p>
              ) : (
                <p className="text-xl text-blue-200">
                  {battleInProgress ? `Current Player: ${currentPlayer}` : 'Ready to Battle'}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {board.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`h-24 w-24 bg-white/5 backdrop-blur-sm rounded-lg
                      flex items-center justify-center text-4xl font-bold
                      ${cell === 'X' ? 'text-blue-400' : 'text-red-400'}`}
                  >
                    {cell}
                  </div>
                ))
              )}
            </div>

            <button
              onClick={startAIBattle}
              disabled={battleInProgress}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800
                text-white font-bold rounded-lg shadow-lg transition-colors
                disabled:cursor-not-allowed"
            >
              {battleInProgress ? 'Battle in Progress...' : 'Start AI Battle'}
            </button>
          </div>

          {/* Player 2 Panel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">AI Player 2</h2>
            </div>
            <div className="h-[400px] overflow-y-auto">
              {player2Moves.map((move, index) => (
                <div key={index} className="text-red-200 mb-2 p-2 bg-white/5 rounded">
                  Move #{index + 1}: {move}ms
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
