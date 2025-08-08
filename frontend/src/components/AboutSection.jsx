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
    return <IconComponent size={20} className="text-blue-500" />;
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-black to-gray-900 relative">
      <div className="absolute inset-0 tech-grid opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-white mb-4">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Code Editor */}
          <div className="cyber-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-blue-400 font-mono text-sm">profile.json</span>
            </div>
            
            <div className="font-mono text-sm">
              <div className="syntax-comment mb-2">// Developer Profile</div>
              <div className="text-gray-300">
                <span className="syntax-keyword">const</span> <span className="syntax-function">developer</span> = {'{'}
              </div>
              <div className="pl-4 mt-2 space-y-1">
                <div>
                  <span className="syntax-property">name:</span> <span className="syntax-string">"{personal.name}"</span>,
                </div>
                <div>
                  <span className="syntax-property">role:</span> <span className="syntax-string">"Software Developer"</span>,
                </div>
                <div>
                  <span className="syntax-property">education:</span> <span className="syntax-string">"{personal.degree}"</span>,
                </div>
                <div>
                  <span className="syntax-property">university:</span> <span className="syntax-string">"{personal.university}"</span>,
                </div>
                <div>
                  <span className="syntax-property">semester:</span> <span className="syntax-number">{personal.semester}</span>,
                </div>
                <div>
                  <span className="syntax-property">status:</span> <span className="syntax-string">"Available for opportunities"</span>,
                </div>
                <div>
                  <span className="syntax-property">location:</span> <span className="syntax-string">"{personal.location}"</span>
                </div>
              </div>
              <div className="text-gray-300 mt-2">{'};'}</div>
            </div>
          </div>

          {/* Description & Expertise */}
          <div className="space-y-6">
            <div className="cyber-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Code className="text-blue-500 mr-2" size={20} />
                Professional Summary
              </h3>
              <p className="text-gray-300 leading-relaxed font-inter">
                {about.description}
              </p>
            </div>

            {/* Expertise Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.areas.map((area, index) => (
                <div 
                  key={index}
                  className="cyber-card p-4 hover-lift group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                      {getIcon(area.icon)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {area.title}
                      </h4>
                      <p className="text-gray-400 text-xs font-inter">
                        {area.description}
                      </p>
                    </div>
                  </div>
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