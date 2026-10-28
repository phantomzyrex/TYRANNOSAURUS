import React from 'react';

export const Diet: React.FC = () => {
  return (
    <section
      id="diet"
      aria-labelledby="diet-heading"
      className="relative bg-gradient-to-b from-[#041A0F] via-[#082E1B] to-[#041A0F] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#F3FFF1]/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#F3FFF1]/15">
          <div className="lg:col-span-5 flex items-baseline gap-5">
            <span
              aria-hidden="true"
              className="section-num-outline text-6xl sm:text-7xl lg:text-8xl leading-none"
            >
              06
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                PALEOECOLOGY · TROPHIC APEX
              </p>
              <h2
                id="diet-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Diet and Hunting
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="font-body text-base sm:text-lg text-[#F3FFF1]/90 leading-[1.72] max-w-2xl">
              An apex predator whose prey included horned and duck-billed dinosaurs such as{' '}
              <em>Triceratops</em> and <em>Edmontosaurus</em>. Most palaeontologists now see{' '}
              <em>T. rex</em> as an active predator that also scavenged when it could — settling the
              old &ldquo;predator vs scavenger&rdquo; debate.
            </p>
          </div>
        </div>

        {/* Two-Column Predator vs Scavenger Evidence Panel */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Predator Evidence */}
          <div className="rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F]/90 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.18em] text-[#B6F36A]">
                PRIMARY EVIDENCE · ACTIVE PREDATION
              </div>
              <h3 className="mt-2 font-display text-2xl uppercase text-[#F3FFF1]">
                Predator Evidence
              </h3>

              <ul className="mt-6 space-y-5 font-body text-[15px] sm:text-base text-[#F3FFF1]/85">
                <li className="pb-4 border-b border-[#F3FFF1]/10">
                  <strong className="font-display uppercase text-sm tracking-[0.05em] text-[#D4FF9A] block mb-1">
                    Healed Bite in Living Prey (DePalma et al., 2013)
                  </strong>
                  A tyrannosaur tooth crown embedded inside an <em>Edmontosaurus</em> tail vertebra
                  surrounded by regrown bone proves the prey survived a live predatory attack.
                </li>
                <li className="pb-4 border-b border-[#F3FFF1]/10">
                  <strong className="font-display uppercase text-sm tracking-[0.05em] text-[#D4FF9A] block mb-1">
                    Triceratops Bite Trauma &amp; Healing
                  </strong>
                  Deep puncture and pull marks on <em>Triceratops</em> brow horns and frills show
                  localized bone remodeling, indicating face-to-face combat with living prey.
                </li>
                <li>
                  <strong className="font-display uppercase text-sm tracking-[0.05em] text-[#D4FF9A] block mb-1">
                    Stereoscopic Vision (Stevens, 2006)
                  </strong>
                  Forward-facing orbits yielded a 55° binocular field of view for precise depth
                  perception during ambush and pursuit.
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Scavenger & Osteophagy Evidence */}
          <div className="rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F]/90 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.18em] text-[#B6F36A]">
                OPPORTUNISTIC FORAGING · OSTEOPHAGY
              </div>
              <h3 className="mt-2 font-display text-2xl uppercase text-[#F3FFF1]">
                Scavenger &amp; Feeding Evidence
              </h3>

              <ul className="mt-6 space-y-5 font-body text-[15px] sm:text-base text-[#F3FFF1]/85">
                <li className="pb-4 border-b border-[#F3FFF1]/10">
                  <strong className="font-display uppercase text-sm tracking-[0.05em] text-[#D4FF9A] block mb-1">
                    Bone-Packed Coprolite (Chin et al., 1998)
                  </strong>
                  A large fossilized tyrannosaur coprolite from Saskatchewan is packed with
                  pulverized, acid-etched dinosaur bone fragments, demonstrating extreme bone
                  consumption.
                </li>
                <li className="pb-4 border-b border-[#F3FFF1]/10">
                  <strong className="font-display uppercase text-sm tracking-[0.05em] text-[#D4FF9A] block mb-1">
                    Intraspecific Cannibalism (Longrich et al., 2010)
                  </strong>
                  Distinctive V-shaped tooth scores on the limb and foot bones of other{' '}
                  <em>T. rex</em> individuals provide direct evidence of cannibalistic feeding.
                </li>
                <li>
                  <strong className="font-display uppercase text-sm tracking-[0.05em] text-[#D4FF9A] block mb-1">
                    Hypertrophied Olfactory Apparatus
                  </strong>
                  Enlarged olfactory bulbs enabled detection of carrion and wounded prey across wide
                  floodplain distances, just as modern apex carnivores both hunt and scavenge.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Animated Food-Web Graphic & Speed / Pack-Hunting Notes */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F] p-6 sm:p-10">
          <div className="lg:col-span-7">
            <p className="font-display text-xs uppercase tracking-[0.18em] text-[#B6F36A] mb-3">
              HELL CREEK TROPHIC WEB (MAASTRICHTIAN, ~68–66 MYA)
            </p>
            <svg
              viewBox="0 0 640 240"
              className="w-full h-auto"
              role="img"
              aria-label="Late Cretaceous food web showing Tyrannosaurus rex as apex predator above Triceratops, Edmontosaurus, Ankylosaurus, and intraspecific scavenging"
            >
              {/* Animated connecting lines */}
              <g stroke="#5DBB4B" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.7">
                <line x1="320" y1="56" x2="110" y2="175" />
                <line x1="320" y1="56" x2="255" y2="175" />
                <line x1="320" y1="56" x2="400" y2="175" />
                <line x1="320" y1="56" x2="540" y2="175" />
              </g>

              {/* Apex Node */}
              <g transform="translate(210, 12)">
                <rect
                  width="220"
                  height="46"
                  rx="10"
                  fill="#0F4A2A"
                  stroke="#B6F36A"
                  strokeWidth="1.5"
                />
                <text
                  x="110"
                  y="22"
                  textAnchor="middle"
                  fill="#D4FF9A"
                  fontSize="12"
                  fontFamily="Marcellus, serif"
                >
                  TYRANNOSAURUS REX
                </text>
                <text
                  x="110"
                  y="38"
                  textAnchor="middle"
                  fill="#F3FFF1"
                  fontSize="10"
                  fontFamily="Jost, sans-serif"
                >
                  Apex Predator &amp; Facultative Scavenger
                </text>
              </g>

              {/* Prey Nodes */}
              {[
                { x: 35, title: 'TRICERATOPS', sub: 'Ceratopsian Prey' },
                { x: 180, title: 'EDMONTOSAURUS', sub: 'Hadrosaurid Prey' },
                { x: 325, title: 'ANKYLOSAURUS', sub: 'Armored Herbivore' },
                { x: 470, title: 'CONSPECIFICS', sub: 'Cannibalism (Longrich 2010)' },
              ].map((node) => (
                <g key={node.title} transform={`translate(${node.x}, 170)`}>
                  <rect
                    width="135"
                    height="52"
                    rx="8"
                    fill="#082E1B"
                    stroke="rgba(243,255,241,0.25)"
                  />
                  <text
                    x="67.5"
                    y="23"
                    textAnchor="middle"
                    fill="#F3FFF1"
                    fontSize="11"
                    fontFamily="Marcellus, serif"
                  >
                    {node.title}
                  </text>
                  <text
                    x="67.5"
                    y="39"
                    textAnchor="middle"
                    fill="rgba(243,255,241,0.7)"
                    fontSize="9.5"
                    fontFamily="Jost, sans-serif"
                  >
                    {node.sub}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-[#F3FFF1]/15 pt-6 lg:pt-0 lg:pl-8">
            <div>
              <h3 className="font-display text-lg uppercase text-[#D4FF9A]">
                Locomotion &amp; Speed (Estimate)
              </h3>
              <p className="mt-1 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
                Speed estimates are debated, with most biomechanical studies placing adult{' '}
                <em>T. rex</em> at roughly <strong>10–30 km/h</strong> (estimate) — making it more a
                fast, efficient walker than a high-speed sprinter.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F3FFF1]/10">
              <h3 className="font-display text-lg uppercase text-[#D4FF9A]">
                Gregarious Behavior
              </h3>
              <p className="mt-1 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
                Pack hunting has been suggested based on multi-individual bonebeds in other
                tyrannosaurids, but remains speculative for <em>Tyrannosaurus rex</em>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
