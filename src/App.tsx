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
        
        <section
          id="game"
          className="relative -mt-40 md:-mt-48 min-h-screen py-32 flex flex-col items-center justify-center bg-black"
        >
          {/* Gradiente de sobreposição que se conecta perfeitamente com o Hero */}
          <div className="absolute top-0 left-0 w-full h-40 md:h-48 bg-gradient-to-b from-black via-black/99 via-black/97 via-black/94 via-black/88 to-transparent -z-10 pointer-events-none" />
          
          <div className="z-10 text-center mb-12 w-full">
            <h2 className="text-5xl md:text-7xl font-black text-neon tracking-tighter italic leading-none mb-4">
              OUTLINE SNAKE
            </h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] font-bold text-xs mb-8">
              "A VERSÃO ERRADA" • COMA E CRESÇA
            </p>
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
