import React from 'react';
import { Code, Database, Globe, Settings } from 'lucide-react';
import { portfolioData } from '../data/mock';

const AboutSection = () => {
  const { personal, about } = portfolioData;

  const getIcon = (iconName) => {
    const icons = {
      code: Code,
      database: Database,
      globe: Globe,
      settings: Settings
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent size={24} className="text-blue-400" /> : null;
  };

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-blue-400">About</span> Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Code Block */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 font-mono text-sm">
            <div className="text-gray-400 mb-2">// Student Profile</div>
            <div className="text-gray-300">
              <span className="text-blue-400">const</span> <span className="text-yellow-400">student</span> = {'{'};
            
            </div>
            <div className="pl-4 mt-2">
              <div className="text-gray-300">
                <span className="text-red-400">name:</span> <span className="text-green-400">"{personal.name}"</span>,
              </div>
              <div className="text-gray-300">
                <span className="text-red-400">degree:</span> <span className="text-green-400">"{personal.degree}"</span>,
              </div>
              <div className="text-gray-300">
                <span className="text-red-400">semester:</span> <span className="text-orange-400">{personal.semester}</span>,
              </div>
              <div className="text-gray-300">
                <span className="text-red-400">university:</span> <span className="text-green-400">"{personal.university}"</span>,
              </div>
              <div className="text-gray-300">
                <span className="text-red-400">passion:</span> <span className="text-green-400">"{personal.passion}"</span>,
              </div>
              <div className="text-gray-300">
                <span className="text-red-400">status:</span> <span className="text-green-400">"{personal.status}"</span>
              </div>
            </div>
            <div className="text-gray-300 mt-2">{'};'}</div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              {about.description}
            </p>

            {/* Areas Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {about.areas.map((area, index) => (
                <div 
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    {getIcon(area.icon)}
                    <div>
                      <h3 className="text-white font-semibold mb-2">{area.title}</h3>
                      <p className="text-gray-400 text-sm">{area.description}</p>
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