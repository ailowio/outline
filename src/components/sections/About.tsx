import React from 'react';

const About = () => {
  return (
    // Texto da nossa história e imagem principal podem ser editados aqui.
    // A caricatura usada vem de /public/caricatura.svg.
    <section id="about" className="py-32 bg-outline-black relative overflow-hidden">
      {/* Decorative text background */}
      <div className="absolute top-0 right-0 text-[15rem] font-black text-white/[0.02] select-none pointer-events-none italic -translate-y-1/2 translate-x-1/4">
        OUTLINE
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Conteúdo e Caricatura lado a lado */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

        <div>
          <h2 className="text-5xl md:text-6xl font-black text-neon tracking-tighter italic mb-8">NOSSA HISTÓRIA</h2>
          <div className="space-y-6 text-gray-300 text-lg font-light leading-relaxed">
            <p>
              Fundada em <span className="text-white font-medium">2021</span>, na capital Fortaleza, a Outline nasceu como resposta à retomada da cena cultural pós-pandemia.
            </p>
            <p>
              O projeto começou de forma despretensiosa, unindo <span className="text-outline-neon font-medium italic">Rômulo Mascarenhas</span>, 
              <span className="text-outline-neon font-medium italic"> Pedro Fernandes</span>, 
              <span className="text-outline-neon font-medium italic"> Lucas Duarte</span> e 
              <span className="text-outline-neon font-medium italic"> Arthur Cesar</span> em uma formação completa e explosiva.
            </p>
            <p>
              Exploramos uma diversidade de gêneros que conectam diferentes públicos: do <span className="text-white">Indie Rock</span> ao <span className="text-white">Grunge</span>, 
              passando por clássicos e brasilidades. Nosso propósito é transformar cada apresentação em uma experiência única de música e emoção.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div>
              <p className="text-outline-neon font-black text-3xl">300+</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Músicas no Setlist</p>
            </div>
            <div>
              <p className="text-outline-neon font-black text-3xl">4</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Formatos de Show</p>
            </div>
          </div>
        </div>

        {/* Caricatura - Lado direito */}
        <div className="flex flex-col items-center md:items-end justify-center">
          <div className="relative bg-outline-black/50 p-6 rounded-sm border border-outline-neon/20">
            <img 
              src="/caricatura.svg" 
              alt="Caricatura Outline" 
              className="w-64 md:w-80 lg:w-96 h-auto opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-outline-neon" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-outline-neon" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;

