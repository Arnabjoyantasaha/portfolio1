import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/mock';
import { Zap, Code, Database } from 'lucide-react';

const SkillsSection = () => {
  const { skills } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const SkillBar = ({ skill, delay = 0, isVisible }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-300 font-rajdhani font-medium text-lg">
          {skill.name}
        </span>
        <span className="text-cyan-400 text-lg font-orbitron font-bold neon-text">
          {skill.level}%
        </span>
      </div>
      <div className="cyber-progress-bar rounded-full h-3">
        <div 
          className={`cyber-progress-fill h-full rounded-full transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        ></div>
      </div>
    </div>
  );

  const SkillCategory = ({ title, skills, delay = 0, icon: Icon }) => (
    <div 
      className="cyber-card p-8 hover:scale-105 transition-all duration-500 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center mb-8">
        <div className="p-4 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-cyan-400 neon-text" size={32} />
        </div>
        <h3 className="text-white text-2xl font-orbitron font-bold group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            delay={delay + (index * 200)}
            isVisible={isVisible}
          />
        ))}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-tr-full"></div>
    </div>
  );

  return (
    <section id="skills" className="py-32 bg-black cyber-grid relative" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-black text-white mb-6">
            <span className="neon-cyan">Skills</span> <span className="text-white">&</span> <span className="neon-purple">Technologies</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-xl font-rajdhani max-w-2xl mx-auto">
            Advanced proficiency in cutting-edge technologies and frameworks
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <SkillCategory 
            title="Core Technologies"
            skills={skills.coreTechnologies}
            delay={0}
            icon={Code}
          />
          <SkillCategory 
            title="Frontend & Backend"
            skills={skills.frontendBackend}
            delay={200}
            icon={Zap}
          />
          <SkillCategory 
            title="Database & DevOps"
            skills={skills.databaseDevops}
            delay={400}
            icon={Database}
          />
        </div>

        {/* Additional Tech Stack Display */}
        <div className="mt-20 text-center">
          <div className="cyber-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6 neon-text">
              Technology Arsenal
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'Docker', 'AWS', 'Git'].map((tech, index) => (
                <div
                  key={tech}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 border border-cyan-400/30 rounded-full hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-cyan-400 font-mono font-semibold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;