import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, Brain } from 'lucide-react';

const ChessGame = () => {
  // Initial chess board setup
  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');
  const [moveHistory, setMoveHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  // Chess piece symbols
  const pieceSymbols = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };

  // Check if a piece is white or black
  const isWhitePiece = (piece) => piece && piece === piece.toUpperCase();
  const isBlackPiece = (piece) => piece && piece === piece.toLowerCase();

  // Get all valid moves for a piece
  const getValidMoves = useCallback((board, fromRow, fromCol) => {
    const piece = board[fromRow][fromCol];
    if (!piece) return [];

    const moves = [];
    const isWhite = isWhitePiece(piece);
    const pieceLower = piece.toLowerCase();

    switch (pieceLower) {
      case 'p': // Pawn
        const direction = isWhite ? -1 : 1;
        const startRow = isWhite ? 6 : 1;
        
        // Move forward
        if (board[fromRow + direction] && board[fromRow + direction][fromCol] === null) {
          moves.push([fromRow + direction, fromCol]);
          
          // Initial two-square move
          if (fromRow === startRow && board[fromRow + 2 * direction][fromCol] === null) {
            moves.push([fromRow + 2 * direction, fromCol]);
          }
        }
        
        // Capture diagonally
        for (const colOffset of [-1, 1]) {
          const newCol = fromCol + colOffset;
          if (newCol >= 0 && newCol < 8) {
            const targetPiece = board[fromRow + direction][newCol];
            if (targetPiece && isWhitePiece(targetPiece) !== isWhite) {
              moves.push([fromRow + direction, newCol]);
            }
          }
        }
        break;

      case 'r': // Rook
        // Horizontal and vertical moves
        for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          for (let i = 1; i < 8; i++) {
            const newRow = fromRow + dr * i;
            const newCol = fromCol + dc * i;
            
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const targetPiece = board[newRow][newCol];
            if (targetPiece === null) {
              moves.push([newRow, newCol]);
            } else {
              if (isWhitePiece(targetPiece) !== isWhite) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;

      case 'n': // Knight
        const knightMoves = [[-2,-1], [-2,1], [-1,-2], [-1,2], [1,-2], [1,2], [2,-1], [2,1]];
        for (const [dr, dc] of knightMoves) {
          const newRow = fromRow + dr;
          const newCol = fromCol + dc;
          
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (targetPiece === null || isWhitePiece(targetPiece) !== isWhite) {
              moves.push([newRow, newCol]);
            }
          }
        }
        break;

      case 'b': // Bishop
        // Diagonal moves
        for (const [dr, dc] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
          for (let i = 1; i < 8; i++) {
            const newRow = fromRow + dr * i;
            const newCol = fromCol + dc * i;
            
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const targetPiece = board[newRow][newCol];
            if (targetPiece === null) {
              moves.push([newRow, newCol]);
            } else {
              if (isWhitePiece(targetPiece) !== isWhite) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;

      case 'q': // Queen (combination of rook and bishop)
        for (const [dr, dc] of [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]]) {
          for (let i = 1; i < 8; i++) {
            const newRow = fromRow + dr * i;
            const newCol = fromCol + dc * i;
            
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const targetPiece = board[newRow][newCol];
            if (targetPiece === null) {
              moves.push([newRow, newCol]);
            } else {
              if (isWhitePiece(targetPiece) !== isWhite) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;

      case 'k': // King
        for (const [dr, dc] of [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]]) {
          const newRow = fromRow + dr;
          const newCol = fromCol + dc;
          
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (targetPiece === null || isWhitePiece(targetPiece) !== isWhite) {
              moves.push([newRow, newCol]);
            }
          }
        }
        break;
    }

    return moves;
  }, []);

  // Simple AI using minimax algorithm (simplified version)
  const evaluateBoard = useCallback((board) => {
    const pieceValues = {
      'p': -1, 'r': -5, 'n': -3, 'b': -3, 'q': -9, 'k': -200,
      'P': 1, 'R': 5, 'N': 3, 'B': 3, 'Q': 9, 'K': 200
    };
    
    let score = 0;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece) {
          score += pieceValues[piece];
        }
      }
    }
    return score;
  }, []);

  const getAllValidMovesForPlayer = useCallback((board, isWhite) => {
    const moves = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && isWhitePiece(piece) === isWhite) {
          const validMoves = getValidMoves(board, row, col);
          for (const [toRow, toCol] of validMoves) {
            moves.push({ from: [row, col], to: [toRow, toCol] });
          }
        }
      }
    }
    return moves;
  }, [getValidMoves]);

  const makeMove = useCallback((board, from, to) => {
    const newBoard = board.map(row => [...row]);
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    
    return newBoard;
  }, []);

  const minimax = useCallback((board, depth, isMaximizing, alpha, beta) => {
    if (depth === 0) {
      return evaluateBoard(board);
    }

    const moves = getAllValidMovesForPlayer(board, !isMaximizing);
    
    if (moves.length === 0) {
      return isMaximizing ? -1000 : 1000;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves.slice(0, 10)) { // Limit moves for performance
        const newBoard = makeMove(board, move.from, move.to);
        const eval_ = minimax(newBoard, depth - 1, false, alpha, beta);
        maxEval = Math.max(maxEval, eval_);
        alpha = Math.max(alpha, eval_);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves.slice(0, 10)) { // Limit moves for performance
        const newBoard = makeMove(board, move.from, move.to);
        const eval_ = minimax(newBoard, depth - 1, true, alpha, beta);
        minEval = Math.min(minEval, eval_);
        beta = Math.min(beta, eval_);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [evaluateBoard, getAllValidMovesForPlayer, makeMove]);

  const getBestMove = useCallback((board) => {
    const moves = getAllValidMovesForPlayer(board, false); // AI plays black
    let bestMove = null;
    let bestValue = Infinity;

    for (const move of moves.slice(0, 15)) { // Limit for performance
      const newBoard = makeMove(board, move.from, move.to);
      const moveValue = minimax(newBoard, 2, true, -Infinity, Infinity);
      
      if (moveValue < bestValue) {
        bestValue = moveValue;
        bestMove = move;
      }
    }

    return bestMove;
  }, [getAllValidMovesForPlayer, makeMove, minimax]);

  // Handle AI move
  useEffect(() => {
    if (currentPlayer === 'black' && gameStatus === 'playing') {
      setIsThinking(true);
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove) {
          const newBoard = makeMove(board, bestMove.from, bestMove.to);
          setBoard(newBoard);
          setMoveHistory(prev => [...prev, bestMove]);
          setCurrentPlayer('white');
        }
        setIsThinking(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus, board, getBestMove, makeMove]);

  const handleSquareClick = (row, col) => {
    if (currentPlayer !== 'white' || gameStatus !== 'playing') return;

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const validMoves = getValidMoves(board, selectedRow, selectedCol);
      
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        // Make the move
        const newBoard = makeMove(board, selectedSquare, [row, col]);
        setBoard(newBoard);
        setMoveHistory(prev => [...prev, { from: selectedSquare, to: [row, col] }]);
        setCurrentPlayer('black');
      }
      
      setSelectedSquare(null);
    } else {
      const piece = board[row][col];
      if (piece && isWhitePiece(piece) && currentPlayer === 'white') {
        setSelectedSquare([row, col]);
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('white');
    setSelectedSquare(null);
    setGameStatus('playing');
    setMoveHistory([]);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="text-blue-400" size={24} />
          <h3 className="text-2xl font-bold text-white">AI Chess</h3>
        </div>
        
        <button
          onClick={resetGame}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <RotateCcw size={16} />
          <span>New Game</span>
        </button>
      </div>

      {/* Game Status */}
      <div className="text-center mb-6">
        {isThinking ? (
          <div className="flex items-center justify-center space-x-2">
            <Brain className="text-blue-400 animate-pulse" size={20} />
            <span className="text-blue-400 text-lg">AI is thinking...</span>
          </div>
        ) : (
          <div className="text-xl text-gray-300">
            {currentPlayer === 'white' ? 'Your turn (White)' : 'AI turn (Black)'}
          </div>
        )}
      </div>

      {/* Chess Board */}
      <div className="grid grid-cols-8 gap-1 bg-gray-700 p-4 rounded-lg mx-auto max-w-md">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex;
            const isValidMove = selectedSquare && 
              getValidMoves(board, selectedSquare[0], selectedSquare[1])
                .some(([r, c]) => r === rowIndex && c === colIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                className={`
                  w-12 h-12 flex items-center justify-center text-2xl cursor-pointer
                  transition-all duration-200 relative
                  ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                  ${isSelected ? 'ring-4 ring-blue-400' : ''}
                  ${isValidMove ? 'ring-2 ring-green-400' : ''}
                  hover:brightness-110
                `}
              >
                {piece && (
                  <span className={`text-2xl ${isWhitePiece(piece) ? 'text-white' : 'text-black'}`}>
                    {pieceSymbols[piece]}
                  </span>
                )}
                {isValidMove && !piece && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Coordinates */}
      <div className="flex justify-center mt-2">
        <div className="text-gray-400 text-sm">
          Click to select pieces (White) • AI plays Black
        </div>
      </div>

      {/* Move Count */}
      <div className="text-center mt-4">
        <div className="text-gray-400 text-sm">
          Moves played: {moveHistory.length}
        </div>
      </div>
    </div>
  );
};

export default ChessGame;