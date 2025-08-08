import React from 'react';
import { portfolioData } from '../data/mock';

const SkillsSection = () => {
  const { skills } = portfolioData;

  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <span className="text-blue-400 text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  const SkillCategory = ({ title, skills, delay = 0 }) => (
    <div 
      className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-white text-xl font-bold mb-6 text-center">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-blue-400">Skills</span> & Technologies
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <SkillCategory 
            title="Core Technologies"
            skills={skills.coreTechnologies}
            delay={0}
          />
          <SkillCategory 
            title="Frontend & Backend"
            skills={skills.frontendBackend}
            delay={200}
          />
          <SkillCategory 
            title="Database & DevOps"
            skills={skills.databaseDevops}
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;