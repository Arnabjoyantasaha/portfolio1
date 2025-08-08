import React, { useEffect, useState } from 'react';
import { ChevronDown, Code, Terminal, User } from 'lucide-react';
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
        setTimeout(typeWriter, 120);
      } else {
        setIsTypingComplete(true);
      }
    };

    const timer = setTimeout(typeWriter, 800);
    return () => clearTimeout(timer);
  }, [hero.greeting]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative flex items-center justify-center overflow-hidden">
      {/* Professional grid background */}
      <div className="absolute inset-0 tech-grid opacity-50"></div>
      
      {/* Subtle background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Terminal window */}
        <div className="absolute top-8 left-8 cyber-card p-6 font-mono text-sm max-w-md hidden lg:block">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-blue-400">~/portfolio</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-green-400">$ whoami</div>
            <div className="text-gray-300">arnab-joyanta-saha</div>
            <div className="text-green-400">$ cat skills.txt</div>
            <div className="text-blue-400">JavaScript | Python | Java</div>
            <div className="text-blue-400">React | Node.js | C++</div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-400 text-xs">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono mb-8 text-white">
            <span className="inline-block">
              {displayedText}
              <span className="typing-cursor ml-1"></span>
            </span>
          </h1>
          
          {isTypingComplete && (
            <div className="animate-fade-in-up space-y-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-inter font-semibold text-gray-300">
                <span className="text-blue-400">Computer Science Engineering Student</span>
                <span className="text-gray-400 mx-3">|</span>
                <span className="text-purple-400">Software Developer</span>
              </h2>
              
              {/* Professional info card */}
              <div className="cyber-card max-w-4xl mx-auto p-8">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <User className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Profile</h3>
                      <p className="text-gray-400 text-sm">BSc Computer Science Engineering, 5th semester at Daffodil International University</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Code className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Expertise</h3>
                      <p className="text-gray-400 text-sm">Full-stack development, AI implementation, system design</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Terminal className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Tech Stack</h3>
                      <p className="text-gray-400 text-sm">JavaScript, Python, Java, React, Node.js, MongoDB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {['JavaScript', 'Python', 'Java', 'React', 'Node.js'].map((tech, index) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-800/50 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-mono hover:border-blue-500/40 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToAbout}
            className="cyber-button p-3 rounded-full hover:scale-110 transition-transform duration-300"
          >
            <ChevronDown className="text-blue-400" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;