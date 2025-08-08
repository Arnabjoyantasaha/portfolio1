import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import TicTacToe from './TicTacToe';
import ChessGame from './ChessGame';

const GameSection = () => {
  const [activeGame, setActiveGame] = useState('tictactoe');

  return (
    <section id="game" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center">
            <Gamepad2 className="text-blue-400 mr-4" size={48} />
            <span className="text-blue-400">Game</span> Zone
          </h2>
          <p className="text-gray-300 text-xl">
            Challenge yourself with some interactive games!
          </p>
        </div>

        {/* Game Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveGame('tictactoe')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeGame === 'tictactoe'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Tic-Tac-Toe
          </button>
          <button
            onClick={() => setActiveGame('chess')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeGame === 'chess'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            AI Chess
          </button>
        </div>

        {/* Game Container */}
        <div className="flex justify-center">
          {activeGame === 'tictactoe' ? <TicTacToe /> : <ChessGame />}
        </div>
      </div>
    </section>
  );
};

export default GameSection;