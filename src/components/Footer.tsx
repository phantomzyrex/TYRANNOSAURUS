import React from 'react';
import { FAST_FACTS, SCIENTIFIC_SOURCES } from '../utils/paleoLogic';

interface FooterProps {
  onReturnToCanopy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReturnToCanopy }) => {
  return (
    <>
      {/* 12 FAST FACTS AND SOURCES */}
      <section
        id="facts"
        aria-labelledby="facts-heading"
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
                12
              </span>
              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                  VERIFIED COMPENDIUM · BIBLIOGRAPHY
                </p>
                <h2
                  id="facts-heading"
                  className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
                >
                  Fast Facts and Sources
                </h2>
              </div>
            </div>
            <p className="font-body text-base text-[#F3FFF1]/80 max-w-md">
              Eight key paleobiological takeaways alongside primary peer-reviewed literature and
              institutional collections.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 6 Columns: 8 "Did You Know" Fast Facts */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-display text-sm uppercase tracking-[0.18em] text-[#B6F36A] mb-4">
                DID YOU KNOW — 8 VERIFIED FACTS
              </h3>
              <ol className="space-y-4">
                {FAST_FACTS.map((fact, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 rounded-xl border border-[#F3FFF1]/12 bg-[#041A0F]/90 p-5"
                  >
                    <span className="font-display text-sm text-[#D4FF9A] tabular-nums shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="font-body text-[15px] text-[#F3FFF1]/90 leading-[1.68]">
                      {fact}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right 6 Columns: Primary Literature & Museum Sources */}
            <div className="lg:col-span-6">
              <h3 className="font-display text-sm uppercase tracking-[0.18em] text-[#B6F36A] mb-4">
                PRIMARY LITERATURE &amp; MUSEUM ARCHIVES
              </h3>
              <div className="rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F]/90 p-6 sm:p-8 divide-y divide-[#F3FFF1]/10">
                {SCIENTIFIC_SOURCES.map((src) => (
                  <div key={src.citation} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="font-display text-sm text-[#D4FF9A]">{src.citation}</div>
                    <div className="mt-0.5 font-body text-sm text-[#F3FFF1]/75">{src.focus}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13 CONTACT AND SHIVANG STUDIOS SIGNATURE FOOTER */}
      <footer
        id="contact"
        aria-labelledby="contact-heading"
        className="relative overflow-hidden bg-[#020D07] pt-24 pb-16 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/15"
      >
        {/* Subtle Forest Grid & Spore Constellation Background matching reference image in forest palette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(182, 243, 106, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(182, 243, 106, 0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 700"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Subtle spore constellation lines */}
          <g stroke="rgba(182, 243, 106, 0.22)" strokeWidth="1" fill="none">
            <polyline points="240,80 285,110 250,135 240,80" />
            <polyline points="830,180 880,145 945,215 920,265 830,180" />
            <polyline points="415,430 445,355 475,415 415,430" />
            <line x1="880" y1="145" x2="915" y2="65" />
          </g>
          {/* Glowing spore nodes */}
          <g fill="#B6F36A">
            <circle cx="240" cy="80" r="2.5" opacity="0.6" />
            <circle cx="285" cy="110" r="1.8" opacity="0.4" />
            <circle cx="585" cy="210" r="2.2" opacity="0.5" />
            <circle cx="830" cy="180" r="2.8" opacity="0.65" />
            <circle cx="880" cy="145" r="2.2" opacity="0.55" />
            <circle cx="945" cy="215" r="2" opacity="0.45" />
            <circle cx="415" cy="430" r="2.5" opacity="0.6" />
            <circle cx="475" cy="415" r="1.8" opacity="0.5" />
            <circle cx="1270" cy="425" r="2" opacity="0.5" />
            <circle cx="1310" cy="665" r="2.5" opacity="0.55" />
            <circle cx="140" cy="295" r="3" opacity="0.5" />
          </g>
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-[92vw] xl:max-w-[1340px]">
          {/* Upper Contact Row: 13 LET'S TALK + Return to Canopy */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 border-b border-[#F3FFF1]/15">
            <div>
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="section-num-outline text-5xl sm:text-6xl leading-none"
                >
                  13
                </span>
                <span className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                  CURATORIAL INQUIRIES &amp; DIGITAL PORTFOLIO
                </span>
              </div>

              <h2
                id="contact-heading"
                className="mt-4 font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-[0.02em] text-[#F3FFF1] leading-none"
              >
                LET&apos;S TALK
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-6 font-body text-base">
                <a
                  href="mailto:techhelp.shivang@gmail.com"
                  className="text-[#D4FF9A] hover:underline"
                >
                  techhelp.shivang@gmail.com
                </a>
                <span aria-hidden="true" className="text-[#F3FFF1]/30">
                  ·
                </span>
                <a
                  href="https://github.com/phantomzyrex"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F3FFF1]/85 hover:text-[#D4FF9A] transition-colors"
                >
                  github.com/phantomzyrex
                </a>
                <span aria-hidden="true" className="text-[#F3FFF1]/30">
                  ·
                </span>
                <a
                  href="#overview"
                  className="text-[#F3FFF1]/80 hover:text-[#D4FF9A] transition-colors"
                >
                  Paleo-Dossier
                </a>
              </div>
            </div>

            {/* Return to the Canopy Button */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <button
                type="button"
                onClick={onReturnToCanopy}
                aria-label="Return to the canopy top of page"
                className="group px-6 py-3.5 rounded-xl border border-[#B6F36A]/60 bg-[#082E1B] font-display text-xs sm:text-sm uppercase tracking-[0.16em] text-[#F3FFF1] transition-all duration-300 hover:bg-[#B6F36A] hover:text-[#020D07] cursor-pointer whitespace-nowrap shrink-0"
              >
                ↑ Return to the canopy (68.0 MYA)
              </button>
              <span className="font-body text-xs text-[#F3FFF1]/55">
                Resets geological time gauge to Maastrichtian canopy
              </span>
            </div>
          </div>

          {/* Shivang Studios Signature Monumental Display Block — expanded sideways & bold geometric font */}
          <div className="pt-20 sm:pt-28 pb-16 sm:pb-24 flex flex-col items-center justify-center text-center select-none w-full overflow-hidden">
            <div
              data-testid="shivang-studios-wordmark"
              className="w-full font-extrabold text-[#F3FFF1] tracking-[-0.03em] leading-[0.95] whitespace-nowrap"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Jost', sans-serif",
                fontSize: 'clamp(2.5rem, 11.2vw, 10.6rem)',
                textShadow: '0 0 48px rgba(182, 243, 106, 0.20)',
              }}
            >
              Shivang Studios
            </div>
          </div>

          {/* Bottom Horizontal Hairline Divider & Signature Bar */}
          <div className="border-t border-[#F3FFF1]/15 pt-7 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
            {/* Left: Shivang Gupta · Created with heart by Shivang Studios */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-[#F3FFF1]/75">
              <span
                className="text-base sm:text-lg font-bold tracking-[-0.01em] text-[#F3FFF1]"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Jost', sans-serif" }}
              >
                Shivang Gupta
              </span>
              <span aria-hidden="true" className="text-[#F3FFF1]/35">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-[#F3FFF1]/75">
                <span>Created with</span>
                <svg
                  aria-label="love"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-[#B6F36A] drop-shadow-[0_0_8px_rgba(182,243,106,0.65)]"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>by Shivang Studios</span>
              </span>
            </div>

            {/* Right: GitHub & Email Links */}
            <nav
              aria-label="Footer studio navigation"
              className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 font-body text-sm text-[#F3FFF1]/75"
            >
              <a
                href="https://github.com/phantomzyrex"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D4FF9A] transition-colors whitespace-nowrap shrink-0"
              >
                GitHub
              </a>
              <a
                href="mailto:techhelp.shivang@gmail.com"
                className="hover:text-[#D4FF9A] transition-colors whitespace-nowrap shrink-0"
              >
                Email
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
};
