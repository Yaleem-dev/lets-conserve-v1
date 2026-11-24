/* ------------------------------------------------------------------
   Let's Conserve v3 content layer.
   Every entry carries an `art` key mapped to a topic-matched doodle
   scene (water, waste, forest, energy, transport, climate, garden,
   community, learn, explore).
------------------------------------------------------------------ */

export const APP_DESCRIPTION = 'Your personal guide for eco-action'

/* -------------------------------- LEARN ---------------------------- */

export const learnCategories = ['All', 'Climate', 'Nature', 'Ocean', 'Geography', 'Waste', 'Forests']

export const learnTopics = [
  {
    id: 'climate',
    title: 'Climate, simply',
    category: 'Climate',
    art: 'climate',
    lede: 'Burning fuel traps heat.',
    points: [
      'Global emissions hit a record 57.1 GtCO2e in 2023.',
      'Every region is warming, from Nairobi to Osaka.',
      'The smallest cuts still add up.',
    ],
    fact: 'Nations would need to cut 42 percent of emissions by 2030 to hold 1.5C.',
  },
  {
    id: 'biodiversity',
    title: 'Why variety matters',
    category: 'Nature',
    art: 'garden',
    lede: 'More threads, stronger web.',
    points: [
      'Around one million species are threatened worldwide.',
      'Habitat loss leads, then hunting and pollution.',
      'Native plants help fastest, anywhere you live.',
    ],
    fact: 'Three quarters of the land surface has been visibly altered by people.',
  },
  {
    id: 'pollution',
    title: 'Air, water, plastic',
    category: 'Waste',
    art: 'water',
    lede: 'The worst of it is unseen.',
    points: [
      '99 percent of people breathe air above WHO limits.',
      'Roughly 11 million tonnes of plastic reach the sea yearly.',
      'Sorting waste is the cheapest fix there is.',
    ],
    fact: 'One plastic bottle becomes thousands of pieces, never a bottle again.',
  },
  {
    id: 'circular',
    title: 'Nothing is rubbish',
    category: 'Waste',
    art: 'waste',
    lede: 'Keep it in use, then again.',
    points: [
      'Only a small share of what we make is truly circular.',
      'Repair beats replace, in Lagos or Lisbon.',
      'Waste pickers keep cities running everywhere.',
    ],
    fact: 'Two more years of phone life saves the minerals inside it.',
  },
  {
    id: 'forests',
    title: 'Forests and loss',
    category: 'Forests',
    art: 'forest',
    lede: 'A forest holds four things at once.',
    points: [
      'Tropical primary forest keeps vanishing at around 11 football fields a minute.',
      'Fuelwood and farmland drive most of it.',
      'Mangroves shelter coastlines on every continent.',
    ],
    fact: 'A forest holds carbon, water, soil and species in one place.',
  },
  {
    id: 'ocean',
    title: 'One shared ocean',
    category: 'Ocean',
    art: 'water',
    lede: 'Every river ends up here.',
    points: [
      'The ocean covers 71 percent of the planet.',
      'It absorbs most of the extra heat we trap.',
      'Warm water bleaches coral from Fiji to Florida.',
    ],
    fact: 'Coral reefs host a quarter of marine species on a sliver of the sea floor.',
  },
  {
    id: 'geography',
    title: 'Place shapes the choice',
    category: 'Geography',
    art: 'place',
    lede: 'Where you live decides what helps.',
    points: [
      'Coasts take the first hit from storms.',
      'Mountains store water for the cities below.',
      'Dry regions feel a small shift first.',
    ],
    fact: 'A river running through five nations is only as clean as its furthest source.',
  },
]

export const facts = [
  {
    text: 'Half of the world\u2019s mangrove ecosystems are at risk of collapse, and they shelter coastlines on every continent.',
    art: 'forest',
    img: '/art/fact-mangrove.webp',
    alt: 'Mangrove roots standing in calm turquoise water at low tide',
  },
  {
    text: 'The coco de mer palm grows wild on two Seychelles islands and makes the biggest seed of any plant. It is Endangered.',
    art: 'garden',
    img: '/art/fact-coco.webp',
    alt: 'Giant fan palms over mossy granite on a Seychelles island',
  },
  {
    text: 'Almost everyone on Earth, 99 percent of us, breathes air that breaks WHO limits.',
    art: 'climate',
    img: '/art/fact-air.webp',
    alt: 'City skyline fading into dawn haze and smog',
  },
  {
    text: 'Tropical primary forest is still lost at about 11 football fields every minute, mostly for farmland.',
    art: 'water',
    img: '/art/fact-forest.webp',
    alt: 'Dense rainforest meeting cleared farmland at the forest edge',
  },
]

export const quizQuestions = [
  {
    q: 'The triple planetary crisis is?',
    options: ['Climate, nature loss, pollution', 'Water, debt, migration', 'Noise, light, heat'],
    answer: 0,
    why: 'Climate change, biodiversity loss, pollution and waste.',
  },
  {
    q: 'Recent warming comes mostly from?',
    options: ['The sun', 'Burning fossil fuel', 'Volcanoes'],
    answer: 1,
    why: 'Coal, oil and gas release carbon dioxide.',
  },
  {
    q: 'Circular economy means?',
    options: ['Recycle later', 'Keep materials in use', 'Buy local only'],
    answer: 1,
    why: 'Design for repair and reuse, recycle last.',
  },
  {
    q: 'Best garden move for pollinators?',
    options: ['Native flowers', 'Shorter grass', 'More insecticide'],
    answer: 0,
    why: 'Native plants feed local insects.',
  },
  {
    q: 'Main long lived gas from fossil fuel?',
    options: ['Oxygen', 'Carbon dioxide', 'Nitrogen'],
    answer: 1,
    why: 'That is why net zero targets focus on it.',
  },
]

/* ------------------------------ DISCOVER --------------------------- */

export const regions = [
  { id: 'US', label: 'US' },
  { id: 'UK', label: 'UK' },
  { id: 'CA', label: 'Canada' },
  { id: 'ZA', label: 'South Africa' },
  { id: 'NG', label: 'Nigeria' },
  { id: 'KE', label: 'Kenya' },
  { id: 'IN', label: 'India' },
  { id: 'AU', label: 'Australia' },
  { id: 'MX', label: 'Mexico' },
  { id: 'BR', label: 'Brazil' },
  { id: 'Global', label: 'Global' },
]

/* kind: 'org' or 'vol'. art maps to a topic-matched doodle scene. */
export const organizations = [
  /* United States */
  { id: 'sierra', name: 'Sierra Club', region: 'US', kind: 'vol', art: 'nature', url: 'https://www.sierraclub.org/volunteer', note: 'Outings and service trips.' },
  { id: 'ocean', name: 'Ocean Conservancy', region: 'US', kind: 'vol', art: 'water', url: 'https://oceanconservancy.org/work/plastics/cleanups-icc/', note: 'Coastal cleanups since 1986.' },
  { id: 'volgov', name: 'Volunteer.gov', region: 'US', kind: 'vol', art: 'place', url: 'https://www.volunteer.gov/s/', note: 'Federal parks and public land.' },
  { id: 'idealist', name: 'Idealist', region: 'US', kind: 'vol', art: 'community', url: 'https://www.idealist.org/volunteermatch', note: 'Search by postcode.' },
  { id: 'noaa', name: 'NOAA Sanctuaries', region: 'US', kind: 'vol', art: 'water', url: 'https://sanctuaries.noaa.gov/involved/volunteer_future.html', note: 'Reefs, beaches and surveys.' },

    { id: 'tnc', name: 'The Nature Conservancy', region: 'US', kind: 'vol', art: 'forest', url: 'https://www.nature.org/en-us/', note: 'Land and water stewardship.' },
  { id: 'surfrider', name: 'Surfrider Foundation', region: 'US', kind: 'vol', art: 'water', url: 'https://www.surfrider.org/', note: 'Beach cleanups and water testing.' },
  { id: 'nrdc', name: 'NRDC', region: 'US', kind: 'org', art: 'climate', url: 'https://www.nrdc.org/', note: 'Policy and legal action.' },
  { id: 'sca', name: 'Student Conservation Association', region: 'US', kind: 'vol', art: 'plant', url: 'https://thesca.org/', note: 'Crews for young adults.' },
  { id: 'amforests', name: 'American Forests', region: 'US', kind: 'org', art: 'forest', url: 'https://www.americanforests.org/', note: 'Tree equity in cities.' },
  { id: 'climatereality', name: 'The Climate Reality Project', region: 'US', kind: 'vol', art: 'climate', url: 'https://www.climaterealityproject.org/', note: 'Leadership Corps training.' },

  /* United Kingdom */
  { id: 'wt', name: 'The Wildlife Trusts', region: 'UK', kind: 'vol', art: 'garden', url: 'https://www.wildlifetrusts.org/volunteer', note: '47 local trusts.' },
  { id: 'rspb', name: 'RSPB', region: 'UK', kind: 'vol', art: 'garden', url: 'https://volunteer.rspb.org.uk/', note: 'Reserve and residential roles.' },
  { id: 'woodland', name: 'Woodland Trust', region: 'UK', kind: 'vol', art: 'forest', url: 'https://www.woodlandtrust.org.uk/support-us/act/volunteer-with-us/', note: 'Planting and woodland care.' },

    { id: 'nt', name: 'National Trust', region: 'UK', kind: 'vol', art: 'place', url: 'https://www.nationaltrust.org.uk/support-us/volunteer', note: 'Gardens, coast and countryside.' },
  { id: 'foeuk', name: 'Friends of the Earth UK', region: 'UK', kind: 'vol', art: 'community', url: 'https://friendsoftheearth.uk/', note: '200 local action groups.' },
  { id: 'tcv', name: 'The Conservation Volunteers', region: 'UK', kind: 'vol', art: 'cleanup', url: 'https://www.tcv.org.uk/', note: 'Green gyms and practical days.' },
  { id: 'tfc', name: 'Trees for Cities', region: 'UK', kind: 'vol', art: 'plant', url: 'https://www.treesforcities.org/', note: 'Urban planting days.' },
  { id: 'bto', name: 'British Trust for Ornithology', region: 'UK', kind: 'vol', art: 'garden', url: 'https://www.bto.org/', note: 'Bird surveys you can join.' },
  { id: 'crt', name: 'Canal & River Trust', region: 'UK', kind: 'vol', art: 'water', url: 'https://canalrivertrust.org.uk/volunteer', note: 'Towpaths, locks and litter.' },
  { id: 'mcs', name: 'Marine Conservation Society', region: 'UK', kind: 'vol', art: 'water', url: 'https://www.mcsuk.org/', note: 'Beachwatch and seaweed surveys.' },

  /* South Africa */
  { id: 'wessa', name: 'WESSA', region: 'ZA', kind: 'org', art: 'learn', url: 'https://www.wessa.org.za/', note: 'Education and advocacy since 1926.' },
  { id: 'ewt', name: 'Endangered Wildlife Trust', region: 'ZA', kind: 'org', art: 'nature', url: 'https://ewt.org/', note: 'Threatened species work.' },
  { id: 'wwfsa', name: 'WWF South Africa', region: 'ZA', kind: 'org', art: 'harvest', url: 'https://www.wwf.org.za/', note: 'Landscapes and freshwater.' },
  { id: 'gpafrica', name: 'Greenpeace Africa', region: 'ZA', kind: 'vol', art: 'climate', url: 'https://www.greenpeace.org/africa/en/', note: 'Volunteer teams in three cities.' },

    { id: 'capenature', name: 'CapeNature', region: 'ZA', kind: 'org', art: 'nature', url: 'https://www.capenature.co.za/', note: 'Western Cape reserves.' },
  { id: 'sanbi', name: 'SANBI', region: 'ZA', kind: 'org', art: 'garden', url: 'https://www.sanbi.org/', note: 'National botanical gardens.' },
  { id: 'sharkspotters', name: 'Shark Spotters', region: 'ZA', kind: 'vol', art: 'water', url: 'https://sharkspotters.org.za/', note: 'Cape Town shoreline shifts.' },
  { id: 'wildlifeact', name: 'Wildlife ACT', region: 'ZA', kind: 'vol', art: 'explore', url: 'https://wildlifeact.com/', note: 'Field monitoring in Zululand.' },
  { id: 'sanparks', name: 'SANParks', region: 'ZA', kind: 'org', art: 'forest', url: 'https://www.sanparks.org/', note: 'Kruger and 19 other parks.' },

  /* Nigeria */
  { id: 'ncf', name: 'Nigerian Conservation Foundation', region: 'NG', kind: 'org', art: 'forest', url: 'https://ncfnigeria.org/', note: 'Forests and wetlands since 1980.' },
  { id: 'era', name: 'Environmental Rights Action', region: 'NG', kind: 'org', art: 'water', url: 'https://erafoen.org/', note: 'Friends of the Earth Nigeria.' },
  { id: 'wecyclers', name: 'Wecyclers', region: 'NG', kind: 'org', art: 'waste', url: 'https://www.wecyclers.com/', note: 'Cargo bikes collect in Lagos.' },
  { id: 'recyclepoints', name: 'RecyclePoints', region: 'NG', kind: 'org', art: 'waste', url: 'https://recyclepoints.com/', note: 'Waste traded for rewards.' },
  { id: 'sradev', name: 'SRADev Nigeria', region: 'NG', kind: 'org', art: 'climate', url: 'https://sradev.org/', note: 'Waste, chemicals, air quality.' },

    { id: 'aci', name: 'Africa Cleanup Initiative', region: 'NG', kind: 'vol', art: 'cleanup', url: 'https://africancleanupinitiative.org/', note: 'Cleanup Naija volunteer days.' },
  { id: 'lawma', name: 'LAWMA', region: 'NG', kind: 'org', art: 'waste', url: 'https://www.lawma.gov.ng/', note: 'Lagos waste authority.' },
  { id: 'ecopals', name: 'Ecopals Nigeria', region: 'NG', kind: 'org', art: 'community', url: 'https://www.ecopals.org/', note: 'Youth climate education.' },
  { id: 'sustyvibes', name: 'SustyVibes', region: 'NG', kind: 'vol', art: 'community', url: 'https://sustyvibes.org/', note: 'Youth-led projects since 2016.' },
  { id: 'preserveroots', name: 'Preserve Our Roots', region: 'NG', kind: 'vol', art: 'plant', url: 'https://preserveourroots.org.ng/', note: 'By youth, for youth climate action.' },
  { id: 'illuminate', name: 'Team Illuminate', region: 'NG', kind: 'vol', art: 'learn', url: 'https://teamilluminate.org.ng/', note: 'Climate education in schools.' },

  /* Canada */
  { id: 'ncc', name: 'Nature Conservancy of Canada', region: 'CA', kind: 'vol', art: 'forest', url: 'https://www.natureconservancy.ca/', note: 'Habitat stewardship across provinces.' },
  { id: 'dsf', name: 'David Suzuki Foundation', region: 'CA', kind: 'org', art: 'climate', url: 'https://davidsuzuki.org/', note: 'Climate policy and citizen science.' },
  { id: 'evergreen', name: 'Evergreen', region: 'CA', kind: 'vol', art: 'community', url: 'https://www.evergreen.ca/', note: 'School grounds and city green space.' },

  /* Kenya */
  { id: 'lewa', name: 'Lewa Wildlife Conservancy', region: 'KE', kind: 'vol', art: 'nature', url: 'https://www.lewa.org/', note: 'Rhino and rangeland protection.' },
  { id: 'sheldrick', name: 'Sheldrick Wildlife Trust', region: 'KE', kind: 'vol', art: 'nature', url: 'https://www.sheldrickwildlifetrust.org/', note: 'Orphan elephants and anti poaching.' },

  /* India */
  { id: 'wti', name: 'Wildlife Trust of India', region: 'IN', kind: 'org', art: 'nature', url: 'https://www.wti.org.in/', note: 'Rescue, rehab and corridors.' },
  { id: 'cse', name: 'Centre for Science and Environment', region: 'IN', kind: 'org', art: 'climate', url: 'https://www.cseindia.org/', note: 'Air, water and climate research.' },
  { id: 'chintan', name: 'Chintan Environmental Research', region: 'IN', kind: 'vol', art: 'waste', url: 'https://chintan-india.org/', note: 'Waste pickers and circular cities.' },

  /* Australia */
  { id: 'acf', name: 'Australian Conservation Foundation', region: 'AU', kind: 'vol', art: 'climate', url: 'https://www.acf.org.au/', note: 'Climate and nature campaigns.' },
  { id: 'bushheritage', name: 'Bush Heritage Australia', region: 'AU', kind: 'vol', art: 'place', url: 'https://www.bushheritage.org.au/', note: 'Reserves and field days.' },
  { id: 'landcare', name: 'Landcare Australia', region: 'AU', kind: 'vol', art: 'plant', url: 'https://landcareaustralia.org.au/', note: 'Local planting and river care groups.' },

  /* Mexico */
  { id: 'pronatura', name: 'Pronatura Mexico', region: 'MX', kind: 'org', art: 'forest', url: 'https://www.pronatura.org.mx/', note: 'Forests, coasts and migratory birds.' },
  { id: 'conanp', name: 'CONANP', region: 'MX', kind: 'vol', art: 'place', url: 'https://www.gob.mx/conanp', note: 'Runs Mexico\u2019s protected areas.' },

  /* Brazil */
  { id: 'sosma', name: 'SOS Mata Atlantica', region: 'BR', kind: 'vol', art: 'forest', url: 'https://www.sosma.org.br/', note: 'Atlantic forest restoration.' },
  { id: 'imazon', name: 'Imazon', region: 'BR', kind: 'org', art: 'climate', url: 'https://imazon.org.br/', note: 'Amazon deforestation monitoring.' },

  /* Global */
  { id: 'unep', name: 'UN Environment Programme', region: 'Global', kind: 'org', art: 'climate', url: 'https://www.unep.org/', note: 'Global assessments.' },
  { id: 'foei', name: 'Friends of the Earth', region: 'Global', kind: 'org', art: 'community', url: 'https://www.foei.org/', note: 'Grassroots justice groups.' },
  { id: 'wwf', name: 'WWF', region: 'Global', kind: 'org', art: 'nature', url: 'https://www.worldwildlife.org/', note: 'Species and habitat programmes.' },
  { id: 'zooniverse', name: 'Zooniverse', region: 'Global', kind: 'vol', art: 'explore', url: 'https://www.zooniverse.org/', note: 'Citizen science from home.' },
  { id: 'unccelearn', name: 'UN CC:Learn', region: 'Global', kind: 'org', art: 'learn', url: 'https://unccelearn.org/', note: 'Free UN climate courses.' },
  { id: 'cardinals', name: 'Climate Cardinals', region: 'Global', kind: 'vol', art: 'learn', url: 'https://www.climatecardinals.org/', note: 'Translating climate info.' },
  /* Global, added this pass */
  { id: 'iucn', name: 'IUCN', category: 'Data', region: 'Global', kind: 'org', art: 'nature', url: 'https://iucn.org/', note: 'Keeper of the Red List.' },
  { id: 'ci', name: 'Conservation International', category: 'News', region: 'Global', kind: 'org', art: 'forest', url: 'https://www.conservation.org/', note: 'Science led protection.' },
  { id: 'birdlife', name: 'BirdLife International', category: 'Learning', region: 'Global', kind: 'org', art: 'garden', url: 'https://www.birdlife.org/', note: 'Birds and key habitats.' },
  { id: 'faunaflora', name: 'Fauna and Flora', region: 'Global', kind: 'org', art: 'explore', url: 'https://www.fauna-flora.org/', note: 'Partners in 50 countries.' },
  { id: 'rainforest', name: 'Rainforest Alliance', category: 'Learning', region: 'Global', kind: 'org', art: 'harvest', url: 'https://www.rainforest-alliance.org/', note: 'Certification and farming.' },
  { id: 'earthday', name: 'EARTHDAY.ORG', category: 'News', region: 'Global', kind: 'vol', art: 'celebrate', url: 'https://www.earthday.org/', note: 'The Great Global Cleanup.' },
  { id: 'gpintl', name: 'Greenpeace International', category: 'News', region: 'Global', kind: 'vol', art: 'climate', url: 'https://www.greenpeace.org/international/', note: 'Campaigns and organising.' },
  { id: 'inaturalist', name: 'iNaturalist', category: 'Learning', region: 'Global', kind: 'vol', art: 'garden', url: 'https://www.inaturalist.org/', note: 'Log species from your phone.' },
  { id: 'ebird', name: 'eBird', category: 'Learning', region: 'Global', kind: 'vol', art: 'explore', url: 'https://ebird.org/home', note: 'Share your bird lists.' },

]

export const guideGroups = [
  {
    id: 'home',
    label: 'Home',
    guides: [
      { title: 'Weigh your waste', art: 'waste', img: '/art/guide-waste.webp', points: 10 },
      { title: 'Kill standby power', art: 'energy', img: '/art/guide-energy.webp', points: 10 },
      { title: 'Water twice', art: 'water', img: '/art/guide-water.webp', points: 10 },
    ],
  },
  {
    id: 'school',
    label: 'School',
    guides: [
      { title: 'Start a green club', art: 'learn', img: '/art/guide-club.webp', points: 15 },
      { title: 'Go bottle free', art: 'waste', img: '/art/guide-bottle.webp', points: 15 },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    guides: [
      { title: 'Run a street cleanup', art: 'community', img: '/art/guide-cleanup.webp', points: 25 },
      { title: 'Adopt a tree', art: 'forest', img: '/art/guide-tree.webp', points: 20 },
    ],
  },
]

/* -------------------------------- QUEST ---------------------------- */

export const questCategories = ['All', 'Nature', 'Community', 'Living', 'Wildlife']

export const quests = [
  { id: 'plant', title: 'Plant something', category: 'Nature', points: 20, art: 'plant', img: '/art/guide-tree.webp', text: 'A tree or a tin of herbs.' },
  { id: 'outdoors', title: 'Get outside', category: 'Nature', points: 15, art: 'outdoors', img: '/art/quest-outdoors.webp', text: 'Twenty minutes in green space.' },
  { id: 'waste', title: 'Sort your waste', category: 'Living', points: 20, art: 'waste', img: '/art/guide-waste.webp', text: 'Three separate streams.' },
  { id: 'cleanup', title: 'Clean a spot', category: 'Community', points: 25, art: 'cleanup', img: '/art/guide-cleanup.webp', text: 'One street, one hour.' },
  { id: 'walk', title: 'Walk a short trip', category: 'Living', points: 15, art: 'walk', img: '/art/quest-walk.webp', text: 'Leave the car once.' },
  { id: 'learn', title: 'Learn one thing', category: 'Nature', points: 10, art: 'learn', img: '/art/quest-learn.webp', text: 'Read one explainer.' },
  { id: 'pollinator', title: 'Plant for bees', category: 'Wildlife', points: 20, art: 'pollinator', img: '/art/quest-pollinator.webp', text: 'A pot of native flowers.' },
  { id: 'share', title: 'Teach someone', category: 'Community', points: 15, art: 'teach', img: '/art/quest-teach.webp', text: 'Pass on one skill.' },
]

export const badges = [
  { id: 'seed', label: 'Seed', at: 25 },
  { id: 'sprout', label: 'Sprout', at: 60 },
  { id: 'grove', label: 'Grove', at: 120 },
  { id: 'canopy', label: 'Canopy', at: 200 },
]

/* ------------------------------- EXPLORE --------------------------- */

export const exploreCategories = ['All', 'Data', 'Calculators', 'Learning', 'News']

export const resources = [
  { id: 'nasa', name: 'NASA Climate', category: 'Data', art: 'climate', url: 'https://science.nasa.gov/climate-change/', why: 'Satellite data, clean visuals.' },
  { id: 'gnw', name: 'Global Nature Watch', category: 'Data', art: 'forest', url: 'https://globalnaturewatch.org/', why: 'Near real time forest alerts.' },
  { id: 'iqair', name: 'IQAir', category: 'Data', art: 'climate', url: 'https://www.iqair.com/world-air-quality', why: 'Live air quality by city.' },
  { id: 'footprint', name: 'Footprint Calculator', category: 'Calculators', art: 'transport', url: 'https://www.footprintcalculator.org/', why: 'Planets your life would need.' },
  { id: 'wwffoot', name: 'WWF Footprint', category: 'Calculators', art: 'home', url: 'https://footprint.wwf.org.uk/', why: 'Your impact in four parts.' },
  { id: 'epa', name: 'EPA Calculator', category: 'Calculators', art: 'energy', url: 'https://www.epa.gov/ghgemissions/carbon-footprint-calculator', why: 'Household detail from bills.' },
  { id: 'unccelearn', name: 'UN CC:Learn', category: 'Learning', art: 'learn', url: 'https://unccelearn.org/', why: 'Free courses, with certificates.' },
  { id: 'unep', name: 'UNEP', category: 'News', art: 'climate', url: 'https://www.unep.org/', why: 'Authoritative global reporting.' },
  { id: 'foei', name: 'Friends of the Earth', category: 'News', art: 'community', url: 'https://www.foei.org/', why: 'Grassroots justice reporting.' },
  { id: 'grist', name: 'Grist', category: 'News', art: 'climate', url: 'https://grist.org/', why: 'Independent climate reporting.' },
  { id: 'ycc', name: 'Yale Climate Connections', category: 'News', art: 'learn', url: 'https://yaleclimateconnections.org/', why: 'Daily climate news and solutions.' },
  { id: 'iucn', name: 'IUCN', region: 'Global', kind: 'org', art: 'nature', url: 'https://iucn.org/', note: 'The species Red List.' },
  { id: 'ci', name: 'Conservation International', region: 'Global', kind: 'org', art: 'forest', url: 'https://www.conservation.org/', note: 'Science led protection.' },
  { id: 'birdlife', name: 'BirdLife International', region: 'Global', kind: 'org', art: 'garden', url: 'https://www.birdlife.org/', note: 'Birds and key habitats.' },
  { id: 'faunaflora', name: 'Fauna & Flora', category: 'News', region: 'Global', kind: 'org', art: 'explore', url: 'https://www.fauna-flora.org/', note: 'Partners in 50 countries.' },
  { id: 'rainforest', name: 'Rainforest Alliance', region: 'Global', kind: 'org', art: 'harvest', url: 'https://www.rainforest-alliance.org/', note: 'Certification and farming.' },
  { id: 'earthday', name: 'EARTHDAY.ORG', region: 'Global', kind: 'vol', art: 'celebrate', url: 'https://www.earthday.org/', note: 'The Great Global Cleanup.' },
  { id: 'gpintl', name: 'Greenpeace International', region: 'Global', kind: 'vol', art: 'climate', url: 'https://www.greenpeace.org/international/', note: 'Campaigns and organising.' },
  { id: 'inaturalist', name: 'iNaturalist', region: 'Global', kind: 'vol', art: 'garden', url: 'https://www.inaturalist.org/', note: 'Log species from your phone.' },
  { id: 'ebird', name: 'eBird', region: 'Global', kind: 'vol', art: 'explore', url: 'https://ebird.org/home', note: 'Share your bird lists.' },

]
/* Khan Academy lessons. Every id below was checked against the @khanacademy
   channel before it was added, so none of them point at a re-upload. */
export const videos = [
  {
    id: 'z9xKxciHgo8',
    title: "Earth's changing climate",
    topic: 'Climate',
    length: '4 min',
  },
  {
    id: 'K10qnzCYH54',
    title: 'Human impacts on ecosystems',
    topic: 'Nature',
    length: '5 min',
  },
  {
    id: 'XynPVsE1fd4',
    title: 'The carbon cycle',
    topic: 'Climate',
    length: '4 min',
  },
  {
    id: '6N-W1guncoo',
    title: 'Freshwater use and conservation',
    topic: 'Water',
    length: '4 min',
  },
  {
    id: 'ZplA8A-bbWo',
    title: 'The world ocean',
    topic: 'Ocean',
    length: '5 min',
  },
  {
    id: 'P05gJ_KbPBs',
    title: 'Deforestation',
    topic: 'Forests',
    length: '3 min',
  },
]
