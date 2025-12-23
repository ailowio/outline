import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface Integrante {
  id: string;
  name: string;
  image: string;
  instrument: string;
}

// Ordenado alfabeticamente: Arthur, Lucas, Pedro, Rômulo
// Para adicionar caricaturas: coloque os arquivos em /public/ como:
// - /public/caricatura-arthur.svg (formato SVG recomendado para melhor qualidade e escalabilidade)
// - /public/caricatura-lucas.svg
// - /public/caricatura-pedro.svg
// - /public/caricatura-romulo.svg
// Formato ideal: SVG (vetorial, escalável, leve) ou PNG com fundo transparente
const integrantes: Integrante[] = [
  {
    id: 'arthur',
    name: 'Arthur',
    image: '/caricatura-arthur.svg',
    instrument: 'Baixo'
  },
  {
    id: 'lucas',
    name: 'Lucas',
    image: '/caricatura-lucas.svg',
    instrument: 'Bateria'
  },
  {
    id: 'pedro',
    name: 'Pedro',
    image: '/caricatura-pedro.svg',
    instrument: 'Guitarra'
  },
  {
    id: 'romulo',
    name: 'Rômulo',
    image: '/caricatura-romulo.svg',
    instrument: 'Voz & Violão'
  }
].sort((a, b) => a.name.localeCompare(b.name)); // Garantir ordem alfabética

interface CharacterSelectorProps {
  onSelect: (integrante: Integrante) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <h3 className="text-2xl md:text-3xl font-black text-neon mb-6 text-center italic">
        ESCOLHA SEU INTEGRANTE
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrantes.map((integrante) => (
          <motion.button
            key={integrante.id}
            onClick={() => {
              setSelected(integrante.id);
              onSelect(integrante);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-6 border-2 rounded-sm transition-all ${
              selected === integrante.id
                ? 'border-outline-neon bg-outline-neon/10 shadow-[0_0_30px_rgba(57,255,20,0.5)]'
                : 'border-outline-neon/30 bg-outline-black/50 hover:border-outline-neon/60'
            }`}
          >
            <div className="aspect-square mb-4 flex items-center justify-center bg-outline-black/50 rounded-sm overflow-hidden">
              <img 
                src={integrante.image} 
                alt={integrante.name}
                data-integrante={integrante.id}
                className="w-full h-full object-contain p-4"
                onLoad={(e) => {
                  // Preload image for canvas - ensure it's cached
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'block';
                  // Force browser to cache the image
                  const preloadImg = new Image();
                  preloadImg.src = integrante.image;
                }}
                onError={(e) => {
                  // Fallback to logo if caricature fails to load
                  const img = e.target as HTMLImageElement;
                  if (img.src !== '/logo.svg') {
                    img.src = '/logo.svg';
                  }
                }}
              />
            </div>
            <h4 className="text-xl font-black text-neon mb-1">{integrante.name}</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest">{integrante.instrument}</p>
            {selected === integrante.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-outline-neon rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelector;
export { integrantes };

