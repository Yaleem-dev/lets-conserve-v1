import { useT } from '../i18n.jsx'
import { Btn, Chapter } from '../components/ui.jsx'
import { Icon } from '../components/StickmanArt.jsx'

const LINKS = {
  noaa: 'https://oceanservice.noaa.gov/facts/ninonina.html',
  global: 'https://www.noaa.gov/understanding-el-nino',
  latest: 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.html',
  who: 'https://www.who.int/news-room/questions-and-answers/item/heatwaves-how-to-stay-cool',
  flood: 'https://www.ready.gov/floods',
  drought: 'https://www.ready.gov/drought',
  map: 'https://zoom.earth/maps/temperature/',
  risk: 'https://www.wpc.ncep.noaa.gov/heatrisk/',
}

function Source({ href, children }) {
  const t = useT()
  return <a href={href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-green-deep underline decoration-leaf-edge underline-offset-4">{children || t('learn.source')}<Icon name="external" className="h-3 w-3" /></a>
}

function WeatherSketch() {
  return (
    <svg width="160" height="110" viewBox="0 0 160 110" fill="none" aria-hidden="true" className="h-24 w-36 shrink-0" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="113" cy="30" r="16" stroke="var(--color-alert)" strokeWidth="2" />
      <path d="M113 5v-4m0 58v-4M88 30h-5m60 0h-5M94 12l-3-3m42 42 3 3M94 49l-3 3m42-40 3-3" stroke="var(--color-alert)" strokeWidth="1.5" />
      <path d="M8 68q14-14 28 0t28 0 28 0 28 0M8 83q14-14 28 0t28 0 28 0 28 0M21 98q14-12 28 0t28 0 28 0 28 0" stroke="var(--color-sky-ink)" strokeWidth="2" />
      <path d="M21 37q-9-18 11-19 9-20 23-3 24-4 22 17" stroke="var(--color-warm-ink)" strokeWidth="2" />
      <path d="M36 45v7m16-7v7m16-7v7" stroke="var(--color-sky-ink)" strokeWidth="1.5" />
    </svg>
  )
}

export function ElNinoTeaser({ go }) {
  const t = useT()
  return (
    <section className="shell mt-4" aria-labelledby="elnino-teaser-title" data-elnino-teaser>
      <button type="button" onClick={() => go('el-nino')} className="elnino-teaser flex w-full flex-wrap items-center justify-between gap-4 rounded-[20px] border-[1.5px] border-warm-edge bg-warm p-5 text-left text-warm-ink">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-alert px-3 py-1 text-xs font-bold text-alert-on">{t('elnino.tag')}</span>
          <h2 id="elnino-teaser-title" className="mt-2 text-xl">{t('elnino.teaserTitle')}</h2>
          <p className="mt-1 max-w-lg text-sm">{t('elnino.teaserText')}</p>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">{t('elnino.read')}<Icon name="arrow" className="h-4 w-4" /></span>
        </div>
        <WeatherSketch />
      </button>
    </section>
  )
}

export default function ElNino({ go }) {
  const t = useT()
  const basics = [
    ['signal', LINKS.noaa, 'bg-butter'],
    ['pattern', LINKS.global, 'bg-sky-tint'],
    ['timing', LINKS.noaa, 'bg-lilac'],
    ['life', LINKS.noaa, 'bg-mint-tint'],
  ]
  const actions = [
    ['heat', LINKS.who, 'bg-alert-tint'],
    ['flood', LINKS.flood, 'bg-sky-tint'],
    ['drought', LINKS.drought, 'bg-butter'],
  ]
  return (
    <div className="route-view">
      <section className="shell pt-5">
        <Btn variant="ghost" onClick={() => go('home')} className="!px-3 !py-2 !text-xs">{t('elnino.back')}</Btn>
        <div className="weather-panel mt-4 rounded-[22px] border-[1.5px] border-warm-edge bg-butter p-5 sm:p-7">
          <Chapter>{t('elnino.chapter')}</Chapter>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 max-w-2xl flex-1">
              <h1 className="display text-[2rem] sm:text-[2.7rem]"><span className="doodle-underline">{t('elnino.title')}</span></h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">{t('elnino.lede')}</p>
            </div>
            <WeatherSketch />
          </div>
        </div>
        <aside className="weather-panel mt-3 rounded-2xl border border-alert bg-alert-tint p-4" role="note">
          <h2 className="text-sm font-bold text-alert-ink">{t('elnino.notForecast')}</h2>
          <p className="mt-1 text-sm text-alert-ink">{t('elnino.caution')}</p>
          <Source href={LINKS.latest}>{t('elnino.latest')}</Source>
        </aside>
      </section>

      <section className="shell mt-5 grid gap-3 md:grid-cols-2" aria-label={t('elnino.tag')}>
        {basics.map(([id, href, bg]) => (
          <article key={id} className={`weather-panel rounded-[18px] border-[1.5px] border-line p-5 ${bg}`}>
            <h2 className="text-lg">{t(`elnino.${id}Title`)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(`elnino.${id}Text`)}</p>
            <Source href={href}>{t('elnino.noaa')}</Source>
          </article>
        ))}
      </section>

      <section className="shell mt-7" aria-labelledby="prepare-title">
        <h2 id="prepare-title" className="text-2xl">{t('elnino.prepare')}</h2>
        <p className="mt-1 text-sm text-slate">{t('elnino.prepareSub')}</p>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {actions.map(([id, href, bg]) => (
            <article key={id} className={`weather-panel rounded-[18px] border-[1.5px] border-line p-5 ${bg}`}>
              <h3 className="text-lg">{t(`elnino.${id}Title`)}</h3>
              <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-ink-soft">{[1, 2, 3].map(n => <li key={n}>{t(`elnino.${id}${n}`)}</li>)}</ul>
              <Source href={href}>{t(id === 'heat' ? 'elnino.who' : 'elnino.ready')}</Source>
            </article>
          ))}
        </div>
        <aside className="weather-panel mt-3 rounded-2xl border-s-4 border-alert bg-alert-tint p-4 text-alert-ink">
          <h3 className="text-base">{t('elnino.urgentTitle')}</h3>
          <p className="mt-1 text-sm">{t('elnino.urgentText')}</p>
          <Source href={LINKS.who}>{t('elnino.who')}</Source>
        </aside>
      </section>

      <section className="shell mt-7" aria-labelledby="heat-tools-title">
        <h2 id="heat-tools-title" className="text-2xl">{t('elnino.track')}</h2>
        <p className="mt-1 text-sm text-slate">{t('elnino.trackText')}</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {[['global', LINKS.map, 'bg-warm', 'heat.openMap'], ['risk', LINKS.risk, 'bg-alert-tint', 'heat.openRisk']].map(([id, href, bg, label]) => (
            <article key={id} className={`weather-panel rounded-[18px] border-[1.5px] border-warm-edge p-5 ${bg}`}>
              <p className="text-xs font-bold uppercase tracking-wide">{t(`heat.${id}Scope`)}</p>
              <h3 className="mt-2 text-xl">{t(`heat.${id}Title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed">{t(`heat.${id}Text`)}</p>
              <Source href={href}>{t(label)}</Source>
            </article>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate">{t('heat.externalNote')}</p>
      </section>

      <section className="shell mt-7 pb-10">
        <h2 className="text-xl">{t('elnino.sources')}</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <Source href={LINKS.global}>{t('elnino.noaa')}</Source>
          <Source href={LINKS.who}>{t('elnino.who')}</Source>
          <Source href={LINKS.flood}>{t('elnino.ready')}</Source>
        </div>
      </section>
    </div>
  )
}
