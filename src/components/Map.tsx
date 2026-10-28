import React, { useState } from 'react';
import { FOSSIL_LOCATIONS, FossilLocation } from '../utils/paleoLogic';

export const Map: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<FossilLocation>(FOSSIL_LOCATIONS[2]); // Default Montana Hell Creek

  return (
    <section
      id="habitat"
      aria-labelledby="habitat-heading"
      className="relative bg-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#F3FFF1]/15">
          <div className="lg:col-span-5 flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              07
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                PALEOGEOGRAPHY · LARAMIDIA
              </p>
              <h2
                id="habitat-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Habitat and Distribution
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="font-body text-base sm:text-lg text-[#F3FFF1]/90 leading-[1.72] max-w-2xl">
              In the Late Cretaceous, North America was split by a shallow inland sea (the Western
              Interior Seaway). <em>T. rex</em> lived on the western landmass,{' '}
              <strong className="font-normal text-[#D4FF9A]">Laramidia</strong>: warm, humid,
              subtropical floodplains with rivers, swamps, and forests of conifers, ferns, cycads,
              palms, and early flowering trees.
            </p>
          </div>
        </div>

        {/* Interactive Map + Formation Inspector */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: Interactive SVG Map of Western North America / Laramidia */}
          <div className="lg:col-span-7 rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/40 p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
                WESTERN NORTH AMERICA · FOSSIL FORMATIONS
              </span>
              <div className="flex items-center gap-4 text-xs font-body text-[#F3FFF1]/75">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#B6F36A]" />
                  Confirmed T. rex
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#D4FF9A] bg-transparent" />
                  Tentative / Debated
                </span>
              </div>
            </div>

            <div className="relative w-full flex items-center justify-center">
              <svg
                viewBox="0 0 600 480"
                className="w-full max-w-[560px] h-auto"
                role="img"
                aria-label="Paleogeographic map of Western North America showing Laramidia, the Western Interior Seaway, and Tyrannosaurus fossil formations"
              >
                {/* Western Interior Seaway Channel */}
                <path
                  d="M295,10 C325,110 345,215 355,345 C362,400 355,445 345,475 L435,475 C425,380 415,245 390,120 C375,60 355,20 345,10 Z"
                  fill="#041A0F"
                  stroke="rgba(182,243,106,0.22)"
                  strokeDasharray="4 4"
                />
                <text
                  x="382"
                  y="265"
                  fill="rgba(182,243,106,0.45)"
                  fontSize="10"
                  fontFamily="Marcellus, serif"
                  transform="rotate(78, 382, 265)"
                >
                  WESTERN INTERIOR SEAWAY
                </text>

                {/* Laramidia Western Landmass */}
                <path
                  d="M90,20 L290,15 C320,120 340,225 348,355 C352,410 342,450 330,470 L165,470 C135,380 95,280 75,165 C68,110 75,55 90,20 Z"
                  fill="#0F4A2A"
                  fillOpacity="0.65"
                  stroke="#5DBB4B"
                  strokeWidth="1.5"
                />
                <text
                  x="155"
                  y="75"
                  fill="rgba(243,255,241,0.45)"
                  fontSize="13"
                  fontFamily="Marcellus, serif"
                  letterSpacing="3"
                >
                  LARAMIDIA
                </text>

                {/* Appalachia Eastern Landmass */}
                <path
                  d="M405,25 L550,35 C565,140 555,275 510,415 L440,445 C430,355 422,225 398,115 Z"
                  fill="#082E1B"
                  fillOpacity="0.45"
                  stroke="rgba(243,255,241,0.2)"
                />
                <text
                  x="485"
                  y="195"
                  textAnchor="middle"
                  fill="rgba(243,255,241,0.35)"
                  fontSize="11"
                  fontFamily="Marcellus, serif"
                  letterSpacing="2"
                >
                  APPALACHIA
                </text>

                {/* Interactive Fossil Locality Markers */}
                {FOSSIL_LOCATIONS.map((loc) => {
                  const isSelected = selectedLoc.id === loc.id;
                  const isConfirmed = loc.status === 'confirmed';
                  return (
                    <g
                      key={loc.id}
                      transform={`translate(${loc.x}, ${loc.y})`}
                      onClick={() => setSelectedLoc(loc)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`${loc.region} — ${loc.formation} (${loc.status})`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedLoc(loc);
                        }
                      }}
                    >
                      {isSelected && (
                        <circle
                          r="14"
                          fill="rgba(182, 243, 106, 0.22)"
                          stroke="#D4FF9A"
                          strokeWidth="1"
                        />
                      )}
                      <circle
                        r={isSelected ? '7' : '5.5'}
                        fill={isConfirmed ? '#B6F36A' : '#041A0F'}
                        stroke="#D4FF9A"
                        strokeWidth="2"
                      />
                      <text
                        x="11"
                        y="4"
                        fill={isSelected ? '#D4FF9A' : '#F3FFF1'}
                        fontSize="10.5"
                        fontFamily="Jost, sans-serif"
                        fontWeight={isSelected ? '500' : '300'}
                      >
                        {loc.region.split(',')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right 5 Columns: Selected Formation Card + Co-existing Fauna & Asia Note */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div
              aria-live="polite"
              data-testid="map-location-detail"
              className="rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/80 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between text-xs font-display uppercase tracking-[0.16em] text-[#B6F36A]">
                <span>{selectedLoc.formation}</span>
                <span>
                  {selectedLoc.status === 'confirmed'
                    ? 'CONFIRMED LOCALITY'
                    : 'TENTATIVE / DEBATED'}
                </span>
              </div>

              <h3 className="mt-2 font-display text-2xl sm:text-3xl uppercase text-[#F3FFF1]">
                {selectedLoc.region}
              </h3>

              <p className="mt-4 pt-4 border-t border-[#F3FFF1]/15 font-body text-base text-[#F3FFF1]/90 leading-[1.7]">
                {selectedLoc.notes}
              </p>

              {/* Quick Locality Switcher Buttons */}
              <div className="mt-6 pt-4 border-t border-[#F3FFF1]/15 flex flex-wrap gap-1.5">
                {FOSSIL_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLoc(loc)}
                    className={`px-2.5 py-1 rounded-md font-body text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedLoc.id === loc.id
                        ? 'bg-[#B6F36A] text-[#020D07] font-medium'
                        : 'bg-[#041A0F] text-[#F3FFF1]/75 hover:text-[#F3FFF1]'
                    }`}
                  >
                    {loc.region.split(',')[0]}
                    {loc.status === 'tentative' ? ' *' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Co-existing Fauna & biogeographic note */}
            <div className="rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F] p-6 sm:p-8 space-y-4">
              <div>
                <h4 className="font-display text-sm uppercase tracking-[0.14em] text-[#D4FF9A]">
                  Co-existing Laramidian Fauna
                </h4>
                <p className="mt-1.5 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
                  Shared its subtropical floodplain ecosystem with <em>Triceratops</em>,{' '}
                  <em>Edmontosaurus</em>, <em>Ankylosaurus</em>, <em>Pachycephalosaurus</em>, and{' '}
                  <em>Thescelosaurus</em>.
                </p>
              </div>

              <div className="pt-4 border-t border-[#F3FFF1]/10">
                <h4 className="font-display text-sm uppercase tracking-[0.14em] text-[#D4FF9A]">
                  Endemic to Western North America
                </h4>
                <p className="mt-1.5 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
                  <em>Tyrannosaurus rex</em> is known only from western North America. Its close
                  cousin <em>Tarbosaurus</em> lived in Asia (Mongolia).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
