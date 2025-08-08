import React, { useEffect, useState } from 'react';
import { ChevronDown, Terminal, Code2 } from 'lucide-react';
import { portfolioData } from '../data/mock';

const HeroSection = () => {
  const { hero } = portfolioData;
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = hero.greeting;
    let index = 0;
    
    const typeWriter = () => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        setTimeout(typeWriter, 150);
      } else {
        setIsTypingComplete(true);
      }
    };

    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, [hero.greeting]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden cyber-grid">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Matrix-style decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-cyan-400 font-mono text-xs animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.5 ? '01' : '10'}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Code snippet in corner */}
        <div className="absolute top-0 left-0 cyber-card p-6 font-mono text-sm max-w-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Terminal className="text-cyan-400" size={16} />
            <span className="text-cyan-400 font-orbitron">system.exe</span>
          </div>
          <div className="text-gray-400 mb-2">// Loading profile...</div>
          <div className="text-cyan-400">arnabjoyantasaha.js</div>
          <div className="text-purple-400 text-xs mt-2">CSE Student & Future Dev</div>
          <div className="text-gray-400 text-xs mt-1">
            Skills: <span className="text-green-400">JavaScript Python Java C++ React</span>
          </div>
          <div className="flex items-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs">ONLINE</span>
          </div>
        </div>

        {/* Main hero content */}
        <div className="mt-20">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-orbitron mb-8">
            <span className="inline-block neon-cyan">
              {displayedText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                |
              </span>
            </span>
          </h1>
          
          {isTypingComplete && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-rajdhani font-bold mb-8">
                <span className="neon-purple">CSE Student</span>
                <span className="text-white mx-4">&</span>
                <span className="neon-green">Future Software Developer</span>
              </h2>
              
              <div className="cyber-card max-w-4xl mx-auto p-8 mb-12">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Code2 className="text-cyan-400" size={24} />
                  <span className="text-cyan-400 font-orbitron text-xl">SYSTEM.STATUS</span>
                  <Code2 className="text-cyan-400" size={24} />
                </div>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-rajdhani">
                  <span className="text-cyan-400">Passionate about technology</span> with <span className="text-purple-400">3+ years</span> of coding experience.
                  <br />
                  Specializing in <span className="text-green-400">JavaScript | Python | Java | C++ | React</span>
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  {['JavaScript', 'Python', 'Java', 'C++', 'React'].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-mono"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="cyber-button p-3 rounded-full"
          >
            <ChevronDown className="text-cyan-400" size={32} />
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