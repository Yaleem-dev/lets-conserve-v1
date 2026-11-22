import { useMemo, useState } from 'react'
import { Scene, Doodle, Icon } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Segmented, Ext } from '../components/ui.jsx'
import { guideGroups, organizations, regions } from '../data/content.js'

export default function Discover({ go }) {
  const [tab, setTab] = useState('orgs')
  const [region, setRegion] = useState('All')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return organizations.filter((o) => {
      const rOk = region === 'All' || o.region === region
      const qOk = !term || `${o.name} ${o.note}`.toLowerCase().includes(term)
      return rOk && qOk
    })
  }, [region, q])

  const count = (id) => (id === 'All' ? organizations.length : organizations.filter((o) => o.region === id).length)

  return (
    <div className="fade-up">
      <section className="shell pt-7 md:pt-10">
        <Chapter>Chapter 02</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="display max-w-xl text-[2.1rem] md:text-[2.7rem]">
            Find your <span className="doodle-underline">path</span>
          </h1>
          <Scene name="community" className="h-16" size="h-10 w-10" />
        </div>
      </section>

      <div className="shell mt-5">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { id: 'orgs', label: 'Directory' },
            { id: 'acts', label: 'Action guides' },
          ]}
        />
      </div>

      {tab === 'orgs' && (
        <section className="shell mt-5 pb-9">
          <div className="mb-3 flex items-end justify-between border-b-[1.5px] border-line pb-3">
            <div>
              <Chapter>Directory</Chapter>
              <h2 className="mt-1 text-xl">Where the work happens</h2>
            </div>
            <span className="text-[0.75rem] text-slate">{list.length} listed</span>
          </div>

          <div className="relative mb-3">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name"
              className="w-full rounded-full border-[1.5px] border-line bg-card py-2.5 pl-10 pr-4 text-[0.9375rem] placeholder:text-slate/70 focus:border-leaf-2 focus:bg-leaf-3 focus:outline-none"
            />
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <Pill active={region === 'All'} onClick={() => setRegion('All')}>All</Pill>
            {regions.map((r) => (
              <Pill key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>
                {r.label} <span className="tabular-nums opacity-55">{count(r.id)}</span>
              </Pill>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="rounded-[18px] border-[1.5px] border-dashed border-line bg-card/60 px-5 py-9 text-center text-sm text-slate">
              Nothing matches. Try another region.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((o) => (
                <article key={o.id} className="card flex flex-col p-4">
                  <Scene name={o.art} className="h-16" size="h-10 w-10" />
                  <div className="mt-2 flex items-start justify-between gap-2">
                    <h3 className="text-[0.9375rem] leading-tight">{o.name}</h3>
                    <Chip tone={o.kind === 'vol' ? 'gold' : 'leaf'}>{o.region}</Chip>
                  </div>
                  <p className="mt-1 flex-1 text-[0.8125rem] leading-snug text-slate">{o.note}</p>
                  <div className="mt-2.5 border-t border-line-soft pt-2">
                    <Ext href={o.url}>Learn more</Ext>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === 'acts' && (
        <section className="shell mt-5 pb-9">
          <div className="mb-4 border-b-[1.5px] border-line pb-3">
            <Chapter>Action guides</Chapter>
            <h2 className="mt-1 text-xl">Small and specific</h2>
          </div>

          <div className="space-y-5">
            {guideGroups.map((g) => (
              <div key={g.id}>
                <h3 className="mb-2 text-lg">{g.label}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.guides.map((x) => (
                    <div key={x.title} className="card p-4">
                      <Scene name={x.art} className="h-16" size="h-10 w-10" />
                      <h4 className="mt-2 text-[0.9375rem] leading-snug">{x.title}</h4>
                      <div className="mt-2 flex items-center justify-between border-t border-line-soft pt-2">
                        <span className="text-[0.6875rem] font-bold uppercase tracking-wide text-slate">Guide</span>
                        <span className="text-[0.75rem] font-bold text-gold-deep">+{x.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card-chalk relative mt-6 overflow-hidden p-5">
            <Doodle name="sprig" className="absolute right-5 top-5 h-7 w-7 opacity-40" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Chapter tone="dark">Turn it into a habit</Chapter>
                <p className="mt-1 max-w-sm text-paper/80">Pick one and repeat it.</p>
              </div>
              <Btn variant="leaf" onClick={() => go('quest')}>
                Go to Quest
                <Icon name="arrow" className="h-4 w-4" />
              </Btn>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
