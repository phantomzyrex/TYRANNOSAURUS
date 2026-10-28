export interface StatCardItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  isEstimate?: boolean;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  specimenOrCitation?: string;
}

export interface AnatomyHotspot {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  summary: string;
  detail: string;
  citation?: string;
  isEstimate?: boolean;
}

export interface SizeEntity {
  id: string;
  name: string;
  lengthMeters: number;
  displayLength: string;
  hipHeightMeters: number;
  note: string;
  isEstimate?: boolean;
}

export interface FossilLocation {
  id: string;
  region: string;
  formation: string;
  status: 'confirmed' | 'tentative';
  x: number;
  y: number;
  notes: string;
}

export interface GrowthStage {
  age: 2 | 10 | 15 | 20 | 28;
  massTonnes: number;
  lengthMeters: number;
  growthRateKgPerDay: number;
  stageLabel: string;
  description: string;
}

export interface MythItem {
  id: string;
  myth: string;
  verdict: string;
  reality: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  specimen: string;
  caption: string;
  aspect: string;
}

export interface ParallaxOffsets {
  wordmark: { x: number; y: number };
  creature: { x: number; y: number };
  sunbeams: { x: number; y: number };
  particles: { x: number; y: number };
  silhouettes: { x: number; y: number };
}

/**
 * Calculates the Late Cretaceous Maastrichtian time gauge value in MYA
 * from scroll progress [0..1], mapping 0 -> 68.0 MYA and 1 -> 66.0 MYA (K-Pg boundary).
 */
export function calculateMyaFromScroll(scrollProgress: number): {
  mya: number;
  formatted: string;
  isKPgBoundary: boolean;
} {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(scrollProgress) ? scrollProgress : 0));
  const rawMya = 68.0 - clamped * 2.0;
  const rounded = Math.round(rawMya * 10) / 10;
  return {
    mya: rounded,
    formatted: `${rounded.toFixed(1)} MYA`,
    isKPgBoundary: rounded <= 66.1,
  };
}

/**
 * Computes mouse parallax offsets for the Hero layers given normalized cursor coordinates [-1..1].
 * Wordmark moves +-12px, creature moves +-24px in the opposite direction,
 * sunbeams +-40px, particles +-60px, foreground silhouettes +-80px.
 */
export function calculateHeroParallax(normX: number, normY: number, reducedMotion = false): ParallaxOffsets {
  if (reducedMotion) {
    return {
      wordmark: { x: 0, y: 0 },
      creature: { x: 0, y: 0 },
      sunbeams: { x: 0, y: 0 },
      particles: { x: 0, y: 0 },
      silhouettes: { x: 0, y: 0 },
    };
  }
  const cx = Math.max(-1, Math.min(1, normX));
  const cy = Math.max(-1, Math.min(1, normY));

  return {
    wordmark: { x: Math.round(cx * 12 * 100) / 100, y: Math.round(cy * 12 * 100) / 100 },
    creature: { x: Math.round(-cx * 24 * 100) / 100, y: Math.round(-cy * 24 * 100) / 100 },
    sunbeams: { x: Math.round(cx * 40 * 100) / 100, y: Math.round(cy * 20 * 100) / 100 },
    particles: { x: Math.round(cx * 60 * 100) / 100, y: Math.round(cy * 60 * 100) / 100 },
    silhouettes: { x: Math.round(-cx * 80 * 100) / 100, y: Math.round(-cy * 30 * 100) / 100 },
  };
}

/**
 * Returns the scaled width percentage relative to a 13.5m maximum chart axis.
 */
export function calculateScalePercentage(lengthMeters: number, maxAxisMeters = 13.5): number {
  if (maxAxisMeters <= 0 || lengthMeters <= 0) return 0;
  return Math.min(100, Math.round((lengthMeters / maxAxisMeters) * 1000) / 10);
}

export const HERO_IMAGE_PATH = '/assets/tyrannosaurus-hero.png';
export const SIDE_IMAGE_PATH = '/assets/tyrannosaurus-side.png';

export const OVERVIEW_STATS: StatCardItem[] = [
  {
    id: 'meaning',
    label: 'Name Meaning',
    value: '"Tyrant lizard king"',
    detail: 'Greek tyrannos (tyrant) + sauros (lizard); Latin rex (king). Pronounced ty-RAN-oh-SAWR-us.',
  },
  {
    id: 'lived',
    label: 'Temporal Range',
    value: '~68 to 66 MYA',
    detail: 'Late Cretaceous Epoch, Maastrichtian stage — the final 2 million years of the Age of Dinosaurs.',
  },
  {
    id: 'length',
    label: 'Adult Body Length',
    value: 'About 12 m (40 ft)',
    detail: '"Sue" (FMNH PR 2081) measures about 12.3 m; "Scotty" (RSM P2523.8) about 13 m (estimates).',
    isEstimate: true,
  },
  {
    id: 'hip-height',
    label: 'Hip Height',
    value: 'About 3.7 m (12 ft)',
    detail: 'Held its massive vertebral column and muscular tail horizontally balanced over the hips.',
    isEstimate: true,
  },
  {
    id: 'mass',
    label: 'Body Mass',
    value: 'About 8–9 tonnes',
    detail: 'For the largest adult individuals; volumetric and femoral circumference estimates vary widely.',
    isEstimate: true,
  },
  {
    id: 'skull',
    label: 'Skull Length',
    value: 'Up to about 1.5 m',
    detail: 'Deep, fused nasal bones and broad posterior cranium engineered to resist immense torsional stress.',
  },
  {
    id: 'teeth',
    label: 'Dentition',
    value: 'Roughly 50–60 teeth',
    detail: 'Up to about 30 cm long including the root; thick, serrated, banana-shaped crowns replaced continuously.',
  },
  {
    id: 'bite-force',
    label: 'Bite Force',
    value: 'Up to ~57,000 N',
    detail: 'Estimated among the strongest known for any terrestrial animal (Gignac and Erickson, 2017).',
    isEstimate: true,
  },
  {
    id: 'lifespan',
    label: 'Lifespan',
    value: 'About 28–30 years',
    detail: 'Determined from histological lines of arrested growth (LAGs) in fossilized limb bones.',
    isEstimate: true,
  },
  {
    id: 'diet',
    label: 'Trophic Role',
    value: 'Carnivore · Apex Predator',
    detail: 'Active hypercarnivore of Late Cretaceous Laramidia that both hunted large prey and scavenged carrion.',
  },
  {
    id: 'locomotion',
    label: 'Locomotion',
    value: 'Obligate Bipedal',
    detail: 'Long hind limbs with three weight-bearing toes; estimated walking/running speeds of ~10–30 km/h.',
    isEstimate: true,
  },
  {
    id: 'status',
    label: 'Conservation Status',
    value: 'Extinct (K–Pg)',
    detail: 'Perished ~66 million years ago during the end-Cretaceous mass extinction triggered by the Chicxulub impact.',
  },
];

export const DISCOVERY_TIMELINE: TimelineEvent[] = [
  {
    year: '1892',
    title: 'Manospondylus gigas',
    description: 'Edward Drinker Cope names Manospondylus gigas from giant vertebrae found in the western US; these fossils may belong to T. rex.',
    specimenOrCitation: 'Cope, 1892',
  },
  {
    year: '1900',
    title: 'Wyoming Partial Skeleton',
    description: 'Barnum Brown finds a partial skeleton in eastern Wyoming, later named Dynamosaurus imperiosus.',
    specimenOrCitation: 'BMNH R7994',
  },
  {
    year: '1902',
    title: 'Holotype in Hell Creek',
    description: 'Barnum Brown discovers the type specimen in the Hell Creek Formation of Montana.',
    specimenOrCitation: 'CM 9380 (formerly AMNH 973)',
  },
  {
    year: '1905',
    title: 'Tyrannosaurus rex Formally Named',
    description: 'Henry Fairfield Osborn of the American Museum of Natural History formally names Tyrannosaurus rex (synonymizing Dynamosaurus imperiosus).',
    specimenOrCitation: 'Osborn, 1905',
  },
  {
    year: '1908',
    title: 'The Iconic AMNH Skeleton',
    description: "Brown's team excavates a second, well-preserved skeleton in Montana, forming the basis of the famous museum mount first displayed in 1915.",
    specimenOrCitation: 'AMNH 5027',
  },
  {
    year: '1990',
    title: 'Discovery of "Sue"',
    description: 'Sue Hendrickson finds "Sue" in South Dakota — one of the most complete T. rex skeletons ever discovered (about 90% complete by bone volume).',
    specimenOrCitation: 'FMNH PR 2081',
  },
  {
    year: '1997',
    title: 'Record Auction to the Field Museum',
    description: 'Sue sells at auction for about $8.36 million and goes on permanent display at the Field Museum in Chicago.',
    specimenOrCitation: 'Field Museum, Chicago',
  },
  {
    year: '2005',
    title: 'Preserved Soft-Tissue Structures',
    description: "Mary Schweitzer's team reports flexible, soft-tissue-like structures and medullary bone preserved inside a T. rex femur.",
    specimenOrCitation: 'MOR 1125 · Schweitzer et al., 2005',
  },
  {
    year: '2019',
    title: '"Scotty" Described as Largest Known Specimen',
    description: '"Scotty" from the Frenchman Formation of Saskatchewan is formally described as the largest and heaviest known T. rex specimen.',
    specimenOrCitation: 'RSM P2523.8 · Persons, Currie & Erickson, 2019',
  },
  {
    year: '2020',
    title: '"Stan" Auction Milestone',
    description: 'The celebrated skeleton "Stan" sells at auction for about $31.8 million.',
    specimenOrCitation: 'BHI 3033',
  },
  {
    year: 'Today',
    title: 'Roughly 100 Known Specimens',
    description: 'Roughly 100 specimens are known across institutional collections worldwide, and biomechanics, paleobiology, and ontogeny research continues.',
    specimenOrCitation: 'Ongoing Global Research',
  },
];

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'skull',
    label: 'Skull & Jaws',
    xPercent: 83,
    yPercent: 18,
    summary: 'Massive 1.5 m osteological fortress',
    detail: 'A massive, deep skull up to about 1.5 m long, built with fused nasals and reinforced bone struts to withstand huge bite forces.',
  },
  {
    id: 'teeth',
    label: 'Teeth & Lips',
    xPercent: 93,
    yPercent: 25,
    summary: '50–60 bone-crushing banana-shaped crowns',
    detail: 'Thick, serrated, banana-shaped teeth up to ~30 cm long including the root — unlike the thin blades of most other theropods. Built to crush bone and replaced throughout life. Recent work (Cullen et al., 2023) suggests the teeth were covered by extraoral lips when the mouth was closed.',
    citation: 'Cullen et al., 2023',
  },
  {
    id: 'bite',
    label: 'Bite Force',
    xPercent: 89,
    yPercent: 34,
    summary: 'Estimated ~35,000 to 57,000 newtons',
    detail: 'Estimated at about 35,000 to 57,000 newtons (estimate), generating extreme tooth pressures capable of fracturing and pulverizing solid cortical bone.',
    citation: 'Gignac and Erickson, 2017',
    isEstimate: true,
  },
  {
    id: 'eyes',
    label: 'Eyes & Vision',
    xPercent: 82,
    yPercent: 13,
    summary: '55° binocular overlap & hawk-like acuity',
    detail: 'Forward-facing eyes gave a wide binocular field of view and keen depth perception, better than in many other theropods.',
    citation: 'Stevens, 2006',
  },
  {
    id: 'nose',
    label: 'Nose & Smell',
    xPercent: 91,
    yPercent: 10,
    summary: 'Hypertrophied olfactory bulbs',
    detail: 'Very large olfactory regions in the brain endocast and expansive nasal cavities indicate an exceptional, long-range sense of smell.',
  },
  {
    id: 'hearing',
    label: 'Hearing',
    xPercent: 77,
    yPercent: 19,
    summary: 'Tuned to low-frequency infrasound',
    detail: 'Elongated cochlear ducts in the inner-ear structure suggest heightened sensitivity to low-frequency sounds, footsteps, and deep vocalizations.',
  },
  {
    id: 'arms',
    label: 'Forelimbs (Arms)',
    xPercent: 69,
    yPercent: 57,
    summary: '~1 m muscular two-fingered limbs',
    detail: 'Only about 1 m long, but thick-boned and heavily muscled, with two clawed fingers; each arm may have been able to lift roughly 200 kg (estimate). Their exact biological function is still debated.',
    isEstimate: true,
  },
  {
    id: 'legs',
    label: 'Hind Legs',
    xPercent: 57,
    yPercent: 75,
    summary: 'Pillar-like bipedal propulsion',
    detail: 'Long, powerful hind legs with three weight-bearing toes and a shock-absorbing arctometatarsalian foot structure built for sustained striding.',
  },
  {
    id: 'tail',
    label: 'Muscular Tail',
    xPercent: 21,
    yPercent: 56,
    summary: 'Horizontal dynamic counterbalance',
    detail: 'Long, heavy and muscular caudofemoralis tail held roughly horizontal as a counterbalance to the massive head. The old upright "kangaroo" pose is scientifically outdated.',
  },
  {
    id: 'skin',
    label: 'Skin & Integument',
    xPercent: 48,
    yPercent: 42,
    summary: 'Pebbly mosaic scales; feathering debated',
    detail: 'Fossil skin impressions show small, pebbly scales on the neck, hip and tail (Bell et al., 2017). Whether T. rex carried sparse filamentous feathers is debated; its early relative Yutyrannus was feathered (Xu et al., 2012).',
    citation: 'Bell et al., 2017 · Xu et al., 2012',
  },
  {
    id: 'metabolism',
    label: 'Metabolism & Physiology',
    xPercent: 60,
    yPercent: 46,
    summary: 'Active, fast-growing endotherm-like physiology',
    detail: 'Bone histology and oxygen isotope evidence point to an active, fast-growing, warm-blooded-like (mesothermic/endothermic) animal, though exact thermoregulatory details remain debated.',
  },
];

export const SIZE_ENTITIES: SizeEntity[] = [
  {
    id: 'human',
    name: 'Modern Human (Homo sapiens)',
    lengthMeters: 1.7,
    displayLength: '1.7 m height',
    hipHeightMeters: 1.7,
    note: 'Compared against T. rex hip height of ~3.7 m (12 ft)',
  },
  {
    id: 'elephant',
    name: 'African Bush Elephant',
    lengthMeters: 6.5,
    displayLength: 'About 6–7 m body length',
    hipHeightMeters: 3.3,
    note: 'Largest extant terrestrial animal (~6 tonnes)',
    isEstimate: true,
  },
  {
    id: 'triceratops',
    name: 'Triceratops horridus',
    lengthMeters: 8.5,
    displayLength: 'About 8–9 m length',
    hipHeightMeters: 3.0,
    note: 'Coeval Late Cretaceous ceratopsian herbivore and prey species',
    isEstimate: true,
  },
  {
    id: 'bus',
    name: 'Standard City Transit Bus',
    lengthMeters: 12.0,
    displayLength: 'About 12 m length',
    hipHeightMeters: 3.2,
    note: 'Modern urban reference vehicle matching adult T. rex length',
  },
];

export const TREX_SPECIMENS = {
  sue: {
    id: 'sue' as const,
    name: '"Sue" (FMNH PR 2081)',
    lengthMeters: 12.3,
    hipHeightMeters: 3.7,
    massTonnes: '8.4 tonnes (estimate)',
    displayLength: 'About 12.3 m (40.4 ft)',
    completeness: '~90% complete by bone volume',
    location: 'Hell Creek Formation, South Dakota (1990)',
  },
  scotty: {
    id: 'scotty' as const,
    name: '"Scotty" (RSM P2523.8)',
    lengthMeters: 13.0,
    hipHeightMeters: 3.85,
    massTonnes: '8.8+ tonnes (estimate)',
    displayLength: 'About 13 m (42.7 ft, estimate)',
    completeness: '~65% complete skeleton; robust femoral circumference',
    location: 'Frenchman Formation, Saskatchewan (1991 / described 2019)',
  },
};

export const FOSSIL_LOCATIONS: FossilLocation[] = [
  {
    id: 'alberta',
    region: 'Alberta, Canada',
    formation: 'Scollard Formation',
    status: 'confirmed',
    x: 215,
    y: 118,
    notes: 'Northern Laramidia floodplains; multiple tyrannosaurid skeletal elements and teeth.',
  },
  {
    id: 'saskatchewan',
    region: 'Saskatchewan, Canada',
    formation: 'Frenchman Formation',
    status: 'confirmed',
    x: 270,
    y: 130,
    notes: 'Discovery site of "Scotty" (RSM P2523.8), described in 2019 as the largest known specimen.',
  },
  {
    id: 'montana',
    region: 'Montana, USA',
    formation: 'Hell Creek Formation',
    status: 'confirmed',
    x: 245,
    y: 185,
    notes: 'Type locality (1902 holotype CM 9380), AMNH 5027 (1908), and MOR 1125 ("B-rex", medullary bone & soft tissue).',
  },
  {
    id: 'north-dakota',
    region: 'North Dakota, USA',
    formation: 'Hell Creek Formation',
    status: 'confirmed',
    x: 305,
    y: 190,
    notes: 'Subtropical coastal plain deposits preserving T. rex alongside Edmontosaurus and Triceratops.',
  },
  {
    id: 'south-dakota',
    region: 'South Dakota, USA',
    formation: 'Hell Creek Formation',
    status: 'confirmed',
    x: 302,
    y: 230,
    notes: 'Famous locality of both "Sue" (FMNH PR 2081, 1990) and "Stan" (BHI 3033, 1987).',
  },
  {
    id: 'wyoming',
    region: 'Wyoming, USA',
    formation: 'Lance Formation',
    status: 'confirmed',
    x: 255,
    y: 250,
    notes: 'Site of Barnum Brown’s 1900 skeleton (originally named Dynamosaurus imperiosus).',
  },
  {
    id: 'colorado',
    region: 'Colorado, USA',
    formation: 'Denver Formation',
    status: 'confirmed',
    x: 265,
    y: 300,
    notes: 'Includes early discoveries near Golden, Colorado, at the foot of the nascent Rocky Mountains.',
  },
  {
    id: 'new-mexico',
    region: 'New Mexico, USA',
    formation: 'McRae / Ojo Alamo Formations',
    status: 'tentative',
    x: 250,
    y: 365,
    notes: 'Tentative / debated southern tyrannosaur material (sometimes referred to Tyrannosaurus mcraeensis or T. rex).',
  },
  {
    id: 'texas',
    region: 'Texas, USA',
    formation: 'Javelina Formation',
    status: 'tentative',
    x: 305,
    y: 410,
    notes: 'Tentative / debated isolated skeletal and dental remains from the Big Bend region.',
  },
];

export const GROWTH_STAGES: GrowthStage[] = [
  {
    age: 2,
    massTonnes: 0.05,
    lengthMeters: 2.1,
    growthRateKgPerDay: 0.1,
    stageLabel: 'Early Juvenile (Age ~2)',
    description: 'Slender, long-legged, and lightly built cursorial hunter occupying a distinct ecological niche from adults.',
  },
  {
    age: 10,
    massTonnes: 1.1,
    lengthMeters: 6.2,
    growthRateKgPerDay: 0.6,
    stageLabel: 'Late Juvenile (Age ~10)',
    description: 'Onset of rapid osteological remodeling as the skull begins deepening and bite forces rise.',
  },
  {
    age: 15,
    massTonnes: 3.8,
    lengthMeters: 9.4,
    growthRateKgPerDay: 2.1,
    stageLabel: 'Teenage Growth Spurt (Age ~15)',
    description: 'Peak exponential growth phase — gaining roughly 2 kg per day (estimate, Erickson et al., 2004) as the body thickens.',
  },
  {
    age: 20,
    massTonnes: 7.5,
    lengthMeters: 11.8,
    growthRateKgPerDay: 0.3,
    stageLabel: 'Somatic Maturity (Age ~20)',
    description: 'Reaches full adult proportions around age 20; MOR 1125 (~18 yrs) preserves medullary bone showing reproductive maturity.',
  },
  {
    age: 28,
    massTonnes: 8.8,
    lengthMeters: 12.3,
    growthRateKgPerDay: 0.05,
    stageLabel: 'Senescent Giant (Age ~28–30)',
    description: 'Maximum known lifespan (~28–30 years) represented by heavily fused, pathology-scarred veterans like "Sue" and "Scotty".',
  },
];

export const MYTH_CARDS: MythItem[] = [
  {
    id: 'vision',
    myth: '"T. rex could only see movement."',
    verdict: 'Movie Myth',
    reality: 'No, that is a movie myth. Forward-facing eyes gave it a 55° binocular overlap and excellent depth perception (Stevens, 2006).',
  },
  {
    id: 'arms',
    myth: '"T. rex had tiny, useless arms."',
    verdict: 'False — Heavily Muscled',
    reality: 'Short, but thick-boned and muscular, about 1 m long with two clawed digits. Each arm could lift roughly 200 kg (estimate); their exact purpose is still debated.',
  },
  {
    id: 'roar',
    myth: '"T. rex roared like a lion."',
    verdict: 'Unlikely — Closed-Mouth Booms',
    reality: 'Not known. Living archosaurian relatives (birds and crocodilians) suggest deep, low-frequency closed-mouth booms, rumbles, or infrasonic vibrations.',
  },
  {
    id: 'speed',
    myth: '"T. rex could outrun a jeep."',
    verdict: 'Biomechanical Limit',
    reality: 'No. Most biomechanical models place adult speeds at roughly 10–30 km/h (estimate) — a fast walker rather than a high-speed sprinter.',
  },
  {
    id: 'stegosaurus',
    myth: '"T. rex lived with Stegosaurus."',
    verdict: '80-Million-Year Gap',
    reality: 'No. Stegosaurus died out in the Late Jurassic, about 80 million years before T. rex appeared. T. rex lived closer in time to humans than to Stegosaurus.',
  },
  {
    id: 'feathers',
    myth: '"T. rex was covered in feathers like a giant chicken."',
    verdict: 'Debated — Mostly Scaled',
    reality: 'Debated. Known adult skin impressions show small pebbly scales (Bell et al., 2017), though early tyrannosauroid relatives like Yutyrannus were feathered.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-01',
    src: '/assets/gallery-01.jpg',
    title: 'Canopy Stalker — Hell Creek Dawn',
    specimen: 'PLATE I · PALEOECOLOGICAL RECONSTRUCTION',
    caption: 'Adult Tyrannosaurus rex emerging through dawn mist beneath Late Cretaceous taxodiaceous conifers and cycadophytes (67.0 MYA).',
    aspect: '16/10',
  },
  {
    id: 'gallery-02',
    src: '/assets/gallery-02.jpg',
    title: 'Cranial Osteology — FMNH PR 2081 ("Sue")',
    specimen: 'PLATE II · CRANIAL MORPHOLOGY',
    caption: '1.5-meter skull displaying fused nasal bones, forward-oriented orbits for binocular vision, and deep mandibular fenestrae.',
    aspect: '4/3',
  },
  {
    id: 'gallery-03',
    src: '/assets/gallery-03.jpg',
    title: 'Maxillary Dentition & Extraoral Tissue',
    specimen: 'PLATE III · DENTAL BIOMECHANICS',
    caption: 'Thick, D-cross-section serrated crowns up to 30 cm including root, engineered to withstand 57,000 N bone-crushing forces.',
    aspect: '4/3',
  },
  {
    id: 'gallery-04',
    src: '/assets/gallery-04.jpg',
    title: 'Laramidia Floodplain — Scollard & Frenchman',
    specimen: 'PLATE IV · MAASTRICHTIAN HABITAT',
    caption: 'Subtropical riverine channels bordering the Western Interior Seaway where T. rex coexisted with Triceratops and Edmontosaurus.',
    aspect: '16/10',
  },
  {
    id: 'gallery-05',
    src: '/assets/gallery-05.jpg',
    title: 'Ontogenetic Growth Series — Juvenile to Giant',
    specimen: 'PLATE V · HISTOLOGICAL GROWTH CURVE',
    caption: 'Comparative skeletal proportions across ages 2, 15, and 28, illustrating the transition from slender juvenile to 9-tonne apex predator.',
    aspect: '4/3',
  },
  {
    id: 'gallery-06',
    src: '/assets/gallery-06.jpg',
    title: 'The K–Pg Horizon — 66.0 Million Years Ago',
    specimen: 'PLATE VI · STRATIGRAPHIC BOUNDARY',
    caption: 'Iridium-enriched clay layer marking the Chicxulub bolide impact that ended the reign of non-avian dinosaurs.',
    aspect: '16/10',
  },
];

export const FAST_FACTS: string[] = [
  'Tyrannosaurus rex lived closer in geological time to modern humans (~66 million years ago) than to Stegosaurus (~150 million years ago).',
  '"Sue" (FMNH PR 2081), discovered in South Dakota in 1990, is about 90% complete by bone volume — one of the most complete skeletons ever found.',
  'In 2020, the celebrated skeleton "Stan" sold at auction for about $31.8 million.',
  'T. rex had roughly 50–60 thick, banana-shaped teeth measuring up to about 30 cm long including the root.',
  'Biomechanical modeling estimates a maximum bite force of up to about 57,000 newtons, among the strongest of any land animal (Gignac and Erickson, 2017).',
  'During its teenage growth spurt, T. rex gained roughly 2 kg per day at peak (estimate, Erickson et al., 2004), reaching adult size around age 20.',
  'Birds are living avian dinosaurs, and T. rex shares a more recent common ancestor with modern birds than with crocodiles.',
  'Distinctive tooth gouges on other Tyrannosaurus bones provide direct fossil evidence of cannibalism (Longrich et al., 2010).',
];

export const SCIENTIFIC_SOURCES: { citation: string; focus: string }[] = [
  { citation: 'Osborn, H. F. (1905)', focus: 'Formal naming and description of Tyrannosaurus rex (Bulletin of the AMNH).' },
  { citation: 'Chin, K. et al. (1998)', focus: 'Large tyrannosaurid coprolite packed with crushed bone in Nature.' },
  { citation: 'Erickson, G. M. et al. (2004)', focus: 'Gigantism and comparative life-history parameters of tyrannosaurid dinosaurs.' },
  { citation: 'Schweitzer, M. H. et al. (2005)', focus: 'Soft-tissue vessels, cellular structures, and medullary bone in MOR 1125.' },
  { citation: 'Stevens, K. A. (2006)', focus: 'Binocular vision and stereopsis in theropod dinosaurs (Journal of Vertebrate Paleontology).' },
  { citation: 'Longrich, N. R. et al. (2010)', focus: 'Cannibalism in Tyrannosaurus rex documented via tooth-marked elements.' },
  { citation: 'Xu, X. et al. (2012)', focus: 'A gigantic feathered tyrannosauroid (Yutyrannus huali) from China.' },
  { citation: 'DePalma, R. A. et al. (2013)', focus: 'Physical evidence of predatory behavior in T. rex (healed bite in Edmontosaurus tail).' },
  { citation: 'Gignac, P. M. & Erickson, G. M. (2017)', focus: 'Biomechanics behind extreme osteophagy and 57,000 N bite forces in Tyrannosaurus rex.' },
  { citation: 'Bell, P. R. et al. (2017)', focus: 'Tyrannosauroid integument reveals conflicting patterns of gigantism and feather evolution.' },
  { citation: 'Persons, W. S., Currie, P. J. & Erickson, G. M. (2019)', focus: 'An older and exceptionally large adult specimen ("Scotty", RSM P2523.8).' },
  { citation: 'Cullen, T. M. et al. (2023)', focus: 'Theropod dinosaur facial reconstruction and extraoral lip tissue coverage.' },
  { citation: 'Museum Institutions', focus: 'Field Museum (Chicago) · American Museum of Natural History (New York) · Smithsonian NMNH · Royal Tyrrell Museum.' },
];
