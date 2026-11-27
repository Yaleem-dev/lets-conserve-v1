import assert from 'node:assert/strict'
import fs from 'node:fs'
import { learnTopics, resources } from '../src/data/content.js'
import { explainerRounds } from '../src/data/explainerLibrary.js'
import { WEATHER } from '../src/i18n/ui/weather.js'

const topics = [learnTopics, ...explainerRounds].flat()
assert.equal(topics.length, 28)
assert.equal(new Set(topics.map(t => t.id)).size, 28)
for (const round of explainerRounds) {
  assert.equal(round.length, 7)
  for (const topic of round) {
    assert.ok(topic.title && topic.lede && topic.fact && topic.points.length >= 3)
    assert.ok(topic.source.startsWith('https://'))
    assert.ok(fs.existsSync(new URL(`../public/art/ui/learn-${topic.imageKey}.png`, import.meta.url)))
  }
}
assert.equal(resources.find(r => r.id === 'global-temperature').category, 'Data')
assert.match(resources.find(r => r.id === 'global-temperature').why, /forecast/i)
assert.match(resources.find(r => r.id === 'nws-heatrisk').why, /United States/)
assert.equal(WEATHER.en['creatures.invite'], 'Follow your instincts')
const quiz = fs.readFileSync(new URL('../src/components/EcoCreaturesQuiz.jsx', import.meta.url), 'utf8')
assert.doesNotMatch(quiz, /<Chapter>Prompt/)
assert.match(quiz, /eco-creatures-outline\.webp/)
const png = fs.readFileSync(new URL('../public/art/eco-creatures-outline.webp', import.meta.url))
assert.equal(png.toString('ascii', 8, 12), 'WEBP')
const i18n = fs.readFileSync(new URL('../src/i18n.jsx', import.meta.url), 'utf8')
assert.match(i18n, /'lang.search': 'Search for a Language'/)
assert.doesNotMatch(quiz, /<CreaturesArt\b/, 'The retired banner component must not remain in the result branch')
const locales = [...i18n.split('export const LANGS = [')[1].split(']')[0].matchAll(/id: '([^']+)'/g)].map(match => match[1])
const required = Object.keys(WEATHER.en).filter(key => /^(elnino\.|heat\.|error\.|nav\.el-nino$|learn\.source$)/.test(key))
const properNames = new Set(['nav.el-nino','elnino.noaa','elnino.who','elnino.ready','heat.globalTitle','heat.riskTitle'])
let checked = 0
for (const locale of locales) {
  const pack = WEATHER[locale]
  assert.ok(pack, `Missing weather locale: ${locale}`)
  for (const key of required) {
    assert.ok(Object.hasOwn(pack, key) && typeof pack[key] === 'string' && pack[key].trim(), `${locale}: missing or empty ${key}`)
    if (locale !== 'en' && !properNames.has(key)) assert.notEqual(pack[key], WEATHER.en[key], `${locale}: English fallback in ${key}`)
    checked++
  }
}
console.log(`PASS: ${locales.length} guide/recovery locales; ${required.length} required keys; ${checked} translated cells checked; missing=0; empty=0; unapproved English fallback=0.`)

function luminance(hex) {
  const values = hex.match(/[\da-f]{2}/gi).map(x => parseInt(x, 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
}
for (const [ink, bg] of [['3f2202','f2a63c'],['ffffff','c92335'],['741725','ffe5e4']]) {
  const values = [luminance(ink), luminance(bg)].sort((a,b) => b-a)
  const contrast = (values[0]+0.05)/(values[1]+0.05)
  assert.ok(contrast >= 4.5, `${ink} on ${bg}: ${contrast}`)
  console.log(`AA contrast: #${ink} on #${bg}: ${contrast.toFixed(2)}:1`)
}
console.log('PASS: 28 unique explainers; sources and existing art; global temperature and US heat-impact resources; new quiz banner and search label.')
