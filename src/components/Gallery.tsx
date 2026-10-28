import React, { useEffect, useRef, useState } from 'react';
import { GALLERY_ITEMS, GalleryItem, HERO_IMAGE_PATH } from '../utils/paleoLogic';

export const Gallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [availableCustomImages, setAvailableCustomImages] = useState<Record<string, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  // Check if the user has dropped real image files into public/assets/gallery-01.jpg ... gallery-06.jpg
  useEffect(() => {
    let active = true;
    GALLERY_ITEMS.forEach((item) => {
      fetch(item.src, { method: 'HEAD' })
        .then((res) => {
          const contentType = res.headers.get('content-type') || '';
          if (active && res.ok && contentType.startsWith('image/')) {
            setAvailableCustomImages((prev) => ({ ...prev, [item.id]: true }));
          }
        })
        .catch(() => {
          // Keep clearly labelled placeholder active
        });
    });
    return () => {
      active = false;
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    dragStartX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollStartLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.4;
    scrollContainerRef.current.scrollLeft = scrollStartLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scrollByAmount = (delta: number) => {
    scrollContainerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative bg-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#F3FFF1]/15">
          <div className="flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              11
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                EXHIBITION ARCHIVE · DRAG OR CLICK TO INSPECT
              </p>
              <h2
                id="gallery-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Specimen &amp; Forest Gallery
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByAmount(-420)}
              aria-label="Scroll gallery left"
              className="px-4 py-2 rounded-lg border border-[#F3FFF1]/20 bg-[#082E1B]/70 font-display text-xs uppercase tracking-[0.12em] text-[#F3FFF1] hover:border-[#B6F36A] cursor-pointer whitespace-nowrap shrink-0"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(420)}
              aria-label="Scroll gallery right"
              className="px-4 py-2 rounded-lg border border-[#F3FFF1]/20 bg-[#082E1B]/70 font-display text-xs uppercase tracking-[0.12em] text-[#F3FFF1] hover:border-[#B6F36A] cursor-pointer whitespace-nowrap shrink-0"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Horizontal Drag-Scroll Strip */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`no-scrollbar mt-12 flex gap-6 overflow-x-auto pb-6 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {GALLERY_ITEMS.map((item, idx) => {
            const hasCustomImg = !!availableCustomImages[item.id];
            return (
              <article
                key={item.id}
                className="group relative w-[310px] sm:w-[400px] shrink-0 rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/50 overflow-hidden flex flex-col justify-between transition-colors hover:border-[#B6F36A]/60"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#020D07]">
                  {hasCustomImg ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="creature-graded h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Forest-graded SVG + Hero Cutout Specimen Placeholder Plate when /assets/gallery-0X.jpg is not yet dropped in */
                    <div className="relative h-full w-full flex flex-col items-center justify-center p-6 hero-forest-gradient">
                      <div className="hero-vignette absolute inset-0" />
                      {/* Decorative Prehistoric Fern Silhouette in SVG */}
                      <svg
                        viewBox="0 0 200 120"
                        className="pointer-events-none absolute inset-0 h-full w-full opacity-25 fill-[#020D07]"
                        aria-hidden="true"
                      >
                        <path d="M0,120 C30,70 70,50 115,35 C75,65 45,90 25,120 Z" />
                        <path d="M200,120 C165,65 130,45 85,30 C125,60 155,85 175,120 Z" />
                      </svg>
                      <img
                        src={HERO_IMAGE_PATH}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="creature-graded relative z-10 h-36 w-auto object-contain opacity-90 transition-transform duration-500 group-hover:scale-105"
                        style={{
                          transform: `scale(${1 + (idx % 3) * 0.12}) translateX(${
                            (idx % 2 === 0 ? -1 : 1) * 10
                          }px)`,
                        }}
                      />
                      <span className="relative z-10 mt-2 font-display text-[10px] uppercase tracking-[0.18em] text-[#D4FF9A]/85">
                        PLACEHOLDER · {item.src}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-display text-[11px] uppercase tracking-[0.16em] text-[#B6F36A]">
                      {item.specimen}
                    </div>
                    <h3 className="mt-1.5 font-display text-lg uppercase text-[#F3FFF1]">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-sm text-[#F3FFF1]/80 leading-[1.6]">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#F3FFF1]/10 flex items-center justify-between">
                    <span className="font-display text-[11px] uppercase tracking-[0.12em] text-[#F3FFF1]/55">
                      {item.src}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLightboxItem(item)}
                      aria-label={`Open lightbox for ${item.title}`}
                      className="font-display text-xs uppercase tracking-[0.14em] text-[#D4FF9A] hover:underline cursor-pointer bg-transparent border-0 p-0 whitespace-nowrap shrink-0"
                    >
                      Inspect Plate →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020D07]/95 p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-2xl border border-[#B6F36A]/40 bg-[#041A0F] p-6 sm:p-10 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#F3FFF1]/15">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.18em] text-[#B6F36A]">
                  {lightboxItem.specimen}
                </p>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl uppercase text-[#F3FFF1]">
                  {lightboxItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close lightbox"
                className="px-4 py-2 rounded-lg border border-[#F3FFF1]/25 bg-[#082E1B] font-display text-xs uppercase tracking-[0.14em] text-[#F3FFF1] hover:border-[#B6F36A] cursor-pointer whitespace-nowrap shrink-0"
              >
                Close ✕
              </button>
            </div>

            <div className="my-6 relative h-72 sm:h-96 w-full rounded-xl overflow-hidden hero-forest-gradient flex items-center justify-center">
              <div className="hero-vignette absolute inset-0" />
              {availableCustomImages[lightboxItem.id] ? (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="creature-graded relative z-10 max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                  <img
                    src={HERO_IMAGE_PATH}
                    alt={lightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="creature-graded max-h-64 w-auto object-contain"
                  />
                  <span className="mt-3 font-display text-xs uppercase tracking-[0.18em] text-[#D4FF9A]">
                    PLACEHOLDER · DROP IMAGE AT public{lightboxItem.src}
                  </span>
                </div>
              )}
            </div>

            <p className="font-body text-base text-[#F3FFF1]/90 leading-[1.7]">
              {lightboxItem.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
