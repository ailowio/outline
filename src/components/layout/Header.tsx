import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Datas', href: '#datas' },
    { label: 'Game', href: '#game' },
    { label: 'Quem Somos', href: '#about' },
    { label: 'Contato', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-md py-3 border-b border-outline-neon/20' : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="flex items-center overflow-hidden">
          <img 
            src="/Logo-v3.svg" 
            alt="Outline" 
            className="h-10 md:h-12 lg:h-14 w-auto object-contain"
            style={{ objectPosition: 'center' }}
          />
        </a>
        
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href} 
                className="relative text-xs uppercase tracking-widest font-bold text-gray-300 hover:text-outline-neon transition-all duration-300 group px-3 py-2"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-outline-neon/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-sm" />
                <span className="absolute bottom-0 left-0 right-0 h-px bg-outline-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </li>
          ))}
        </ul>

        <button 
          className="md:hidden text-outline-neon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-black border-b border-outline-neon/10"
        >
          <ul className="py-6 px-6 space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest font-bold text-gray-300 hover:text-outline-neon transition-colors duration-300 relative pl-4 border-l-2 border-transparent hover:border-outline-neon/40"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Header;

