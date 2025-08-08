import React, { useState } from 'react';
import { Gamepad2, Brain, Heart, Zap } from 'lucide-react';
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
            Come <span className="text-blue-400 ml-2">Play With Me!</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-inter max-w-2xl mx-auto flex items-center justify-center">
            <Heart className="mr-2 text-red-400" size={20} />
            Challenge my advanced AI in these fun games - I'll be your opponent!
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
            <Brain size={18} />
            <span>Tic-Tac-Toe AI</span>
          </button>
          <button
            onClick={() => setActiveGame('chess')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 font-inter ${
              activeGame === 'chess'
                ? 'btn-primary'
                : 'btn-outline hover-lift'
            }`}
          >
            <Brain size={18} />
            <span>Chess AI</span>
          </button>
        </div>

        {/* Game Description */}
        <div className="cyber-card p-6 max-w-2xl mx-auto mb-8">
          {activeGame === 'tictactoe' ? (
            <div>
              <h3 className="text-white font-bold mb-2 font-inter flex items-center justify-center">
                <Brain className="mr-2 text-blue-400" size={16} />
                Smart Tic-Tac-Toe AI
              </h3>
              <p className="text-gray-400 text-sm font-inter">
                I'm a strategic AI that uses the minimax algorithm. Try to beat me - I'll make optimal moves every time!
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-white font-bold mb-2 font-inter flex items-center justify-center">
                <Brain className="mr-2 text-blue-400" size={16} />
                Advanced Chess AI
              </h3>
              <p className="text-gray-400 text-sm font-inter">
                Challenge my advanced chess engine! I use deep minimax search with alpha-beta pruning and positional evaluation.
              </p>
            </div>
          )}
        </div>

        {/* Game Container */}
        <div className="flex justify-center">
          {activeGame === 'tictactoe' ? <TicTacToe /> : <ChessGame />}
        </div>

        {/* AI Challenge Message */}
        <div className="mt-12 cyber-card p-6 max-w-lg mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Brain className="text-blue-400 mr-2" size={24} />
              <Zap className="text-yellow-400" size={20} />
            </div>
            <h3 className="text-white font-bold mb-2 font-inter">Challenge My AI Brain!</h3>
            <p className="text-gray-400 text-sm font-inter">
              I've trained myself to be a worthy opponent. I'll analyze every move and play strategically. 
              Come test your skills against me - let's see who's smarter! 🧠🎮
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;