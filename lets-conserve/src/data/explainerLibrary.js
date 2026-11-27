// Curated, source-linked rounds. No live AI/weather claims and no external
// request is needed to refresh the explainer cards.
const NOAA = 'https://oceanservice.noaa.gov/facts/ninonina.html'
const ENSO = 'https://www.noaa.gov/understanding-el-nino'
const HEAT = 'https://www.who.int/news-room/questions-and-answers/item/heatwaves-how-to-stay-cool'
const FLOOD = 'https://www.ready.gov/floods'
const DROUGHT = 'https://www.ready.gov/drought'
const MAP = 'https://zoom.earth/maps/temperature/'
const imageFor = { Climate: 'climate', Nature: 'pollution', Ocean: 'ocean', Geography: 'geography', Waste: 'circular', Forests: 'forests' }
function topic(id, category, title, lede, points, fact, source, imageKey = imageFor[category]) {
  return { id, category, title, lede, points, fact, source, imageKey }
}
export const explainerRounds = [
 [
  topic('pacific-phases','Climate','The Pacific has phases','A warm ocean signal can travel far.',[
   'El Niño is the warm phase of the El Niño-Southern Oscillation, or ENSO.',
   'During El Niño, Pacific trade winds weaken and warm water shifts east.',
   'The changes can influence rainfall and temperatures beyond the Pacific.'
  ],'El Niño and La Niña do not follow a fixed timetable.',NOAA),
  topic('marine-menu','Nature','A changing marine menu','Ocean life depends on what rises below.',[
   'Upwelling brings cold, nutrient-rich water to the surface.',
   'El Niño can weaken that supply off the Pacific coast of the Americas.',
   'Fewer nutrients can affect phytoplankton and the fish that eat them.'
  ],'Changes at the base of a food web can reach other species.',NOAA),
  topic('ocean-upwelling','Ocean','Food rises from below','Cold water carries more than a chill.',[
   'Winds normally help move warm surface water westward along the equator.',
   'Colder water rises to replace it near the eastern Pacific.',
   'When that circulation changes, marine ecosystems can change too.'
  ],'A temperature shift can also be a nutrient shift.',NOAA),
  topic('global-local','Geography','Global signal, local forecast','Your location and season still matter.',[
   'ENSO changes where ocean heat is released into the atmosphere.',
   'That can alter circulation and weather patterns in many regions.',
   'Use local weather forecasts and alerts for day-to-day decisions.'
  ],'El Niño does not mean the same weather everywhere.',ENSO),
  topic('water-before-drought','Waste','Save water before it is scarce','Small checks, less waste.',[
   'Find and repair leaking taps and plumbing.',
   'Turn off the tap while brushing your teeth.',
   'Run washing machines and dishwashers with full loads.'
  ],'During drought, follow your local water-use restrictions.',DROUGHT,'pollution'),
  topic('drain-ready','Waste','Keep water moving safely','Prepare before a flood warning.',[
   'Keep drains and gutters clear when it is safe to do so.',
   'Store important documents in a waterproof container.',
   'Know your household evacuation routes and warning system.'
  ],'Never walk, swim or drive through floodwater.',FLOOD),
  topic('dry-season-trees','Forests','Plan for dry seasons','Match a garden to its water needs.',[
   'Consider native or drought-tolerant plants suited to your location.',
   'Group plants with similar watering needs.',
   'Use mulch around trees and plants to help retain soil moisture.'
  ],'Ask your local water provider about restrictions and assistance.',DROUGHT),
 ],
 [
  topic('heat-and-health','Climate','Heat is not just a number','Plan for how heat affects people.',[
   'Avoid strenuous activity during the hottest part of the day when possible.',
   'Find shade or a cooler indoor space.',
   'Check in on older people and neighbours who live alone.'
  ],'Never leave children or animals in parked vehicles.',HEAT),
  topic('warm-water-visitors','Nature','Who follows warmer water?','Habitats do not stand still.',[
   'El Niño can bring warmer water to the Pacific coast.',
   'Warm-water fish may appear in places normally too cold for them.',
   'Changing upwelling can affect the food available to marine species.'
  ],'Water temperature helps shape where marine life can live.',NOAA),
  topic('food-web-links','Ocean','The ocean food chain reacts','A tiny organism can matter a lot.',[
   'Phytoplankton use nutrients supplied by upwelling.',
   'Fish feed on this ocean productivity.',
   'Changes to that supply can affect animals higher in the food web.'
  ],'El Niño is about ocean circulation as well as surface warmth.',NOAA),
  topic('temperature-map','Geography','Read a temperature map well','A forecast is not a warning.',[
   'Check the location and selected time before comparing regions.',
   'Zoom Earth uses global weather-model forecasts, including ICON and GFS.',
   'Check official local alerts before making safety decisions.'
  ],'A temperature map is not a personalised heat-risk assessment.',MAP),
  topic('tap-break','Waste','Let the tap rest','Use water only when you need it.',[
   'Turn the tap off while brushing your teeth.',
   'Wash vegetables in a bowl instead of under running water.',
   'Use a broom rather than a hose to clean outdoor paths.'
  ],'Local water restrictions always take priority.',DROUGHT,'pollution'),
  topic('repair-water','Waste','Find the hidden leak','A repair can stop round-the-clock waste.',[
   'Check taps and plumbing for drips.',
   'Ask a plumber to repair leaks you cannot safely fix.',
   'Check sprinklers for broken fittings and poor aim.'
  ],'Water conservation can start before a dry spell.',DROUGHT),
  topic('mulch-buffer','Forests','Give soil a buffer','Mulch helps a planted space hold moisture.',[
   'Mulch around trees and plants to retain soil moisture.',
   'It also helps control weeds that compete for water.',
   'Choose planting and watering advice suited to your area.'
  ],'Water-wise planting is a local decision, not one universal recipe.',DROUGHT),
 ],
 [
  topic('cooler-day','Climate','Plan a cooler day','Move the plan, not just the thermostat.',[
   'Schedule strenuous activity for a cooler part of the day when possible.',
   'Wear light, loose-fitting clothes.',
   'Keep drinking water available and follow medical advice if your fluids are restricted.'
  ],'Heatstroke is an emergency. Seek urgent medical help.',HEAT),
  topic('nutrient-path','Nature','Follow the nutrient trail','Species are connected through food.',[
   'Cold, deep Pacific water carries nutrients toward the surface.',
   'Those nutrients support phytoplankton.',
   'Fish and other animals depend on that food-web foundation.'
  ],'Protecting an ecosystem means understanding its connections.',NOAA),
  topic('enso-opposites','Ocean','Two sides of ENSO','Warm and cool phases change the pattern.',[
   'El Niño is associated with warmer central and eastern equatorial Pacific waters.',
   'La Niña has stronger trade winds and increased upwelling in the eastern Pacific.',
   'Both can influence weather, ecosystems and economies.'
  ],'These phases are irregular, not an annual schedule.',NOAA),
  topic('regional-patterns','Geography','One signal, different outcomes','Seasonal patterns are not guarantees.',[
   'El Niño can alter temperature and rainfall patterns far from the Pacific.',
   'Different regions can experience different consequences.',
   'National weather services provide the local forecasts and warnings to follow.'
  ],'A global climate outlook cannot replace a local alert.',ENSO),
  topic('full-load','Waste','Make a full load count','The same chore can use water more carefully.',[
   'Wait for a full load before running a dishwasher.',
   'Set a washing machine water level for the size of the load.',
   'Avoid leaving taps running while you prepare food.'
  ],'Use local drought advice to prioritise water savings.',DROUGHT),
  topic('outdoor-water','Waste','Watch where the water lands','Paths do not need watering.',[
   'Aim sprinklers at plants, not paving.',
   'Do not leave hoses or sprinklers unattended.',
   'Follow local restrictions before watering or washing a car.'
  ],'Repairing a sprinkler can save water without changing a garden.',DROUGHT,'pollution'),
  topic('plant-for-place','Forests','Plant for the place','Start with what your location can support.',[
   'Consider plants suited to your climate and water availability.',
   'Group plants by watering needs.',
   'Use soil moisture and local guidance instead of watering by habit.'
  ],'Native and drought-tolerant are useful choices to investigate, not identical labels.',DROUGHT),
 ],
]
