import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-300">
            <Code className="text-blue-400" size={20} />
            <span>© {currentYear} Arnab Joyanta Saha</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-300 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="text-red-400" size={16} fill="currentColor" />
            <span>and lots of ☕</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Built with React, Tailwind CSS, and passion for clean code.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;