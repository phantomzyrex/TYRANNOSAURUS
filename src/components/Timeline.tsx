import React, { useState } from 'react';
import { DISCOVERY_TIMELINE } from '../utils/paleoLogic';

export const Timeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('1905');

  return (
    <section
      id="discovery"
      aria-labelledby="discovery-heading"
      className="relative bg-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-[#F3FFF1]/15">
          <div className="flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              03
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                CHRONOLOGY · 1892 TO PRESENT
              </p>
              <h2
                id="discovery-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Discovery and History
              </h2>
            </div>
          </div>
          <p className="font-body text-base text-[#F3FFF1]/75 max-w-md">
            Over a century of paleontological excavations across the North American Badlands — from
            early fragmentary vertebrae to preserved soft tissue and record-setting skeletons.
          </p>
        </div>

        {/* Vertical Timeline with Animated Draw-Line */}
        <div className="relative mt-16 pl-6 sm:pl-10 md:pl-0">
          {/* Central / Left Vertical Line */}
          <div
            aria-hidden="true"
            data-timeline-spine="true"
            className="absolute left-2 sm:left-4 md:left-1/2 top-2 bottom-2 w-[1px] -translate-x-1/2 origin-top bg-gradient-to-b from-[#B6F36A] via-[#5DBB4B]/60 to-[#1D6B3A]/30"
          />

          <div className="space-y-10">
            {DISCOVERY_TIMELINE.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const isSelected = selectedYear === item.year;
              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Node Marker on Vertical Line */}
                  <button
                    type="button"
                    onClick={() => setSelectedYear(item.year)}
                    aria-label={`Select timeline year ${item.year}: ${item.title}`}
                    className={`absolute -left-4 sm:-left-6 md:left-1/2 top-5 z-10 h-4 w-4 -translate-x-1/2 rounded-full border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'scale-125 border-[#D4FF9A] bg-[#B6F36A] shadow-[0_0_16px_#B6F36A]'
                        : 'border-[#B6F36A]/70 bg-[#041A0F] hover:bg-[#5DBB4B]'
                    }`}
                  />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-[46%] ${
                      isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'
                    }`}
                  >
                    <div
                      onClick={() => setSelectedYear(item.year)}
                      className={`rounded-2xl border p-6 transition-colors duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-[#B6F36A]/65 bg-[#082E1B]/90'
                          : 'border-[#F3FFF1]/12 bg-[#082E1B]/45 hover:border-[#F3FFF1]/30'
                      }`}
                    >
                      <div
                        className={`flex items-baseline gap-3 ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="font-display text-2xl sm:text-3xl text-[#D4FF9A] tabular-nums">
                          {item.year}
                        </span>
                        <span aria-hidden="true" className="text-[#F3FFF1]/35">
                          ·
                        </span>
                        <span className="font-display text-xs uppercase tracking-[0.14em] text-[#B6F36A]/85">
                          {item.specimenOrCitation}
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-lg sm:text-xl uppercase tracking-[0.03em] text-[#F3FFF1]">
                        {item.title}
                      </h3>

                      <p className="mt-2 font-body text-[15px] sm:text-base text-[#F3FFF1]/85 leading-[1.68]">
                        {item.description}
                      </p>
                    </div>
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
