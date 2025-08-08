import React from 'react';
import { Code, Database, Globe, Settings, Cpu, Brain } from 'lucide-react';
import { portfolioData } from '../data/mock';

const AboutSection = () => {
  const { personal, about } = portfolioData;

  const getIcon = (iconName) => {
    const icons = {
      code: Code,
      database: Database,
      globe: Globe,
      settings: Settings,
      cpu: Cpu,
      brain: Brain
    };
    const IconComponent = icons[iconName] || Code;
    return <IconComponent size={24} className="text-cyan-400 neon-text" />;
  };

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-black to-gray-900 cyber-grid relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-black text-white mb-6">
            <span className="neon-cyan">About</span> <span className="text-white">Me</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Code Terminal */}
          <div className="cyber-card p-8 font-mono">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-cyan-400 font-orbitron text-sm">terminal.js</span>
            </div>
            
            <div className="text-green-400 text-sm mb-4">
              user@system:~$ cat profile.json
            </div>
            
            <div className="text-sm leading-relaxed">
              <div className="text-gray-400 mb-2">// Student Profile</div>
              <div className="text-gray-300">
                <span className="text-cyan-400">const</span> <span className="text-yellow-400">student</span> = {'{'};
              </div>
              <div className="pl-6 mt-2 space-y-2">
                <div>
                  <span className="text-red-400">name:</span> <span className="text-green-400">"{personal.name}"</span>,
                </div>
                <div>
                  <span className="text-red-400">degree:</span> <span className="text-green-400">"{personal.degree}"</span>,
                </div>
                <div>
                  <span className="text-red-400">semester:</span> <span className="text-orange-400">{personal.semester}</span>,
                </div>
                <div>
                  <span className="text-red-400">university:</span> <span className="text-green-400">"{personal.university}"</span>,
                </div>
                <div>
                  <span className="text-red-400">passion:</span> <span className="text-green-400">"{personal.passion}"</span>,
                </div>
                <div>
                  <span className="text-red-400">status:</span> <span className="text-green-400">"{personal.status}"</span>,
                </div>
                <div>
                  <span className="text-red-400">mode:</span> <span className="text-purple-400">"CYBER_ENHANCED"</span>
                </div>
              </div>
              <div className="text-gray-300 mt-2">{'};'}</div>
              
              <div className="mt-4 text-green-400">
                <span className="animate-pulse">█</span> System loaded successfully
              </div>
            </div>
          </div>

          {/* Description & Skills Grid */}
          <div className="space-y-8">
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-orbitron font-bold text-cyan-400 mb-4 neon-text">
                System Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg font-rajdhani">
                {about.description}
              </p>
            </div>

            {/* Enhanced Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.areas.map((area, index) => (
                <div 
                  key={index}
                  className="cyber-card p-6 hover:scale-105 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {getIcon(area.icon)}
                    </div>
                    <div>
                      <h4 className="text-white font-orbitron font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {area.title}
                      </h4>
                      <p className="text-gray-400 text-sm font-rajdhani">
                        {area.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-lg transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;