import { useMemo, useState } from 'react'
import { StickmanArt, Doodle, Icon } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Ext, Head } from '../components/ui.jsx'
import { resources, exploreCategories } from '../data/content.js'

export default function Explore({ go }) {
  const [cat, setCat] = useState('All')
  const list = useMemo(() => (cat === 'All' ? resources : resources.filter((r) => r.category === cat)), [cat])

  return (
    <div className="fade-up">
      <section className="shell pt-8 md:pt-12">
        <Chapter>Chapter 04</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="display max-w-xl text-[2.2rem] md:text-[2.9rem]">
            Tools worth <span className="doodle-underline">opening</span>
          </h1>
          <StickmanArt name="outdoors" tone="light" className="h-20 w-28" />
        </div>
      </section>

      <section className="shell mt-6 pb-8">
        <Head chapter="Curated" title="Nine starting points" />
        <div className="mb-4 flex flex-wrap gap-2">
          {exploreCategories.map((c) => (
            <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Pill>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r, n) => (
            <article key={r.id} className={`rounded-[18px] border-[1.5px] border-line p-4 ${['bg-card', 'bg-leaf/50', 'bg-gold-tint/50'][n % 3]}`}>
              <StickmanArt name={r.art} tone="light" className="h-16 w-full" />
              <div className="mt-1.5 flex items-start justify-between gap-2">
                <h3 className="text-[1rem] leading-tight">{r.name}</h3>
                <Chip tone="chalk">{r.category}</Chip>
              </div>
              <p className="mt-1 text-[0.8125rem] text-slate">{r.why}</p>
              <div className="mt-3 border-t border-line/70 pt-2.5">
                <Ext href={r.url}>Open</Ext>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell pb-12">
        <div className="card-chalk relative overflow-hidden p-6 md:p-7">
          <Doodle name="cloud" className="absolute right-6 top-5 h-7 w-10 text-paper/20" />
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <Chapter>Why so few</Chapter>
              <h3 className="mt-2 text-xl text-paper">Ten good links beat a hundred</h3>
              <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-paper/70">
                A long list is a way of avoiding a decision.
              </p>
              <Btn variant="gold" className="mt-4" onClick={() => go('quest')}>
                Turn one into a quest
                <Icon name="arrow" className="h-4 w-4" />
              </Btn>
            </div>
            <StickmanArt name="horizon" tone="dark" className="h-24 w-full md:w-56" />
          </div>
        </div>
      </section>
    </div>
  )
}
