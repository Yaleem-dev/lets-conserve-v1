import es from './es.js'
import fr from './fr.js'
import zh from './zh.js'
import hi from './hi.js'
import pt from './pt.js'
import sw from './sw.js'
import { ha, yo, ig, pcm, ff, wo } from './west.js'
import { zu, xh, af, sn, rw, bm, tw, am, ti, om, so, mg, ar } from './rest.js'

/* Reading content per language. English is the source and is not listed.
   FULL locales carry the whole library; the others carry the interface,
   categories, quest lines and explainer titles, and the views hide the
   long-form blocks that would otherwise fall back to English. */
export const CONTENT_I18N = {
  es, fr, zh, hi, pt, sw,
  ha, yo, ig, pcm, ff, wo,
  zu, xh, af, sn, rw, bm, tw, am, ti, om, so, mg, ar,
}

export const CONTENT_LOCALES = Object.keys(CONTENT_I18N)

export const THIN = ['ha', 'ignored', 'pcm', 'ff', 'wo', 'zu', 'xh', 'af', 'sn', 'rw', 'bm', 'tw', 'am', 'ti', 'om', 'so', 'mg', 'ar']
  .filter((id) => id !== 'ignored')

export function isThin(lang) {
  return THIN.includes(lang)
}
