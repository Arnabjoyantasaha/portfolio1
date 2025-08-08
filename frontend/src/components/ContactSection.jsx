import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Terminal } from 'lucide-react';
import { portfolioData } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const ContactSection = () => {
  const { personal, contact } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: null
    }
  ];

  const socialLinks = [
    { icon: Github, href: personal.githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: personal.linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, href: personal.twitterUrl, label: 'Twitter' }
  ];

  return (
    <section id="contact" className="section-padding bg-black relative">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-white mb-4">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-inter max-w-2xl mx-auto">
            Let's discuss opportunities and collaborate on exciting projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Terminal Contact */}
            <div className="cyber-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-blue-400 font-mono text-sm">connect.sh</span>
              </div>
              
              <div className="font-mono text-sm space-y-2">
                <div className="syntax-comment">// Contact Interface</div>
                <div className="text-green-400">$ npm run connect</div>
                <div className="text-blue-400">
                  <span className="syntax-keyword">function</span> <span className="syntax-function">getInTouch</span>() {'{'}
                </div>
                <div className="pl-4 text-green-400">
                  return <span className="syntax-string">"Ready to collaborate!"</span>;
                </div>
                <div className="text-blue-400">{'}'}</div>
                <div className="text-gray-400 mt-2">
                  Status: <span className="text-green-400">Available for opportunities</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="cyber-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-inter">
                Professional Interests
              </h3>
              <p className="text-gray-400 leading-relaxed font-inter">
                {contact.subtitle}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="cyber-card p-4 hover-lift">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <IconComponent className="text-blue-500" size={20} />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm font-inter">{item.label}</div>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-white hover:text-blue-400 transition-colors duration-300 font-inter"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-white font-inter">{item.value}</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-inter">
                Connect Online
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800/50 border border-blue-500/20 rounded-lg hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 hover-lift"
                      aria-label={social.label}
                    >
                      <IconComponent className="text-blue-400" size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="cyber-card p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Terminal className="text-blue-500" size={20} />
              <h3 className="text-xl font-bold text-white font-inter">
                Send Message
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white text-sm font-medium mb-2 font-inter">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full bg-gray-800/50 border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300 font-inter"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2 font-inter">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-gray-800/50 border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300 font-inter"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2 font-inter">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message or project details..."
                  rows={5}
                  className="w-full bg-gray-800/50 border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none font-inter"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-inter font-medium hover-lift"
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;