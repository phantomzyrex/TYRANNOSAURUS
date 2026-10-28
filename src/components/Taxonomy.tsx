import React from 'react';

const TAXONOMY_RANKS = [
  { rank: 'Kingdom', taxon: 'Animalia' },
  { rank: 'Phylum', taxon: 'Chordata' },
  { rank: 'Clade', taxon: 'Dinosauria' },
  { rank: 'Order', taxon: 'Saurischia' },
  { rank: 'Suborder', taxon: 'Theropoda' },
  { rank: 'Family', taxon: 'Tyrannosauridae' },
  { rank: 'Subfamily', taxon: 'Tyrannosaurinae' },
  { rank: 'Genus', taxon: 'Tyrannosaurus' },
  { rank: 'Species', taxon: 'T. rex (Osborn, 1905)' },
];

const RELATIVES = [
  {
    name: 'Tarbosaurus',
    note: 'Late Cretaceous Asia (Mongolia); closest giant cousin with a slightly narrower skull.',
  },
  {
    name: 'Daspletosaurus',
    note: 'Robust tyrannosaurine that inhabited North America several million years before T. rex.',
  },
  {
    name: 'Albertosaurus',
    note: 'Lighter, faster-moving albertosaurine tyrannosaurid from the Horseshoe Canyon Formation.',
  },
  {
    name: 'Gorgosaurus',
    note: 'Campanian-age North American tyrannosaurid closely related to Albertosaurus.',
  },
  {
    name: 'Qianzhousaurus',
    note: 'Long-snouted Asian tyrannosaurine ("Pinocchio rex") specialized for different prey.',
  },
  {
    name: 'Yutyrannus',
    note: 'Early Cretaceous tyrannosauroid from China preserving long filamentous feathers (Xu et al., 2012).',
  },
];

export const Taxonomy: React.FC = () => {
  return (
    <section
      id="classification"
      aria-labelledby="classification-heading"
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
              08
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-[#B6F36A]">
                SYSTEMATICS · PHYLOGENY
              </p>
              <h2
                id="classification-heading"
                className="mt-2 font-display text-3xl sm:text-4xl uppercase tracking-[0.04em] text-[#F3FFF1]"
              >
                Classification and Species
              </h2>
            </div>
          </div>
          <p className="font-body text-base text-[#F3FFF1]/80 max-w-md">
            Systematic placement within Theropoda, active taxonomic debates over species splitting,
            and evolutionary relatives across Laurasia.
          </p>
        </div>

        {/* Grid: Taxonomy Card + Species Debates & Relatives */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Columns: Taxonomy Hierarchy Card */}
          <div className="lg:col-span-5 rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F]/95 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.18em] text-[#B6F36A]">
                LINNAEAN &amp; CLADISTIC HIERARCHY
              </div>
              <h3 className="mt-2 font-display text-2xl uppercase text-[#F3FFF1]">
                Taxonomy Card
              </h3>

              <dl className="mt-6 divide-y divide-[#F3FFF1]/10">
                {TAXONOMY_RANKS.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-baseline justify-between py-3 text-sm sm:text-base"
                  >
                    <dt className="font-display text-xs uppercase tracking-[0.14em] text-[#F3FFF1]/65">
                      {item.rank}
                    </dt>
                    <dd
                      className={`font-display ${
                        item.rank === 'Genus' || item.rank === 'Species'
                          ? 'italic text-[#D4FF9A]'
                          : 'text-[#F3FFF1]'
                      }`}
                    >
                      {item.taxon}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right 7 Columns: Species Notes, Nanotyrannus Debate & Relatives */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Species & Nanotyrannus Debate Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <article className="rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/65 p-6">
                <div className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
                  SPECIES VALIDITY
                </div>
                <h3 className="mt-2 font-display text-xl uppercase text-[#F3FFF1]">
                  Single Accepted Species
                </h3>
                <p className="mt-3 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
                  <em>T. rex</em> is the only widely accepted species. In 2022 researchers proposed
                  splitting it into three (<em>T. rex</em>, <em>T. imperator</em>,{' '}
                  <em>T. regina</em>), but this proposal is widely disputed by the paleontological
                  community.
                </p>
              </article>

              <article className="rounded-2xl border border-[#F3FFF1]/15 bg-[#082E1B]/65 p-6">
                <div className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
                  ONTOLOGY VS TAXONOMY
                </div>
                <h3 className="mt-2 font-display text-xl uppercase text-[#F3FFF1]">
                  The Nanotyrannus Debate
                </h3>
                <p className="mt-3 font-body text-[15px] text-[#F3FFF1]/85 leading-[1.68]">
                  Whether the small tyrannosaur <em>Nanotyrannus</em> is a distinct species or a
                  juvenile <em>T. rex</em> has long been argued; recent studies (2025) support it
                  being a separate species, though the debate continues.
                </p>
              </article>
            </div>

            {/* Tyrannosauroid Relatives */}
            <div className="rounded-2xl border border-[#F3FFF1]/15 bg-[#041A0F]/90 p-6 sm:p-8">
              <div className="font-display text-xs uppercase tracking-[0.16em] text-[#B6F36A]">
                TYRANNOSAUROIDEA LINEAGE
              </div>
              <h3 className="mt-1 font-display text-xl uppercase text-[#F3FFF1]">
                Notable Relatives
              </h3>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RELATIVES.map((rel) => (
                  <div
                    key={rel.name}
                    className="border-b border-[#F3FFF1]/10 pb-3 last:border-b-0 sm:last:border-b"
                  >
                    <h4 className="font-display text-base italic text-[#D4FF9A]">{rel.name}</h4>
                    <p className="mt-1 font-body text-sm text-[#F3FFF1]/80 leading-[1.6]">
                      {rel.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
