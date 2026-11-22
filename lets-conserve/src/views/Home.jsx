import { useMemo, useState } from 'react'
import { Art, Strip, Doodle, Icon } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Meter } from '../components/ui.jsx'
import { organizations, resources } from '../data/content.js'

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

  const cards = [
    { view: 'learn', scene: 'learn', title: 'Learn', line: 'Short explanations.', tone: 'bg-leaf-3' },
    { view: 'discover', scene: 'community', title: 'Discover', line: 'Ways to act.', tone: 'bg-gold-tint' },
    { view: 'explore', scene: 'explore', title: 'Explore', line: 'Tools worth opening.', tone: 'bg-[#e6f6d6]' },
  ]

  const featured = useMemo(
    () => [
      { name: 'Sierra Club', region: 'US', art: 'nature' },
      { name: 'Wildlife Trusts', region: 'UK', art: 'garden' },
      { name: 'WESSA', region: 'ZA', art: 'learn' },
      { name: 'NCF', region: 'NG', art: 'forest' },
    ],
    [],
  )

  return (
    <div className="fade-up">
      {/* ---------------------------- HERO ---------------------------- */}
      <section className="shell pt-5 md:pt-8">
        <div className="card-chalk relative overflow-hidden px-6 py-8 md:px-10 md:py-11">
          <Doodle name="sun" className="drift absolute right-6 top-5 h-9 w-9 opacity-80" />
          <Doodle name="wind" className="absolute left-1/2 top-8 h-5 w-8 opacity-30" />
          <Doodle name="leaf" className="absolute bottom-6 left-6 h-6 w-6 opacity-25" />

          <div className="relative grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
            <div>
              <Chapter tone="dark">Your personal guide for eco-action</Chapter>
              <h1 className="display mt-3 text-[2.5rem] text-paper sm:text-[3.1rem] md:text-[3.5rem]">
                Learn something.
                <br />
                <span className="text-gold">Discover</span> something.
                <br />
                Do something.
              </h1>
              <p className="mt-3 max-w-xs text-[0.9375rem] text-paper/70">Small steps. Real places.</p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Btn variant="leaf" onClick={() => go('quest')}>
                  This week&rsquo;s quest
                  <Icon name="arrow" className="h-4 w-4" />
                </Btn>
                <Btn variant="leaf" onClick={() => go('learn')}>
                  Start learning
                </Btn>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Strip
                className="h-14 w-full"
                names={['tree', 'bulb', 'bin', 'droplet', 'bike', 'flower', 'sun']}
              />
              <Strip className="h-12 w-full opacity-80" names={['globe', 'cloudless', 'apple', 'leaf', 'globeArrows'].filter(n => n !== 'cloudless')} />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------- WEEKLY QUEST ---------------------- */}
      <section className="shell mt-4">
        <div className="card relative overflow-hidden p-5">
          <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="gold">This week</Chip>
                <span className="text-[0.75rem] font-semibold text-slate">{week.label}</span>
              </div>
              <h2 className="mt-2 text-[1.4rem] md:text-[1.6rem]">{quest.title}</h2>
              <p className="mt-0.5 text-[0.9375rem] text-ink-soft">{quest.text}</p>
              <div className="mt-3.5 flex flex-wrap items-center gap-3">
                <Btn variant="leaf" onClick={handle} aria-pressed={done}>
                  <Icon name={done ? 'check' : 'arrow'} className="h-4 w-4" strokeWidth={2.6} />
                  {done ? 'Done' : 'Mark complete'}
                </Btn>
                <span className="text-[0.8125rem] font-bold text-green-deep">+{quest.points} points</span>
              </div>
            </div>
            <Art name={quest.art} variant="stick" className="h-24" />
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-line-soft pt-3">
            <span className="text-[0.75rem] font-bold tabular-nums text-ink-soft">{points} pts</span>
            <Meter value={points} max={120} />
            <span className="text-[0.75rem] font-bold text-slate">120</span>
          </div>
        </div>
      </section>

      {/* -------------------------- ENTRY CARDS ---------------------- */}
      <section className="shell mt-4 pb-7">
        <div className="grid gap-3 sm:grid-cols-3">
          {cards.map((c) => (
            <button
              key={c.view}
              type="button"
              onClick={() => go(c.view)}
              className={`group relative overflow-hidden rounded-[18px] border-[1.5px] border-line p-4 text-left transition-transform hover:-translate-y-0.5 ${c.tone}`}
            >
              <Art name={c.scene} variant="stick" className="h-20" />
              <div className="mt-2 flex items-center justify-between">
                <h3 className="text-[1.0625rem]">{c.title}</h3>
                <Icon name="arrow" className="h-4 w-4 text-green-deep transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
              </div>
              <p className="text-[0.8125rem] text-ink-soft">{c.line}</p>
            </button>
          ))}
        </div>
      </section>

      {/* --------------------------- DIRECTORY TEASE ----------------- */}
      <section className="shell pb-8">
        <div className="mb-3.5 flex items-end justify-between border-b-[1.5px] border-line pb-3">
          <div>
            <Chapter>Discover</Chapter>
            <h2 className="mt-1 text-xl">Organizations near you</h2>
          </div>
          <button type="button" onClick={() => go('discover')} className="text-[0.8125rem] font-bold text-green-deep underline decoration-leaf-2 decoration-2 underline-offset-4">
            Full directory
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {featured.map((x, i) => (
            <div key={x.name} className={`rounded-[18px] border-[1.5px] border-line p-3.5 ${['bg-leaf-3', 'bg-gold-tint', 'bg-[#e6f6d6]', 'bg-card'][i]}`}>
              <Art name={x.art} variant="doodle" className="h-12" />
              <p className="mt-1.5 truncate text-[0.8125rem] font-bold">{x.name}</p>
              <p className="text-[0.6875rem] font-semibold text-slate">{x.region}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- FACTS ------------------------- */}
      <section className="shell pb-12">
        <div className="card-chalk relative overflow-hidden p-5 md:p-7">
          <Doodle name="sprig" className="absolute right-5 top-5 h-7 w-7 opacity-40" />
          <div className="grid items-center gap-5 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Chapter tone="dark">Did you know</Chapter>
              <p className="mt-2 text-[1.2rem] leading-snug text-paper md:text-[1.35rem]">
                Mangroves store more carbon than most land forests.
              </p>
              <button type="button" onClick={() => go('learn')} className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-bold text-leaf">
                More facts
                <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.4} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {resources.slice(0, 2).map((r) => (
                <div key={r.id} className="rounded-xl border border-paper/15 p-2.5">
                  <Art name={r.art} variant="doodle" className="h-11" />
                  <p className="mt-1 text-[0.75rem] font-bold text-paper">{r.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
