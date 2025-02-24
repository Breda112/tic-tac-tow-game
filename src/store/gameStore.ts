import { create } from 'zustand';
import { checkWinner, isGameOver } from '../lib/gameLogic';
import axios from 'axios';

const AI_API_URL = 'http://127.0.0.1:5000';

type Cell = string;
type Board = Cell[][];
type Player = string;
export type GameMode = 'offline' | 'online' | 'AI' | null;

interface GameState {
  gameMode: GameMode;
  board: Board;
  currentPlayer: Player;
  gameOver: boolean;
  winner: Player | null;
  username: string;
  roomId: string;
  setUsername: (username: string) => void;
  setGameMode: (mode: GameMode) => void;
  setRoomId: (roomId: string) => void;
  makeMove: (row: number, col: number) => void;
  makeMoveWithAI: (row: number, col: number) => void;
  updateGame: (data: {
    board: Board;
    current_player: Player;
    terminal?: boolean;
    winner?: Player | null;
  }) => void;
  resetGame: () => void;
}

const initialBoard: Board = [['', '', ''], ['', '', ''], ['', '', '']];

// Track the first player alternately across sessions
let firstPlayer: Player = "X";

export const useGameStore = create<GameState>((set, get) => ({
  board: initialBoard,
  currentPlayer: firstPlayer,
  gameMode: null,
  gameOver: false,
  winner: null,
  username: '',
  roomId: '',

  setGameMode: (mode) => set({ gameMode: mode }),
  setUsername: (username) => set({ username }),
  setRoomId: (roomId) => set({ roomId }),

  updateGame: (data) => {
    set({
      board: data.board,
      currentPlayer: data.current_player,
      gameOver: data.terminal || false,
      winner: data.winner || null,
    });
  },

  makeMove: (row, col) =>

    set((state) => {
      if (state.board[row][col] !== '' || state.gameOver) return state;

      const newBoard = state.board.map((r) => [...r]);
      newBoard[row][col] = state.currentPlayer;

      const winner = checkWinner(newBoard);
      const gameOver = isGameOver(newBoard);

      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        gameOver,
      };
    }),

  makeMoveWithAI: async (row: number, col: number) => {
    const state = get();
    const newBoard = state.board.map((r) => [...r]);

    if (row < 10 || col < 10) {
      newBoard[row][col] = state.currentPlayer;

      const winner = checkWinner(newBoard);
      const gameOver = isGameOver(newBoard);

      set({
        board: newBoard,
        currentPlayer: 'O', // AI always plays 'O'
        winner,
        gameOver,
      });

      if (state.gameOver) return;
    }





    // AI's move
    try {
      const response = await axios.post(`${AI_API_URL}/minimax`, {
        board: newBoard,
      });

      const bestMove = response.data.action;
      if (bestMove) {
        const [aiRow, aiCol] = bestMove;
        const updatedBoard = get().board.map((r) => [...r]);
        updatedBoard[aiRow][aiCol] = 'O';

        const aiWinner = checkWinner(updatedBoard);
        const aiGameOver = isGameOver(updatedBoard);

        set({
          board: updatedBoard,
          currentPlayer: 'X',
          winner: aiWinner,
          gameOver: aiGameOver,
        });
      }
    } catch (error) {
      console.error('Failed to fetch AI move:', error);
    }
  },

  resetGame: () => {
    // Alternate first player
    firstPlayer = firstPlayer === "X" ? "O" : "X";


    set({
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      currentPlayer: firstPlayer,
      gameOver: false,
      winner: null,
    });
    const state = get();
    if (firstPlayer === "O" && state.gameMode == 'AI') {
      console.log("Ai to move")

      state.makeMoveWithAI(10, 10); // Example: AI starts with the first move
    }

  },
}));
// you are here 17/01/2025 20:52 - switch first player in AI mode