import React, { useState } from 'react';
import {
  ANATOMY_HOTSPOTS,
  AnatomyHotspot,
  SIDE_IMAGE_PATH,
} from '../utils/paleoLogic';

export const AnatomyHotspots: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState<AnatomyHotspot>(ANATOMY_HOTSPOTS[0]);

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
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
              04
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                BIOMECHANICS · INTERACTIVE SPECIMEN
              </p>
              <h2
                id="anatomy-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Functional Anatomy
              </h2>
            </div>
          </div>
          <p className="font-body text-base text-[#F3FFF1]/80 max-w-md">
            Select any anatomical marker on the specimen below to inspect cranial osteology,
            sensory adaptations, limb musculature, and integumentary evidence.
          </p>
        </div>

        {/* Interactive Annotated Specimen Viewer */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 8 Columns: Specimen Diagram with Hotspots */}
          <div className="lg:col-span-8 relative rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F] p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[480px] overflow-hidden">
            {/* Subtle scientific grid lines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(182,243,106,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(182,243,106,0.2) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* Scale Reference Bar */}
            <div className="pointer-events-none absolute bottom-4 left-6 flex items-center gap-3 text-xs font-display tracking-[0.14em] text-[#F3FFF1]/60">
              <span>SCALE: ~12.3 M ADULT</span>
              <span aria-hidden="true">·</span>
              <span>HORIZONTAL COUNTERBALANCED POSTURE</span>
            </div>

            <div className="relative w-full max-w-[680px] aspect-[16/10] flex items-center justify-center">
              <img
                src={SIDE_IMAGE_PATH}
                alt="Annotated lateral view of Tyrannosaurus rex"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="creature-graded max-h-full max-w-full object-contain select-none"
              />

              {/* Hotspot Pins */}
              {ANATOMY_HOTSPOTS.map((spot, index) => {
                const isSelected = activeSpot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveSpot(spot)}
                    aria-label={`Inspect ${spot.label}`}
                    aria-pressed={isSelected}
                    style={{
                      left: `${spot.xPercent}%`,
                      top: `${spot.yPercent}%`,
                    }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border font-display text-xs transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'scale-125 border-[#F3FFF1] bg-[#B6F36A] text-[#020D07] shadow-[0_0_20px_#B6F36A]'
                        : 'border-[#B6F36A]/80 bg-[#041A0F]/90 text-[#F3FFF1] hover:scale-110 hover:border-[#D4FF9A] hover:bg-[#1D6B3A]'
                    }`}
                  >
                    <span className="tabular-nums font-medium">{index + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 4 Columns: Active Hotspot Detail Inspector + Quick Selector List */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/75 p-6 sm:p-8">
            <div aria-live="polite" data-testid="anatomy-detail-panel">
              <div className="flex items-center justify-between text-xs font-display uppercase tracking-[0.16em] text-[#B6F36A]">
                <span>ANATOMICAL SYSTEM</span>
                {activeSpot.isEstimate && (
                  <span className="text-[#F3FFF1]/65">ESTIMATE</span>
                )}
              </div>

              <h3 className="mt-2 font-display text-2xl sm:text-3xl uppercase tracking-[0.03em] text-[#F3FFF1]">
                {activeSpot.label}
              </h3>

              <p className="mt-1 font-display text-xs uppercase tracking-[0.1em] text-[#D4FF9A]/90">
                {activeSpot.summary}
              </p>

              <p className="mt-5 pt-5 border-t border-[#F3FFF1]/15 font-body text-base text-[#F3FFF1]/90 leading-[1.72]">
                {activeSpot.detail}
              </p>

              {activeSpot.citation && (
                <p className="mt-4 font-display text-xs uppercase tracking-[0.12em] text-[#F3FFF1]/60">
                  Reference: {activeSpot.citation}
                </p>
              )}
            </div>

            {/* Quick Button Strip for Keyboard/Touch Selection of All 11 Systems */}
            <div className="mt-8 pt-5 border-t border-[#F3FFF1]/15">
              <p className="font-display text-[11px] uppercase tracking-[0.16em] text-[#F3FFF1]/60 mb-3">
                SELECT SYSTEM ({ANATOMY_HOTSPOTS.length} MARKERS)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ANATOMY_HOTSPOTS.map((spot, idx) => {
                  const isSelected = activeSpot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveSpot(spot)}
                      className={`px-2.5 py-1.5 rounded-lg font-body text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-[#B6F36A] text-[#020D07] font-medium'
                          : 'bg-[#041A0F]/80 text-[#F3FFF1]/80 hover:bg-[#0F4A2A] hover:text-[#F3FFF1]'
                      }`}
                    >
                      {idx + 1}. {spot.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
