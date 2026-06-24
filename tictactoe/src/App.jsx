import { useState } from "react";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const checkWinner = (newBoard) => {
    const patterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
    for (const [a,b,c] of patterns) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const checkDraw = (newBoard) => {
    return newBoard.every(cell => cell !== null);
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === "X") setScoreX(scoreX + 1);
      else setScoreO(scoreO + 1);
    } else if (checkDraw(newBoard)) {
      setWinner("Draw");
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className={`game ${darkMode ? "dark" : "light"}`}>
      <h1>Tic Tac Toe</h1>

      <div className="scoreboard">
        <span>X: {scoreX}</span>
        <span>O: {scoreO}</span>
      </div>

      <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="board">
        {board.map((cell, i) => (
          <button key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </button>
        ))}
      </div>

      <div className={`status ${winner === "Draw" ? "draw" : ""}`}>
        {winner === "Draw"
          ? "It's a Draw!"
          : winner
            ? `Winner: ${winner}`
            : `Turn: ${isXTurn ? "X" : "O"}`}
      </div>

      <button className="restart" onClick={restart}>Restart</button>
    </div>
  );
}
