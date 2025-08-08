import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/mock';
import { Code, Server, Database } from 'lucide-react';

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
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-inter font-medium">
          {skill.name}
        </span>
        <span className="text-blue-400 text-sm font-mono">
          {skill.level}%
        </span>
      </div>
      <div className="cyber-progress-bar rounded-lg h-2">
        <div 
          className={`cyber-progress-fill h-full rounded-lg transition-all duration-1000 ease-out`}
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
      className="cyber-card p-6 hover-lift"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-500/10 rounded-lg mr-4">
          <Icon className="text-blue-500" size={24} />
        </div>
        <h3 className="text-white text-xl font-bold font-inter">
          {title}
        </h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            delay={delay + (index * 100)}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-padding bg-black relative" ref={sectionRef}>
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-white mb-4">
            Skills & <span className="text-blue-400">Technologies</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-inter max-w-2xl mx-auto">
            Technical proficiency across various programming languages and frameworks
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
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
            icon={Server}
          />
          <SkillCategory 
            title="Database & DevOps"
            skills={skills.databaseDevops}
            delay={400}
            icon={Database}
          />
        </div>

        {/* Technology Stack */}
        <div className="cyber-card p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-6 font-inter">
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {['React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'Java', 'C++', 'Git'].map((tech, index) => (
              <div
                key={tech}
                className="p-4 bg-gray-800/30 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-blue-400 font-mono text-sm font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;