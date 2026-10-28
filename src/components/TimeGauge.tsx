import React from 'react';
import { calculateMyaFromScroll } from '../utils/paleoLogic';

interface TimeGaugeProps {
  scrollProgress: number;
}

export const TimeGauge: React.FC<TimeGaugeProps> = ({ scrollProgress }) => {
  const { formatted, isKPgBoundary } = calculateMyaFromScroll(scrollProgress);
  const clampedPct = Math.max(0, Math.min(100, scrollProgress * 100));

  return (
    <aside
      aria-label="Geological Time Gauge"
      data-testid="time-gauge"
      className="pointer-events-none fixed right-6 sm:right-9 top-1/2 z-40 -translate-y-1/2 hidden sm:flex flex-col items-end gap-2.5 rounded-xl bg-[#020D07]/55 px-3 py-3.5 border border-[#F3FFF1]/10"
    >
      <div className="font-display text-[10px] uppercase tracking-[0.18em] text-[#F3FFF1]/75 whitespace-nowrap">
        68.0 MYA
      </div>

      <div className="relative h-32 w-[1px] bg-[#F3FFF1]/25 mr-1">
        <div
          className="absolute left-0 top-0 w-full bg-[#B6F36A] transition-all duration-150"
          style={{ height: `${clampedPct}%` }}
        />
        <div
          className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-[#D4FF9A] shadow-[0_0_8px_#B6F36A] transition-all duration-150"
          style={{ top: `calc(${clampedPct}% - 3px)` }}
        />
      </div>

      <div className="text-right">
        <div
          data-testid="time-gauge-readout"
          className="font-display text-xs uppercase tracking-[0.12em] text-[#D4FF9A] tabular-nums whitespace-nowrap"
        >
          {formatted}
        </div>
        <div
          className={`font-display text-[10px] uppercase tracking-[0.16em] whitespace-nowrap transition-colors ${
            isKPgBoundary ? 'text-[#B6F36A]' : 'text-[#F3FFF1]/55'
          }`}
        >
          66.0 MYA · K–Pg
        </div>
      </div>
    </aside>
  );
};
