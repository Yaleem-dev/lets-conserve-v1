import { useMemo, useState } from 'react'
import { StickmanArt, Icon, BadgeArt } from '../components/StickmanArt.jsx'
import { SectionHead, Pill, Chip, Progress, PointsChip } from '../components/ui.jsx'
import { quests, questCategories, questBadges } from '../data/content.js'

export default function Quest({ points, isDone, toggleQuest, week, reset, go }) {
  const [category, setCategory] = useState('All')
  const [flash, setFlash] = useState(null)

  const featured = quests[week.index % quests.length]

  const filtered = useMemo(
    () => (category === 'All' ? quests : quests.filter((q) => q.category === category)),
    [category],
  )

  const completed = quests.filter((q) => isDone(q.id)).length
  const maxPoints = quests.reduce((s, q) => s + q.points, 0) + 25
  const nextBadge = questBadges.find((b) => points < b.at)

  const onToggle = (q) => {
    toggleQuest(q.id)
    if (!isDone(q.id)) {
      setFlash(q.id)
      window.setTimeout(() => setFlash(null), 1800)
    }
  }

  return (
    <div className="fade-up">
      <header className="shell pt-10 pb-8 md:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Quest · Make it a habit</p>
            <h1 className="mt-3 max-w-2xl text-[2.1rem] leading-[1.1] md:text-[2.7rem]">
              One small action a week
            </h1>
          </div>
          <PointsChip points={points} />
        </div>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Points here reward participation, nothing more. They are not a competition, and
          they are not a claim that individual action replaces systemic change — both matter.
        </p>
      </header>

      {/* ----------------------------- progress ---------------------------- */}
      <section className="shell pb-10">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="card p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Your record</p>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {points}
                  <span className="ml-1 text-base font-medium text-slate">/ {maxPoints} pts</span>
                </p>
              </div>
              <p className="text-[0.8125rem] text-slate">
                {completed} of {quests.length} quests completed
              </p>
            </div>
            <div className="mt-4">
              <Progress value={points} max={maxPoints} />
            </div>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-slate">
              {nextBadge
                ? `${nextBadge.at - points} points to the “${nextBadge.label}” badge.`
                : 'All milestone badges unlocked — you have been remarkably consistent.'}
            </p>
          </div>

          <div className="card p-6">
            <p className="eyebrow mb-3">Milestone badges</p>
            <ul className="space-y-2.5">
              {questBadges.map((b) => {
                const earned = points >= b.at
                return (
                  <li key={b.id} className="flex items-center gap-3">
                    <span
                      className={[
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border',
                        earned ? 'border-moss bg-moss-tint text-moss-deep' : 'border-line bg-paper-2/60 text-slate/50',
                      ].join(' ')}
                    >
                      <BadgeArt id={b.id} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[0.8125rem] font-semibold ${earned ? 'text-ink' : 'text-slate'}`}>
                        {b.label}
                      </p>
                      <p className="text-[0.6875rem] text-slate">{b.note}</p>
                    </div>
                    {earned && <Icon name="check" className="h-4 w-4 text-moss" strokeWidth={2.6} />}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------- featured ---------------------------- */}
      <section className="shell pb-10">
        <div className="grid items-stretch gap-0 overflow-hidden rounded-[16px] border border-moss/25 bg-moss-tint/50 md:grid-cols-[1fr_0.55fr]">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow text-moss-deep">This week</span>
              <span className="text-[0.6875rem] text-slate">· {week.label}</span>
            </div>
            <h2 className="mt-3 text-2xl">{featured.title}</h2>
            <p className="mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">{featured.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip tone="moss">{featured.category}</Chip>
              <Chip tone="gold">+{featured.points} points</Chip>
            </div>
            <button
              type="button"
              onClick={() => onToggle(featured)}
              aria-pressed={isDone(featured.id)}
              className={[
                'mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors',
                isDone(featured.id)
                  ? 'bg-moss-deep text-white'
                  : 'border border-moss/40 bg-surface text-moss-deep hover:bg-white',
              ].join(' ')}
            >
              <Icon name={isDone(featured.id) ? 'check' : 'spark'} className="h-4 w-4" strokeWidth={2.4} />
              {isDone(featured.id) ? 'Completed' : 'Mark complete'}
            </button>
          </div>
          <div className="flex items-center justify-center border-t border-moss/15 bg-surface/40 p-6 md:border-t-0 md:border-l">
            <StickmanArt name={featured.art} className="h-36 w-full max-w-[200px] text-moss-deep" />
          </div>
        </div>
      </section>

      {/* ------------------------------ all ------------------------------- */}
      <section className="shell pb-12">
        <SectionHead
          eyebrow="All quests"
          title="Pick what fits your week"
          sub="Tick a quest when you have actually done it. You can untick it if you change your mind."
          action={
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all points and completed quests on this device?')) reset()
              }}
              className="text-[0.75rem] font-semibold text-slate underline decoration-line underline-offset-4 hover:text-clay"
            >
              Reset progress
            </button>
          }
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {questCategories.map((c) => (
            <Pill key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Pill>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((q) => {
            const done = isDone(q.id)
            return (
              <article
                key={q.id}
                className={[
                  'flex flex-col rounded-[14px] border p-5 transition-colors',
                  done ? 'border-moss/40 bg-moss-tint/40' : 'border-line bg-surface',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Chip tone={done ? 'moss' : 'quiet'}>{q.category}</Chip>
                  </div>
                  <StickmanArt name={q.art} className={`h-10 w-14 ${done ? 'text-moss' : 'text-moss/60'}`} />
                </div>
                <h3 className="mt-3 text-[0.9375rem] leading-snug">{q.title}</h3>
                <p className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-slate">{q.text}</p>

                <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3">
                  <button
                    type="button"
                    onClick={() => onToggle(q)}
                    aria-pressed={done}
                    className={[
                      'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem] font-bold transition-colors',
                      done ? 'bg-moss-deep text-white' : 'border border-line text-ink-soft hover:border-moss hover:text-moss-deep',
                    ].join(' ')}
                  >
                    <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${done ? 'border-white/60' : 'border-current/40'}`}>
                      {done && <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} />}
                    </span>
                    {done ? 'Done' : 'Complete'}
                  </button>
                  <span className={`text-[0.75rem] font-bold tabular-nums ${flash === q.id ? 'text-moss' : 'text-gold'}`}>
                    {flash === q.id ? `+${q.points}` : `+${q.points} pts`}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p className="rounded-[14px] border border-dashed border-line px-6 py-12 text-center text-sm text-slate">
            No quests in this category yet — check back next week.
          </p>
        )}
      </section>

      <section className="shell pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-line bg-paper-2/60 px-6 py-5">
          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
            Want the reasoning behind a quest? Every theme here has a corresponding
            explainer in Learn.
          </p>
          <button
            type="button"
            onClick={() => go('learn')}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-bold text-ink hover:border-moss hover:text-moss-deep"
          >
            Read the explainers
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </section>
    </div>
  )
}
