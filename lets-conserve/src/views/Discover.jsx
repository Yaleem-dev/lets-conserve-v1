import { useMemo, useState } from 'react'
import { StickmanArt, Doodle, Icon } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Ext, Head } from '../components/ui.jsx'
import { guideGroups, organizations, regions } from '../data/content.js'

export default function Discover({ go }) {
  const [tab, setTab] = useState('orgs')
  const [region, setRegion] = useState('All')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return organizations.filter((o) => {
      const rOk = region === 'All' || o.region === region
      const qOk = !term || `${o.name} ${o.note} ${o.focus}`.toLowerCase().includes(term)
      return rOk && qOk
    })
  }, [region, q])

  const count = (id) => (id === 'All' ? organizations.length : organizations.filter((o) => o.region === id).length)

  return (
    <div className="fade-up">
      <section className="shell pt-8 md:pt-12">
        <Chapter>Chapter 02</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="display max-w-xl text-[2.2rem] md:text-[2.9rem]">
            Find your <span className="doodle-underline">path</span>
          </h1>
          <StickmanArt name="cleanup" tone="light" className="h-20 w-28" />
        </div>
      </section>

      {/* toggle */}
      <div className="shell mt-6">
        <div className="flex gap-1.5 rounded-full border-[1.5px] border-line bg-card p-1">
          {[
            { id: 'orgs', label: 'Directory' },
            { id: 'acts', label: 'Action guides' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-full px-4 py-2.5 text-[0.875rem] font-bold transition-colors ${
                tab === t.id ? 'bg-green text-paper' : 'text-ink-soft hover:text-green-deep'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'orgs' && (
        <section className="shell mt-6 pb-10">
          <Head
            chapter="Directory"
            title="Where the work happens"
            action={<span className="text-[0.75rem] text-slate">{list.length} listed</span>}
          />

          <div className="relative mb-3">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or focus"
              className="w-full rounded-full border-[1.5px] border-line bg-card py-2.5 pl-10 pr-4 text-[0.9375rem] placeholder:text-slate/70 focus:border-green focus:outline-none"
            />
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {[{ id: 'All', label: 'All' }, ...regions].map((r) => (
              <Pill key={r.id} active={region === r.id} onClick={() => setRegion(r.id)} dot>
                {r.label} <span className="tabular-nums opacity-60">{count(r.id)}</span>
              </Pill>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="rounded-[18px] border-[1.5px] border-dashed border-line px-5 py-10 text-center text-sm text-slate">
              Nothing matches. Try another region.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {list.map((o) => (
                <article key={o.id} className="card flex flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-1.5">
                        <Chip tone="leaf">{o.region === 'Global' ? 'Global' : o.region}</Chip>
                        <Chip tone={o.kind === 'vol' ? 'gold' : 'mint'}>{o.kind === 'vol' ? 'Volunteer' : 'Organization'}</Chip>
                      </div>
                      <h3 className="mt-2 text-[1rem] leading-tight">{o.name}</h3>
                    </div>
                    <span className="shrink-0 text-[0.6875rem] font-bold uppercase tracking-wide text-slate">{o.focus}</span>
                  </div>
                  <p className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-slate">{o.note}</p>
                  <div className="mt-3 border-t border-line-soft pt-2.5">
                    <Ext href={o.url}>{o.kind === 'vol' ? 'Find opportunities' : 'Visit site'}</Ext>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="mt-5 text-[0.75rem] leading-relaxed text-slate">
            Links go to each group&rsquo;s own website. Check details there before you travel or give.
          </p>
        </section>
      )}

      {tab === 'acts' && (
        <section className="shell mt-6 pb-10">
          <Head chapter="Action guides" title="Small and specific" />
          <div className="space-y-6">
            {guideGroups.map((g) => (
              <div key={g.id}>
                <div className="mb-2.5 flex items-center gap-2.5">
                  <StickmanArt name={g.art} tone="light" className="h-10 w-14" />
                  <h3 className="text-lg">{g.label}</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.guides.map((x) => (
                    <div key={x.title} className="card p-4">
                      <StickmanArt name={x.art} tone="light" className="h-16 w-full" />
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

          <div className="card-chalk relative mt-7 overflow-hidden p-5">
            <Doodle name="sprout" className="absolute right-5 top-5 h-7 w-7 text-mint/40" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Chapter>Turn it into a habit</Chapter>
                <p className="mt-1.5 max-w-sm text-paper/80">Pick one guide and repeat it. Progress lives in Quest.</p>
              </div>
              <Btn variant="gold" onClick={() => go('quest')}>
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
