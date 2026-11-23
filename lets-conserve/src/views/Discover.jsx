import { useMemo, useState } from 'react'
import { Art, Doodle, Icon, BannerArt } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Segmented, Ext } from '../components/ui.jsx'
import { guideGroups, organizations, regions } from '../data/content.js'

const BRAND = {
  ocean: { bar: '#1d5fa8', tint: '#dbeafa', ink: '#17456f' },
  surfrider: { bar: '#1d5fa8', tint: '#dbeafa', ink: '#17456f' },
  volgov: { bar: '#1d5fa8', tint: '#dbeafa', ink: '#17456f' },
  noaa: { bar: '#1d5fa8', tint: '#dbeafa', ink: '#17456f' },
  mcs: { bar: '#1d5fa8', tint: '#dbeafa', ink: '#17456f' },
  sierra: { bar: '#2f7d4f', tint: '#ddf3e4', ink: '#1a5c3f' },
  tnc: { bar: '#2f7d4f', tint: '#ddf3e4', ink: '#1a5c3f' },
  ewt: { bar: '#2f7d4f', tint: '#ddf3e4', ink: '#1a5c3f' },
  nrdc: { bar: '#b8452f', tint: '#fbe2e2', ink: '#7a2b24' },
  gpafrica: { bar: '#b8452f', tint: '#fbe2e2', ink: '#7a2b24' },
  foeuk: { bar: '#b8452f', tint: '#fbe2e2', ink: '#7a2b24' },
  idealist: { bar: '#5b3fa8', tint: '#eae4fb', ink: '#432c7a' },
  wt: { bar: '#5b3fa8', tint: '#eae4fb', ink: '#432c7a' },
}

const BY_TOPIC = {
  water: { bar: '#1d5fa8', tint: '#dbeafa', ink: '#17456f' },
  nature: { bar: '#2f7d4f', tint: '#ddf3e4', ink: '#1a5c3f' },
  forest: { bar: '#2f7d4f', tint: '#ddf3e4', ink: '#1a5c3f' },
  plant: { bar: '#2f7d4f', tint: '#ddf3e4', ink: '#1a5c3f' },
  garden: { bar: '#3f7d3a', tint: '#e4f4d9', ink: '#2c5426' },
  climate: { bar: '#b8452f', tint: '#fbe2e2', ink: '#7a2b24' },
  energy: { bar: '#b8862f', tint: '#fdf1c6', ink: '#6b4a12' },
  transport: { bar: '#1f6f7a', tint: '#dcf1f2', ink: '#14505a' },
  learn: { bar: '#5b3fa8', tint: '#eae4fb', ink: '#432c7a' },
  community: { bar: '#5b3fa8', tint: '#eae4fb', ink: '#432c7a' },
  place: { bar: '#1f6f7a', tint: '#dcf1f2', ink: '#14505a' },
  waste: { bar: '#8a6a10', tint: '#f6ecd8', ink: '#5c4608' },
  harvest: { bar: '#b8862f', tint: '#fdf1c6', ink: '#6b4a12' },
  cleanup: { bar: '#8a6a10', tint: '#f6ecd8', ink: '#5c4608' },
  explore: { bar: '#1f6f7a', tint: '#dcf1f2', ink: '#14505a' },
}

const accent = (o) => BRAND[o.id] || BY_TOPIC[o.art] || { bar: '#5f9c33', tint: '#eef9dc', ink: '#1a5c3f' }

const initials = (name) =>
  name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/* solid tone panels for the action guide cards */
const GUIDE_TONE = {
  waste: 'fill-terra',
  energy: 'fill-butter',
  water: 'fill-skyflat',
  learn: 'fill-lilac',
  community: 'fill-sage',
  forest: 'fill-mintflat',
}

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
      <section className="shell pt-4 md:pt-6">
        <div className="overflow-hidden rounded-[22px] border-[1.5px] border-line">
          <BannerArt variant="park" className="h-16 w-full md:h-20" />
        </div>
      </section>

      <section className="shell mt-4">
        <Chapter>Chapter 02</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="display max-w-xl text-[2.1rem] md:text-[2.7rem]">
            Find your <span className="doodle-underline">path</span>
          </h1>
          <Art name="community" variant="stick" className="h-20" />
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
                <article key={o.id} className="card flex flex-col overflow-hidden">
                  <span aria-hidden="true" className="block h-1.5 w-full" style={{ background: accent(o).bar }} />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[0.6875rem] font-bold tracking-[0.02em] uppercase"
                        style={{ background: accent(o).tint, color: accent(o).ink }}
                      >
                        {initials(o.name)}
                      </span>
                      <h3 className="min-w-0 flex-1 text-[0.9375rem] leading-tight">{o.name}</h3>
                    </div>
                    <p className="mt-2 flex-1 text-[0.8125rem] leading-snug text-slate">{o.note}</p>
                    <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line-soft pt-2">
                      <Ext href={o.url}>Learn more</Ext>
                      <span className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-slate">{o.region}</span>
                    </div>
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
          </div>

          <div className="space-y-5">
            {guideGroups.map((g) => (
              <div key={g.id}>
                <h3 className="mb-2 text-lg">{g.label}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.guides.map((x) => (
                    <div key={x.title} className="card p-4">
                      <img
                        src={x.img}
                        alt={x.title}
                        loading="lazy"
                        decoding="async"
                        width="760"
                        height="507"
                        className="h-28 w-full rounded-[14px] object-cover"
                      />
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
