/* ------------------------------------------------------------------
   Let's Conserve — structured content layer (Version 1)
   All external links below point to real, live organizations/sites.
------------------------------------------------------------------ */

/* ------------------------------- LEARN ------------------------------ */

export const learnCategories = [
  'All',
  'Climate',
  'Biodiversity',
  'Pollution',
  'Circular economy',
  'Forests',
]

export const learnTopics = [
  {
    id: 'climate-change',
    title: 'Climate change, in plain terms',
    category: 'Climate',
    minutes: 3,
    lede:
      'Burning coal, oil and gas releases carbon dioxide that traps heat in the atmosphere. That extra heat shifts rainfall, raises sea levels and makes extreme weather more likely.',
    points: [
      'Greenhouse gases act like a blanket — more of them means a warmer planet.',
      'The last decade was the warmest on record, according to the World Meteorological Organization.',
      'Climate change is not only about temperature: it reshapes rainfall, harvests, coasts and health.',
      'Every fraction of a degree matters, which is why small cuts add up.',
    ],
    fact:
      'The atmosphere’s CO₂ level is now higher than at any point in the last 800,000 years.',
    art: 'sun',
  },
  {
    id: 'biodiversity-loss',
    title: 'Why biodiversity loss matters',
    category: 'Biodiversity',
    minutes: 4,
    lede:
      'Biodiversity is the variety of living things — genes, species and ecosystems. When it thins out, the natural systems we rely on for food, water and clean air become fragile.',
    points: [
      'Around one million species are threatened with extinction, per the 2019 IPBES global assessment.',
      'Main drivers: habitat loss, overexploitation, climate change, pollution and invasive species.',
      'Pollinators such as bees and bats support a large share of the food crops we eat.',
      'Local action — native plants, hedgerows, ponds — reconnects fragmented habitats.',
    ],
    fact:
      'Nigeria is one of Africa’s most biodiverse countries, home to forest elephants, drills and the rare Ibadan malimbe.',
    art: 'leaf',
  },
  {
    id: 'pollution',
    title: 'Pollution: air, water, plastic',
    category: 'Pollution',
    minutes: 3,
    lede:
      'Pollution is contamination that harms life — from smoke in the air to plastic in the ocean. It is often invisible in the places where it is worst.',
    points: [
      'The WHO estimates that nine out of ten people breathe air that exceeds its guideline limits.',
      'Around 11 million tonnes of plastic enter the ocean each year (UNEP estimate).',
      'Burning waste in the open releases toxic compounds that settle on soil and crops.',
      'Waste segregation at home is the cheapest pollution intervention available to most households.',
    ],
    fact:
      'A single plastic bottle can fragment into thousands of microplastic particles that never fully disappear.',
    art: 'recycle',
  },
  {
    id: 'circular-economy',
    title: 'The circular economy, explained',
    category: 'Circular economy',
    minutes: 4,
    lede:
      'A circular economy keeps materials in use for as long as possible — through repair, reuse, sharing and recycling — instead of the take-make-dispose pattern.',
    points: [
      'Less than a tenth of the global economy is circular by material use (Circularity Gap Report).',
      'Design choices decide whether a product can be repaired or only thrown away.',
      'Repair cafés, refill shops and deposit-return schemes are practical circular models.',
      'In Nigeria, recyclers such as Wecyclers and RecyclePoints pay households for sorted waste.',
    ],
    fact:
      'Extending the life of a phone by just two years avoids a significant share of the emissions tied to making a new one.',
    art: 'cycle',
  },
  {
    id: 'deforestation',
    title: 'Forests, deforestation and restoration',
    category: 'Forests',
    minutes: 3,
    lede:
      'Forests store carbon, hold soil together, filter water and shelter wildlife. When they are cleared, all four services go at once.',
    points: [
      'The World Resources Institute reported tropical primary forest loss in 2023 equal to roughly ten football pitches a minute.',
      'Nigeria has lost forest cover at one of the fastest rates in the world, driven largely by fuelwood, farmland expansion and logging.',
      'Mangroves in the Niger Delta shield coastal communities from storms and store carbon in their soils.',
      'Restoration works best with native species and the involvement of the people who live there.',
    ],
    fact:
      'The Nigerian Conservation Foundation has worked on forest and wetland protection in Nigeria since 1980.',
    art: 'tree',
  },
]

export const didYouKnow = [
  {
    id: 'dyk-1',
    text: 'Mangrove forests can store several times more carbon per hectare than most land forests — and Nigeria’s Niger Delta holds the largest mangrove expanse in Africa.',
    source: 'General conservation literature',
  },
  {
    id: 'dyk-2',
    text: 'Around 11 million tonnes of plastic waste enter the ocean every year. That is roughly a garbage truck of plastic a minute.',
    source: 'UNEP',
  },
  {
    id: 'dyk-3',
    text: 'Cities cover about 3% of the planet’s land surface but account for the majority of its energy use and emissions.',
    source: 'United Nations',
  },
  {
    id: 'dyk-4',
    text: 'Nigeria is home to the Ibadan malimbe, a small bird found in only a handful of forest fragments in the south-west.',
    source: 'BirdLife International',
  },
  {
    id: 'dyk-5',
    text: 'A mature tree can move hundreds of litres of water into the air on a hot day — forests help make their own weather.',
    source: 'General ecology research',
  },
]

export const natureSpotlights = [
  {
    id: 'spot-1',
    name: 'Niger Delta mangroves',
    type: 'Ecosystem · Nigeria',
    text: 'The largest mangrove ecosystem in Africa. Its roots nurse fish stocks, hold back coastal erosion and lock carbon deep in waterlogged soil.',
  },
  {
    id: 'spot-2',
    name: 'Yankari Game Reserve',
    type: 'Protected area · Nigeria',
    text: 'A savanna reserve in Bauchi State, home to elephants and a seasonal warm spring. Community ranger programmes help protect it.',
  },
  {
    id: 'spot-3',
    name: 'Drills and Cross River forests',
    type: 'Species · Nigeria',
    text: 'The Cross River rainforest is a stronghold for the drill primate and a long list of species found almost nowhere else on Earth.',
  },
]

/* ------------------------------- QUIZ ------------------------------- */

export const quizQuestions = [
  {
    id: 'q1',
    question: 'Which three issues are often called the “triple planetary crisis”?',
    options: ['Climate change, biodiversity loss and pollution', 'Water scarcity, migration and debt', 'Overfishing, noise and light'],
    answer: 0,
    explain: 'UNEP and the UN use “triple planetary crisis” for climate change, nature and biodiversity loss, and pollution and waste.',
  },
  {
    id: 'q2',
    question: 'What is the main driver of recent global warming?',
    options: ['Changes in the sun’s output', 'Burning fossil fuels', 'Volcanic activity'],
    answer: 1,
    explain: 'Burning coal, oil and gas releases CO₂ and other greenhouse gases that trap heat in the atmosphere.',
  },
  {
    id: 'q3',
    question: 'A circular economy is best described as…',
    options: ['Recycling everything after use', 'Keeping materials in use through reuse, repair and recycling', 'Buying only locally made goods'],
    answer: 1,
    explain: 'Circularity starts at design: products are made to be repaired, reused and finally recycled, rather than discarded.',
  },
  {
    id: 'q4',
    question: 'Which everyday action most directly supports local pollinators?',
    options: ['Planting native flowering plants', 'Mowing the lawn shorter', 'Using a broader insecticide'],
    answer: 0,
    explain: 'Native flowers provide the food and nesting habitat pollinators evolved with.',
  },
  {
    id: 'q5',
    question: 'Which gas is the main long-lived greenhouse gas from fossil fuels?',
    options: ['Oxygen', 'Carbon dioxide (CO₂)', 'Nitrogen'],
    answer: 1,
    explain: 'CO₂ is the biggest long-lived contributor — which is why “net zero” targets focus on it.',
  },
  {
    id: 'q6',
    question: 'What does the Nigerian Conservation Foundation (NCF) do?',
    options: ['Sells carbon offsets to industry', 'Works on nature conservation and sustainable development in Nigeria', 'Runs the national electricity grid'],
    answer: 1,
    explain: 'Founded in 1980, NCF is Nigeria’s premier conservation NGO — find it in the Discover directory.',
  },
  {
    id: 'q7',
    question: 'What is “greenwashing”?',
    options: ['Cleaning with eco-friendly products', 'Marketing that overstates a product’s environmental credentials', 'Planting trees to offset a flight'],
    answer: 1,
    explain: 'Greenwashing is a claim that sounds green but is unsupported — credibility is why the Explore list is curated.',
  },
]

/* ----------------------------- DISCOVER ----------------------------- */

export const actionGuideGroups = [
  {
    id: 'home',
    label: 'At home',
    arts: 'recycle',
    guides: [
      {
        id: 'waste-audit',
        title: 'Run a one-week waste audit',
        why: 'You cannot reduce what you have not measured. A week of observation usually reveals two or three habits worth changing.',
        steps: [
          'Keep a bag for paper, one for plastics and one for food scraps.',
          'At the end of each day, note which bag filled fastest.',
          'Pick one swap — a refillable bottle, a cloth bag, loose produce.',
          'Rinse and separate recyclables so a local collector can accept them.',
        ],
        points: 10,
      },
      {
        id: 'energy-smart',
        title: 'Cut standby and phantom power',
        why: 'Appliances on standby still draw current. Grouping them onto one switch is a low-effort saving.',
        steps: [
          'List devices that stay warm or lit when “off”.',
          'Put the TV, decoder and charger on a single extension block.',
          'Switch the block off at night and when leaving.',
          'If you can, shift heavy appliances to daytime use.',
        ],
        points: 10,
      },
      {
        id: 'water-wise',
        title: 'Use water twice',
        why: 'Greywater from rinsing vegetables or washing rice can water plants instead of going down the drain.',
        steps: [
          'Keep a bowl in the sink while rinsing produce.',
          'Pour it onto potted plants or a garden bed.',
          'Fix a dripping tap — a slow drip wastes litres a day.',
          'Collect rainwater in a covered container for outdoor use.',
        ],
        points: 10,
      },
    ],
  },
  {
    id: 'school',
    label: 'Campus & school',
    arts: 'learning',
    guides: [
      {
        id: 'green-club',
        title: 'Start or join a green club',
        why: 'A small group with a fixed monthly activity achieves more than a big group with good intentions.',
        steps: [
          'Recruit five committed people and a staff adviser.',
          'Agree one activity per month — a cleanup, a tree planting, a repair day.',
          'Ask the school for one bin per waste stream.',
          'Record what you did; a simple photo log builds momentum.',
        ],
        points: 15,
      },
      {
        id: 'bottle-free-campus',
        title: 'Make your campus bottle-free',
        why: 'A reusable bottle plus a refill point removes hundreds of single-use bottles per student per year.',
        steps: [
          'Map where drinking-water refill points already exist.',
          'Ask for one more refill station near the busiest hall.',
          'Run a one-week “bring your bottle” challenge.',
          'Publish the count of bottles avoided.',
        ],
        points: 15,
      },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    arts: 'cleanup',
    guides: [
      {
        id: 'cleanup-day',
        title: 'Organise a neighbourhood cleanup',
        why: 'Cleanups do more than remove waste — they build the social contact that keeps a place clean afterwards.',
        steps: [
          'Choose one small, visible area and agree a date with neighbours.',
          'Arrange gloves, sacks and a collection point with your local waste service.',
          'Separate recyclables as you go, not afterwards.',
          'Agree one preventive step: a bin, a sign, or a monthly repeat.',
        ],
        points: 25,
      },
      {
        id: 'adopt-a-tree',
        title: 'Adopt and maintain a tree',
        why: 'Planting is easy; survival is the hard part. Watering and protection for the first two years is what makes it count.',
        steps: [
          'Choose a native species suited to the site.',
          'Plant at the start of the rainy season.',
          'Water through the first dry season and protect the stem.',
          'Photograph it every few months to track growth.',
        ],
        points: 20,
      },
    ],
  },
]

export const organizationFilters = ['All regions', 'Nigeria', 'Africa', 'Global']

/* Real, verified organizations and sites. */
export const organizations = [
  {
    id: 'ncf',
    name: 'Nigerian Conservation Foundation',
    region: 'Nigeria',
    scope: 'National · Lagos HQ',
    focus: 'Conservation',
    url: 'https://ncfnigeria.org/',
    note: 'Founded in 1980, NCF is Nigeria’s premier conservation NGO — protecting forests, wetlands and species, and running environmental education and membership programmes.',
  },
  {
    id: 'era',
    name: 'Environmental Rights Action / Friends of the Earth Nigeria',
    region: 'Nigeria',
    scope: 'National · Environmental justice',
    focus: 'Justice',
    url: 'https://erafoen.org/',
    note: 'ERA is Nigeria’s chapter of Friends of the Earth International, working on pollution, fossil-fuel accountability and the rights of affected communities in the Niger Delta.',
  },
  {
    id: 'wecyclers',
    name: 'Wecyclers',
    region: 'Nigeria',
    scope: 'Lagos · Household recycling',
    focus: 'Waste',
    url: 'https://www.wecyclers.com/',
    note: 'A Lagos social enterprise that collects sorted recyclables by cargo bike from low-income neighbourhoods and rewards households by weight.',
  },
  {
    id: 'recyclepoints',
    name: 'RecyclePoints',
    region: 'Nigeria',
    scope: 'Lagos · Circular economy',
    focus: 'Waste',
    url: 'https://recyclepoints.com/',
    note: 'A waste-recycling and social-benefit venture that turns everyday recyclables into points and rewards for households.',
  },
  {
    id: 'sradev',
    name: 'SRADev Nigeria',
    region: 'Nigeria',
    scope: 'National · Research & advocacy',
    focus: 'Health',
    url: 'https://sradev.org/',
    note: 'A non-profit think tank on environmental health — waste management, chemicals, air quality and climate advocacy, with community-level training programmes.',
  },
  {
    id: 'foei',
    name: 'Friends of the Earth International',
    region: 'Global',
    scope: 'Global federation',
    focus: 'Justice',
    url: 'https://www.foei.org/',
    note: 'A federation of grassroots environmental justice groups. The Nigeria member page explains how the national chapter operates.',
  },
  {
    id: 'unep',
    name: 'UN Environment Programme',
    region: 'Global',
    scope: 'Global · Policy & science',
    focus: 'Policy',
    url: 'https://www.unep.org/',
    note: 'The UN’s environmental authority. Best starting point for authoritative global assessments and campaign material.',
  },
  {
    id: 'wwf',
    name: 'WWF',
    region: 'Global',
    scope: 'Global · Conservation',
    focus: 'Conservation',
    url: 'https://www.worldwildlife.org/',
    note: 'One of the largest conservation organizations, with species and habitat programmes and widely used footprint tools.',
  },
  {
    id: 'unccelearn',
    name: 'UN CC:Learn',
    region: 'Global',
    scope: 'Global · Free courses',
    focus: 'Learning',
    url: 'https://unccelearn.org/',
    note: 'Free, self-paced UN climate courses with certificates — a solid next step after the Learn explainers here.',
  },
  {
    id: 'birdlife-nigeria',
    name: 'BirdLife International — Nigeria partner page',
    region: 'Africa',
    scope: 'Africa · Birds & habitats',
    focus: 'Biodiversity',
    url: 'https://www.birdlife.org/partners/nigeria-nigerian-conservation-foundation/',
    note: 'BirdLife’s Nigeria partner is NCF; this page explains the partnership and its Important Bird Area work.',
  },
]

/* ------------------------------- QUEST ------------------------------ */

export const questCategories = ['All', 'Nature', 'Community', 'Sustainable living', 'Biodiversity', 'Wellbeing']

export const quests = [
  {
    id: 'plant-something',
    title: 'Plant something',
    category: 'Nature',
    points: 20,
    art: 'plant',
    text: 'Plant a tree, grow a flower, or start a small home garden. Native species need the least looking after.',
  },
  {
    id: 'reconnect-nature',
    title: 'Reconnect with nature',
    category: 'Wellbeing',
    points: 15,
    art: 'outdoor',
    text: 'Spend time outdoors with friends at a local park or green space. Leave your phone in your pocket for twenty minutes.',
  },
  {
    id: 'waste-less',
    title: 'Waste less',
    category: 'Sustainable living',
    points: 20,
    art: 'recycle',
    text: 'Separate household waste and identify three items that can be reused or recycled instead of discarded.',
  },
  {
    id: 'clean-community',
    title: 'Clean your community',
    category: 'Community',
    points: 25,
    art: 'cleanup',
    text: 'Help clean a public space in your neighbourhood — even one small stretch of road counts.',
  },
  {
    id: 'walk-or-cycle',
    title: 'Walk or cycle a short trip',
    category: 'Sustainable living',
    points: 15,
    art: 'walk',
    text: 'Replace one short car or bike-taxi trip this week with walking or cycling.',
  },
  {
    id: 'learn-one-thing',
    title: 'Learn one thing properly',
    category: 'Nature',
    points: 10,
    art: 'learn',
    text: 'Read one Learn explainer end to end and take the quiz without guessing.',
  },
  {
    id: 'pollinator-patch',
    title: 'Make a pollinator patch',
    category: 'Biodiversity',
    points: 20,
    art: 'leaf',
    text: 'Set aside a small patch — a pot is enough — and plant native flowers for bees and butterflies.',
  },
  {
    id: 'share-a-skill',
    title: 'Share a skill',
    category: 'Community',
    points: 15,
    art: 'share',
    text: 'Teach one person something you learned here — a repair, a recipe, a way to sort waste.',
  },
]

export const questBadges = [
  { id: 'seed', label: 'First seed', at: 25, note: '25 points' },
  { id: 'sprout', label: 'Sprouting', at: 60, note: '60 points' },
  { id: 'grove', label: 'Grove keeper', at: 120, note: '120 points' },
  { id: 'canopy', label: 'Canopy', at: 200, note: '200 points' },
]

/* ------------------------------ EXPLORE ----------------------------- */

export const exploreCategories = ['All', 'Data', 'Calculators', 'Learning', 'News', 'Citizen science']

export const resources = [
  {
    id: 'nasa',
    name: 'NASA — Climate Change',
    category: 'Data',
    url: 'https://science.nasa.gov/climate-change/',
    why: 'Satellite data, sea-level readings and clear visual explainers from a scientific agency rather than a campaign.',
    tag: 'Evidence & visualisation',
  },
  {
    id: 'gnw',
    name: 'Global Nature Watch',
    category: 'Data',
    url: 'https://globalnaturewatch.org/',
    why: 'Free forest and land-use monitoring, formerly Global Forest Watch. The deforestation alerts are close to real time.',
    tag: 'Forests & land use',
  },
  {
    id: 'iqair',
    name: 'IQAir — World Air Quality',
    category: 'Data',
    url: 'https://www.iqair.com/world-air-quality',
    why: 'Live air-quality readings by city, including Lagos and Abuja. Useful before outdoor exercise or a cleanup.',
    tag: 'Air quality',
  },
  {
    id: 'footprint',
    name: 'Ecological Footprint Calculator',
    category: 'Calculators',
    url: 'https://www.footprintcalculator.org/',
    why: 'Estimates how many planets your lifestyle would need. A blunt tool, but a memorable starting point.',
    tag: 'Personal footprint',
  },
  {
    id: 'wwf-footprint',
    name: 'WWF Footprint Calculator',
    category: 'Calculators',
    url: 'https://footprint.wwf.org.uk/',
    why: 'A short questionnaire with a breakdown by food, travel, home and stuff — plus suggested next steps.',
    tag: 'Personal footprint',
  },
  {
    id: 'epa',
    name: 'US EPA Carbon Footprint Calculator',
    category: 'Calculators',
    url: 'https://www.epa.gov/ghgemissions/carbon-footprint-calculator',
    why: 'Detailed home energy, transport and waste estimates. Best if you have your utility bills to hand.',
    tag: 'Household emissions',
  },
  {
    id: 'uncclearn',
    name: 'UN CC:Learn',
    category: 'Learning',
    url: 'https://unccelearn.org/',
    why: 'Free UN climate courses, self-paced, many with certificates. The natural follow-on from the Learn section.',
    tag: 'Free courses',
  },
  {
    id: 'unep',
    name: 'UN Environment Programme',
    category: 'News',
    url: 'https://www.unep.org/',
    why: 'Authoritative reporting and global assessments on climate, nature, chemicals and waste.',
    tag: 'News & assessments',
  },
  {
    id: 'zooniverse',
    name: 'Zooniverse',
    category: 'Citizen science',
    url: 'https://www.zooniverse.org/',
    why: 'Contribute to real research from your laptop — classifying wildlife camera images, transcribing field notes and more.',
    tag: 'Citizen science',
  },
  {
    id: 'foei',
    name: 'Friends of the Earth International',
    category: 'News',
    url: 'https://www.foei.org/',
    why: 'Grassroots environmental justice reporting — a useful counterweight to corporate sustainability messaging.',
    tag: 'Justice & campaigns',
  },
]

/* ---------------------------- HOME EXTRAS --------------------------- */

export const heroStats = [
  { value: learnTopics.length, label: 'explainers' },
  { value: organizations.length, label: 'organizations' },
  { value: quests.length, label: 'quests' },
]
