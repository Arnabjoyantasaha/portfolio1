import React, { useState } from 'react';
import { Gamepad2, Users, Heart } from 'lucide-react';
import TicTacToe from './TicTacToe';
import ChessGame from './ChessGame';

const GameSection = () => {
  const [activeGame, setActiveGame] = useState('tictactoe');

  return (
    <section id="game" className="section-padding bg-gradient-to-b from-black to-gray-900 relative">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-white mb-4 flex items-center justify-center">
            <Gamepad2 className="text-blue-500 mr-4" size={40} />
            Let's <span className="text-blue-400 ml-2">Play Together!</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-inter max-w-2xl mx-auto flex items-center justify-center">
            <Heart className="mr-2 text-red-400" size={20} />
            Interactive games to play together - come join me for some fun!
          </p>
        </div>

        {/* Game Selector */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveGame('tictactoe')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 font-inter ${
              activeGame === 'tictactoe'
                ? 'btn-primary'
                : 'btn-outline hover-lift'
            }`}
          >
            <Users size={18} />
            <span>Tic-Tac-Toe</span>
          </button>
          <button
            onClick={() => setActiveGame('chess')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 font-inter ${
              activeGame === 'chess'
                ? 'btn-primary'
                : 'btn-outline hover-lift'
            }`}
          >
            <Users size={18} />
            <span>Chess</span>
          </button>
        </div>

        {/* Game Description */}
        <div className="cyber-card p-6 max-w-2xl mx-auto mb-8">
          {activeGame === 'tictactoe' ? (
            <div>
              <h3 className="text-white font-bold mb-2 font-inter flex items-center justify-center">
                <Heart className="mr-2 text-red-400" size={16} />
                Tic-Tac-Toe Fun
              </h3>
              <p className="text-gray-400 text-sm font-inter">
                Classic game for two players! Take turns and try to get three in a row. Let's see who wins!
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-white font-bold mb-2 font-inter flex items-center justify-center">
                <Heart className="mr-2 text-red-400" size={16} />
                Chess Together
              </h3>
              <p className="text-gray-400 text-sm font-inter">
                The classic strategy game! White moves first, then we take turns. Let's play and have fun together!
              </p>
            </div>
          )}
        </div>

        {/* Game Container */}
        <div className="flex justify-center">
          {activeGame === 'tictactoe' ? <TicTacToe /> : <ChessGame />}
        </div>

        {/* Friendly Message */}
        <div className="mt-12 cyber-card p-6 max-w-lg mx-auto">
          <div className="text-center">
            <Heart className="mx-auto text-red-400 mb-3" size={24} />
            <h3 className="text-white font-bold mb-2 font-inter">Come Play With Me!</h3>
            <p className="text-gray-400 text-sm font-inter">
              I love playing games with visitors! Pick a game above and let's have some fun together. 
              No pressure - just good times! 🎮
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;