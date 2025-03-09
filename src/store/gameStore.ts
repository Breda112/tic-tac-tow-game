import { create } from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

const AI_API_URL = 'http://127.0.0.1:5000';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[][];

interface GameState {
  board: Board;
  currentPlayer: Player;
  gameOver: boolean;
  winner: Player | 'Draw' | null;
  isAIBattleMode: boolean;
  battleInProgress: boolean;
  player1Moves: number[];
  player2Moves: number[];
  startAIBattle: () => void;
}

const WINNING_COMBINATIONS = [
  [[0, 0], [0, 1], [0, 2]], // Rows
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]], // Columns
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]], // Diagonals
  [[0, 2], [1, 1], [2, 0]]
];

const MOVE_DELAY = 500; // Delay between moves in milliseconds

const initialState: Pick<GameState, 'board' | 'currentPlayer' | 'gameOver' | 'winner' | 'isAIBattleMode' | 'battleInProgress' | 'player1Moves' | 'player2Moves'> = {
  board: Array(3).fill(null).map(() => Array(3).fill(null)),
  currentPlayer: 'X',
  gameOver: false,
  winner: null,
  isAIBattleMode: true,
  battleInProgress: false,
  player1Moves: [],
  player2Moves: []
};

export const useGameStore = create<GameState>()(devtools((set, get) => ({
  ...initialState,
  startAIBattle: async () => {
    set(state => ({
      board: Array(3).fill(null).map(() => Array(3).fill(null)),
      currentPlayer: 'X',
      gameOver: false,
      winner: null,
      isAIBattleMode: true,
      battleInProgress: true,
      player1Moves: [],
      player2Moves: []
    }));

    while (!get().gameOver) {
      const startTime = performance.now();
      
      const endpoint = get().currentPlayer === 'X' ? 'minimax1' : 'minimax2';
      
      try {
        const response = await axios.post(`${AI_API_URL}/${endpoint}`, {
          board: get().board,
          player: get().currentPlayer as string
        });

        const bestMove = response.data.action;
        if (bestMove) {
          const [row, col] = bestMove;
          const newBoard: Board = JSON.parse(JSON.stringify(get().board));
          newBoard[row][col] = get().currentPlayer;

          let gameOver = false;
          let winner: Player | 'Draw' | null = null;

          for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (
              newBoard[a[0]][a[1]] &&
              newBoard[a[0]][a[1]] === newBoard[b[0]][b[1]] &&
              newBoard[a[0]][a[1]] === newBoard[c[0]][c[1]]
            ) {
              gameOver = true;
              winner = get().currentPlayer as Player;
              break;
            }
          }

          // Check for draw
          if (!gameOver && newBoard.every(row => row.every(cell => cell !== null))) {
            gameOver = true;
            winner = 'Draw';
          }

          const endTime = performance.now();
          const moveTime = Math.round(endTime - startTime);

          set({
            board: newBoard,
            currentPlayer: get().currentPlayer === 'X' ? 'O' : 'X' as Player,
            gameOver,
            winner,
            isAIBattleMode: true,
            battleInProgress: true,
            player1Moves: get().currentPlayer === 'X' 
              ? [...get().player1Moves, moveTime]
              : get().player1Moves,
            player2Moves: get().currentPlayer === 'O'
              ? [...get().player2Moves, moveTime]
              : get().player2Moves
          });
        }
      } catch (error) {
        console.error('Failed to fetch AI move:', error);
        set(state => ({ ...state, gameOver: true, battleInProgress: false }));
        return;
      }

      await new Promise(resolve => setTimeout(resolve, MOVE_DELAY));
    }

    set(state => ({ ...state, battleInProgress: false, gameOver: true }));
  }
})));
