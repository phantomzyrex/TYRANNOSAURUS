import React from 'react';

interface NavProps {
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
  visible: boolean;
}

export const Nav: React.FC<NavProps> = ({ onOpenMenu, onNavigateSection, visible }) => {
  return (
    <header
      className={`pointer-events-auto absolute inset-x-0 top-0 z-40 flex items-start justify-between px-6 sm:px-8 pt-5 sm:pt-7 transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Left: Brand Name */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          onNavigateSection('hero');
        }}
        className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#F3FFF1] whitespace-nowrap shrink-0 transition-all duration-300 hover:text-[#D4FF9A] hover:drop-shadow-[0_0_12px_rgba(182,243,106,0.6)]"
      >
        TYRANNOSAURUS
      </a>

      {/* Centre: MENU with thin 1px white line (~80px wide) above it */}
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-[#F3FFF1] whitespace-nowrap shrink-0"
      >
        <span
          aria-hidden="true"
          className="block h-[1px] w-16 sm:w-20 bg-[#F3FFF1]/85 transition-all duration-300 group-hover:w-28 group-hover:bg-[#D4FF9A] group-hover:shadow-[0_0_10px_rgba(182,243,106,0.8)]"
        />
        <span className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] transition-all duration-300 group-hover:text-[#D4FF9A] group-hover:drop-shadow-[0_0_12px_rgba(182,243,106,0.65)]">
          MENU
        </span>
      </button>

      {/* Right: CONTACT */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          onNavigateSection('contact');
        }}
        className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#F3FFF1] whitespace-nowrap shrink-0 transition-all duration-300 hover:text-[#D4FF9A] hover:drop-shadow-[0_0_12px_rgba(182,243,106,0.6)]"
      >
        CONTACT
      </a>
    </header>
  );
};
