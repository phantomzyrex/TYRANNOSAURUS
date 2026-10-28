import React, { useEffect } from 'react';
import { HERO_IMAGE_PATH } from '../utils/paleoLogic';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
}

const MENU_LINKS = [
  { num: '01', id: 'hero', label: 'Canopy (Hero)' },
  { num: '02', id: 'overview', label: 'Overview' },
  { num: '03', id: 'discovery', label: 'Discovery & History' },
  { num: '04', id: 'anatomy', label: 'Anatomy' },
  { num: '05', id: 'size', label: 'Size Comparison' },
  { num: '06', id: 'diet', label: 'Diet & Hunting' },
  { num: '07', id: 'habitat', label: 'Habitat & Distribution' },
  { num: '08', id: 'classification', label: 'Classification & Species' },
  { num: '09', id: 'growth', label: 'Growth, Evolution & Extinction' },
  { num: '10', id: 'myths', label: 'Myth vs Reality' },
  { num: '11', id: 'gallery', label: 'Gallery' },
  { num: '12', id: 'facts', label: 'Fast Facts & Sources' },
  { num: '13', id: 'contact', label: 'Contact' },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  onSelectSection,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site chapter navigation"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#04150C] px-6 py-6 sm:px-12 sm:py-8 text-[#F3FFF1]"
    >
      {/* Top Bar inside Overlay */}
      <div className="flex items-start justify-between">
        <span className="font-display text-sm sm:text-base uppercase tracking-[0.08em] text-[#F3FFF1]/80">
          TYRANNOSAURUS · MONOGRAPH INDEX
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-[#F3FFF1]"
        >
          <span
            aria-hidden="true"
            className="block h-[1px] w-20 bg-[#F3FFF1] transition-all duration-300 group-hover:w-28 group-hover:bg-[#B6F36A]"
          />
          <span className="font-display text-sm sm:text-base uppercase tracking-[0.08em] group-hover:text-[#B6F36A]">
            CLOSE
          </span>
        </button>

        <span className="font-display text-sm uppercase tracking-[0.08em] text-[#B6F36A]/80 hidden sm:inline">
          68.0 — 66.0 MYA
        </span>
      </div>

      {/* Main Content: Numbered Links + Small Creature Specimen Preview */}
      <div className="mx-auto my-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 overflow-y-auto max-h-[80vh]">
        <nav
          aria-label="Chapter index"
          className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3"
        >
          {MENU_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectSection(item.id);
                onClose();
              }}
              className="group flex items-baseline gap-4 border-b border-[#F3FFF1]/10 py-2.5 transition-colors hover:border-[#B6F36A]/60"
            >
              <span className="font-display text-xs sm:text-sm tracking-[0.12em] text-[#B6F36A]/70 tabular-nums">
                {item.num}
              </span>
              <span className="font-display text-lg sm:text-2xl uppercase tracking-[0.04em] text-[#F3FFF1] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#D4FF9A]">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Small Forest-Graded Copy of Creature Image */}
        <div className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center rounded-2xl border border-[#F3FFF1]/10 bg-[#082E1B]/40 p-6 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 50% 20%, rgba(182,243,106,0.35), transparent 70%)',
            }}
          />
          <img
            src={HERO_IMAGE_PATH}
            alt="Tyrannosaurus rex specimen silhouette"
            referrerPolicy="no-referrer"
            className="creature-graded relative z-10 max-h-64 w-auto object-contain"
          />
          <p className="mt-4 font-display text-xs uppercase tracking-[0.14em] text-[#F3FFF1]/70 text-center">
            LATE CRETACEOUS · MAASTRICHTIAN
          </p>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between border-t border-[#F3FFF1]/10 pt-4 text-xs text-[#F3FFF1]/55">
        <span>PRESS ESC TO CLOSE</span>
        <span>HELL CREEK &amp; LARAMIDIA ARCHIVE</span>
      </div>
    </div>
  );
};
