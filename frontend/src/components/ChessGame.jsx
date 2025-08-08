import React, { useState, useCallback } from 'react';
import { RotateCcw, Crown, Users, Heart } from 'lucide-react';

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
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });

  // Enhanced chess piece symbols with better visibility
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
        if (fromRow + direction >= 0 && fromRow + direction < 8 && board[fromRow + direction][fromCol] === null) {
          moves.push([fromRow + direction, fromCol]);
          
          // Initial two-square move
          if (fromRow === startRow && board[fromRow + 2 * direction][fromCol] === null) {
            moves.push([fromRow + 2 * direction, fromCol]);
          }
        }
        
        // Capture diagonally
        for (const colOffset of [-1, 1]) {
          const newCol = fromCol + colOffset;
          if (newCol >= 0 && newCol < 8 && fromRow + direction >= 0 && fromRow + direction < 8) {
            const targetPiece = board[fromRow + direction][newCol];
            if (targetPiece && isWhitePiece(targetPiece) !== isWhite) {
              moves.push([fromRow + direction, newCol]);
            }
          }
        }
        break;

      case 'r': // Rook
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

      case 'q': // Queen
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

  const makeMove = useCallback((board, from, to) => {
    const newBoard = board.map(row => [...row]);
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    
    return newBoard;
  }, []);

  const handleSquareClick = (row, col) => {
    if (gameStatus !== 'playing') return;

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = board[selectedRow][selectedCol];
      
      // Check if it's the current player's piece
      const isCurrentPlayerPiece = selectedPiece && 
        ((currentPlayer === 'white' && isWhitePiece(selectedPiece)) ||
         (currentPlayer === 'black' && isBlackPiece(selectedPiece)));
      
      if (!isCurrentPlayerPiece) {
        setSelectedSquare(null);
        return;
      }
      
      const validMoves = getValidMoves(board, selectedRow, selectedCol);
      
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const capturedPiece = board[row][col];
        if (capturedPiece) {
          if (currentPlayer === 'white') {
            setCapturedPieces(prev => ({
              ...prev,
              black: [...prev.black, capturedPiece]
            }));
          } else {
            setCapturedPieces(prev => ({
              ...prev,
              white: [...prev.white, capturedPiece]
            }));
          }
        }
        
        const newBoard = makeMove(board, selectedSquare, [row, col]);
        setBoard(newBoard);
        setMoveHistory(prev => [...prev, { from: selectedSquare, to: [row, col] }]);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
      
      setSelectedSquare(null);
    } else {
      const piece = board[row][col];
      if (piece && 
          ((currentPlayer === 'white' && isWhitePiece(piece)) ||
           (currentPlayer === 'black' && isBlackPiece(piece)))) {
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
    setCapturedPieces({ white: [], black: [] });
  };

  return (
    <div className="cyber-card p-8 max-w-2xl mx-auto">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Crown className="text-blue-500" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-inter">Let's Play Chess!</h3>
            <p className="text-gray-400 text-sm flex items-center">
              <Users size={14} className="mr-1" />
              2-Player Game
            </p>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="btn-primary px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm hover-lift"
        >
          <RotateCcw size={16} />
          <span>New Game</span>
        </button>
      </div>

      {/* Game Status */}
      <div className="text-center mb-6">
        <div className="cyber-card p-4">
          <div className="text-lg text-gray-300 font-inter mb-2">
            <Heart className="inline text-red-400 mr-2" size={16} />
            Current Turn: <span className={`font-semibold ${
              currentPlayer === 'white' ? 'text-blue-400' : 'text-purple-400'
            }`}>
              {currentPlayer === 'white' ? 'White Player' : 'Black Player'}
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            Move #{moveHistory.length + 1} • Click your pieces to play!
          </div>
        </div>
      </div>

      {/* Captured Pieces */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="cyber-card p-3">
          <div className="text-white text-sm font-inter mb-2">White Captured:</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.black.map((piece, index) => (
              <span key={index} className="text-lg">{pieceSymbols[piece]}</span>
            ))}
            {capturedPieces.black.length === 0 && (
              <span className="text-gray-500 text-xs">None yet</span>
            )}
          </div>
        </div>
        <div className="cyber-card p-3">
          <div className="text-white text-sm font-inter mb-2">Black Captured:</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.white.map((piece, index) => (
              <span key={index} className="text-lg">{pieceSymbols[piece]}</span>
            ))}
            {capturedPieces.white.length === 0 && (
              <span className="text-gray-500 text-xs">None yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Chess Board */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-8 gap-0.5">
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
                    w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-2xl sm:text-3xl cursor-pointer
                    transition-all duration-200 relative border-2
                    ${isLight ? 'bg-amber-100 border-amber-200' : 'bg-amber-800 border-amber-700'}
                    ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-60' : ''}
                    ${isValidMove ? 'ring-2 ring-green-400 ring-opacity-80' : ''}
                    hover:brightness-110 hover:scale-105
                  `}
                >
                  {piece && (
                    <span 
                      className={`text-3xl font-bold drop-shadow-lg ${
                        isWhitePiece(piece) 
                          ? 'text-white' 
                          : 'text-gray-900'
                      }`}
                      style={{
                        textShadow: isWhitePiece(piece) 
                          ? '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 1px rgba(0,0,0,0.8)' 
                          : '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 1px rgba(255,255,255,0.8)'
                      }}
                    >
                      {pieceSymbols[piece]}
                    </span>
                  )}
                  {isValidMove && !piece && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-400 rounded-full opacity-70 animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Game Instructions */}
      <div className="mt-6 cyber-card p-4">
        <div className="text-center">
          <div className="text-white text-sm font-inter mb-2">
            <Heart className="inline text-red-400 mr-1" size={14} />
            Play with me! Take turns moving pieces
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span>🟦 Selected</span>
            <span>🟢 Valid Move</span>
            <span>👥 2-Player Fun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;