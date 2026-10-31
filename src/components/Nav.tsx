import React from 'react';

interface NavProps {
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
  visible: boolean;
  isScrolled?: boolean;
}

export const Nav: React.FC<NavProps> = ({
  onOpenMenu,
  onNavigateSection,
  visible,
  isScrolled = false,
}) => {
  return (
    <>
      {/* Smooth atmospheric fade veil below/behind the header when scrolling */}
      <div
        aria-hidden="true"
        data-testid="header-fade-veil"
        className={`pointer-events-none fixed inset-x-0 top-0 h-28 sm:h-32 z-[44] scrolled-header-fade-veil transition-opacity duration-500 ease-out ${
          visible && isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <header
        data-testid="site-header"
        data-scrolled={isScrolled ? 'true' : 'false'}
        className={`pointer-events-auto fixed left-2.5 right-2.5 sm:left-3.5 sm:right-3.5 top-2.5 sm:top-3.5 z-[45] flex items-center justify-between px-6 sm:px-8 transition-all duration-500 ease-out ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${isScrolled ? 'py-4 sm:py-5' : 'py-5 sm:py-6'}`}
      >
        {/* Lighter sunlit forest header surface with smooth bottom fade */}
        <div
          aria-hidden="true"
          data-testid="header-surface"
          className={`pointer-events-none absolute inset-x-0 top-0 -bottom-6 rounded-t-[20px] sm:rounded-t-[24px] rounded-b-[16px] scrolled-forest-header border-t border-x border-[#B6F36A]/25 transition-opacity duration-500 ease-out ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Left: Brand Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('hero');
          }}
          className="relative z-10 font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#F3FFF1] whitespace-nowrap shrink-0 transition-all duration-300 hover:text-[#D4FF9A] hover:drop-shadow-[0_0_12px_rgba(182,243,106,0.6)]"
        >
          TYRANNOSAURUS
        </a>

        {/* Centre: MENU with thin 1px white line (~80px wide) above it, dead-centre */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          className="group absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-[#F3FFF1] whitespace-nowrap shrink-0"
        >
          <span
            aria-hidden="true"
            className="block h-[1px] w-16 sm:w-20 bg-[#F3FFF1]/90 transition-all duration-300 group-hover:w-28 group-hover:bg-[#D4FF9A] group-hover:shadow-[0_0_10px_rgba(182,243,106,0.8)]"
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
          className="relative z-10 font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#F3FFF1] whitespace-nowrap shrink-0 transition-all duration-300 hover:text-[#D4FF9A] hover:drop-shadow-[0_0_12px_rgba(182,243,106,0.6)]"
        >
          CONTACT
        </a>
      </header>
    </>
  );
};


