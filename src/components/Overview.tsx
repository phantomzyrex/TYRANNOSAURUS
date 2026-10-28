import React from 'react';
import { OVERVIEW_STATS } from '../utils/paleoLogic';

export const Overview: React.FC = () => {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative bg-gradient-to-b from-[#041A0F] via-[#082E1B] to-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-14 border-b border-[#F3FFF1]/15">
          <div className="lg:col-span-4 flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              02
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                OVERVIEW · PALEO-DOSSIER
              </p>
              <h2
                id="overview-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                The Tyrant Lizard King
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="font-body text-base sm:text-lg text-[#F3FFF1]/90 leading-[1.75] max-w-2xl">
              <em className="font-display not-italic text-[#D4FF9A]">Tyrannosaurus rex</em> was one
              of the largest land predators that ever lived, and one of the very last non-avian
              dinosaurs. It ruled western North America at the very end of the Age of Dinosaurs. It
              was a bipedal theropod, and its relatives include today&apos;s birds.
            </p>
          </div>
        </div>

        {/* 12 Scientific Stat Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OVERVIEW_STATS.map((stat) => (
            <article
              key={stat.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#F3FFF1]/12 bg-[#041A0F]/90 p-6 transition-colors duration-300 hover:border-[#B6F36A]/45"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.14em] text-[#B6F36A]/85 font-display">
                  <span>{stat.label}</span>
                  {stat.isEstimate && (
                    <span className="text-[11px] tracking-[0.1em] text-[#F3FFF1]/60">
                      ESTIMATE
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-display text-2xl sm:text-[26px] uppercase tracking-[0.02em] text-[#F3FFF1] tabular-nums">
                  {stat.value}
                </h3>
              </div>

              <p className="mt-4 pt-4 border-t border-[#F3FFF1]/10 font-body text-[15px] text-[#F3FFF1]/80 leading-[1.65]">
                {stat.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
