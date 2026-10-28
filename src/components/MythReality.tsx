import React, { useState } from 'react';
import { MYTH_CARDS } from '../utils/paleoLogic';

export const MythReality: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="myths"
      aria-labelledby="myths-heading"
      className="relative bg-gradient-to-b from-[#041A0F] via-[#082E1B] to-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#F3FFF1]/15">
          <div className="flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              10
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                POPULAR CULTURE VS PALEOBIOLOGY
              </p>
              <h2
                id="myths-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Myth vs Reality
              </h2>
            </div>
          </div>
          <p className="font-body text-base text-[#F3FFF1]/80 max-w-md">
            Click any card below to flip between popular cinema misconceptions and peer-reviewed
            fossil evidence.
          </p>
        </div>

        {/* 6 Interactive Flip Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MYTH_CARDS.map((card, index) => {
            const isFlipped = !!flippedIds[card.id];
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => toggleCard(card.id)}
                aria-pressed={isFlipped}
                aria-label={`Myth ${index + 1}: ${card.myth}. Click to toggle scientific reality.`}
                className={`group text-left rounded-2xl border p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[250px] ${
                  isFlipped
                    ? 'border-[#B6F36A] bg-[#0F4A2A]/75 shadow-[0_0_30px_rgba(182,243,106,0.12)]'
                    : 'border-[#F3FFF1]/15 bg-[#041A0F]/90 hover:border-[#B6F36A]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-display uppercase tracking-[0.16em]">
                    <span className={isFlipped ? 'text-[#D4FF9A]' : 'text-[#B6F36A]/85'}>
                      {isFlipped ? `REALITY · ${card.verdict}` : `MYTH 0${index + 1}`}
                    </span>
                    <span className="text-[#F3FFF1]/55">
                      {isFlipped ? 'SHOW MYTH' : 'REVEAL FACT'}
                    </span>
                  </div>

                  {!isFlipped ? (
                    <h3 className="mt-5 font-display text-xl sm:text-2xl text-[#F3FFF1] leading-snug">
                      {card.myth}
                    </h3>
                  ) : (
                    <div className="mt-4">
                      <p className="font-display text-xs uppercase tracking-[0.08em] text-[#F3FFF1]/60 line-through">
                        {card.myth}
                      </p>
                      <p className="mt-3 font-body text-base text-[#F3FFF1] leading-[1.68]">
                        {card.reality}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3FFF1]/10 flex items-center justify-between text-xs font-display uppercase tracking-[0.14em] text-[#B6F36A]">
                  <span>{isFlipped ? 'VERIFIED PALEOBIOLOGY' : 'TAP TO FLIP CARD'}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
