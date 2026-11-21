import { useMemo, useState } from 'react'
import { StickmanArt, Icon } from '../components/StickmanArt.jsx'
import { SectionHead, Pill, Chip, ExternalLink, Empty } from '../components/ui.jsx'
import { resources, exploreCategories } from '../data/content.js'

export default function Explore({ go }) {
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () => (category === 'All' ? resources : resources.filter((r) => r.category === category)),
    [category],
  )

  const counts = useMemo(() => {
    const map = { All: resources.length }
    resources.forEach((r) => {
      map[r.category] = (map[r.category] || 0) + 1
    })
    return map
  }, [])

  return (
    <div className="fade-up">
      <header className="shell pt-10 pb-8 md:pt-14">
        <p className="eyebrow">Explore · Access useful external resources</p>
        <h1 className="mt-3 max-w-2xl text-[2.1rem] leading-[1.1] md:text-[2.7rem]">
          A short gateway, carefully chosen
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Let’s Conserve does not rebuild every tool. Instead it points to a small set of
          external platforms that are genuinely useful — each with a plain-language note on
          why it matters. No affiliate links, no padding.
        </p>
      </header>

      <section className="shell pb-12">
        <SectionHead
          eyebrow="Curated resources"
          title={`${resources.length} tools across ${exploreCategories.length - 1} categories`}
          sub="All links open the organization’s own site in a new tab."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {exploreCategories.map((c) => (
            <Pill key={c} active={category === c} onClick={() => setCategory(c)} count={counts[c] || 0}>
              {c}
            </Pill>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Empty>Nothing in this category yet.</Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((r) => (
              <article key={r.id} className="card flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Chip tone="sky">{r.category}</Chip>
                    <h3 className="mt-2.5 text-[1.0625rem] leading-snug">{r.name}</h3>
                  </div>
                  <span className="mt-1 text-[0.6875rem] font-semibold tracking-wide text-slate uppercase">
                    {r.tag}
                  </span>
                </div>
                <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">{r.why}</p>
                <div className="mt-4 border-t border-line-soft pt-3">
                  <ExternalLink href={r.url}>Open resource</ExternalLink>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="shell pb-16">
        <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[14px] border border-line bg-ink p-6 text-paper">
            <StickmanArt name="sun" className="h-24 w-full text-paper/70" />
            <h3 className="mt-4 text-lg text-paper">Why so few links?</h3>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-paper/70">
              A directory of forty tools is a way of avoiding a decision. Ten vetted
              starting points are more useful than forty unvetted ones.
            </p>
          </div>

          <div className="card p-6 md:p-7">
            <p className="eyebrow">Suggested route</p>
            <h3 className="mt-2 text-xl">Turn one tool into one action</h3>
            <ol className="mt-4 space-y-3">
              {[
                'Use a footprint calculator to see which of your habits matters most.',
                'Check your city’s live air quality before planning an outdoor activity.',
                'Look up forest loss in a region you care about — context beats headlines.',
                'Take one free UN course, then commit to the weekly quest that follows from it.',
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss-tint text-[0.6875rem] font-bold text-moss-deep">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => go('quest')}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2.5 text-sm font-bold text-white hover:bg-moss-deep"
            >
              Take the quest
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <p className="mt-6 text-[0.8125rem] leading-relaxed text-slate">
          Inclusion here is not an endorsement of every position an organization takes.
          Resources are reviewed periodically; if a link no longer works, it should be removed.
        </p>
      </section>
    </div>
  )
}
