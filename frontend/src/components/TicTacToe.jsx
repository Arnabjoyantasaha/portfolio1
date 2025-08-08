import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameCount, setGameCount] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
      if (winner !== 'Draw') {
        setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
      } else {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    }
  }, [board]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameCount(prev => prev + 1);
  };

  const resetAll = () => {
    resetGame();
    setScores({ X: 0, O: 0, draws: 0 });
    setGameCount(0);
  };

  const Square = ({ value, onClick, index }) => (
    <button
      className={`w-20 h-20 bg-gray-800 border-2 border-gray-600 hover:border-blue-400 
        transition-all duration-200 text-2xl font-bold ${
        value === 'X' ? 'text-blue-400' : 'text-red-400'
      } hover:bg-gray-700`}
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      {/* Score Board */}
      <div className="flex justify-center space-x-8 mb-8">
        <div className="text-center">
          <div className="text-blue-400 text-2xl font-bold">{scores.X}</div>
          <div className="text-gray-300">Player X</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-2xl font-bold">{scores.draws}</div>
          <div className="text-gray-300">Draws</div>
        </div>
        <div className="text-center">
          <div className="text-red-400 text-2xl font-bold">{scores.O}</div>
          <div className="text-gray-300">Player O</div>
        </div>
      </div>

      {/* Game Status */}
      <div className="mb-6">
        {winner ? (
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="text-yellow-400" size={24} />
            <span className="text-2xl font-bold text-white">
              {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
            </span>
          </div>
        ) : (
          <div className="text-xl text-gray-300 text-center">
            Next player: <span className={`font-bold ${isXNext ? 'text-blue-400' : 'text-red-400'}`}>
              {isXNext ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 justify-center mx-auto w-fit mb-8">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            index={index}
          />
        ))}
      </div>

      {/* Game Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          <RotateCcw size={20} />
          <span>New Game</span>
        </button>
        {gameCount > 0 && (
          <button
            onClick={resetAll}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <span>Reset All</span>
          </button>
        )}
      </div>

      <div className="mt-6 text-gray-400 text-sm text-center">
        Games played: {gameCount}
      </div>
    </div>
  );
};

export default TicTacToe;