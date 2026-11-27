// Complete, compact guide translations. Provider/phenomenon names are proper
// nouns; every explanatory sentence and action label is locale-owned.
const fields = [
 'error.title','error.body','error.retry','elnino.chapter','elnino.lede','elnino.back','elnino.notForecast','elnino.caution',
 'elnino.signalTitle','elnino.signalText','elnino.patternTitle','elnino.patternText','elnino.timingTitle','elnino.timingText','elnino.lifeTitle','elnino.lifeText',
 'elnino.prepare','elnino.prepareSub','elnino.heatTitle','elnino.heat1','elnino.heat2','elnino.heat3','elnino.floodTitle','elnino.flood1','elnino.flood2','elnino.flood3',
 'elnino.droughtTitle','elnino.drought1','elnino.drought2','elnino.drought3','elnino.urgentTitle','elnino.urgentText','elnino.track','elnino.trackText',
 'heat.globalScope','heat.globalText','heat.riskScope','heat.riskText','heat.openMap','heat.openRisk','heat.externalNote','elnino.sources','elnino.latest','learn.source',
]
export function packs(rows) {
 return Object.fromEntries(Object.entries(rows).map(([locale, text]) => {
  const values = text.trim().split('\n').map(line => line.trim())
  if (values.length !== fields.length || values.some(v => !v)) throw new Error(`Incomplete weather pack ${locale}: ${values.length}/${fields.length}`)
  const result = Object.fromEntries(fields.map((key, i) => [key, values[i]]))
  Object.assign(result, {
   'error.kicker':result['error.title'], 'nav.el-nino':'El Niño', 'elnino.tag':'El Niño',
   'elnino.title':`El Niño: ${result['elnino.chapter']}`,
   'elnino.teaserTitle':result['elnino.prepare'], 'elnino.teaserText':result['elnino.lede'], 'elnino.read':result['learn.source'],
   'heat.globalTitle':'Zoom Earth', 'heat.riskTitle':'NWS HeatRisk',
   'elnino.noaa':'National Oceanic and Atmospheric Administration (NOAA)',
   'elnino.who':'World Health Organization (WHO)', 'elnino.ready':'Ready.gov',
  })
  return [locale,result]
 }))
}
