import { useMemo, useState } from 'react'
import { StickmanArt, Icon } from '../components/StickmanArt.jsx'
import { SectionHead, Pill, Chip, ExternalLink, Empty } from '../components/ui.jsx'
import { actionGuideGroups, organizations, organizationFilters } from '../data/content.js'

function Guide({ guide, open, onToggle }) {
  return (
    <div className="card overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-start justify-between gap-4 p-5 text-left">
        <div>
          <h4 className="text-[0.9375rem] leading-snug">{guide.title}</h4>
          {!open && <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-slate">{guide.why}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Chip tone="gold">+{guide.points}</Chip>
          <Icon name="chevron" className={`h-4 w-4 text-slate transition-transform ${open ? 'rotate-90' : ''}`} strokeWidth={2.2} />
        </div>
      </button>
      {open && (
        <div className="border-t border-line-soft px-5 pb-5 pt-4">
          <p className="text-[0.875rem] leading-relaxed text-ink-soft">{guide.why}</p>
          <ol className="mt-3 space-y-2">
            {guide.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss-tint text-[0.6875rem] font-bold text-moss-deep">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default function Discover({ go }) {
  const [tab, setTab] = useState('guides')
  const [region, setRegion] = useState('All regions')
  const [query, setQuery] = useState('')
  const [openGuide, setOpenGuide] = useState('waste-audit')

  const orgs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return organizations.filter((o) => {
      const regionOk = region === 'All regions' || o.region === region
      const qOk = !q || `${o.name} ${o.note} ${o.focus} ${o.scope}`.toLowerCase().includes(q)
      return regionOk && qOk
    })
  }, [region, query])

  return (
    <div className="fade-up">
      <header className="shell pt-10 pb-8 md:pt-14">
        <p className="eyebrow">Discover · Find your path to action</p>
        <h1 className="mt-3 max-w-2xl text-[2.1rem] leading-[1.1] md:text-[2.7rem]">
          Knowing is not the same as doing
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Practical action guides for home, school and community — plus a directory of
          organizations you can actually contact, with a Nigerian focus and global fallbacks.
        </p>
      </header>

      <div className="shell">
        <div className="mb-8 flex gap-1 rounded-full border border-line bg-surface p-1">
          {[
            { id: 'guides', label: 'Action guides' },
            { id: 'directory', label: `Organizations (${organizations.length})` },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={[
                'flex-1 rounded-full px-4 py-2.5 text-[0.875rem] font-bold transition-colors',
                tab === t.id ? 'bg-moss text-white' : 'text-ink-soft hover:text-ink',
              ].join(' ')}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'guides' && (
        <section className="shell pb-16">
          <SectionHead
            eyebrow="How to take action"
            title="Small, specific, repeatable"
            sub="Each guide is deliberately narrow. Pick the one that fits your week, not the one that sounds most ambitious."
          />
          <div className="space-y-8">
            {actionGuideGroups.map((group) => (
              <div key={group.id}>
                <div className="mb-3 flex items-center gap-3">
                  <StickmanArt name={group.arts} className="h-10 w-14 text-moss" />
                  <h3 className="text-lg">{group.label}</h3>
                  <span className="text-[0.75rem] text-slate">{group.guides.length} guides</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {group.guides.map((g) => (
                    <Guide
                      key={g.id}
                      guide={g}
                      open={openGuide === g.id}
                      onToggle={() => setOpenGuide(openGuide === g.id ? null : g.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-line bg-moss-tint/50 px-6 py-5">
            <p className="max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
              Guides are ideas, not obligations. Turn the one you choose into a weekly habit
              in Quest — that is where progress is recorded.
            </p>
            <button
              type="button"
              onClick={() => go('quest')}
              className="inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2.5 text-sm font-bold text-white hover:bg-moss-deep"
            >
              Go to Quest
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </section>
      )}

      {tab === 'directory' && (
        <section className="shell pb-16">
          <SectionHead
            eyebrow="Organizations directory"
            title="Where the work is happening"
            sub="Filtered by region so you find groups operating near you, not only international bodies."
          />

          <div className="mb-6 space-y-3">
            <div className="relative">
              <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, focus or scope — e.g. recycling, Lagos, justice"
                className="w-full rounded-full border border-line bg-surface py-3 pl-10 pr-4 text-[0.9375rem] placeholder:text-slate/70 focus:border-moss focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {organizationFilters.map((r) => (
                <Pill
                  key={r}
                  active={region === r}
                  onClick={() => setRegion(r)}
                  count={r === 'All regions' ? organizations.length : organizations.filter((o) => o.region === r).length}
                >
                  {r}
                </Pill>
              ))}
            </div>
          </div>

          {orgs.length === 0 ? (
            <Empty>
              Nothing matches “{query}” in {region.toLowerCase()}. Try a broader term or clear the filters.
            </Empty>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {orgs.map((o) => (
                <article key={o.id} className="card flex flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip tone={o.region === 'Nigeria' ? 'moss' : o.region === 'Africa' ? 'clay' : 'quiet'}>
                      {o.region}
                    </Chip>
                    <Chip tone="quiet">{o.focus}</Chip>
                  </div>
                  <h3 className="mt-3 text-[1.0625rem] leading-snug">{o.name}</h3>
                  <p className="mt-1 text-[0.75rem] font-semibold tracking-wide text-slate uppercase">{o.scope}</p>
                  <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">{o.note}</p>
                  <div className="mt-4 border-t border-line-soft pt-3">
                    <ExternalLink href={o.url}>Visit official site</ExternalLink>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="mt-6 text-[0.8125rem] leading-relaxed text-slate">
            Listings link to each organization’s own website. Always confirm current programmes
            and contact details on their site before travelling or donating.
          </p>
        </section>
      )}
    </div>
  )
}
