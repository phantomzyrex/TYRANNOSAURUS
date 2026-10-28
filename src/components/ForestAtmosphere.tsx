import React, { useEffect, useRef } from 'react';
import { ParallaxOffsets } from '../utils/paleoLogic';

interface ForestAtmosphereProps {
  parallax: ParallaxOffsets;
  tremorTrigger: number;
  reducedMotion: boolean;
}

interface SporeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  layer: 0 | 1 | 2; // 3 depth layers
}

const FALLING_LEAVES = [
  { id: 1, left: '6%', delay: '0s', duration: '19s', size: 22, type: 'fern' },
  { id: 2, left: '14%', delay: '4s', duration: '24s', size: 18, type: 'broad' },
  { id: 3, left: '23%', delay: '9s', duration: '21s', size: 16, type: 'fern' },
  { id: 4, left: '78%', delay: '2s', duration: '22s', size: 20, type: 'broad' },
  { id: 5, left: '86%', delay: '7s', duration: '18s', size: 24, type: 'fern' },
  { id: 6, left: '92%', delay: '11s', duration: '25s', size: 17, type: 'broad' },
  { id: 7, left: '4%', delay: '13s', duration: '23s', size: 19, type: 'broad' },
  { id: 8, left: '95%', delay: '5s', duration: '20s', size: 21, type: 'fern' },
];

export const GlobalForestSvgFilters: React.FC = () => null;

export const ForestAtmosphereBack: React.FC<ForestAtmosphereProps> = ({
  parallax,
  tremorTrigger,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parallaxRef = useRef<ParallaxOffsets>(parallax);
  const tremorBoostRef = useRef<number>(0);

  useEffect(() => {
    parallaxRef.current = parallax;
  }, [parallax]);

  useEffect(() => {
    if (tremorTrigger > 0 && !reducedMotion) {
      tremorBoostRef.current = 4.2;
    }
  }, [tremorTrigger, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let timerId = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isLowEnd =
      typeof navigator !== 'undefined' &&
      navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency <= 4;
    const count = reducedMotion ? 28 : isLowEnd ? 48 : 72;

    const particles: SporeParticle[] = Array.from({ length: count }, (_, i) => {
      const layer = (i % 3) as 0 | 1 | 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.22 + layer * 0.14),
        vy: -0.15 - Math.random() * (0.25 + layer * 0.12),
        radius: layer === 0 ? 1.2 : layer === 1 ? 1.9 : 2.7,
        alpha: layer === 0 ? 0.28 : layer === 1 ? 0.48 : 0.72,
        phase: Math.random() * Math.PI * 2,
        layer,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      const time = performance.now();
      ctx.clearRect(0, 0, width, height);

      const px = parallaxRef.current.particles.x;
      const py = parallaxRef.current.particles.y;
      const tremorVy = tremorBoostRef.current;
      if (tremorBoostRef.current > 0.05) {
        tremorBoostRef.current *= 0.88;
      } else {
        tremorBoostRef.current = 0;
      }

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx + Math.sin(time * 0.0007 + p.phase) * 0.15;
          p.y += p.vy - tremorVy * (0.5 + p.layer * 0.35);

          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const layerFactor = p.layer === 0 ? 0.35 : p.layer === 1 ? 0.65 : 1.0;
        const drawX = p.x + px * layerFactor;
        const drawY = p.y + py * layerFactor;
        const pulse = reducedMotion
          ? p.alpha
          : p.alpha * (0.65 + 0.35 * Math.sin(time * 0.002 + p.phase));

        ctx.beginPath();
        ctx.fillStyle = `rgba(212, 255, 154, ${pulse})`;
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft outer spore halo
        ctx.beginPath();
        ctx.fillStyle = `rgba(182, 243, 106, ${pulse * 0.28})`;
        ctx.arc(drawX, drawY, p.radius * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        timerId = window.setTimeout(render, 60);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timerId) window.clearTimeout(timerId);
    };
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 1. Canopy Sunbeams (6 soft feathered light shafts from the top) */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.sunbeams.x}px, ${parallax.sunbeams.y}px, 0)`,
        }}
      >
        <div
          className="sunbeam-a absolute -top-20 left-[4%] h-[110%] w-56 md:w-72"
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,255,154,0.26) 0%, rgba(182,243,106,0.10) 50%, transparent 100%)',
          }}
        />
        <div
          className="sunbeam-b absolute -top-24 left-[20%] h-[110%] w-64 md:w-80"
          style={{
            background:
              'radial-gradient(ellipse 50% 85% at 50% 0%, rgba(182,243,106,0.24) 0%, rgba(93,187,75,0.09) 55%, transparent 100%)',
          }}
        />
        <div
          className="sunbeam-a absolute -top-28 left-[40%] h-[105%] w-72 md:w-96"
          style={{
            background:
              'radial-gradient(ellipse 50% 85% at 50% 0%, rgba(243,255,241,0.26) 0%, rgba(182,243,106,0.12) 50%, transparent 100%)',
          }}
        />
        <div
          className="sunbeam-b absolute -top-20 left-[60%] h-[110%] w-60 md:w-80"
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 50% 0%, rgba(212,255,154,0.22) 0%, rgba(93,187,75,0.08) 55%, transparent 100%)',
          }}
        />
        <div
          className="sunbeam-a absolute -top-20 right-[12%] h-[112%] w-56 md:w-72"
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 50% 0%, rgba(182,243,106,0.25) 0%, rgba(47,143,70,0.10) 55%, transparent 100%)',
          }}
        />
        <div
          className="sunbeam-b absolute -top-20 right-[2%] h-[105%] w-48 md:w-64"
          style={{
            background:
              'radial-gradient(ellipse 50% 75% at 50% 0%, rgba(212,255,154,0.20) 0%, rgba(93,187,75,0.07) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* 2. Dappled Leaf Light in top 40% of the frame */}
      <div
        className="dappled-canopy absolute inset-x-0 top-0 h-[42%] opacity-[0.14]"
        style={{
          background:
            'radial-gradient(ellipse 18% 35% at 15% 18%, rgba(2,13,7,0.75) 0%, transparent 100%), radial-gradient(ellipse 22% 40% at 38% 12%, rgba(182,243,106,0.65) 0%, transparent 100%), radial-gradient(ellipse 25% 38% at 62% 16%, rgba(2,13,7,0.7) 0%, transparent 100%), radial-gradient(ellipse 20% 35% at 84% 20%, rgba(182,243,106,0.6) 0%, transparent 100%)',
        }}
      />

      {/* 3. Spores, Pollen and Fireflies Canvas (3 depth layers) */}
      <canvas
        ref={canvasRef}
        data-testid="forest-spores-canvas"
        className="absolute inset-0 h-full w-full"
      />

      {/* 4. Falling Leaves near edges */}
      {!reducedMotion &&
        FALLING_LEAVES.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute -top-12"
            style={{
              left: leaf.left,
              width: `${leaf.size}px`,
              height: `${leaf.size}px`,
              animation: `leafFall ${leaf.duration} linear ${leaf.delay} infinite`,
            }}
          >
            {leaf.type === 'fern' ? (
              <svg viewBox="0 0 32 32" className="h-full w-full fill-[#041A0F]/75">
                <path d="M16 2 C10 10, 6 18, 16 30 C26 18, 22 10, 16 2 Z M16 6 L10 12 M16 11 L22 17 M16 16 L9 22" />
              </svg>
            ) : (
              <svg viewBox="0 0 32 32" className="h-full w-full fill-[#082E1B]/70">
                <path d="M4 16 C4 6, 18 2, 28 6 C24 18, 18 28, 4 16 Z" />
              </svg>
            )}
          </div>
        ))}
    </div>
  );
};

export const ForestAtmosphereFront: React.FC<{ parallax: ParallaxOffsets }> = ({ parallax }) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 5. Ground Mist: 3 slow horizontal fog layers over bottom 35% so legs and tail dissolve */}
      <div className="absolute inset-x-0 bottom-0 h-[36%] overflow-hidden">
        <div
          className="mist-layer-1 absolute -inset-x-16 bottom-0 h-full opacity-95"
          style={{
            background:
              'linear-gradient(to top, #020D07 0%, #041A0F 34%, rgba(8, 46, 27, 0.55) 68%, transparent 100%)',
          }}
        />
        <div
          className="mist-layer-2 absolute -inset-x-20 bottom-0 h-[80%] opacity-75"
          style={{
            background:
              'radial-gradient(ellipse 65% 60% at 38% 85%, rgba(15, 74, 42, 0.5) 0%, rgba(4, 26, 15, 0.75) 55%, transparent 100%)',
          }}
        />
        <div
          className="mist-layer-1 absolute -inset-x-12 bottom-0 h-[48%] opacity-90"
          style={{
            background:
              'linear-gradient(to top, #020D07 15%, rgba(4, 26, 15, 0.85) 58%, transparent 100%)',
          }}
        />
      </div>

      {/* 6. Foreground Silhouettes: dark fern fronds & tree trunks in --ink at left and right edges */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.silhouettes.x}px, ${parallax.silhouettes.y}px, 0)`,
        }}
      >
        {/* Left Conifer Trunk & Detailed Pinnate Prehistoric Ferns */}
        <svg
          viewBox="0 0 220 900"
          preserveAspectRatio="none"
          className="absolute -left-4 top-0 h-full w-24 sm:w-36 lg:w-44 fill-[#020D07] opacity-95"
        >
          {/* Ancient conifer trunk along far left margin */}
          <path d="M0,0 L42,0 C34,240 30,560 54,900 L0,900 Z" />
          {/* Upper canopy hanging bough */}
          <path d="M28,60 C75,58 125,74 168,104 C135,96 95,90 32,96 Z" />
          <path d="M24,115 C62,114 102,126 135,152 C102,144 68,140 28,145 Z" />
          {/* Detailed lower fern frond 1 */}
          <path d="M18,640 C65,610 118,615 178,648 C152,652 128,648 105,654 C132,662 155,672 172,684 C122,674 78,676 24,705 Z" />
          {/* Detailed lower fern frond 2 */}
          <path d="M20,735 C78,705 138,718 195,762 C158,760 122,762 88,772 C125,782 158,796 182,814 C128,798 75,805 18,840 Z" />
          <path d="M0,825 C68,805 135,830 190,895 L0,900 Z" />
        </svg>

        {/* Right Conifer Trunk & Detailed Pinnate Prehistoric Ferns */}
        <svg
          viewBox="0 0 220 900"
          preserveAspectRatio="none"
          className="absolute -right-4 top-0 h-full w-24 sm:w-36 lg:w-44 fill-[#020D07] opacity-95"
        >
          {/* Ancient conifer trunk along far right margin */}
          <path d="M220,0 L178,0 C186,240 190,560 166,900 L220,900 Z" />
          {/* Upper canopy hanging bough */}
          <path d="M192,70 C145,68 95,84 52,114 C85,106 125,100 188,106 Z" />
          {/* Detailed lower fern frond 1 */}
          <path d="M202,650 C155,620 102,625 42,658 C68,662 92,658 115,664 C88,672 65,682 48,694 C98,684 142,686 196,715 Z" />
          {/* Detailed lower fern frond 2 */}
          <path d="M200,745 C142,715 82,728 25,772 C62,770 98,772 132,782 C95,792 62,806 38,824 C92,808 145,815 202,850 Z" />
          <path d="M220,830 C152,810 85,835 30,900 L220,900 Z" />
        </svg>
      </div>
    </div>
  );
};
