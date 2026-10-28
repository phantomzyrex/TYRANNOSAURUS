import React, { useState } from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';
import {
  SECTION_CHAPTERS,
  calculateMyaFromScroll,
} from '../utils/paleoLogic';

interface TimeGaugeProps {
  scrollProgress: number;
  activeSectionIndex: number;
  onJumpToIndex: (index: number) => void;
}

export const TimeGauge: React.FC<TimeGaugeProps> = ({
  scrollProgress,
  activeSectionIndex,
  onJumpToIndex,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { formatted, isKPgBoundary } = calculateMyaFromScroll(scrollProgress);
  const clampedPct = Math.max(0, Math.min(100, scrollProgress * 100));
  const currentChapter =
    SECTION_CHAPTERS[activeSectionIndex] || SECTION_CHAPTERS[0];

  return (
    <aside
      aria-label="Geological Time Gauge and Deep-Dive Chapter Navigation"
      data-testid="time-gauge"
      data-minimized={isMinimized ? 'true' : 'false'}
      className={`pointer-events-auto fixed right-4 sm:right-7 top-1/2 z-40 -translate-y-1/2 hidden sm:flex flex-col items-end rounded-xl bg-[#020D07]/75 border border-[#F3FFF1]/12 transition-all duration-200 ${
        isMinimized ? 'px-2.5 py-2.5 gap-1.5' : 'px-3.5 py-3.5 gap-2.5'
      }`}
    >
      {/* Header Row with Active Chapter Readout + Minimize/Expand Toggle */}
      <div
        className={`flex items-start justify-between gap-2.5 w-full ${
          isMinimized ? '' : 'border-b border-[#F3FFF1]/10 pb-2'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsMinimized((prev) => !prev)}
          data-testid="time-gauge-minimize-toggle"
          aria-expanded={!isMinimized}
          aria-label={isMinimized ? 'Expand time gauge' : 'Minimize time gauge'}
          title={isMinimized ? 'Expand time gauge' : 'Minimize time gauge'}
          className="p-1 rounded border border-[#F3FFF1]/15 bg-[#082E1B]/80 text-[#F3FFF1]/80 hover:text-[#B6F36A] hover:border-[#B6F36A] transition-colors cursor-pointer shrink-0"
        >
          {isMinimized ? (
            <Maximize2 className="w-3 h-3" />
          ) : (
            <Minimize2 className="w-3 h-3" />
          )}
        </button>

        <div
          data-testid="active-chapter-indicator"
          className="text-right"
        >
          <div className="font-display text-[10px] uppercase tracking-[0.16em] text-[#B6F36A] tabular-nums whitespace-nowrap">
            CH. {currentChapter.num} / 13
          </div>
          {!isMinimized && (
            <div className="font-display text-[11px] uppercase tracking-[0.08em] text-[#F3FFF1] whitespace-nowrap">
              {currentChapter.label}
            </div>
          )}
        </div>
      </div>

      {isMinimized ? (
        <div
          data-testid="time-gauge-readout"
          className="font-display text-[10px] uppercase tracking-[0.12em] text-[#D4FF9A] tabular-nums whitespace-nowrap"
        >
          {formatted}
        </div>
      ) : (
        <>
          <div className="font-display text-[10px] uppercase tracking-[0.18em] text-[#F3FFF1]/75 whitespace-nowrap">
            68.0 MYA
          </div>

          <div className="relative h-28 w-[1px] bg-[#F3FFF1]/25 mr-1">
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

          {/* Keyboard Deep-Dive Controls (Prev / Next Chapter + Shortcut Legend) */}
          <div className="pt-2 border-t border-[#F3FFF1]/10 flex flex-col items-end gap-1.5 w-full">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onJumpToIndex(Math.max(0, activeSectionIndex - 1))}
                disabled={activeSectionIndex <= 0}
                aria-label="Previous chapter (Up or Left Arrow)"
                className="px-2 py-1 rounded border border-[#F3FFF1]/15 bg-[#082E1B]/80 font-display text-[10px] text-[#F3FFF1] hover:border-[#B6F36A] disabled:opacity-35 cursor-pointer disabled:cursor-default whitespace-nowrap shrink-0"
              >
                ↑ Prev
              </button>
              <button
                type="button"
                onClick={() =>
                  onJumpToIndex(
                    Math.min(SECTION_CHAPTERS.length - 1, activeSectionIndex + 1)
                  )
                }
                disabled={activeSectionIndex >= SECTION_CHAPTERS.length - 1}
                aria-label="Next chapter (Down Arrow, Right Arrow, or Space)"
                className="px-2 py-1 rounded border border-[#F3FFF1]/15 bg-[#082E1B]/80 font-display text-[10px] text-[#F3FFF1] hover:border-[#B6F36A] disabled:opacity-35 cursor-pointer disabled:cursor-default whitespace-nowrap shrink-0"
              >
                ↓ Next
              </button>
            </div>
            <div
              data-testid="keyboard-nav-hint"
              className="font-display text-[9px] uppercase tracking-[0.14em] text-[#F3FFF1]/50 whitespace-nowrap"
            >
              ↑↓←→ · SPACE
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

