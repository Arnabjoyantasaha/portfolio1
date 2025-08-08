import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Brain, Crown, Zap } from 'lucide-react';

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
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [gamePhase, setGamePhase] = useState('opening'); // opening, middlegame, endgame

  // Enhanced chess piece symbols with better visibility
  const pieceSymbols = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };

  // Professional piece values for evaluation
  const pieceValues = {
    'p': -100, 'r': -500, 'n': -320, 'b': -330, 'q': -900, 'k': -20000,
    'P': 100, 'R': 500, 'N': 320, 'B': 330, 'Q': 900, 'K': 20000
  };

  // Piece-Square Tables for positional evaluation
  const pawnTable = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ];

  const knightTable = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ];

  const bishopTable = [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
  ];

  const rookTable = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
  ];

  const queenTable = [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
  ];

  const kingMiddleGameTable = [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
  ];

  // Check if a piece is white or black
  const isWhitePiece = (piece) => piece && piece === piece.toUpperCase();
  const isBlackPiece = (piece) => piece && piece === piece.toLowerCase();

  // Enhanced position evaluation with piece-square tables
  const evaluatePosition = useCallback((board) => {
    let score = 0;
    let whiteKingPos = null;
    let blackKingPos = null;
    let materialCount = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece) {
          materialCount++;
          score += pieceValues[piece];

          // Add positional bonuses
          const isWhite = isWhitePiece(piece);
          const adjustedRow = isWhite ? 7 - row : row;
          
          switch (piece.toLowerCase()) {
            case 'p':
              score += isWhite ? pawnTable[adjustedRow][col] : -pawnTable[adjustedRow][col];
              break;
            case 'n':
              score += isWhite ? knightTable[adjustedRow][col] : -knightTable[adjustedRow][col];
              break;
            case 'b':
              score += isWhite ? bishopTable[adjustedRow][col] : -bishopTable[adjustedRow][col];
              break;
            case 'r':
              score += isWhite ? rookTable[adjustedRow][col] : -rookTable[adjustedRow][col];
              break;
            case 'q':
              score += isWhite ? queenTable[adjustedRow][col] : -queenTable[adjustedRow][col];
              break;
            case 'k':
              if (isWhite) {
                whiteKingPos = [row, col];
                score += kingMiddleGameTable[adjustedRow][col];
              } else {
                blackKingPos = [row, col];
                score -= kingMiddleGameTable[adjustedRow][col];
              }
              break;
          }
        }
      }
    }

    // Endgame adjustments
    if (materialCount < 16) {
      setGamePhase('endgame');
      // In endgame, centralize king
      if (whiteKingPos) {
        const centerDistance = Math.abs(whiteKingPos[0] - 3.5) + Math.abs(whiteKingPos[1] - 3.5);
        score -= centerDistance * 10;
      }
      if (blackKingPos) {
        const centerDistance = Math.abs(blackKingPos[0] - 3.5) + Math.abs(blackKingPos[1] - 3.5);
        score += centerDistance * 10;
      }
    }

    return score;
  }, []);

  // Get all valid moves for a piece with enhanced logic
  const getValidMoves = useCallback((board, fromRow, fromCol) => {
    const piece = board[fromRow][fromCol];
    if (!piece) return [];

    const moves = [];
    const isWhite = isWhitePiece(piece);
    const pieceLower = piece.toLowerCase();

    switch (pieceLower) {
      case 'p': // Enhanced pawn logic
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

  // Check if king is in check
  const isKingInCheck = useCallback((board, isWhiteKing) => {
    let kingPos = null;
    
    // Find the king
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.toLowerCase() === 'k' && isWhitePiece(piece) === isWhiteKing) {
          kingPos = [row, col];
          break;
        }
      }
      if (kingPos) break;
    }
    
    if (!kingPos) return false;
    
    // Check if any opponent piece can attack the king
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && isWhitePiece(piece) !== isWhiteKing) {
          const moves = getValidMoves(board, row, col);
          if (moves.some(([r, c]) => r === kingPos[0] && c === kingPos[1])) {
            return true;
          }
        }
      }
    }
    
    return false;
  }, [getValidMoves]);

  const getAllValidMovesForPlayer = useCallback((board, isWhite) => {
    const moves = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && isWhitePiece(piece) === isWhite) {
          const validMoves = getValidMoves(board, row, col);
          for (const [toRow, toCol] of validMoves) {
            // Check if move doesn't put own king in check
            const newBoard = makeMove(board, [row, col], [toRow, toCol]);
            if (!isKingInCheck(newBoard, isWhite)) {
              moves.push({ from: [row, col], to: [toRow, toCol], piece });
            }
          }
        }
      }
    }
    return moves;
  }, [getValidMoves, isKingInCheck]);

  const makeMove = useCallback((board, from, to) => {
    const newBoard = board.map(row => [...row]);
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    
    const capturedPiece = newBoard[toRow][toCol];
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    
    return newBoard;
  }, []);

  // Enhanced minimax with alpha-beta pruning and deeper search
  const minimax = useCallback((board, depth, isMaximizing, alpha, beta) => {
    if (depth === 0) {
      return evaluatePosition(board);
    }

    const moves = getAllValidMovesForPlayer(board, !isMaximizing);
    
    if (moves.length === 0) {
      // Check if it's checkmate or stalemate
      const inCheck = isKingInCheck(board, !isMaximizing);
      if (inCheck) {
        return isMaximizing ? -10000 + (5 - depth) : 10000 - (5 - depth);
      }
      return 0; // Stalemate
    }

    // Sort moves for better alpha-beta pruning
    moves.sort((a, b) => {
      const aCapture = board[a.to[0]][a.to[1]] !== null;
      const bCapture = board[b.to[0]][b.to[1]] !== null;
      if (aCapture && !bCapture) return -1;
      if (!aCapture && bCapture) return 1;
      return 0;
    });

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < Math.min(moves.length, 25); i++) {
        const move = moves[i];
        const newBoard = makeMove(board, move.from, move.to);
        const eval_ = minimax(newBoard, depth - 1, false, alpha, beta);
        maxEval = Math.max(maxEval, eval_);
        alpha = Math.max(alpha, eval_);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < Math.min(moves.length, 25); i++) {
        const move = moves[i];
        const newBoard = makeMove(board, move.from, move.to);
        const eval_ = minimax(newBoard, depth - 1, true, alpha, beta);
        minEval = Math.min(minEval, eval_);
        beta = Math.min(beta, eval_);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [evaluatePosition, getAllValidMovesForPlayer, makeMove, isKingInCheck]);

  // Advanced AI move selection
  const getBestMove = useCallback((board) => {
    const moves = getAllValidMovesForPlayer(board, false);
    
    if (moves.length === 0) return null;

    let bestMove = null;
    let bestValue = Infinity;
    const depth = gamePhase === 'endgame' ? 5 : 4; // Deeper search in endgame

    // Opening book for early game
    if (moveHistory.length < 6) {
      const openingMoves = moves.filter(move => {
        const piece = move.piece.toLowerCase();
        const [toRow, toCol] = move.to;
        
        // Prioritize center control and piece development
        if (piece === 'p' && (toCol === 3 || toCol === 4) && toRow === 4) return true; // Central pawns
        if (piece === 'n' && ((toRow === 5 && (toCol === 2 || toCol === 5)) || (toRow === 2 && (toCol === 2 || toCol === 5)))) return true; // Knight development
        if (piece === 'b' && (toRow === 4 || toRow === 3) && Math.abs(toCol - 3.5) <= 2) return true; // Bishop development
        
        return false;
      });
      
      if (openingMoves.length > 0) {
        return openingMoves[Math.floor(Math.random() * openingMoves.length)];
      }
    }

    // Evaluate all moves with enhanced algorithm
    for (const move of moves.slice(0, 30)) {
      const newBoard = makeMove(board, move.from, move.to);
      let moveValue = minimax(newBoard, depth, true, -Infinity, Infinity);
      
      // Add tactical bonuses
      const capturedPiece = board[move.to[0]][move.to[1]];
      if (capturedPiece) {
        moveValue -= Math.abs(pieceValues[capturedPiece]) * 0.1; // Capture bonus
      }
      
      // Check for threats
      const threats = getAllValidMovesForPlayer(newBoard, true).filter(m => 
        newBoard[m.to[0]][m.to[1]] && !isWhitePiece(newBoard[m.to[0]][m.to[1]])
      );
      moveValue += threats.length * 10;
      
      if (moveValue < bestValue) {
        bestValue = moveValue;
        bestMove = move;
      }
    }

    return bestMove;
  }, [getAllValidMovesForPlayer, makeMove, minimax, gamePhase, moveHistory]);

  // Handle AI move with enhanced processing
  useEffect(() => {
    if (currentPlayer === 'black' && gameStatus === 'playing') {
      setIsThinking(true);
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove) {
          const capturedPiece = board[bestMove.to[0]][bestMove.to[1]];
          if (capturedPiece) {
            setCapturedPieces(prev => ({
              ...prev,
              white: [...prev.white, capturedPiece]
            }));
          }
          
          const newBoard = makeMove(board, bestMove.from, bestMove.to);
          setBoard(newBoard);
          setMoveHistory(prev => [...prev, bestMove]);
          setCurrentPlayer('white');
        }
        setIsThinking(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus, board, getBestMove, makeMove]);

  const handleSquareClick = (row, col) => {
    if (currentPlayer !== 'white' || gameStatus !== 'playing') return;

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const validMoves = getValidMoves(board, selectedRow, selectedCol);
      
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const capturedPiece = board[row][col];
        if (capturedPiece) {
          setCapturedPieces(prev => ({
            ...prev,
            black: [...prev.black, capturedPiece]
          }));
        }
        
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
    setCapturedPieces({ white: [], black: [] });
    setGamePhase('opening');
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
            <h3 className="text-xl font-bold text-white font-inter">Professional Chess</h3>
            <p className="text-gray-400 text-sm">Advanced AI Opponent</p>
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
        {isThinking ? (
          <div className="flex items-center justify-center space-x-3 cyber-card p-4">
            <Brain className="text-blue-500 animate-pulse" size={20} />
            <div>
              <div className="text-blue-400 text-lg font-inter font-medium">AI Computing...</div>
              <div className="text-gray-400 text-sm">Analyzing {gamePhase} position</div>
            </div>
            <Zap className="text-yellow-400 animate-pulse" size={16} />
          </div>
        ) : (
          <div className="cyber-card p-4">
            <div className="text-lg text-gray-300 font-inter">
              {currentPlayer === 'white' ? 
                <span className="text-blue-400 font-semibold">Your Turn (White)</span> : 
                <span className="text-purple-400 font-semibold">AI Turn (Black)</span>
              }
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Game Phase: <span className="text-blue-400 capitalize">{gamePhase}</span> • 
              Moves: <span className="font-mono">{moveHistory.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Captured Pieces */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="cyber-card p-3">
          <div className="text-white text-sm font-inter mb-2">Captured by You:</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.black.map((piece, index) => (
              <span key={index} className="text-lg">{pieceSymbols[piece]}</span>
            ))}
          </div>
        </div>
        <div className="cyber-card p-3">
          <div className="text-white text-sm font-inter mb-2">Captured by AI:</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.white.map((piece, index) => (
              <span key={index} className="text-lg">{pieceSymbols[piece]}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Chess Board */}
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
            Click pieces to select • Green dots show valid moves
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span>🟦 Selected Piece</span>
            <span>🟢 Valid Move</span>
            <span>⚡ AI Difficulty: Expert</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;