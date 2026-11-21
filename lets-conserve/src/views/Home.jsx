import { useMemo, useState } from 'react'
import { StickmanArt, Doodle, Icon } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Meter, Ext, Head } from '../components/ui.jsx'
import { learnTopics, organizations, resources, quizQuestions } from '../data/content.js'

export default function Home({ quest, points, isDone, toggleQuest, go, week }) {
  const [flash, setFlash] = useState(false)
  const done = isDone(quest.id)

  const handle = () => {
    toggleQuest(quest.id)
    if (!done) {
      setFlash(true)
      window.setTimeout(() => setFlash(false), 1800)
    }
  }

  const cards = useMemo(
    () => [
      { view: 'learn', art: 'learning', title: 'Learn', line: 'Short explanations. No jargon.', tone: 'bg-leaf' },
      { view: 'discover', art: 'recycling', title: 'Discover', line: 'Ways to act, and who to join.', tone: 'bg-gold-tint' },
      { view: 'explore', art: 'outdoors', title: 'Explore', line: 'Tools worth opening.', tone: 'bg-[#e3f0f8]' },
    ],
    [],
  )

  return (
    <div className="fade-up">
      {/* ---------------------------- HERO ---------------------------- */}
      <section className="shell pt-6 md:pt-10">
        <div className="card-chalk relative overflow-hidden px-6 py-8 md:px-10 md:py-12">
          {/* chalk background doodles */}
          <Doodle name="star" className="drift absolute right-6 top-6 h-7 w-7 text-gold/70" />
          <Doodle name="star" className="absolute left-1/2 top-10 h-4 w-4 text-mint/40" />
          <Doodle name="cloud" className="absolute right-10 top-20 h-8 w-12 text-paper/20" />
          <Doodle name="bird" className="absolute left-8 top-16 h-5 w-8 text-paper/25" />
          <Doodle name="arc" className="absolute -bottom-6 right-1/3 h-16 w-24 text-mint/15" />

          <div className="relative grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
            <div>
              <Chapter>Your personal guide for eco-action</Chapter>
              <h1 className="display mt-3 text-[2.6rem] text-paper sm:text-[3.2rem] md:text-[3.6rem]">
                Learn something.
                <br />
                <span className="text-gold">Discover</span> something.
                <br />
                Do something.
              </h1>
              <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-paper/70">
                Small steps. Real places. Nothing to sign up for.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Btn variant="gold" onClick={() => go('quest')}>
                  This week&rsquo;s quest
                  <Icon name="arrow" className="h-4 w-4" />
                </Btn>
                <Btn variant="ghostLight" onClick={() => go('learn')}>
                  Start learning
                </Btn>
              </div>
            </div>

            <div className="relative">
              <StickmanArt name="horizon" tone="dark" className="h-32 w-full md:h-40" />
              <StickmanArt name="planting" tone="dark" className="mt-1 h-24 w-full opacity-95 md:h-28" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------- WEEKLY QUEST ---------------------- */}
      <section className="shell mt-5">
        <div className="card relative overflow-hidden p-5 md:p-6">
          <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="gold">This week</Chip>
                <span className="text-[0.75rem] font-semibold text-slate">{week.label}</span>
              </div>
              <h2 className="mt-2.5 text-[1.5rem] md:text-[1.75rem]">{quest.title}</h2>
              <p className="mt-1 max-w-sm text-[0.9375rem] text-ink-soft">{quest.text}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Btn variant={done ? 'chalk' : 'leaf'} onClick={handle} aria-pressed={done}>
                  <Icon name={done ? 'check' : 'hand'} className="h-4 w-4" strokeWidth={2.6} />
                  {done ? 'Done' : 'Mark complete'}
                </Btn>
                <span className="text-[0.8125rem] font-bold text-green-deep">
                  {flash ? `+${quest.points} points` : `+${quest.points} points`}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <StickmanArt name={quest.art} tone="light" className="h-28 w-40 md:h-32 md:w-44" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-line-soft pt-3.5">
            <span className="text-[0.75rem] font-bold tabular-nums text-ink-soft">{points} pts</span>
            <Meter value={points} max={120} />
            <span className="text-[0.75rem] font-bold text-slate">120</span>
          </div>
        </div>
      </section>

      {/* -------------------------- ENTRY CARDS ---------------------- */}
      <section className="shell mt-6 pb-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <button
              key={c.view}
              type="button"
              onClick={() => go(c.view)}
              className={`group relative overflow-hidden rounded-[18px] border-[1.5px] border-line p-4 text-left transition-transform hover:-translate-y-0.5 ${c.tone}`}
            >
              <StickmanArt name={c.art} tone="light" className="h-24 w-full" />
              <div className="mt-2 flex items-center justify-between">
                <h3 className="text-[1.0625rem]">{c.title}</h3>
                <Icon name="arrow" className="h-4 w-4 text-green-deep transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
              </div>
              <p className="mt-0.5 text-[0.8125rem] text-ink-soft">{c.line}</p>
            </button>
          ))}
        </div>
      </section>

      {/* --------------------------- DIRECTORY TEASE ----------------- */}
      <section className="shell pb-10">
        <Head
          chapter="Discover"
          title="Organizations near you"
          action={
            <button type="button" onClick={() => go('discover')} className="text-[0.8125rem] font-bold text-green-deep underline decoration-gold decoration-2 underline-offset-4">
              Full directory
            </button>
          }
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { r: 'United States', n: 'Sierra Club' },
            { r: 'United Kingdom', n: 'The Wildlife Trusts' },
            { r: 'South Africa', n: 'WESSA' },
            { r: 'Nigeria', n: 'NCF' },
          ].map((x, i) => (
            <div key={x.n} className="card flex items-center gap-3 p-3.5">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${['bg-leaf', 'bg-gold-tint', 'bg-[#e3f0f8]', 'bg-[#fbe7ec]'][i]}`}>
                <Icon name="pin" className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.8125rem] font-bold">{x.n}</p>
                <p className="text-[0.6875rem] text-slate">{x.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- FACTS ------------------------- */}
      <section className="shell pb-14">
        <div className="card-chalk relative overflow-hidden p-6 md:p-8">
          <Doodle name="sprout" className="absolute right-6 top-6 h-8 w-8 text-mint/40" />
          <div className="grid items-center gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Chapter>Did you know</Chapter>
              <p className="mt-3 text-[1.25rem] leading-snug text-paper md:text-[1.4rem]">
                Mangroves store more carbon per hectare than most land forests.
              </p>
              <button
                type="button"
                onClick={() => go('learn')}
                className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-bold text-gold"
              >
                More facts
                <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.4} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {resources.slice(0, 2).map((r) => (
                <div key={r.id} className="rounded-xl border border-paper/15 p-3">
                  <StickmanArt name={r.art} tone="dark" className="h-14 w-full" />
                  <p className="mt-1.5 text-[0.8125rem] font-bold text-paper">{r.name}</p>
                  <p className="text-[0.75rem] text-paper/55">{r.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
