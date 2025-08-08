import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Target } from 'lucide-react';

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
      className={`w-16 h-16 bg-gray-800/50 border border-blue-500/30 hover:border-blue-500 
        transition-all duration-300 text-xl font-bold hover:bg-blue-500/10 ${
        value === 'X' ? 'text-blue-400' : 'text-purple-400'
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className="cyber-card p-8 max-w-md mx-auto">
      {/* Game Header */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Target className="text-blue-500" size={20} />
        <h3 className="text-xl font-bold text-white font-inter">Tic-Tac-Toe</h3>
      </div>

      {/* Score Board */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center cyber-card p-3">
          <div className="text-blue-400 text-xl font-bold font-mono">{scores.X}</div>
          <div className="text-gray-300 text-sm font-inter">Player X</div>
        </div>
        <div className="text-center cyber-card p-3">
          <div className="text-gray-400 text-xl font-bold font-mono">{scores.draws}</div>
          <div className="text-gray-300 text-sm font-inter">Draws</div>
        </div>
        <div className="text-center cyber-card p-3">
          <div className="text-purple-400 text-xl font-bold font-mono">{scores.O}</div>
          <div className="text-gray-300 text-sm font-inter">Player O</div>
        </div>
      </div>

      {/* Game Status */}
      <div className="mb-6 text-center">
        {winner ? (
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="text-yellow-400" size={20} />
            <span className="text-lg font-bold text-white font-inter">
              {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
            </span>
          </div>
        ) : (
          <div className="text-lg text-gray-300 font-inter">
            Next: <span className={`font-bold font-mono ${isXNext ? 'text-blue-400' : 'text-purple-400'}`}>
              {isXNext ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 mb-8 justify-center">
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
      <div className="flex justify-center space-x-3">
        <button
          onClick={resetGame}
          className="btn-primary px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm font-inter hover-lift"
        >
          <RotateCcw size={16} />
          <span>New Game</span>
        </button>
        {gameCount > 0 && (
          <button
            onClick={resetAll}
            className="btn-secondary px-4 py-2 rounded-lg transition-all duration-300 text-sm font-inter hover-lift"
          >
            Reset Stats
          </button>
        )}
      </div>

      <div className="mt-6 text-center">
        <div className="text-gray-400 text-sm font-inter">
          Games played: <span className="font-mono">{gameCount}</span>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;