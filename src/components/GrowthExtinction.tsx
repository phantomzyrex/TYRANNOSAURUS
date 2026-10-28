import React, { useState } from 'react';
import { GROWTH_STAGES, GrowthStage } from '../utils/paleoLogic';

export const GrowthExtinction: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<GrowthStage>(GROWTH_STAGES[2]); // Default Age 15 Teenage Growth Spurt

  return (
    <section
      id="growth"
      aria-labelledby="growth-heading"
      className="relative bg-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#F3FFF1]/15">
          <div className="flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              09
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                ONTOGENY · PHYLOGENESIS · K–Pg BOUNDARY
              </p>
              <h2
                id="growth-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Growth, Evolution and Extinction
              </h2>
            </div>
          </div>
          <p className="font-body text-base text-[#F3FFF1]/80 max-w-md">
            Histological growth rings, reproductive medullary bone, the rise of giant tyrannosaurids,
            and the Chicxulub asteroid impact 66 million years ago.
          </p>
        </div>

        {/* Interactive Growth Curve Chart */}
        <div className="mt-12 rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/45 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#F3FFF1]/15">
            <div>
              <span className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
                HISTOLOGICAL S-CURVE (ERICKSON ET AL., 2004)
              </span>
              <h3 className="mt-1 font-display text-2xl uppercase text-[#F3FFF1]">
                Ontogenetic Growth Curve (Estimates)
              </h3>
            </div>

            {/* Age Toggle: Age 2 / 10 / 15 / 20 / 28 */}
            <div
              role="group"
              aria-label="Select age on Tyrannosaurus growth curve"
              className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-[#F3FFF1]/15 bg-[#041A0F] p-1.5"
            >
              {GROWTH_STAGES.map((stage) => {
                const active = selectedStage.age === stage.age;
                return (
                  <button
                    key={stage.age}
                    type="button"
                    onClick={() => setSelectedStage(stage)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 rounded-lg font-display text-xs uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                      active
                        ? 'bg-[#B6F36A] text-[#020D07] font-semibold'
                        : 'text-[#F3FFF1]/75 hover:text-[#F3FFF1]'
                    }`}
                  >
                    Age {stage.age}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* SVG S-Curve Graph */}
            <div className="lg:col-span-7">
              <svg
                viewBox="0 0 580 260"
                className="w-full h-auto"
                role="img"
                aria-label="Sigmoid growth curve of Tyrannosaurus rex from age 2 to 28 years showing rapid teenage growth spurt around age 15"
              >
                {/* Axes */}
                <line x1="50" y1="220" x2="540" y2="220" stroke="rgba(243,255,241,0.25)" />
                <line x1="50" y1="20" x2="50" y2="220" stroke="rgba(243,255,241,0.25)" />

                {/* Y-axis labels (0t to 9t) */}
                {[0, 3, 6, 9].map((tonnes) => {
                  const y = 220 - (tonnes / 9) * 190;
                  return (
                    <g key={tonnes}>
                      <line
                        x1="50"
                        y1={y}
                        x2="540"
                        y2={y}
                        stroke="rgba(243,255,241,0.08)"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="38"
                        y={y + 4}
                        textAnchor="end"
                        fill="rgba(243,255,241,0.6)"
                        fontSize="10"
                        fontFamily="Marcellus, serif"
                      >
                        {tonnes}t
                      </text>
                    </g>
                  );
                })}

                {/* S-Curve Path */}
                <path
                  d="M 80 218 C 165 216, 215 205, 295 138 C 350 85, 385 58, 510 34"
                  fill="none"
                  stroke="#B6F36A"
                  strokeWidth="3"
                />

                {/* Stage Points */}
                {GROWTH_STAGES.map((stage) => {
                  const cx = 50 + (stage.age / 30) * 490;
                  const cy = 220 - (stage.massTonnes / 9) * 190;
                  const isCurrent = selectedStage.age === stage.age;
                  return (
                    <g
                      key={stage.age}
                      onClick={() => setSelectedStage(stage)}
                      className="cursor-pointer"
                    >
                      {isCurrent && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="13"
                          fill="rgba(182,243,106,0.25)"
                          stroke="#D4FF9A"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isCurrent ? '6.5' : '4.5'}
                        fill={isCurrent ? '#D4FF9A' : '#041A0F'}
                        stroke="#B6F36A"
                        strokeWidth="2"
                      />
                      <text
                        x={cx}
                        y="242"
                        textAnchor="middle"
                        fill={isCurrent ? '#D4FF9A' : 'rgba(243,255,241,0.65)'}
                        fontSize="10.5"
                        fontFamily="Marcellus, serif"
                      >
                        {stage.age} yr
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Age Stage Readout */}
            <div
              aria-live="polite"
              data-testid="growth-stage-readout"
              className="lg:col-span-5 rounded-xl border border-[#F3FFF1]/15 bg-[#041A0F] p-6 space-y-4"
            >
              <div className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
                SELECTED ONTOGENETIC STAGE
              </div>
              <h4 className="font-display text-2xl uppercase text-[#F3FFF1]">
                {selectedStage.stageLabel}
              </h4>

              <div className="grid grid-cols-3 gap-3 pt-2 pb-4 border-b border-[#F3FFF1]/10 tabular-nums">
                <div>
                  <span className="block text-[11px] font-display uppercase text-[#F3FFF1]/55">
                    Body Mass
                  </span>
                  <span className="font-display text-lg text-[#D4FF9A]">
                    ~{selectedStage.massTonnes} t
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-display uppercase text-[#F3FFF1]/55">
                    Length
                  </span>
                  <span className="font-display text-lg text-[#F3FFF1]">
                    ~{selectedStage.lengthMeters} m
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-display uppercase text-[#F3FFF1]/55">
                    Peak Gain
                  </span>
                  <span className="font-display text-lg text-[#B6F36A]">
                    ~{selectedStage.growthRateKgPerDay} kg/day
                  </span>
                </div>
              </div>

              <p className="font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
                {selectedStage.description}
              </p>
            </div>
          </div>
        </div>

        {/* Three Editorial Columns: Reproduction, Evolution & Avian Link, and K-Pg Extinction */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/50 p-7">
            <div className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
              REPRODUCTION · MOR 1125
            </div>
            <h3 className="mt-2 font-display text-xl uppercase text-[#F3FFF1]">
              Medullary Bone Evidence
            </h3>
            <p className="mt-3 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
              Medullary bone (a calcium-rich tissue used by female birds to make eggshell) found in
              specimen MOR 1125 identified it as a female in egg-laying condition (Schweitzer et
              al., 2005). Confirmed <em>T. rex</em> eggs and nests have not yet been found.
            </p>
          </article>

          <article className="rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/50 p-7">
            <div className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
              DEEP EVOLUTION · ~165 TO 66 MYA
            </div>
            <h3 className="mt-2 font-display text-xl uppercase text-[#F3FFF1]">
              From Jurassic Hunters to Living Birds
            </h3>
            <p className="mt-3 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
              Tyrannosauroids first appear in the Middle Jurassic as small, lightly built predators.
              Giant tyrannosaurids dominated the northern continents during the last roughly 20
              million years of the Cretaceous. Birds are living dinosaurs, and <em>T. rex</em>{' '}
              shares a more recent common ancestor with birds than with crocodiles.
            </p>
          </article>

          <article className="rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/50 p-7">
            <div className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
              EXTINCTION · 66.0 MYA
            </div>
            <h3 className="mt-2 font-display text-xl uppercase text-[#F3FFF1]">
              The K–Pg Chicxulub Impact
            </h3>
            <p className="mt-3 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
              About 66 million years ago, the end-Cretaceous (K–Pg) mass extinction — triggered by
              the Chicxulub asteroid impact — wiped out <em>T. rex</em> along with all other
              non-avian dinosaurs.
            </p>
          </article>
        </div>

        {/* Geological Timeline Bar with K-Pg Marker */}
        <div className="mt-8 rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-display uppercase tracking-[0.16em] text-[#B6F36A] mb-4">
            <span>TYRANNOSAUROID GEOLOGICAL HORIZON</span>
            <span>K–Pg MASS EXTINCTION BOUNDARY (66.0 MYA)</span>
          </div>
          <div className="relative pt-6 pb-2">
            <div className="h-2 w-full rounded-full bg-[#082E1B] overflow-hidden flex">
              <div className="w-[45%] bg-[#1D6B3A]/60" title="Middle–Late Jurassic (~165–145 MYA)" />
              <div className="w-[38%] bg-[#2F8F46]/80" title="Early–Late Cretaceous (~145–80 MYA)" />
              <div className="w-[14%] bg-[#B6F36A]" title="Giant Tyrannosaurids (~80–66 MYA)" />
              <div className="w-[3%] bg-[#D4FF9A]" title="T. rex Reign (68–66 MYA)" />
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-body text-[#F3FFF1]/75 tabular-nums">
              <div>
                <strong className="font-display text-[#F3FFF1] block">~165 MYA (Middle Jurassic)</strong>
                Small basal tyrannosauroids appear
              </div>
              <div>
                <strong className="font-display text-[#F3FFF1] block">~125 MYA (Early Cretaceous)</strong>
                Feathered <em>Yutyrannus</em> in Asia
              </div>
              <div>
                <strong className="font-display text-[#D4FF9A] block">~68–66 MYA (Maastrichtian)</strong>
                <em>Tyrannosaurus rex</em> rules Laramidia
              </div>
              <div className="sm:text-right">
                <strong className="font-display text-[#B6F36A] block">66.0 MYA · K–Pg BOUNDARY</strong>
                Chicxulub asteroid impact
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
