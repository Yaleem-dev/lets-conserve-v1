/* ------------------------------------------------------------------
   Let's Conserve v2 content layer.
   Short copy by design: the visuals carry the explanation.
   Every organization and resource link below was checked live.
------------------------------------------------------------------ */

export const APP_DESCRIPTION = 'Your personal guide for eco-action'

/* -------------------------------- LEARN ---------------------------- */

export const learnCategories = ['All', 'Climate', 'Nature', 'Waste', 'Forests']

export const learnTopics = [
  {
    id: 'climate',
    title: 'Climate, simply',
    category: 'Climate',
    art: 'sun',
    lede: 'Burning fuel traps heat. Everything else follows from that.',
    points: [
      'More carbon in the air means a warmer planet.',
      'Warmer air holds more water, so rain gets heavier and droughts get longer.',
      'Small cuts still count.',
    ],
    fact: 'Carbon dioxide in the air is higher now than at any point in the last 800,000 years.',
  },
  {
    id: 'biodiversity',
    title: 'Why variety matters',
    category: 'Nature',
    art: 'leaf',
    lede: 'A web with more threads breaks less easily.',
    points: [
      'Roughly one million species are under threat.',
      'Habitat loss is the biggest cause.',
      'Native plants bring pollinators back fastest.',
    ],
    fact: 'Nigeria is one of Africa’s most biodiverse countries.',
  },
  {
    id: 'pollution',
    title: 'Air, water, plastic',
    category: 'Waste',
    art: 'recycling',
    lede: 'Pollution is usually worst where it is least seen.',
    points: [
      'Nine in ten people breathe air above WHO limits.',
      'About 11 million tonnes of plastic reach the ocean each year.',
      'Sorting waste at home is the cheapest fix available.',
    ],
    fact: 'One bottle breaks into thousands of pieces that never fully go away.',
  },
  {
    id: 'circular',
    title: 'Nothing is rubbish',
    category: 'Waste',
    art: 'cycle',
    lede: 'Circular means keep it in use, then keep it again.',
    points: [
      'Less than a tenth of the world economy is circular.',
      'Repair beats replace.',
      'Collectors in Lagos and Nairobi pay per kilo.',
    ],
    fact: 'Two more years of phone life avoids much of the cost of making a new one.',
  },
  {
    id: 'forests',
    title: 'Forests and loss',
    category: 'Forests',
    art: 'tree',
    lede: 'A forest holds carbon, soil, water and animals at once. Clear it and you lose all four.',
    points: [
      'Tropical forest loss in 2023 ran at about ten football pitches a minute.',
      'Nigeria loses cover fast, mostly to fuelwood and farmland.',
      'Mangroves in the Niger Delta shield the coast from storms.',
    ],
    fact: 'NCF has protected Nigerian forest and wetland since 1980.',
  },
]

export const facts = [
  { text: 'Mangroves store more carbon per hectare than most land forests.', source: 'Conservation literature', tone: 'mint' },
  { text: 'A garbage truck of plastic enters the ocean every minute.', source: 'UNEP', tone: 'sky' },
  { text: 'Cities cover 3% of land and use most of its energy.', source: 'United Nations', tone: 'gold' },
  { text: 'The Ibadan malimbe lives in a handful of forest patches.', source: 'BirdLife', tone: 'rose' },
]

export const quizQuestions = [
  {
    q: 'Which three crises are known as the triple planetary crisis?',
    options: ['Climate, nature loss, pollution', 'Water, debt, migration', 'Noise, light, heat'],
    answer: 0,
    why: 'The UN uses this phrase for climate change, biodiversity loss, and pollution and waste.',
  },
  {
    q: 'What drives recent global warming most?',
    options: ['The sun', 'Burning fossil fuel', 'Volcanoes'],
    answer: 1,
    why: 'Coal, oil and gas release carbon dioxide that traps heat.',
  },
  {
    q: 'Circular economy means what?',
    options: ['Recycle later', 'Keep materials in use', 'Buy local only'],
    answer: 1,
    why: 'Design for repair and reuse first, recycle last.',
  },
  {
    q: 'The best garden move for pollinators is?',
    options: ['Native flowers', 'Shorter grass', 'More insecticide'],
    answer: 0,
    why: 'Native plants give the food and shelter local insects evolved with.',
  },
  {
    q: 'Which gas is the main long lived one from fossil fuel?',
    options: ['Oxygen', 'Carbon dioxide', 'Nitrogen'],
    answer: 1,
    why: 'Carbon dioxide is why net zero targets focus on it.',
  },
]

/* ------------------------------ DISCOVER --------------------------- */

export const regions = [
  { id: 'US', label: 'United States', short: 'US' },
  { id: 'UK', label: 'United Kingdom', short: 'UK' },
  { id: 'ZA', label: 'South Africa', short: 'ZA' },
  { id: 'NG', label: 'Nigeria', short: 'NG' },
  { id: 'Global', label: 'Global', short: 'Global' },
]

/* kind: 'org' = organization, 'vol' = volunteering platform or programme */
export const organizations = [
  /* United States */
  { id: 'sierra', name: 'Sierra Club', region: 'US', kind: 'vol', focus: 'Outdoors', url: 'https://www.sierraclub.org/volunteer', note: 'Local outings, service trips and campaigns.' },
  { id: 'ocean', name: 'Ocean Conservancy', region: 'US', kind: 'vol', focus: 'Oceans', url: 'https://oceanconservancy.org/work/plastics/cleanups-icc/', note: 'Runs the International Coastal Cleanup.' },
  { id: 'volgov', name: 'Volunteer.gov', region: 'US', kind: 'vol', focus: 'Public land', url: 'https://www.volunteer.gov/s/', note: 'Federal land and park placements.' },
  { id: 'idealist', name: 'Idealist', region: 'US', kind: 'vol', focus: 'Any cause', url: 'https://www.idealist.org/volunteermatch', note: 'Search thousands of listings by postcode.' },
  { id: 'noaa', name: 'NOAA Sanctuaries', region: 'US', kind: 'vol', focus: 'Marine', url: 'https://sanctuaries.noaa.gov/involved/volunteer_future.html', note: 'Beach, reef and survey work.' },

  /* United Kingdom */
  { id: 'wt', name: 'The Wildlife Trusts', region: 'UK', kind: 'vol', focus: 'Local nature', url: 'https://www.wildlifetrusts.org/volunteering-opportunities', note: '47 trusts. Reserves, surveys, gardening.' },
  { id: 'rspb', name: 'RSPB', region: 'UK', kind: 'vol', focus: 'Birds', url: 'https://volunteer.rspb.org.uk/', note: 'Reserve and residential placements.' },
  { id: 'woodland', name: 'Woodland Trust', region: 'UK', kind: 'vol', focus: 'Trees', url: 'https://www.woodlandtrust.org.uk/support-us/act/volunteer-with-us/', note: 'Planting and woodland care days.' },

  /* South Africa */
  { id: 'wessa', name: 'WESSA', region: 'ZA', kind: 'org', focus: 'Education', url: 'https://www.wessa.org.za/', note: 'Education, advocacy and training since 1926.' },
  { id: 'ewt', name: 'Endangered Wildlife Trust', region: 'ZA', kind: 'org', focus: 'Species', url: 'https://ewt.org/', note: 'Threatened species and ecosystems.' },
  { id: 'wwfsa', name: 'WWF South Africa', region: 'ZA', kind: 'org', focus: 'Landscapes', url: 'https://www.wwf.org.za/', note: 'Priority landscapes and freshwater.' },
  { id: 'gpafrica', name: 'Greenpeace Africa', region: 'ZA', kind: 'vol', focus: 'Campaigns', url: 'https://www.greenpeace.org/africa/en/', note: 'Volunteer teams in three cities.' },

  /* Nigeria */
  { id: 'ncf', name: 'Nigerian Conservation Foundation', region: 'NG', kind: 'org', focus: 'Conservation', url: 'https://ncfnigeria.org/', note: 'Forests, wetlands and education since 1980.' },
  { id: 'era', name: 'Environmental Rights Action', region: 'NG', kind: 'org', focus: 'Justice', url: 'https://erafoen.org/', note: 'Friends of the Earth Nigeria.' },
  { id: 'wecyclers', name: 'Wecyclers', region: 'NG', kind: 'org', focus: 'Recycling', url: 'https://www.wecyclers.com/', note: 'Cargo bikes collect sorted waste in Lagos.' },
  { id: 'recyclepoints', name: 'RecyclePoints', region: 'NG', kind: 'org', focus: 'Recycling', url: 'https://recyclepoints.com/', note: 'Waste traded for points and rewards.' },
  { id: 'sradev', name: 'SRADev Nigeria', region: 'NG', kind: 'org', focus: 'Health', url: 'https://sradev.org/', note: 'Waste, chemicals and air quality research.' },

  /* Global */
  { id: 'unep', name: 'UN Environment Programme', region: 'Global', kind: 'org', focus: 'Policy', url: 'https://www.unep.org/', note: 'Global assessments and campaigns.' },
  { id: 'foei', name: 'Friends of the Earth', region: 'Global', kind: 'org', focus: 'Justice', url: 'https://www.foei.org/', note: 'Federation of grassroots groups.' },
  { id: 'wwf', name: 'WWF', region: 'Global', kind: 'org', focus: 'Conservation', url: 'https://www.worldwildlife.org/', note: 'Species and habitat programmes.' },
  { id: 'zooniverse', name: 'Zooniverse', region: 'Global', kind: 'vol', focus: 'Citizen science', url: 'https://www.zooniverse.org/', note: 'Contribute to research from a laptop.' },
  { id: 'unccelearn', name: 'UN CC:Learn', region: 'Global', kind: 'org', focus: 'Learning', url: 'https://unccelearn.org/', note: 'Free UN climate courses.' },
]

export const guideGroups = [
  {
    id: 'home',
    label: 'At home',
    art: 'recycling',
    guides: [
      { title: 'Weigh your waste for a week', art: 'recycling', points: 10 },
      { title: 'Kill standby power', art: 'sun', points: 10 },
      { title: 'Water twice', art: 'leaf', points: 10 },
    ],
  },
  {
    id: 'school',
    label: 'School',
    art: 'learning',
    guides: [
      { title: 'Start a green club', art: 'learning', points: 15 },
      { title: 'Go bottle free', art: 'cycle', points: 15 },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    art: 'cleanup',
    guides: [
      { title: 'Run a street cleanup', art: 'cleanup', points: 25 },
      { title: 'Adopt a tree', art: 'planting', points: 20 },
    ],
  },
]

/* -------------------------------- QUEST ---------------------------- */

export const questCategories = ['All', 'Nature', 'Community', 'Living', 'Wildlife']

export const quests = [
  { id: 'plant', title: 'Plant something', category: 'Nature', points: 20, art: 'planting', text: 'A tree, a herb, a seed in a tin.' },
  { id: 'outdoors', title: 'Get outside', category: 'Nature', points: 15, art: 'outdoors', text: 'Twenty minutes in green space.' },
  { id: 'waste', title: 'Sort your waste', category: 'Living', points: 20, art: 'recycling', text: 'Separate three streams.' },
  { id: 'cleanup', title: 'Clean a spot', category: 'Community', points: 25, art: 'cleanup', text: 'One street. One hour.' },
  { id: 'walk', title: 'Walk a short trip', category: 'Living', points: 15, art: 'walking', text: 'Leave the car once this week.' },
  { id: 'learn', title: 'Learn one thing', category: 'Nature', points: 10, art: 'learning', text: 'Read one explainer properly.' },
  { id: 'pollinator', title: 'Plant for bees', category: 'Wildlife', points: 20, art: 'leaf', text: 'A pot of native flowers.' },
  { id: 'share', title: 'Teach someone', category: 'Community', points: 15, art: 'share', text: 'Pass on one useful skill.' },
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
  { id: 'nasa', name: 'NASA Climate', category: 'Data', art: 'sun', url: 'https://science.nasa.gov/climate-change/', why: 'Satellite data and clean visuals.' },
  { id: 'gnw', name: 'Global Nature Watch', category: 'Data', art: 'tree', url: 'https://globalnaturewatch.org/', why: 'Near real time forest alerts.' },
  { id: 'iqair', name: 'IQAir', category: 'Data', art: 'leaf', url: 'https://www.iqair.com/world-air-quality', why: 'Live air quality by city.' },
  { id: 'footprint', name: 'Footprint Calculator', category: 'Calculators', art: 'walking', url: 'https://www.footprintcalculator.org/', why: 'How many planets your life needs.' },
  { id: 'wwffoot', name: 'WWF Footprint', category: 'Calculators', art: 'cycle', url: 'https://footprint.wwf.org.uk/', why: 'Breaks your impact into four parts.' },
  { id: 'epa', name: 'EPA Calculator', category: 'Calculators', art: 'recycling', url: 'https://www.epa.gov/ghgemissions/carbon-footprint-calculator', why: 'Household detail, if you have bills.' },
  { id: 'unccelearn', name: 'UN CC:Learn', category: 'Learning', art: 'learning', url: 'https://unccelearn.org/', why: 'Free courses with certificates.' },
  { id: 'unep', name: 'UNEP', category: 'News', art: 'sun', url: 'https://www.unep.org/', why: 'Authoritative global reporting.' },
  { id: 'foei', name: 'Friends of the Earth', category: 'News', art: 'share', url: 'https://www.foei.org/', why: 'Grassroots justice reporting.' },
]
