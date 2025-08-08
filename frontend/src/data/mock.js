// Mock data for Arnab's portfolio
export const portfolioData = {
  personal: {
    name: "Arnab Joyanta Saha",
    title: "CSE Student & Developer",
    degree: "BSc in CSE",
    semester: 5,
    university: "Daffodil International University",
    passion: "Innovation",
    status: "Coding...",
    email: "arnabjoyantasaha@gmail.com",
    phone: "01873196162",
    location: "Uttara, Dhaka",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com"
  },
  
  about: {
    description: "I'm a dedicated Computer Science Engineering student at Daffodil International University with a passion for creating innovative solutions and exploring cutting-edge technologies. My expertise spans full-stack development, AI implementation, and system design. I combine technical proficiency with creative problem-solving to build scalable, user-centered applications.",
    areas: [
      {
        title: "Software Development",
        description: "Full-stack web development with modern frameworks",
        icon: "code"
      },
      {
        title: "Data Science",
        description: "Machine learning and data analysis",
        icon: "database"
      },
      {
        title: "Web Technologies", 
        description: "Frontend and backend web development",
        icon: "globe"
      },
      {
        title: "System Design",
        description: "Scalable architecture and distributed systems",
        icon: "settings"
      }
    ]
  },

  skills: {
    coreTechnologies: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 85 },
      { name: "Java", level: 80 },
      { name: "C++", level: 75 }
    ],
    frontendBackend: [
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Express.js", level: 80 },
      { name: "Tailwind CSS", level: 95 }
    ],
    databaseDevops: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 75 }
    ]
  },

  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/example/ecommerce",
      liveUrl: "https://example-ecommerce.com"
    },
    {
      id: 2,
      title: "AI Chat Application",
      description: "Real-time chat app with AI integration using OpenAI API",
      technologies: ["Next.js", "OpenAI", "Socket.io", "PostgreSQL"],
      githubUrl: "https://github.com/example/ai-chat",
      liveUrl: "https://example-chat.com"
    },
    {
      id: 3,
      title: "Task Management System",
      description: "Collaborative task management with real-time updates",
      technologies: ["React", "Firebase", "Material-UI"],
      githubUrl: "https://github.com/example/task-manager",
      liveUrl: "https://example-tasks.com"
    }
  ],

  hero: {
    greeting: "Hi, I'm Arnab",
    subtitle: "CSE Student & Future Software Developer",
    description: "Passionate about technology with 3+ years of coding skills in JavaScript | Python | Java | C++ | React"
  },

  contact: {
    title: "Get In Touch",
    subtitle: "I'm actively seeking opportunities in software development, full-stack engineering, and AI/ML roles. Let's discuss how I can contribute to your team's success!",
    codeSnippet: `// Let's connect!
function getInTouch() {
  return "Ready to collaborate!";
}`
  }
};