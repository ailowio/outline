import React from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Dates from './components/sections/Dates'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import SnakeGame from './components/game/SnakeGame'

function App() {
  return (
    <div className="min-h-screen bg-outline-black text-white selection:bg-outline-neon selection:text-black font-sans">
      <Header />
      
      <main>
        <Hero />
        
        <section id="game" className="min-h-screen py-32 flex flex-col items-center justify-center bg-black relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/80 to-transparent" />
          
          <div className="z-10 text-center mb-12 w-full">
            <h2 className="text-5xl md:text-7xl font-black text-neon tracking-tighter italic leading-none mb-4">
              OUTLINE SNAKE
            </h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] font-bold text-xs mb-8">
              "A VERSÃO ERRADA" • COMA E CRESÇA
            </p>
            
            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
              <a 
                href="#game" 
                className="px-10 py-3 bg-outline-neon text-black font-black rounded-sm hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(57,255,20,0.5)] text-sm md:text-base"
              >
                JOGAR AGORA
              </a>
              <a 
                href="#datas" 
                className="px-10 py-3 border-2 border-outline-neon text-outline-neon font-black rounded-sm hover:bg-outline-neon hover:text-black transition-all transform hover:-translate-y-1 text-sm md:text-base"
              >
                VER DATAS
              </a>
            </div>
          </div>

          <SnakeGame />
        </section>

        <Dates />
        <About />
      </main>

      <Contact />
    </div>
  )
}

export default App
