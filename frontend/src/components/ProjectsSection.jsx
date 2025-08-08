import React from 'react';
import { Github, ExternalLink, Code, Zap } from 'lucide-react';
import { portfolioData } from '../data/mock';

const ProjectsSection = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-gray-900 to-black relative">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-white mb-4">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-inter max-w-2xl mx-auto">
            A collection of projects showcasing technical skills and problem-solving abilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="cyber-card p-6 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Code className="text-blue-500" size={24} />
                </div>
                <div className="flex space-x-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    aria-label="View source code"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    aria-label="View live demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="mb-6">
                <h3 className="text-white text-lg font-bold font-inter mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-inter">
                  {project.description}
                </p>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md text-xs font-mono hover:bg-blue-500/20 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex space-x-4 pt-4 border-t border-gray-700">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-inter"
                >
                  <Github size={14} />
                  <span>Source</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-inter"
                >
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="cyber-card p-8 max-w-2xl mx-auto">
            <Zap className="text-blue-500 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2 font-inter">
              More Projects Coming Soon
            </h3>
            <p className="text-gray-400 font-inter">
              Currently working on several exciting projects involving AI, web development, and system design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;