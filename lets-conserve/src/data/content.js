/* ------------------------------------------------------------------
   Let's Conserve v3 content layer.
   Every entry carries an `art` key mapped to a topic-matched doodle
   scene (water, waste, forest, energy, transport, climate, garden,
   community, learn, explore).
------------------------------------------------------------------ */

export const APP_DESCRIPTION = 'Your personal guide for eco-action'

/* -------------------------------- LEARN ---------------------------- */

export const learnCategories = ['All', 'Climate', 'Nature', 'Waste', 'Forests']

export const learnTopics = [
  {
    id: 'climate',
    title: 'Climate, simply',
    category: 'Climate',
    art: 'climate',
    lede: 'Burning fuel traps heat.',
    points: ['More carbon, warmer planet.', 'Wetter rains and longer droughts.', 'Small cuts still count.'],
    fact: 'Carbon in the air is the highest in 800,000 years.',
  },
  {
    id: 'biodiversity',
    title: 'Why variety matters',
    category: 'Nature',
    art: 'garden',
    lede: 'More threads, stronger web.',
    points: ['One million species under threat.', 'Habitat loss leads.', 'Native plants help fastest.'],
    fact: 'Nigeria is one of Africa’s most biodiverse countries.',
  },
  {
    id: 'pollution',
    title: 'Air, water, plastic',
    category: 'Waste',
    art: 'water',
    lede: 'The worst of it is unseen.',
    points: ['Nine in ten breathe dirty air.', '11 million tonnes of plastic a year.', 'Sorting waste is the cheapest fix.'],
    fact: 'One bottle becomes thousands of pieces.',
  },
  {
    id: 'circular',
    title: 'Nothing is rubbish',
    category: 'Waste',
    art: 'waste',
    lede: 'Keep it in use, then again.',
    points: ['Less than a tenth is circular.', 'Repair beats replace.', 'Collectors pay per kilo.'],
    fact: 'Two more years of phone life saves a lot.',
  },
  {
    id: 'forests',
    title: 'Forests and loss',
    category: 'Forests',
    art: 'forest',
    lede: 'A forest holds four things at once.',
    points: ['Ten football pitches a minute, lost.', 'Fuelwood drives Nigerian loss.', 'Mangroves shield the coast.'],
    fact: 'NCF has protected Nigerian forest since 1980.',
  },
]

export const facts = [
  { text: 'Mangroves store more carbon than most land forests.', art: 'forest' },
  { text: 'A garbage truck of plastic enters the sea every minute.', art: 'water' },
  { text: 'Cities cover 3% of land and use most of its energy.', art: 'energy' },
  { text: 'The Ibadan malimbe survives in a few forest patches.', art: 'garden' },
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
  { id: 'ZA', label: 'South Africa' },
  { id: 'NG', label: 'Nigeria' },
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

  /* United Kingdom */
  { id: 'wt', name: 'The Wildlife Trusts', region: 'UK', kind: 'vol', art: 'garden', url: 'https://www.wildlifetrusts.org/volunteer', note: '47 local trusts.' },
  { id: 'rspb', name: 'RSPB', region: 'UK', kind: 'vol', art: 'garden', url: 'https://volunteer.rspb.org.uk/', note: 'Reserve and residential roles.' },
  { id: 'woodland', name: 'Woodland Trust', region: 'UK', kind: 'vol', art: 'forest', url: 'https://www.woodlandtrust.org.uk/support-us/act/volunteer-with-us/', note: 'Planting and woodland care.' },

  /* South Africa */
  { id: 'wessa', name: 'WESSA', region: 'ZA', kind: 'org', art: 'learn', url: 'https://www.wessa.org.za/', note: 'Education and advocacy since 1926.' },
  { id: 'ewt', name: 'Endangered Wildlife Trust', region: 'ZA', kind: 'org', art: 'nature', url: 'https://ewt.org/', note: 'Threatened species work.' },
  { id: 'wwfsa', name: 'WWF South Africa', region: 'ZA', kind: 'org', art: 'harvest', url: 'https://www.wwf.org.za/', note: 'Landscapes and freshwater.' },
  { id: 'gpafrica', name: 'Greenpeace Africa', region: 'ZA', kind: 'vol', art: 'climate', url: 'https://www.greenpeace.org/africa/en/', note: 'Volunteer teams in three cities.' },

  /* Nigeria */
  { id: 'ncf', name: 'Nigerian Conservation Foundation', region: 'NG', kind: 'org', art: 'forest', url: 'https://ncfnigeria.org/', note: 'Forests and wetlands since 1980.' },
  { id: 'era', name: 'Environmental Rights Action', region: 'NG', kind: 'org', art: 'water', url: 'https://erafoen.org/', note: 'Friends of the Earth Nigeria.' },
  { id: 'wecyclers', name: 'Wecyclers', region: 'NG', kind: 'org', art: 'waste', url: 'https://www.wecyclers.com/', note: 'Cargo bikes collect in Lagos.' },
  { id: 'recyclepoints', name: 'RecyclePoints', region: 'NG', kind: 'org', art: 'waste', url: 'https://recyclepoints.com/', note: 'Waste traded for rewards.' },
  { id: 'sradev', name: 'SRADev Nigeria', region: 'NG', kind: 'org', art: 'climate', url: 'https://sradev.org/', note: 'Waste, chemicals, air quality.' },

  /* Global */
  { id: 'unep', name: 'UN Environment Programme', region: 'Global', kind: 'org', art: 'climate', url: 'https://www.unep.org/', note: 'Global assessments.' },
  { id: 'foei', name: 'Friends of the Earth', region: 'Global', kind: 'org', art: 'community', url: 'https://www.foei.org/', note: 'Grassroots justice groups.' },
  { id: 'wwf', name: 'WWF', region: 'Global', kind: 'org', art: 'nature', url: 'https://www.worldwildlife.org/', note: 'Species and habitat programmes.' },
  { id: 'zooniverse', name: 'Zooniverse', region: 'Global', kind: 'vol', art: 'explore', url: 'https://www.zooniverse.org/', note: 'Citizen science from home.' },
  { id: 'unccelearn', name: 'UN CC:Learn', region: 'Global', kind: 'org', art: 'learn', url: 'https://unccelearn.org/', note: 'Free UN climate courses.' },
]

export const guideGroups = [
  {
    id: 'home',
    label: 'At home',
    guides: [
      { title: 'Weigh your waste', art: 'waste', points: 10 },
      { title: 'Kill standby power', art: 'energy', points: 10 },
      { title: 'Water twice', art: 'water', points: 10 },
    ],
  },
  {
    id: 'school',
    label: 'School',
    guides: [
      { title: 'Start a green club', art: 'learn', points: 15 },
      { title: 'Go bottle free', art: 'waste', points: 15 },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    guides: [
      { title: 'Run a street cleanup', art: 'community', points: 25 },
      { title: 'Adopt a tree', art: 'forest', points: 20 },
    ],
  },
]

/* -------------------------------- QUEST ---------------------------- */

export const questCategories = ['All', 'Nature', 'Community', 'Living', 'Wildlife']

export const quests = [
  { id: 'plant', title: 'Plant something', category: 'Nature', points: 20, art: 'garden', text: 'A tree or a tin of herbs.' },
  { id: 'outdoors', title: 'Get outside', category: 'Nature', points: 15, art: 'explore', text: 'Twenty minutes in green space.' },
  { id: 'waste', title: 'Sort your waste', category: 'Living', points: 20, art: 'waste', text: 'Three separate streams.' },
  { id: 'cleanup', title: 'Clean a spot', category: 'Community', points: 25, art: 'community', text: 'One street, one hour.' },
  { id: 'walk', title: 'Walk a short trip', category: 'Living', points: 15, art: 'transport', text: 'Leave the car once.' },
  { id: 'learn', title: 'Learn one thing', category: 'Nature', points: 10, art: 'learn', text: 'Read one explainer.' },
  { id: 'pollinator', title: 'Plant for bees', category: 'Wildlife', points: 20, art: 'garden', text: 'A pot of native flowers.' },
  { id: 'share', title: 'Teach someone', category: 'Community', points: 15, art: 'community', text: 'Pass on one skill.' },
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
]
