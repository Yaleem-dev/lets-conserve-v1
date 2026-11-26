import es from './es.js'
import fr from './fr.js'
import zh from './zh.js'
import hi from './hi.js'
import pt from './pt.js'
import sw from './sw.js'

/* Reading content per language. English is the source and is not listed:
   a missing key falls back to the English string held in the component. */
export const CONTENT_I18N = { es, fr, zh, hi, pt, sw }

export const CONTENT_LOCALES = Object.keys(CONTENT_I18N)
