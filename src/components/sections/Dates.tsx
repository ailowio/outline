import React from 'react';
import showsData from '../../data/shows.json';

const Dates = () => {
  return (
    <section id="datas" className="py-32 max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-5xl md:text-6xl font-black text-neon tracking-tighter italic">PRÓXIMAS DATAS</h2>
          <p className="text-gray-500 mt-2 font-medium tracking-widest uppercase text-xs">Onde o show acontece</p>
        </div>
        <div className="h-px flex-1 bg-outline-neon/20 hidden md:block mb-4 mx-8" />
      </div>

      <div className="grid gap-4">
        {showsData.length > 0 ? (
          showsData.map((show) => (
            <div 
              key={show.id} 
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 border border-outline-neon/10 bg-outline-black/50 hover:border-outline-neon/40 transition-all rounded-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 flex-1">
                <div className="flex flex-col min-w-[80px]">
                  <span className="text-outline-neon font-black text-2xl">{new Date(show.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                  <span className="text-gray-600 text-xs font-bold uppercase">{new Date(show.date).getFullYear()}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold group-hover:text-outline-neon transition-colors mb-1">{show.venue}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-1">{show.city}</p>
                  {show.time && (
                    <p className="text-outline-neon/80 text-sm font-semibold">🕐 {show.time}</p>
                  )}
                </div>
              </div>
              <a 
                href={show.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 md:mt-0 px-6 py-2 border border-outline-neon/30 text-outline-neon text-xs font-bold uppercase tracking-widest hover:bg-outline-neon hover:text-black transition-all whitespace-nowrap"
              >
                Infos
              </a>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-800 rounded-lg">
            <p className="text-gray-500 italic">Novas datas em breve.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dates;

