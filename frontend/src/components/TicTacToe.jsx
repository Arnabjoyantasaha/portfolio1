import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Target, Brain, Zap } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameCount, setGameCount] = useState(0);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [difficulty, setDifficulty] = useState('impossible'); // impossible, hard, medium

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
      if (winner === 'X') {
        setScores(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (winner === 'O') {
        setScores(prev => ({ ...prev, ai: prev.ai + 1 }));
      } else {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    }
  }, [board]);

  // AI Move with perfect minimax algorithm
  useEffect(() => {
    if (!isPlayerTurn && !winner && board.some(square => square === null)) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board, difficulty);
        if (bestMove !== null) {
          const newBoard = board.slice();
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
        setIsAiThinking(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board, difficulty]);

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

  // Perfect minimax algorithm - unbeatable AI
  const minimax = (squares, depth, isMaximizing) => {
    const winner = calculateWinner(squares);
    
    // Base cases
    if (winner === 'O') return 10 - depth; // AI wins
    if (winner === 'X') return depth - 10; // Player wins
    if (winner === 'Draw') return 0; // Draw

    if (isMaximizing) {
      // AI's turn (maximizing)
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      // Player's turn (minimizing)
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Strategic opening moves for variety
  const getStrategicMove = (squares) => {
    // If it's the first move, prefer corners or center
    const moveCount = squares.filter(s => s !== null).length;
    
    if (moveCount === 0) {
      // First move: prefer corners for strategic advantage
      const corners = [0, 2, 6, 8];
      return corners[Math.floor(Math.random() * corners.length)];
    }
    
    if (moveCount === 1) {
      // Second move: if player took center, take corner; if corner, take center
      if (squares[4] === 'X') {
        const corners = [0, 2, 6, 8].filter(i => squares[i] === null);
        return corners[Math.floor(Math.random() * corners.length)];
      } else {
        return squares[4] === null ? 4 : null;
      }
    }
    
    return null;
  };

  const getBestMove = (squares, difficulty) => {
    const availableMoves = squares.map((square, index) => square === null ? index : null)
                                 .filter(val => val !== null);
    
    if (availableMoves.length === 0) return null;

    // For impossible difficulty, use perfect play with some strategic variety
    if (difficulty === 'impossible') {
      // Add some strategic opening variety
      const strategicMove = getStrategicMove(squares);
      if (strategicMove !== null && squares[strategicMove] === null) {
        return strategicMove;
      }

      // Use perfect minimax for all other moves
      let bestScore = -Infinity;
      let bestMove = null;

      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, 0, false);
          squares[i] = null;

          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }

      return bestMove;
    }
    
    // For other difficulties (not currently used, but ready for future)
    if (difficulty === 'hard') {
      // 90% perfect moves, 10% random
      if (Math.random() > 0.1) {
        return getBestMove(squares, 'impossible');
      } else {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    }
    
    if (difficulty === 'medium') {
      // 70% perfect moves, 30% random
      if (Math.random() > 0.3) {
        return getBestMove(squares, 'impossible');
      } else {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    }

    return availableMoves[0]; // fallback
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setGameCount(prev => prev + 1);
  };

  const resetAll = () => {
    resetGame();
    setScores({ player: 0, ai: 0, draws: 0 });
    setGameCount(0);
  };

  const Square = ({ value, onClick, index, isWinning }) => (
    <button
      className={`w-20 h-20 bg-gray-800/50 border-2 transition-all duration-300 text-3xl font-bold
        ${value === 'X' ? 'text-blue-400 border-blue-500/50' : 
          value === 'O' ? 'text-red-400 border-red-500/50' : 
          'border-gray-600 hover:border-blue-500/50'}
        ${!value && isPlayerTurn && !winner ? 'hover:bg-blue-500/10 cursor-pointer' : ''}
        ${isWinning ? 'bg-yellow-400/20 border-yellow-400' : ''}
        ${!isPlayerTurn && !winner && !value ? 'cursor-not-allowed opacity-50' : ''}
      `}
      onClick={onClick}
      disabled={!isPlayerTurn || winner || value}
    >
      {value}
    </button>
  );

  const getWinnerMessage = () => {
    if (winner === 'X') return '🎉 You Won! (Incredible!)';
    if (winner === 'O') return '🤖 AI Wins';
    if (winner === 'Draw') return '🤝 Draw Game';
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
          <h3 className="text-xl font-bold text-white font-inter">Perfect Tic-Tac-Toe</h3>
          <p className="text-gray-400 text-sm">Unbeatable AI Challenge</p>
        </div>
      </div>

      {/* AI Status */}
      {isAiThinking && (
        <div className="cyber-card p-4 mb-6">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="text-blue-500 animate-pulse" size={20} />
            <span className="text-blue-400 font-inter">AI Computing Perfect Move...</span>
            <Zap className="text-yellow-400 animate-pulse" size={16} />
          </div>
        </div>
      )}

      {/* Score Board */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center cyber-card p-4">
          <div className="text-blue-400 text-2xl font-bold font-mono">{scores.player}</div>
          <div className="text-gray-300 text-sm font-inter">You</div>
        </div>
        <div className="text-center cyber-card p-4">
          <div className="text-gray-400 text-2xl font-bold font-mono">{scores.draws}</div>
          <div className="text-gray-300 text-sm font-inter">Draws</div>
        </div>
        <div className="text-center cyber-card p-4">
          <div className="text-red-400 text-2xl font-bold font-mono">{scores.ai}</div>
          <div className="text-gray-300 text-sm font-inter">AI</div>
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
            {winner === 'X' && (
              <div className="text-green-400 text-sm">
                Congratulations! You beat the perfect AI! 🏆
              </div>
            )}
          </div>
        ) : (
          <div className="cyber-card p-4">
            <div className="text-lg text-gray-300 font-inter">
              {isPlayerTurn ? (
                <span className="text-blue-400 font-semibold">Your Turn (X)</span>
              ) : (
                <span className="text-red-400 font-semibold">AI Turn (O)</span>
              )}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Difficulty: <span className="text-red-400 font-semibold">IMPOSSIBLE</span>
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
            Games: <span className="font-mono text-white">{gameCount}</span> • 
            Win Rate: <span className="font-mono text-blue-400">
              {gameCount > 0 ? Math.round((scores.player / gameCount) * 100) : 0}%
            </span>
          </div>
          <div className="text-xs text-gray-500 font-inter">
            🎯 Challenge: Try to win or draw against perfect AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;