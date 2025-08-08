import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Target, Users, Heart } from 'lucide-react';

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
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
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
      className={`w-20 h-20 bg-gray-800/50 border-2 transition-all duration-300 text-3xl font-bold
        ${value === 'X' ? 'text-blue-400 border-blue-500/50' : 
          value === 'O' ? 'text-red-400 border-red-500/50' : 
          'border-gray-600 hover:border-blue-500/50'}
        ${!value && !winner ? 'hover:bg-blue-500/10 cursor-pointer' : ''}
        ${winner ? 'cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={winner || value}
    >
      {value}
    </button>
  );

  const getWinnerMessage = () => {
    if (winner === 'X') return '🎉 Player X Wins!';
    if (winner === 'O') return '🎉 Player O Wins!';
    if (winner === 'Draw') return '🤝 It\'s a Draw!';
    return '';
  };

  return (
    <div className="cyber-card p-8 max-w-md mx-auto">
      {/* Game Header */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <Target className="text-blue-500" size={20} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white font-inter">Let's Play Tic-Tac-Toe!</h3>
          <p className="text-gray-400 text-sm flex items-center justify-center">
            <Users size={14} className="mr-1" />
            2-Player Fun Game
          </p>
        </div>
      </div>

      {/* Score Board */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center cyber-card p-4">
          <div className="text-blue-400 text-2xl font-bold font-mono">{scores.X}</div>
          <div className="text-gray-300 text-sm font-inter">Player X</div>
        </div>
        <div className="text-center cyber-card p-4">
          <div className="text-gray-400 text-2xl font-bold font-mono">{scores.draws}</div>
          <div className="text-gray-300 text-sm font-inter">Draws</div>
        </div>
        <div className="text-center cyber-card p-4">
          <div className="text-red-400 text-2xl font-bold font-mono">{scores.O}</div>
          <div className="text-gray-300 text-sm font-inter">Player O</div>
        </div>
      </div>

      {/* Game Status */}
      <div className="mb-6 text-center">
        {winner ? (
          <div className="cyber-card p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="text-yellow-400" size={20} />
              <span className="text-lg font-bold text-white font-inter">
                {getWinnerMessage()}
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              Great game! Want to play another round?
            </div>
          </div>
        ) : (
          <div className="cyber-card p-4">
            <div className="text-lg text-gray-300 font-inter mb-2">
              <Heart className="inline text-red-400 mr-2" size={16} />
              Next Turn: <span className={`font-bold font-mono ${isXNext ? 'text-blue-400' : 'text-red-400'}`}>
                Player {isXNext ? 'X' : 'O'}
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              Click any empty square to make your move!
            </div>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 mb-8 justify-center mx-auto w-fit">
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
      <div className="flex justify-center space-x-3 mb-6">
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

      {/* Game Info */}
      <div className="cyber-card p-4">
        <div className="text-center space-y-2">
          <div className="text-gray-400 text-sm font-inter">
            Games Played: <span className="font-mono text-white">{gameCount}</span>
          </div>
          <div className="text-xs text-gray-500 font-inter flex items-center justify-center">
            <Heart className="mr-1 text-red-400" size={12} />
            Come play with me - it's more fun together!
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;