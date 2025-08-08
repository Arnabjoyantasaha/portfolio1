import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
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
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
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
    { icon: Github, href: personal.githubUrl },
    { icon: Linkedin, href: personal.linkedinUrl },
    { icon: Twitter, href: personal.twitterUrl }
  ];

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Code block and info */}
          <div className="space-y-8">
            {/* Code Block */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 font-mono text-sm">
              <div className="text-gray-400 mb-2">// Let's connect!</div>
              <div className="text-blue-400">function</div>
              <div className="text-yellow-400 ml-2">getInTouch</div>
              <div className="text-white">() {'{'}</div>
              <div className="text-white ml-4">
                <span className="text-blue-400">return</span> <span className="text-green-400">"Ready to collaborate!"</span>;
              </div>
              <div className="text-white">{'}'}</div>
            </div>

            <div className="text-gray-300 leading-relaxed text-lg">
              {contact.subtitle}
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <IconComponent className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{item.label}</div>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-white hover:text-blue-400 transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white">{item.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <IconComponent className="text-gray-300 hover:text-blue-400 transition-colors duration-200" size={24} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or just say hi!"
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>{isSubmitting ? 'Sending...' : './send_message.sh'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;