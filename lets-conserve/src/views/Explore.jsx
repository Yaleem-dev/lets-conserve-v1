import { useMemo, useState } from 'react'
import { useT } from '../i18n.jsx'
import { Art, Doodle, Icon, CartoonTools, TopArt } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Ext, LangNotice } from '../components/ui.jsx'
import { resources, exploreCategories } from '../data/content.js'

const TOOL_TONE = {
  Data: { bg: '#1d5fa8', ink: '#dbeafa' },
  Calculators: { bg: '#f2a63c', ink: '#3f2202' },
  Learning: { bg: '#5b3fa8', ink: '#eae4fb' },
  News: { bg: '#b8452f', ink: '#fbe2e2' },
  Other: { bg: '#2e8b7a', ink: '#d9f2ea' },
}
const toneFor = (c) => TOOL_TONE[c] || { bg: '#2f7d4f', ink: '#ddf3e4' }
const catOf = (r) => r.category || 'Data'
const initialOf = (r) => String(catOf(r)).slice(0, 1)

export default function Explore({ go }) {
  const t = useT()
    const [cat, setCat] = useState('All')
  const list = useMemo(() => (cat === 'All' ? resources : resources.filter((r) => r.category === cat)), [cat])

  return (
    <div className="route-view">
      <section className="shell pt-4 md:pt-6">
        <div className="overflow-hidden rounded-[22px] border-[1.5px] border-line">
          <TopArt variant="explore" />
        </div>
      </section>

      <section className="shell mt-4">
        <Chapter>{t('explore.chapter')}</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="display max-w-xl text-[2.1rem] md:text-[2.7rem]">
            <span className="doodle-underline">{t('explore.title')}</span>
          </h1>
          <Art name="explore" variant="stick" className="h-20" />
        </div>
      </section>

      <section className="shell mt-5 pb-7">
        <div className="mb-3 border-b-[1.5px] border-line pb-3">
          <Chapter>{t('explore.curated')}</Chapter>
        </div>
        <div className="mb-3.5 flex flex-wrap gap-2">
          {exploreCategories.map((c) => (
            <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Pill>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, n) => (
            <article key={r.id} className={`rounded-[18px] border-[1.5px] border-line p-4 ${['bg-mint-tint', 'bg-sky-tint', 'bg-blush', 'bg-lilac'][n % 4]}`}>
              <div className="flex items-center justify-between gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-[12px] text-[0.875rem] font-bold"
                  style={{ background: toneFor(catOf(r)).bg, color: toneFor(catOf(r)).ink }}
                >
                  {initialOf(r)}
                </span>
                <span className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-slate">{catOf(r)}</span>
              </div>
              <div className="mt-2.5 flex items-start justify-between gap-2">
                <h3 className="text-[0.9375rem] leading-tight">{r.name}</h3>
                </div>
              <p className="mt-0.5 text-[0.8125rem] text-slate">{r.why}</p>
              <div className="mt-2.5 border-t border-line/70 pt-2">
                <Ext href={r.url} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell pb-10">
        <div className="card-chalk relative overflow-hidden p-5">
          <Doodle name="wind" className="absolute right-5 top-4 h-6 w-9 opacity-40" />
          <div className="grid items-center gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <Chapter tone="dark">{t('explore.whyFew')}</Chapter>
              <h3 className="mt-1.5 text-xl text-paper">{t('explore.shortList')}</h3>
              <Btn variant="leaf" className="mt-3" onClick={() => go('quest')}>
                {t('explore.turnOne')}
                <Icon name="arrow" className="h-4 w-4" />
              </Btn>
            </div>
            <CartoonTools className="h-32 w-full max-w-[280px]" />
          </div>
        </div>
      </section>
    </div>
  )
}
