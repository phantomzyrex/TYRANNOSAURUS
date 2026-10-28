/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  SECTION_CHAPTERS,
  resolveNextSectionIndex,
} from './utils/paleoLogic';
import { GlobalForestSvgFilters } from './components/ForestAtmosphere';
import { Hero } from './components/Hero';
import { MenuOverlay } from './components/MenuOverlay';
import { TimeGauge } from './components/TimeGauge';
import { Overview } from './components/Overview';
import { Timeline } from './components/Timeline';
import { AnatomyHotspots } from './components/AnatomyHotspots';
import { SizeCompare } from './components/SizeCompare';
import { Diet } from './components/Diet';
import { Map } from './components/Map';
import { Taxonomy } from './components/Taxonomy';
import { GrowthExtinction } from './components/GrowthExtinction';
import { MythReality } from './components/MythReality';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [loadProgress, setLoadProgress] = useState<number>(() => {
    if (typeof window === 'undefined') return 100;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return 100;
    return 0;
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const params = new URLSearchParams(window.location.search);
    return (
      params.get('autostart') === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [roarTrigger, setRoarTrigger] = useState(0);
  const [cursorState, setCursorState] = useState<{
    x: number;
    y: number;
    hovered: boolean;
    visible: boolean;
  }>({ x: -100, y: -100, hovered: false, visible: false });

  const lenisRef = useRef<Lenis | null>(null);
  const activeSectionIndexRef = useRef<number>(0);
  const keyboardLockUntilRef = useRef<number>(0);

  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Minimal vine-line loader (0 -> 100 rapid editorial intro)
  useEffect(() => {
    if (isLoaded) {
      setLoadProgress(100);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 520; // Fast, crisp 520ms vine counter

    const step = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
      setLoadProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(step);
      } else {
        setIsLoaded(true);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isLoaded]);

  // Lenis smooth scrolling + scroll progress & active chapter tracking
  useEffect(() => {
    const updateScrollState = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(Math.max(0, Math.min(1, progress)));

      // Skip scroll-derived index overrides while a keyboard jump is in flight
      if (performance.now() < keyboardLockUntilRef.current) return;

      const viewportTriggerY = window.innerHeight * 0.38;
      let detectedIdx = 0;
      for (let i = 0; i < SECTION_CHAPTERS.length; i++) {
        const el = document.getElementById(SECTION_CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportTriggerY) {
            detectedIdx = i;
          }
        }
      }
      activeSectionIndexRef.current = detectedIdx;
      setActiveSectionIndex(detectedIdx);
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    if (reducedMotion) {
      return () => window.removeEventListener('scroll', updateScrollState);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      updateScrollState();
    });

    const updateLenisTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenisTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      gsap.ticker.remove(updateLenisTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // GSAP ScrollTrigger choreography + IntersectionObserver section transitions
  useEffect(() => {
    if (reducedMotion || !isLoaded) return;

    // 1. IntersectionObserver for active section illumination (stroke & atmosphere transition)
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section, main footer')
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-section-inview', 'true');
          } else {
            entry.target.setAttribute('data-section-inview', 'false');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );
    sections.forEach((sec) => observer.observe(sec));

    // 2. GSAP ScrollTrigger animations (compositor-friendly transform & opacity)
    const ctx = gsap.context(() => {
      // Outlined section numbers: vertical parallax scrub
      const sectionNums = gsap.utils.toArray<HTMLElement>('.section-num-outline');
      sectionNums.forEach((numEl) => {
        gsap.fromTo(
          numEl,
          { yPercent: 18 },
          {
            yPercent: -16,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: numEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });

      // Section Headings + Eyebrows smooth upward reveal
      const headings = gsap.utils.toArray<HTMLElement>('section h2, footer h2');
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) return;
        gsap.fromTo(
          heading,
          { y: 24, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: heading,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Progressive vertical timeline spine draw in Section 03
      const timelineSpine = document.querySelector<HTMLElement>(
        '[data-timeline-spine="true"]'
      );
      if (timelineSpine) {
        gsap.fromTo(
          timelineSpine,
          { scaleY: 0.08 },
          {
            scaleY: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: timelineSpine.parentElement || timelineSpine,
              start: 'top 80%',
              end: 'bottom 35%',
              scrub: 0.5,
            },
          }
        );
      }

      // Staggered editorial cards, timeline milestones, and specimen panels per section
      const contentSections = gsap.utils.toArray<HTMLElement>(
        'main section:not(#hero), main footer section'
      );
      contentSections.forEach((sectionEl) => {
        const cards = Array.from(
          sectionEl.querySelectorAll<HTMLElement>(
            'article, .space-y-10 > div, .rounded-2xl'
          )
        ).filter((el) => {
          // Avoid nesting duplicate animations when a .rounded-2xl is inside an animated parent
          return !el.parentElement?.closest('article, .space-y-10 > div, .rounded-2xl');
        });

        cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.94) return;
          gsap.fromTo(
            card,
            { y: 28, opacity: 0.18, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              delay: (idx % 3) * 0.07,
              ease: 'power3.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: card,
                start: 'top 93%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      // Monumental Shivang Studios footer signature reveal
      const footerSignature = document.querySelector<HTMLElement>(
        '[data-testid="shivang-studios-signature"]'
      );
      if (footerSignature) {
        const rect = footerSignature.getBoundingClientRect();
        if (rect.top >= window.innerHeight * 0.95) {
          gsap.fromTo(
            footerSignature,
            { y: 32, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: 'power3.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: footerSignature,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    });

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [reducedMotion, isLoaded]);

  // Desktop custom cursor ring
  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive =
        !!target?.closest('a, button, [role="button"], img');
      setCursorState({
        x: e.clientX,
        y: e.clientY,
        hovered: interactive,
        visible: true,
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  const jumpToSectionIndex = useCallback(
    (targetIdx: number) => {
      const clampedIdx = Math.max(
        0,
        Math.min(SECTION_CHAPTERS.length - 1, targetIdx)
      );
      const chapter = SECTION_CHAPTERS[clampedIdx];
      if (!chapter) return;

      activeSectionIndexRef.current = clampedIdx;
      setActiveSectionIndex(clampedIdx);
      keyboardLockUntilRef.current = performance.now() + 1150;

      const smoothEase = (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t));

      if (clampedIdx === 0) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, {
            duration: 1.15,
            easing: smoothEase,
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: reducedMotion ? 'auto' : 'smooth',
          });
        }
        setScrollProgress(0);
        setRoarTrigger((c) => c + 1);
        return;
      }

      const el = document.getElementById(chapter.id);
      if (!el) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, {
          duration: 1.15,
          easing: smoothEase,
        });
      } else {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion]
  );

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const idx = SECTION_CHAPTERS.findIndex((c) => c.id === sectionId);
      if (idx !== -1) {
        jumpToSectionIndex(idx);
      }
    },
    [jumpToSectionIndex]
  );

  // Global keyboard navigation: Arrow keys (Up/Down/Left/Right) and Space / Shift+Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (menuOpen) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase() || '';

      // Do not hijack typing inside inputs, textareas, selects, or contenteditable
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target?.isContentEditable
      ) {
        return;
      }

      // If Space is pressed while a button or link has keyboard focus, allow native click activation
      const isSpaceKey =
        e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space';
      if (
        isSpaceKey &&
        (tagName === 'button' ||
          tagName === 'a' ||
          target?.getAttribute('role') === 'button')
      ) {
        return;
      }

      // Do not hijack keys if a dialog/lightbox modal is open
      if (document.querySelector('[role="dialog"]')) {
        return;
      }

      const nextIdx = resolveNextSectionIndex(
        activeSectionIndexRef.current,
        isSpaceKey ? ' ' : e.key,
        e.shiftKey,
        SECTION_CHAPTERS.length
      );

      if (nextIdx !== null) {
        e.preventDefault();
        jumpToSectionIndex(nextIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, jumpToSectionIndex]);

  return (
    <div className="relative min-h-screen bg-[#020D07] text-[#F3FFF1]">
      {/* Global SVG Filters */}
      <GlobalForestSvgFilters />

      {/* Top Canopy Smooth Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px] bg-[#020D07]/40 overflow-hidden"
      >
        <div
          data-testid="scroll-progress-bar"
          className="h-full origin-left bg-gradient-to-r from-[#5DBB4B] via-[#B6F36A] to-[#D4FF9A] shadow-[0_0_10px_#B6F36A] transition-transform duration-150 ease-out"
          style={{
            transform: `scaleX(${Math.max(0, Math.min(1, scrollProgress))})`,
          }}
        />
      </div>

      {/* 7. Fine Film Grain (about 4% opacity) over everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(243, 255, 241, 0.75) 0.75px, transparent 0.75px), radial-gradient(rgba(182, 243, 106, 0.5) 0.75px, #020D07 0.75px)',
          backgroundSize: '6px 6px',
          backgroundPosition: '0 0, 3px 3px',
        }}
      />

      {/* Custom Translucent Desktop Cursor Ring */}
      {!reducedMotion && cursorState.visible && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-50 hidden lg:block rounded-full border transition-[width,height,border-color,background-color] duration-150 -translate-x-1/2 -translate-y-1/2 ${
            cursorState.hovered
              ? 'h-12 w-12 border-[#D4FF9A] bg-[#B6F36A]/15'
              : 'h-6 w-6 border-[#F3FFF1]/45 bg-transparent'
          }`}
          style={{
            transform: `translate3d(${cursorState.x}px, ${cursorState.y}px, 0) translate(-50%, -50%)`,
          }}
        />
      )}

      {/* Minimal Vine-Line Page Loader (fades out once loadProgress === 100) */}
      {!isLoaded && (
        <div
          aria-label="Loading Late Cretaceous Canopy"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020D07] text-[#F3FFF1]"
        >
          <div className="relative h-32 w-[1px] bg-[#F3FFF1]/15 overflow-hidden">
            <div
              className="absolute bottom-0 left-0 w-full bg-[#B6F36A] transition-all duration-75"
              style={{ height: `${loadProgress}%` }}
            />
          </div>
          <div className="mt-4 font-display text-sm uppercase tracking-[0.24em] text-[#D4FF9A] tabular-nums">
            {loadProgress}%
          </div>
        </div>
      )}

      {/* Full-Screen Menu Overlay */}
      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectSection={scrollToSection}
      />

      {/* Right-Edge Geological Time Gauge & Deep-Dive Chapter Navigation */}
      <TimeGauge
        scrollProgress={scrollProgress}
        activeSectionIndex={activeSectionIndex}
        onJumpToIndex={jumpToSectionIndex}
      />

      {/* Main Content */}
      <main>
        {/* 01 HERO */}
        <Hero
          onOpenMenu={() => setMenuOpen(true)}
          onNavigateSection={scrollToSection}
          reducedMotion={reducedMotion}
          isLoaded={isLoaded}
          scrollProgress={scrollProgress}
          roarTrigger={roarTrigger}
        />

        {/* 02 OVERVIEW */}
        <Overview />

        {/* 03 DISCOVERY AND HISTORY */}
        <Timeline />

        {/* 04 ANATOMY */}
        <AnatomyHotspots />

        {/* 05 SIZE COMPARISON */}
        <SizeCompare />

        {/* 06 DIET AND HUNTING */}
        <Diet />

        {/* 07 HABITAT AND DISTRIBUTION */}
        <Map />

        {/* 08 CLASSIFICATION AND SPECIES */}
        <Taxonomy />

        {/* 09 GROWTH, EVOLUTION AND EXTINCTION */}
        <GrowthExtinction />

        {/* 10 MYTH VS REALITY */}
        <MythReality />

        {/* 11 GALLERY */}
        <Gallery />

        {/* 12 FAST FACTS & SOURCES + 13 CONTACT & FOOTER */}
        <Footer onReturnToCanopy={() => scrollToSection('hero')} />
      </main>
    </div>
  );
}
