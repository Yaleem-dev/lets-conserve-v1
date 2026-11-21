import { useState } from 'react'
import { StickmanArt, Icon } from '../components/StickmanArt.jsx'
import { Chip, Progress, ExternalLink } from '../components/ui.jsx'
import { learnTopics, didYouKnow, organizations, resources, heroStats } from '../data/content.js'
import { QUIZ_BONUS } from '../hooks/useProgress.js'

export default function Home({ quest, points, isDone, toggleQuest, go, week }) {
  const [justDone, setJustDone] = useState(false)

  const handleToggle = () => {
    toggleQuest(quest.id)
    if (!isDone(quest.id)) {
      setJustDone(true)
      window.setTimeout(() => setJustDone(false), 2200)
    }
  }

  const done = isDone(quest.id)
  const fact = didYouKnow[0]

  return (
    <div className="fade-up">
      {/* ------------------------------- HERO ------------------------------ */}
      <section className="shell pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
          <div>
            <p className="eyebrow">A platform for everyday eco-action</p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.05] sm:text-5xl md:text-[3.4rem]">
              Learn something.
              <br />
              Discover something.
              <br />
              <span className="text-moss">Do something.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              Caring for the planet should not feel intimidating. Let’s Conserve turns
              environmental issues into short explainers, practical action guides, a
              directory of real organizations, and one small weekly challenge.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => go('quest')}
                className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-moss-deep"
              >
                This week’s quest
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => go('learn')}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-[#c9c7bb]"
              >
                Start learning
              </button>
            </div>

            <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-xl font-bold tabular-nums">{s.value}</dd>
                  <dd className="text-[0.8125rem] text-slate">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="rounded-[18px] border border-line bg-surface p-7">
              <StickmanArt name="outdoor" className="h-44 w-full text-moss md:h-52" />
              <p className="mt-4 border-t border-line-soft pt-4 text-[0.8125rem] leading-relaxed text-slate">
                No prior knowledge assumed. Nothing to sign up for. Your progress stays
                on this device.
              </p>
            </div>
            <div className="absolute -bottom-4 -left-3 hidden rotate-[-3deg] rounded-xl border border-line bg-paper px-3 py-2 text-[0.6875rem] font-bold tracking-wide text-slate uppercase sm:block">
              One small step at a time
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------- FEATURED QUEST -------------------------- */}
      <section className="shell pb-14">
        <div className="overflow-hidden rounded-[18px] border border-moss/25 bg-moss-tint/60">
          <div className="grid md:grid-cols-[1fr_0.7fr]">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow text-moss-deep">Featured weekly quest</span>
                <span className="text-[0.6875rem] text-slate">· {week.label}</span>
              </div>
              <h2 className="mt-3 text-2xl md:text-[1.75rem]">{quest.title}</h2>
              <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                {quest.text}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Chip tone="moss">{quest.category}</Chip>
                <Chip tone="gold">+{quest.points} points</Chip>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggle}
                  aria-pressed={done}
                  className={[
                    'inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors',
                    done
                      ? 'bg-moss-deep text-white'
                      : 'border border-moss/40 bg-surface text-moss-deep hover:bg-white',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex h-4.5 w-4.5 items-center justify-center rounded-[4px] border',
                      done ? 'border-white/60 bg-white/20' : 'border-moss/50',
                    ].join(' ')}
                  >
                    {done && <Icon name="check" className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  {done ? 'Completed — well done' : 'Mark as complete'}
                </button>
                <button
                  type="button"
                  onClick={() => go('quest')}
                  className="text-[0.8125rem] font-semibold text-moss-deep underline decoration-moss/30 underline-offset-4 hover:decoration-moss"
                >
                  See all quests
                </button>
              </div>

              <p className="mt-4 min-h-[1.25rem] text-[0.8125rem] font-semibold text-moss-deep">
                {justDone ? `+${quest.points} Eco-Points added.` : ''}
              </p>
            </div>

            <div className="relative flex items-center justify-center border-t border-moss/15 bg-surface/50 p-6 md:border-t-0 md:border-l">
              <StickmanArt name={quest.art} className="h-36 w-full max-w-[220px] text-moss-deep md:h-44" />
            </div>
          </div>

          <div className="border-t border-moss/15 bg-surface/40 px-6 py-4 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[0.8125rem]">
              <span className="text-ink-soft">
                Your total: <strong className="tabular-nums">{points}</strong> Eco-Points
              </span>
              <div className="flex items-center gap-3">
                <span className="text-slate">Next milestone</span>
                <div className="w-32">
                  <Progress value={points} max={120} />
                </div>
                <span className="font-semibold text-moss-deep">120</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- ENTRY CARDS --------------------------- */}
      <section className="shell pb-14">
        <div className="mb-6 flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="text-xl">Where would you like to start?</h2>
          <span className="hidden text-[0.8125rem] text-slate sm:block">
            Learn → Discover → Do
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { view: 'learn', art: 'learn', title: 'Learn', text: 'Bite-sized explainers on climate, biodiversity, pollution and circularity.', meta: `${learnTopics.length} explainers · quiz` },
            { view: 'discover', art: 'recycle', title: 'Discover', text: 'Practical action guides for home, school and community, plus a real directory.', meta: `${organizations.length} organizations` },
            { view: 'explore', art: 'walk', title: 'Explore', text: 'Curated external tools, carbon calculators and data portals worth your time.', meta: `${resources.length} resources` },
          ].map((c) => (
            <button
              key={c.view}
              type="button"
              onClick={() => go(c.view)}
              className="group flex flex-col rounded-[14px] border border-line bg-surface p-5 text-left transition-colors hover:border-moss/40"
            >
              <StickmanArt name={c.art} className="h-24 w-full text-moss/80 transition-colors group-hover:text-moss" />
              <h3 className="mt-3 text-base">{c.title}</h3>
              <p className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-slate">{c.text}</p>
              <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-3">
                <span className="text-[0.6875rem] font-semibold tracking-wide text-slate uppercase">{c.meta}</span>
                <Icon name="arrow" className="h-4 w-4 text-moss transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* -------------------------- DID YOU KNOW --------------------------- */}
      <section className="shell pb-14">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[14px] border border-line bg-ink p-6 text-paper md:p-7">
            <p className="eyebrow text-paper/50">Did you know?</p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed">{fact.text}</p>
            <p className="mt-4 text-[0.75rem] font-semibold tracking-wide text-paper/45 uppercase">
              {fact.source}
            </p>
            <button
              type="button"
              onClick={() => go('learn')}
              className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-bold text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
            >
              More facts in Learn
              <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>
          </div>

          <div className="rounded-[14px] border border-line bg-surface p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Quick knowledge check</p>
                <h3 className="mt-2 text-xl">Seven questions, {QUIZ_BONUS} Eco-Points</h3>
              </div>
              <StickmanArt name="quiz" className="hidden h-16 w-24 shrink-0 text-moss/70 sm:block" />
            </div>
            <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-slate">
              Score 60% or more to earn the bonus. Answers are explained after each question,
              so guessing teaches you nothing — reading does.
            </p>
            <button
              type="button"
              onClick={() => go('learn')}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-moss hover:text-moss-deep"
            >
              Take the quiz
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </section>

      {/* ----------------------- DISCOVER PREVIEW -------------------------- */}
      <section className="shell pb-14">
        <div className="mb-4 flex items-end justify-between border-b border-line pb-4">
          <div>
            <p className="eyebrow mb-1.5">Discover</p>
            <h2 className="text-xl">Organizations doing the work</h2>
          </div>
          <button
            type="button"
            onClick={() => go('discover')}
            className="text-[0.8125rem] font-semibold text-moss-deep underline decoration-moss/30 underline-offset-4 hover:decoration-moss"
          >
            Full directory
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.slice(0, 3).map((o) => (
            <div key={o.id} className="rounded-[14px] border border-line bg-surface p-5">
              <Chip tone={o.region === 'Nigeria' ? 'moss' : 'quiet'}>{o.region}</Chip>
              <h3 className="mt-3 text-[0.9375rem] leading-snug">{o.name}</h3>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-slate">{o.scope}</p>
              <div className="mt-4">
                <ExternalLink href={o.url}>Visit site</ExternalLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------- RESOURCES ------------------------------ */}
      <section className="shell pb-16">
        <div className="rounded-[14px] border border-line bg-paper-2/60 p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow mb-1.5">Explore</p>
              <h2 className="text-xl">Useful tools, not busywork</h2>
            </div>
            <button
              type="button"
              onClick={() => go('explore')}
              className="text-[0.8125rem] font-semibold text-moss-deep underline decoration-moss/30 underline-offset-4 hover:decoration-moss"
            >
              All resources
            </button>
          </div>
          <ul className="divide-y divide-line-soft">
            {resources.slice(0, 3).map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="text-[0.9375rem] font-semibold">{r.name}</p>
                  <p className="mt-0.5 text-[0.8125rem] text-slate">{r.why}</p>
                </div>
                <ExternalLink href={r.url}>Open</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
