import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  HERO_IMAGE_PATH,
  ParallaxOffsets,
  calculateHeroParallax,
} from '../utils/paleoLogic';
import {
  ForestAtmosphereBack,
  ForestAtmosphereFront,
} from './ForestAtmosphere';
import { Nav } from './Nav';

interface HeroProps {
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
  reducedMotion: boolean;
  isLoaded: boolean;
  scrollProgress: number;
  roarTrigger?: number;
}

const WORDMARK_TEXT = 'TYRANNOSAURUS';
const ROAR_AUDIO_PATH = '/assets/aistudio/trex_roar_9d4618e9.mp3';

export const Hero: React.FC<HeroProps> = ({
  onOpenMenu,
  onNavigateSection,
  reducedMotion,
  isLoaded,
  scrollProgress,
  roarTrigger = 0,
}) => {
  const [parallax, setParallax] = useState<ParallaxOffsets>(() =>
    calculateHeroParallax(0, 0, true)
  );
  const [tremorCount, setTremorCount] = useState(0);
  const [isTremoring, setIsTremoring] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const shakeTimersRef = useRef<number[]>([]);
  const pendingGestureRetryRef = useRef<boolean>(false);

  const clearShakeTimers = () => {
    shakeTimersRef.current.forEach((id) => window.clearTimeout(id));
    shakeTimersRef.current = [];
  };

  // Pre-fetch and decode the roar audio buffer immediately on mount so it's ready with zero lag
  useEffect(() => {
    let cancelled = false;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (AudioCtx) {
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      fetch(ROAR_AUDIO_PATH)
        .then((r) => r.arrayBuffer())
        .then((buf) => ctx.decodeAudioData(buf))
        .then((decoded) => {
          if (!cancelled) {
            audioBufferRef.current = decoded;
          }
        })
        .catch(() => {
          // Fallback to HTMLAudioElement
        });
    }

    return () => {
      cancelled = true;
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const startVisualTremor = useCallback(() => {
    clearShakeTimers();
    setIsTremoring(false);

    // Force reflow restart of .tremor-active animation so every trigger shakes the screen
    const t0 = window.setTimeout(() => {
      setIsTremoring(true);
      setTremorCount((c) => c + 1);
    }, 15);

    const t1 = window.setTimeout(() => {
      setTremorCount((c) => c + 1);
    }, 450);

    const t2 = window.setTimeout(() => {
      setTremorCount((c) => c + 1);
    }, 950);

    const tEnd = window.setTimeout(() => {
      setIsTremoring(false);
    }, 2050);

    shakeTimersRef.current.push(t0, t1, t2, tEnd);
  }, []);

  const playRoarAudio = useCallback(async (): Promise<boolean> => {
    // 1. Try HTML5 <audio> element first
    const audioEl = audioRef.current;
    if (audioEl) {
      try {
        audioEl.muted = false;
        audioEl.volume = 1.0;
        audioEl.currentTime = 0;
        await audioEl.play();
        return true;
      } catch {
        // Proceed to Web Audio API fallback
      }
    }

    // 2. Try Web Audio API AudioContext
    const ctx = audioCtxRef.current;
    const buffer = audioBufferRef.current;
    if (ctx && buffer) {
      try {
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }
        if (ctx.state === 'running') {
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(0);
          return true;
        }
      } catch {
        // Blocked by browser autoplay policy until first interaction
      }
    }

    return false;
  }, []);

  const triggerShakeAndRoar = useCallback(async () => {
    startVisualTremor();
    const played = await playRoarAudio();
    if (!played) {
      // Browser blocked unmuted audio on fresh load/refresh; queue immediate replay+shake on first user action
      pendingGestureRetryRef.current = true;
    } else {
      pendingGestureRetryRef.current = false;
    }
  }, [startVisualTremor, playRoarAudio]);

  // Trigger screen shake + roar every time the page finishes loading / refreshes (or when roarTrigger increments)
  useEffect(() => {
    if (!isLoaded) return;
    const startTimer = window.setTimeout(() => {
      triggerShakeAndRoar();
    }, 250);

    return () => {
      window.clearTimeout(startTimer);
      clearShakeTimers();
    };
  }, [isLoaded, roarTrigger, triggerShakeAndRoar]);

  // Unlock audio & re-trigger shake+roar immediately if the browser blocked autoplay on page refresh
  useEffect(() => {
    const handleUnlockAndPlay = () => {
      if (!pendingGestureRetryRef.current) return;
      pendingGestureRetryRef.current = false;
      triggerShakeAndRoar();
    };

    const events = [
      'pointerdown',
      'mousedown',
      'touchstart',
      'keydown',
      'wheel',
      'click',
    ] as const;

    events.forEach((evt) =>
      window.addEventListener(evt, handleUnlockAndPlay, { passive: true })
    );

    return () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, handleUnlockAndPlay)
      );
    };
  }, [triggerShakeAndRoar]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setParallax(calculateHeroParallax(normX, normY, reducedMotion));
  };

  const handleMouseLeave = () => {
    setParallax(calculateHeroParallax(0, 0, reducedMotion));
  };

  // Subtle hero scroll transition (wordmark scales slightly, creature drifts upward)
  const heroScrollFactor = Math.min(1, scrollProgress * 5);
  const wordmarkScrollScale = reducedMotion ? 1 : 1 - heroScrollFactor * 0.05;
  const creatureScrollY = reducedMotion ? 0 : -heroScrollFactor * 38;

  return (
    <section
      id="hero"
      aria-label="Tyrannosaurus Hero Canopy"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-[#020D07] p-2.5 sm:p-3.5 select-none"
    >
      {/* Preloaded T. rex roar audio asset */}
      <audio
        ref={audioRef}
        src={ROAR_AUDIO_PATH}
        preload="auto"
        playsInline
        onPlay={startVisualTremor}
        data-testid="trex-roar-audio"
      />

      {/* Rounded 24px full-viewport frame with thin dark margin around it */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-[24px] hero-forest-gradient shadow-[0_0_80px_rgba(2,13,7,0.95)] ${
          isTremoring ? 'tremor-active' : ''
        }`}
      >
        {/* Dark vignette at corners & bottom */}
        <div className="hero-vignette pointer-events-none absolute inset-0 z-0" />

        {/* Layer 2: Light effects, sunbeams, dappled canopy, spores, falling leaves */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <ForestAtmosphereBack
            parallax={parallax}
            tremorTrigger={tremorCount}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Layer 3: GIGANTIC White (--mist) Wordmark in Marcellus, spanning ~85% of viewport width */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[36%] md:top-[49%] z-20 -translate-y-1/2 flex flex-col items-center justify-center px-2"
          style={{
            transform: `translate3d(${parallax.wordmark.x}px, ${parallax.wordmark.y}px, 0) scale(${wordmarkScrollScale})`,
          }}
        >
          {/* Desktop & Tablet single-line wordmark (~85% viewport width) */}
          <h1
            aria-label="TYRANNOSAURUS"
            className="hidden md:flex items-center justify-center w-[86vw] max-w-[92%] font-display uppercase text-[#F3FFF1] leading-none tracking-[-0.01em] whitespace-nowrap"
            style={{
              fontSize: 'clamp(3.8rem, 9.1vw, 12.2rem)',
              textShadow: '0 0 38px rgba(182, 243, 106, 0.25)',
            }}
          >
            {WORDMARK_TEXT.split('').map((char, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <span
                  className="inline-block transition-transform duration-700 ease-out"
                  style={{
                    transform: isLoaded ? 'translateY(0%)' : 'translateY(110%)',
                    transitionDelay: reducedMotion ? '0ms' : `${idx * 40}ms`,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>

          {/* Mobile 2-line split wordmark ("TYRANNO / SAURUS" at ~15.8vw) */}
          <div
            aria-hidden="true"
            className="flex md:hidden flex-col items-center justify-center font-display uppercase text-[#F3FFF1] leading-[0.92] tracking-[-0.01em] text-center"
            style={{
              fontSize: '15.8vw',
              textShadow: '0 0 28px rgba(182, 243, 106, 0.25)',
            }}
          >
            <span>TYRANNO</span>
            <span>SAURUS</span>
          </div>
        </div>

        {/* Layer 4: Transparent Cutout Creature IN FRONT of the wordmark */}
        {/* Offset slightly left (-translate-x-[13%]) on desktop so head overlaps middle letters (N-N-O-S) while TYR and RUS remain 100% visible */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[12%] md:bottom-0 z-30 flex items-end md:items-end justify-center h-[64%] sm:h-[85%] md:h-[94%]"
          style={{
            transform: `translate3d(${parallax.creature.x}px, ${
              parallax.creature.y + creatureScrollY
            }px, 0)`,
          }}
        >
          <div
            className={`relative h-full w-full flex items-center md:items-end justify-center transition-all duration-1000 ease-out ${
              isLoaded
                ? 'opacity-100 translate-x-0 scale-100'
                : 'opacity-0 translate-x-10 scale-[1.08]'
            }`}
          >
            <div className="animate-creature-breathe relative h-full flex items-center md:items-end justify-center md:-translate-x-[13%]">
              {/* Soft green rim glow behind creature */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 44% 50% at 58% 44%, rgba(212, 255, 154, 0.36) 0%, rgba(93, 187, 75, 0.16) 50%, transparent 76%)',
                }}
              />
              <img
                src={HERO_IMAGE_PATH}
                alt="Tyrannosaurus rex standing in a sunlit Late Cretaceous forest"
                referrerPolicy="no-referrer"
                onClick={() => triggerShakeAndRoar()}
                className="creature-graded pointer-events-auto cursor-pointer relative z-10 h-auto max-h-full md:h-[92%] w-[94vw] md:w-auto max-w-[94vw] md:max-w-[70vw] object-contain object-bottom select-none"
              />
            </div>
          </div>
        </div>

        {/* Tagline under the wordmark (visible above mist) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-14 sm:bottom-16 z-35 flex justify-center">
          <p
            className={`font-display text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.28em] text-[#F3FFF1]/75 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            The Tyrant Lizard King
          </p>
        </div>

        {/* Layer 5: Ground Mist & Foreground Silhouettes (ferns & trunks in --ink) */}
        <div className="pointer-events-none absolute inset-0 z-32">
          <ForestAtmosphereFront parallax={parallax} />
        </div>

        {/* Bottom Centre Scroll Prompt */}
        <div className="pointer-events-auto absolute inset-x-0 bottom-4 z-40 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigateSection('overview')}
            className="group flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 text-[#F3FFF1]/75 hover:text-[#D4FF9A] transition-colors"
          >
            <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.24em]">
              SCROLL TO ENTER THE FOREST
            </span>
            <span
              aria-hidden="true"
              className="block h-4 w-[1px] bg-gradient-to-b from-[#B6F36A] to-transparent transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </div>
      </div>

      {/* Layer 6: Fixed 3-part Navigation Header (transparent in Hero, rounded forest bar on scroll) */}
      <Nav
        onOpenMenu={onOpenMenu}
        onNavigateSection={(secId) => {
          if (secId === 'hero') {
            triggerShakeAndRoar();
          }
          onNavigateSection(secId);
        }}
        visible={isLoaded}
        isScrolled={scrollProgress > 0.003}
      />
    </section>
  );
};
