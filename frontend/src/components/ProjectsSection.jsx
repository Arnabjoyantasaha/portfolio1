import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/mock';

const ProjectsSection = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Some of the projects I've worked on that showcase my skills and passion for development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="p-6">
                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;