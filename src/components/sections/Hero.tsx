import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Imagem de Fundo do Quarteto */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.img
          src="/quarteto-street.png"
          alt="Outline - Quarteto"
          className="w-full h-full object-cover"
          style={{ objectPosition: '20% center' }}
          initial={{ scale: 1.1 }}
          animate={{ 
            scale: [1.1, 1.05, 1.1],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Overlay escuro para contraste */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Efeito de scan lines animado */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(57, 255, 20, 0.03) 2px,
              rgba(57, 255, 20, 0.03) 4px
            )`,
          }}
          animate={{
            y: [0, 100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Glow pulsante neon */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(57, 255, 20, 0.15) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Linhas neon animadas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-outline-neon/20"
              style={{
                top: `${20 + i * 30}%`,
                left: '-100%',
              }}
              animate={{
                left: ['-100%', '100%'],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-outline-neon text-xs font-bold tracking-[0.3em] uppercase mb-8 block"
        >
          Since 2021 • Fortaleza
        </motion.span>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10"
        >
          <div className="relative">
            <img 
              src="/logo.svg" 
              alt="Outline" 
              className="h-56 md:h-72 lg:h-96 2xl:h-[32rem] w-auto mx-auto relative z-10"
              style={{
                filter: 'drop-shadow(0 0 80px rgba(57,255,20,1)) drop-shadow(0 0 120px rgba(57,255,20,0.8)) drop-shadow(0 0 180px rgba(57,255,20,0.5))',
                textShadow: '0 0 60px rgba(57,255,20,1)',
              }}
            />
            {/* Outline neon animado */}
            <motion.div
              className="absolute inset-0 -z-0"
              style={{
                background: 'url("/logo.svg") no-repeat center',
                backgroundSize: 'contain',
                filter: 'blur(20px)',
                opacity: 0.8,
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-3xl text-gray-200 mb-12 max-w-2xl mx-auto font-light tracking-wide drop-shadow-lg"
        >
          CARISMA E SONORIDADE QUE SE ENCONTRAM.
        </motion.p>
      </motion.div>

      {/* Gradiente de transição suave para próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 via-black/70 to-black z-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-outline-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

