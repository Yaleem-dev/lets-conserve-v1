import { useMemo, useState } from 'react'
import { StickmanArt, Doodle, Icon, BadgeArt } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Meter, Head } from '../components/ui.jsx'
import { quests, questCategories, badges } from '../data/content.js'

export default function Quest({ points, isDone, toggleQuest, week, reset, go }) {
  const [cat, setCat] = useState('All')
  const [flash, setFlash] = useState(null)

  const featured = quests[week.index % quests.length]
  const list = useMemo(() => (cat === 'All' ? quests : quests.filter((q) => q.category === cat)), [cat])
  const doneCount = quests.filter((q) => isDone(q.id)).length
  const max = quests.reduce((s, q) => s + q.points, 0) + 25
  const nextBadge = badges.find((b) => points < b.at)

  const onToggle = (q) => {
    toggleQuest(q.id)
    if (!isDone(q.id)) {
      setFlash(q.id)
      window.setTimeout(() => setFlash(null), 1600)
    }
  }

  return (
    <div className="fade-up">
      <section className="shell pt-8 md:pt-12">
        <Chapter>Chapter 03</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="display max-w-xl text-[2.2rem] md:text-[2.9rem]">
            Do one <span className="doodle-underline">small thing</span>
          </h1>
          <div className="flex items-end gap-4">
            <StickmanArt name="celebrate" tone="light" className="hidden h-20 w-28 sm:block" />
            <div className="text-right">
              <p className="text-3xl font-bold tabular-nums">{points}</p>
              <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-slate">points</p>
            </div>
          </div>
        </div>
      </section>

      {/* record */}
      <section className="shell mt-6">
        <div className="card p-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[0.75rem] font-bold uppercase tracking-wider text-slate">Your record</p>
              <p className="mt-1 text-[1.5rem] font-bold tabular-nums">
                {points} <span className="text-sm font-medium text-slate">/ {max}</span>
              </p>
            </div>
            <p className="text-[0.8125rem] text-slate">
              {doneCount} of {quests.length} done
            </p>
          </div>
          <div className="mt-3">
            <Meter value={points} max={max} />
          </div>
          <p className="mt-2 text-[0.8125rem] text-slate">
            {nextBadge ? `${nextBadge.at - points} to ${nextBadge.label}` : 'All badges unlocked'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-line-soft pt-3.5">
            {badges.map((b) => {
              const has = points >= b.at
              return (
                <span
                  key={b.id}
                  className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-2.5 py-1 text-[0.75rem] font-bold ${
                    has ? 'border-green bg-leaf text-green-deep' : 'border-line text-slate/60'
                  }`}
                >
                  <BadgeArt id={b.id} className="h-3.5 w-3.5" />
                  {b.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* featured */}
      <section className="shell mt-4">
        <div className="card-chalk relative overflow-hidden p-5 md:p-6">
          <Doodle name="star" className="absolute right-5 top-5 h-6 w-6 text-gold/70" />
          <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2">
                <span className="chapter rounded-full bg-gold px-2.5 py-1 text-chalk">This week</span>
                <span className="text-[0.75rem] text-paper/50">{week.label}</span>
              </div>
              <h2 className="mt-2.5 text-[1.5rem] text-paper md:text-[1.75rem]">{featured.title}</h2>
              <p className="mt-1 max-w-sm text-[0.9375rem] text-paper/70">{featured.text}</p>
              <Btn variant="gold" className="mt-4" onClick={() => onToggle(featured)} aria-pressed={isDone(featured.id)}>
                <Icon name={isDone(featured.id) ? 'check' : 'hand'} className="h-4 w-4" strokeWidth={2.6} />
                {isDone(featured.id) ? 'Done' : 'Mark complete'}
              </Btn>
            </div>
            <StickmanArt name={featured.art} tone="dark" className="h-28 w-40" />
          </div>
        </div>
      </section>

      {/* all */}
      <section className="shell mt-8 pb-10">
        <Head
          chapter="All quests"
          title="Pick what fits"
          action={
            <button
              type="button"
              onClick={() => window.confirm('Reset points and quests on this device?') && reset()}
              className="text-[0.75rem] font-semibold text-slate underline underline-offset-4 hover:text-rose"
            >
              Reset
            </button>
          }
        />

        <div className="mb-4 flex flex-wrap gap-2">
          {questCategories.map((c) => (
            <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Pill>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((q, n) => {
            const done = isDone(q.id)
            return (
              <article
                key={q.id}
                className={`relative overflow-hidden rounded-[18px] border-[1.5px] p-3.5 transition-colors ${
                  done ? 'border-green bg-leaf' : `border-line ${['bg-card', 'bg-card', 'bg-gold-tint/60', 'bg-card'][n % 4]}`
                }`}
              >
                <StickmanArt name={q.art} tone="light" className="h-16 w-full" />
                <h3 className="mt-1.5 text-[0.9375rem] leading-snug">{q.title}</h3>
                <p className="mt-0.5 text-[0.75rem] leading-snug text-slate">{q.text}</p>

                <div className="mt-2.5 flex items-center justify-between border-t border-line/70 pt-2">
                  <button
                    type="button"
                    onClick={() => onToggle(q)}
                    aria-pressed={done}
                    aria-label={`${done ? 'Undo' : 'Complete'} ${q.title}`}
                    className={`flex h-6 w-6 items-center justify-center rounded-md border-[1.5px] transition-colors ${
                      done ? 'border-green-deep bg-green-deep text-paper' : 'border-ink/25 text-transparent hover:border-green'
                    }`}
                  >
                    <Icon name="check" className="h-3 w-3" strokeWidth={3.4} />
                  </button>
                  <span className={`text-[0.75rem] font-bold tabular-nums ${flash === q.id ? 'text-green' : 'text-gold-deep'}`}>
                    +{q.points}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="shell pb-12">
        <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-sm text-[0.9375rem] text-ink-soft">Points reward showing up. They are not a competition.</p>
          <Btn variant="ghost" onClick={() => go('explore')}>
            Explore tools
            <Icon name="arrow" className="h-4 w-4" />
          </Btn>
        </div>
      </section>
    </div>
  )
}
