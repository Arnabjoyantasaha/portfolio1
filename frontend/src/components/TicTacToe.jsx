import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Target, Brain, Heart, Zap } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player is X, AI is O
  const [winner, setWinner] = useState(null);
  const [gameCount, setGameCount] = useState(0);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });
  const [isAiThinking, setIsAiThinking] = useState(false);

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

  // Perfect AI move with minimax algorithm
  useEffect(() => {
    if (!isPlayerTurn && !winner && board.some(square => square === null)) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const bestMove = getBestAiMove(board);
        if (bestMove !== null) {
          const newBoard = board.slice();
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
        setIsAiThinking(false);
      }, 1200); // Thinking time for dramatic effect
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board]);

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

  // Perfect minimax algorithm - THE BEST AI POSSIBLE
  const minimax = (squares, depth, isMaximizing) => {
    const winner = calculateWinner(squares);
    
    // Base cases with depth consideration for optimal play
    if (winner === 'O') return 10 - depth; // AI wins (prefer quicker wins)
    if (winner === 'X') return depth - 10; // Player wins (delay losses)
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

  // Strategic opening moves for variety and strong play
  const getStrategicOpening = (squares) => {
    const moveCount = squares.filter(s => s !== null).length;
    
    // First move: Always take center or corner for optimal play
    if (moveCount === 0) {
      return 4; // Center is best first move
    }
    
    // Second move: Strategic responses
    if (moveCount === 1) {
      // If player took center, take corner
      if (squares[4] === 'X') {
        const corners = [0, 2, 6, 8].filter(i => squares[i] === null);
        return corners[0]; // Take any corner
      }
      // If player took corner, take center
      else if ([0, 2, 6, 8].some(i => squares[i] === 'X')) {
        return squares[4] === null ? 4 : null;
      }
      // If player took edge, take center
      else {
        return squares[4] === null ? 4 : null;
      }
    }
    
    return null;
  };

  const getBestAiMove = (squares) => {
    const availableMoves = squares.map((square, index) => square === null ? index : null)
                                 .filter(val => val !== null);
    
    if (availableMoves.length === 0) return null;

    // Use strategic opening for first few moves
    const strategicMove = getStrategicOpening(squares);
    if (strategicMove !== null && squares[strategicMove] === null) {
      return strategicMove;
    }

    // Use perfect minimax for all other positions
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

    return bestMove !== null ? bestMove : availableMoves[0];
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn || isAiThinking) return;

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

  const Square = ({ value, onClick, index }) => (
    <button
      className={`w-20 h-20 bg-gray-800/50 border-2 transition-all duration-300 text-3xl font-bold
        ${value === 'X' ? 'text-blue-400 border-blue-500/50' : 
          value === 'O' ? 'text-red-400 border-red-500/50' : 
          'border-gray-600 hover:border-blue-500/50'}
        ${!value && isPlayerTurn && !winner && !isAiThinking ? 'hover:bg-blue-500/10 cursor-pointer' : ''}
        ${(!isPlayerTurn || winner || isAiThinking) && !value ? 'cursor-not-allowed opacity-50' : ''}
      `}
      onClick={onClick}
      disabled={!isPlayerTurn || winner || value || isAiThinking}
    >
      {value}
    </button>
  );

  const getWinnerMessage = () => {
    if (winner === 'X') return '🎉 You Won! Amazing!';
    if (winner === 'O') return '🤖 I Won This Time!';
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
          <h3 className="text-xl font-bold text-white font-inter flex items-center">
            <Heart className="mr-2 text-red-400" size={18} />
            Play Tic-Tac-Toe With Me!
          </h3>
          <p className="text-gray-400 text-sm">You vs Smart AI</p>
        </div>
      </div>

      {/* AI Thinking Status */}
      {isAiThinking && (
        <div className="cyber-card p-4 mb-6">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="text-blue-500 animate-pulse" size={20} />
            <span className="text-blue-400 font-inter">I'm thinking of my move...</span>
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
          <div className="text-gray-300 text-sm font-inter">Me (AI)</div>
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
                Wow! You beat me! Great job! 🏆
              </div>
            )}
            {winner === 'O' && (
              <div className="text-blue-400 text-sm">
                Good game! Want to try again? 😊
              </div>
            )}
          </div>
        ) : (
          <div className="cyber-card p-4">
            <div className="text-lg text-gray-300 font-inter">
              {isPlayerTurn ? (
                <span className="text-blue-400 font-semibold flex items-center justify-center">
                  <Heart className="mr-2 text-red-400" size={16} />
                  Your Turn (X)
                </span>
              ) : (
                <span className="text-red-400 font-semibold">My Turn (O)</span>
              )}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Click any empty square to play!
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
          <div className="text-xs text-gray-500 font-inter flex items-center justify-center">
            <Heart className="mr-1 text-red-400" size={12} />
            I'm a smart AI - try to beat me! 😊
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;