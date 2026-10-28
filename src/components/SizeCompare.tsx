import React, { useState } from 'react';
import {
  SIZE_ENTITIES,
  TREX_SPECIMENS,
  calculateScalePercentage,
} from '../utils/paleoLogic';

export const SizeCompare: React.FC = () => {
  const [specimenKey, setSpecimenKey] = useState<'sue' | 'scotty'>('sue');
  const activeSpecimen = TREX_SPECIMENS[specimenKey];

  return (
    <section
      id="size"
      aria-labelledby="size-heading"
      className="relative bg-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header + Specimen Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#F3FFF1]/15">
          <div className="flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              05
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                MORPHOMETRIC SCALE · METRIC COMPARISON
              </p>
              <h2
                id="size-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Size Comparison
              </h2>
            </div>
          </div>

          {/* Toggle: Sue (about 12.3 m) / Scotty (about 13 m, estimate) */}
          <div
            role="group"
            aria-label="Select Tyrannosaurus specimen for scale comparison"
            className="inline-flex items-center gap-1 rounded-xl border border-[#F3FFF1]/15 bg-[#082E1B]/80 p-1.5 self-start lg:self-auto"
          >
            <button
              type="button"
              onClick={() => setSpecimenKey('sue')}
              aria-pressed={specimenKey === 'sue'}
              className={`px-4 py-2 rounded-lg font-display text-xs uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                specimenKey === 'sue'
                  ? 'bg-[#B6F36A] text-[#020D07] font-semibold'
                  : 'text-[#F3FFF1]/80 hover:text-[#F3FFF1]'
              }`}
            >
              Sue (about 12.3 m)
            </button>
            <button
              type="button"
              onClick={() => setSpecimenKey('scotty')}
              aria-pressed={specimenKey === 'scotty'}
              className={`px-4 py-2 rounded-lg font-display text-xs uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                specimenKey === 'scotty'
                  ? 'bg-[#B6F36A] text-[#020D07] font-semibold'
                  : 'text-[#F3FFF1]/80 hover:text-[#F3FFF1]'
              }`}
            >
              Scotty (about 13 m, estimate)
            </button>
          </div>
        </div>

        {/* SVG Silhouette Scale Chart */}
        <div className="mt-12 rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/45 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F3FFF1]/10">
            <div>
              <span className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
                ACTIVE SPECIMEN PROFILE
              </span>
              <h3
                data-testid="active-specimen-title"
                className="mt-1 font-display text-xl sm:text-2xl uppercase text-[#F3FFF1]"
              >
                {activeSpecimen.name} — {activeSpecimen.displayLength}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-body text-[#F3FFF1]/80 tabular-nums">
              <span>Mass: {activeSpecimen.massTonnes}</span>
              <span aria-hidden="true">·</span>
              <span>Hip Height: ~{activeSpecimen.hipHeightMeters} m</span>
              <span aria-hidden="true">·</span>
              <span>{activeSpecimen.completeness}</span>
            </div>
          </div>

          {/* Visual SVG Silhouette Comparison */}
          <div className="mt-8 overflow-x-auto">
            <svg
              viewBox="0 0 1000 320"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label={`Scale silhouette chart comparing Human (1.7 m), African Elephant (6-7 m), Triceratops (8-9 m), City Bus (12 m), and ${activeSpecimen.name} (${activeSpecimen.lengthMeters} m)`}
            >
              {/* Horizontal Metric Grid Lines (0m to 5m height) */}
              {[0, 1, 2, 3, 4, 5].map((meter) => {
                const y = 270 - meter * 42;
                return (
                  <g key={meter}>
                    <line
                      x1="50"
                      y1={y}
                      x2="970"
                      y2={y}
                      stroke="rgba(243,255,241,0.12)"
                      strokeDasharray={meter === 0 ? undefined : '4 4'}
                    />
                    <text
                      x="12"
                      y={y + 4}
                      fill="rgba(243,255,241,0.55)"
                      fontSize="11"
                      fontFamily="Marcellus, serif"
                    >
                      {meter}m
                    </text>
                  </g>
                );
              })}

              {/* T. rex Hip Height Marker Line (~3.7 m) */}
              <line
                x1="50"
                y1={270 - activeSpecimen.hipHeightMeters * 42}
                x2="210"
                y2={270 - activeSpecimen.hipHeightMeters * 42}
                stroke="#B6F36A"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x="58"
                y={270 - activeSpecimen.hipHeightMeters * 42 - 8}
                fill="#D4FF9A"
                fontSize="11"
                fontFamily="Marcellus, serif"
              >
                T. REX HIP HEIGHT (~3.7 m / 12 ft)
              </text>

              {/* 1. Human Silhouette (1.7 m tall) */}
              <g transform="translate(85, 198)">
                <circle cx="12" cy="8" r="6" fill="#F3FFF1" />
                <path
                  d="M6,16 L18,16 L20,42 L16,42 L15,72 L9,72 L8,42 L4,42 Z"
                  fill="#F3FFF1"
                />
                <text
                  x="12"
                  y="92"
                  textAnchor="middle"
                  fill="#F3FFF1"
                  fontSize="11"
                  fontFamily="Marcellus, serif"
                >
                  HUMAN (1.7m)
                </text>
              </g>

              {/* 2. City Bus Reference Outline (12 m long) in background */}
              <g transform="translate(175, 134)" opacity="0.28">
                <rect
                  x="0"
                  y="0"
                  width="680"
                  height="136"
                  rx="10"
                  fill="none"
                  stroke="#F3FFF1"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <text
                  x="670"
                  y="20"
                  textAnchor="end"
                  fill="#F3FFF1"
                  fontSize="11"
                  fontFamily="Marcellus, serif"
                >
                  CITY BUS OUTLINE (~12 m)
                </text>
              </g>

              {/* 3. African Elephant Silhouette (~6.5 m) */}
              <g transform="translate(175, 132)" opacity="0.5">
                <path
                  d="M20,138 L20,75 C20,35 65,15 130,18 C185,18 235,5 265,25 C285,38 295,75 292,115 L282,115 C282,85 272,68 260,68 L255,138 L228,138 L225,85 L105,85 L100,138 L72,138 L70,88 L45,88 L42,138 Z"
                  fill="#2F8F46"
                />
                <text
                  x="150"
                  y="158"
                  textAnchor="middle"
                  fill="#B6F36A"
                  fontSize="11"
                  fontFamily="Marcellus, serif"
                >
                  ELEPHANT (~6–7m)
                </text>
              </g>

              {/* 4. Triceratops Silhouette (~8.5 m) */}
              <g transform="translate(175, 144)" opacity="0.68">
                <path
                  d="M10,126 C45,105 90,65 165,55 C245,45 315,52 365,15 C375,35 390,45 435,38 L465,22 L440,58 L475,78 L425,95 L395,126 L365,126 L360,88 L215,88 L210,126 L180,126 L175,92 C115,95 65,112 10,126 Z"
                  fill="#5DBB4B"
                />
                <text
                  x="340"
                  y="146"
                  textAnchor="middle"
                  fill="#D4FF9A"
                  fontSize="11"
                  fontFamily="Marcellus, serif"
                >
                  TRICERATOPS (~8–9m)
                </text>
              </g>

              {/* 5. Tyrannosaurus rex Silhouette (12.3m Sue or 13.0m Scotty) */}
              <g
                transform={`translate(175, ${specimenKey === 'scotty' ? 88 : 96}) scale(${
                  specimenKey === 'scotty' ? 1.055 : 1
                })`}
              >
                <path
                  d="M0,95 C95,88 210,68 335,55 C425,45 495,52 555,28 C585,12 620,2 675,6 C705,10 725,24 720,42 L665,48 L712,62 C700,76 665,80 620,72 C585,68 555,82 535,108 L552,126 L538,132 L518,112 C485,118 455,118 430,115 L455,174 L480,174 L480,182 L430,182 L405,125 L370,125 L345,174 L370,174 L370,182 L320,182 L335,118 C225,112 115,106 0,95 Z"
                  fill="#B6F36A"
                  fillOpacity="0.88"
                  stroke="#D4FF9A"
                  strokeWidth="1.5"
                />
                <text
                  x="530"
                  y="198"
                  textAnchor="middle"
                  fill="#F3FFF1"
                  fontSize="12"
                  fontFamily="Marcellus, serif"
                >
                  TYRANNOSAURUS ({activeSpecimen.lengthMeters}m)
                </text>
              </g>
            </svg>
          </div>

          {/* Horizontal Comparative Bar Breakdown */}
          <div className="mt-10 space-y-4 pt-6 border-t border-[#F3FFF1]/10">
            {[
              ...SIZE_ENTITIES,
              {
                id: 'trex',
                name: `Tyrannosaurus rex — ${activeSpecimen.name}`,
                lengthMeters: activeSpecimen.lengthMeters,
                displayLength: activeSpecimen.displayLength,
                hipHeightMeters: activeSpecimen.hipHeightMeters,
                note: activeSpecimen.location,
                isEstimate: true,
              },
            ].map((entity) => {
              const widthPct = calculateScalePercentage(entity.lengthMeters, 13.5);
              const isTrex = entity.id === 'trex';
              return (
                <div key={entity.id} className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between text-xs sm:text-sm">
                    <span
                      className={`font-display uppercase tracking-[0.06em] ${
                        isTrex ? 'text-[#D4FF9A] font-semibold' : 'text-[#F3FFF1]'
                      }`}
                    >
                      {entity.name}
                    </span>
                    <div className="flex items-center gap-2 text-[#F3FFF1]/75 tabular-nums">
                      <span>{entity.displayLength}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-xs text-[#F3FFF1]/55">{entity.note}</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#041A0F] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTrex ? 'bg-[#B6F36A]' : 'bg-[#2F8F46]/80'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
