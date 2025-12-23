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
        isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-md py-3 border-b border-outline-neon/20' : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="Outline" 
            className="h-12 md:h-16 lg:h-20 w-auto"
          />
        </a>
        
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href} 
                className="text-xs uppercase tracking-widest font-bold hover:text-outline-neon transition-colors"
              >
                {item.label}
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
                  className="block text-sm uppercase tracking-widest font-bold hover:text-outline-neon"
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

