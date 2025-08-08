import React from 'react';
import { Code, Heart, Terminal } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-blue-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="text-blue-500" size={24} />
              <span className="text-xl font-mono font-semibold text-white">
                <span className="text-blue-500">{'>'}</span>Arnab<span className="text-gray-400">{'/'}</span>
              </span>
            </div>
            <p className="text-gray-400 font-inter text-sm leading-relaxed">
              Computer Science Engineering student passionate about creating innovative software solutions 
              and exploring cutting-edge technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-inter">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {['About', 'Skills', 'Projects', 'Games', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-left text-sm font-inter"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-white font-bold mb-4 font-inter">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'Python', 'React', 'Node.js', 'Java'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 font-inter">
              <Code className="text-blue-500" size={16} />
              <span>© {currentYear} Arnab Joyanta Saha. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 font-inter">
              <span>Built with</span>
              <Heart className="text-red-400" size={16} fill="currentColor" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm font-inter">
              Designed for performance, built for the future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;