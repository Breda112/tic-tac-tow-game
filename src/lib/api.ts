import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';// for AI 


export const getInitialState = async () => {
  const response = await axios.get(`${API_URL}/initial_state`);
  console.log("data from server" + response.data);
  return response.data;
};

export const makeAIMove = async (board: string[][]) => {
  const response = await axios.post(`${API_URL}/minimax`, { board });
  return response.data.action;
};

export const checkWinner = async (board: string[][]) => {
  const response = await axios.post(`${API_URL}/winner`, { board });
  return response.data.winner;
};

export const checkTerminal = async (board: string[][]) => {
  const response = await axios.post(`${API_URL}/terminal`, { board });
  return response.data.terminal;
};

export const makeMove = async (board: string[][], action: [number, number]) => {
  const response = await axios.post(`${API_URL}/result`, { board, action });
  return response.data;
};


