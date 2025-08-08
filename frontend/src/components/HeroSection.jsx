import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/mock';

const HeroSection = () => {
  const { hero } = portfolioData;
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const text = hero.greeting;
    let index = 0;
    
    const typeWriter = () => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        setTimeout(typeWriter, 100);
      } else {
        setIsTypingComplete(true);
      }
    };

    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, [hero.greeting]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Code snippet in corner */}
        <div className="absolute top-0 left-0 bg-gray-800/50 rounded-lg p-4 font-mono text-xs text-gray-400 backdrop-blur-sm">
          <div>arnabjoyantasaha.js - 1 day ago</div>
          <div className="text-blue-400 mt-1">CSE Student & Future Software Developer</div>
          <div className="mt-1">
            Passionate in Teaching, 3 yrs Skills in:
          </div>
          <div className="text-yellow-400">JavaScript | Python | Java | C++ | React</div>
        </div>

        {/* Main hero text */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6">
            <span className="inline-block">
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          {isTypingComplete && (
            <div className="animate-fade-in-up">
              <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-400 font-semibold mb-6">
                {hero.subtitle}
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                {hero.description}
              </p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToAbout}
            className="text-gray-400 hover:text-white transition-colors duration-200 animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;