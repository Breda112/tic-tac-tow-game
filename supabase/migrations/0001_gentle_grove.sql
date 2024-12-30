/*
  # Create games table for online multiplayer

  1. New Tables
    - `games`
      - `id` (text, primary key) - unique game identifier
      - `board` (jsonb) - game board state
      - `current_player` (text) - current player's turn (X or O)
      - `status` (text) - game status (playing, won, draw)
      - `winner` (text) - winner of the game (X or O)
      - `created_at` (timestamp) - when the game was created
      - `updated_at` (timestamp) - when the game was last updated

  2. Security
    - Enable RLS on `games` table
    - Add policies for reading and updating games
*/

CREATE TABLE IF NOT EXISTS games (
  id text PRIMARY KEY,
  board jsonb NOT NULL DEFAULT '[]'::jsonb,
  current_player text NOT NULL DEFAULT 'X',
  status text NOT NULL DEFAULT 'playing',
  winner text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read games (needed for multiplayer)
CREATE POLICY "Anyone can read games"
  ON games
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert games (needed for game creation)
CREATE POLICY "Anyone can create games"
  ON games
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update games (needed for gameplay)
CREATE POLICY "Anyone can update games"
  ON games
  FOR UPDATE
  TO public
  USING (true);