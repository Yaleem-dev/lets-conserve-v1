import { useEffect, useMemo, useState } from 'react'
import { ChalkDefs, Icon, StickmanArt, Doodle } from './components/StickmanArt.jsx'
import { Points, Meter, Btn } from './components/ui.jsx'
import { useProgress, currentWeek } from './hooks/useProgress.js'
import { quests, badges, APP_DESCRIPTION } from './data/content.js'
import Home from './views/Home.jsx'
import Learn from './views/Learn.jsx'
import Discover from './views/Discover.jsx'
import Quest from './views/Quest.jsx'
import Explore from './views/Explore.jsx'

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'learn', label: 'Learn', icon: 'learn' },
  { id: 'discover', label: 'Discover', icon: 'discover' },
  { id: 'quest', label: 'Quest', icon: 'quest' },
  { id: 'explore', label: 'Explore', icon: 'explore' },
]

const VALID = new Set(TABS.map((t) => t.id))

function readHash() {
  const h = window.location.hash.replace('#', '').trim()
  return VALID.has(h) ? h : 'home'
}

export default function App() {
  const [view, setView] = useState(readHash)
  const [menu, setMenu] = useState(false)
  const week = useMemo(() => currentWeek(), [])
  const { points, quiz, isDone, toggleQuest, recordQuiz, reset } = useProgress(quests)

  useEffect(() => {
    const onHash = () => setView(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (id) => {
    if (!VALID.has(id)) return
    setView(id)
    setMenu(false)
    if (window.location.hash !== `#${id}`) window.history.replaceState(null, '', `#${id}`)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    const label = TABS.find((t) => t.id === view).label
    document.title = view === 'home' ? `Let’s Conserve | ${APP_DESCRIPTION}` : `${label} | Let’s Conserve`
  }, [view])

  const featured = quests[week.index % quests.length]
  const max = quests.reduce((s, q) => s + q.points, 0) + 25
  const next = badges.find((b) => points < b.at)

  return (
    <div className="min-h-screen">
      <ChalkDefs />

      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-chalk focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper">
        Skip to content
      </a>

      {/* --------------------------- HEADER --------------------------- */}
      <header className="sticky top-0 z-40 border-b-[1.5px] border-line bg-paper/95 backdrop-blur-md">
        <div className="shell">
          <div className="flex h-16 items-center justify-between gap-3">
            <button type="button" onClick={() => go('home')} className="flex shrink-0 items-center gap-2.5" aria-label="Let’s Conserve home">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-chalk">
                <Doodle name="sprout" className="h-5 w-5 text-mint" />
              </span>
              <span className="text-left leading-none">
                <span className="block text-[1.0625rem] font-bold tracking-tight">Let’s Conserve</span>
                <span className="mt-1 hidden text-[0.625rem] font-semibold tracking-[0.09em] text-slate uppercase sm:block">
                  {APP_DESCRIPTION}
                </span>
              </span>
            </button>

            <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(t.id)}
                  aria-current={view === t.id ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.875rem] font-bold transition-colors ${
                    view === t.id ? 'bg-leaf text-green-deep' : 'text-ink-soft hover:text-green-deep'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Points points={points} className="hidden sm:inline-flex" />
              <button
                type="button"
                onClick={() => setMenu(!menu)}
                aria-expanded={menu}
                aria-label="Menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-line text-ink md:hidden"
              >
                <Icon name={menu ? 'close' : 'menu'} className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

        {/* mobile points strip */}
        <div className="border-t border-line-soft px-5 py-1.5 sm:hidden">
          <div className="flex items-center gap-2.5">
            <span className="text-[0.6875rem] font-bold tabular-nums text-ink-soft">{points} pts</span>
            <Meter value={points} max={max} />
            <span className="text-[0.6875rem] text-slate">{next ? next.at : 'max'}</span>
          </div>
        </div>

        {menu && (
          <nav aria-label="Mobile" className="border-t-[1.5px] border-line bg-card md:hidden">
            <div className="shell py-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(t.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-[0.9375rem] font-bold ${
                    view === t.id ? 'bg-leaf text-green-deep' : 'text-ink-soft'
                  }`}
                >
                  <Icon name={t.icon} className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        {view === 'home' && (
          <Home quest={featured} points={points} isDone={isDone} toggleQuest={toggleQuest} go={go} week={week} />
        )}
        {view === 'learn' && <Learn quiz={quiz} recordQuiz={recordQuiz} />}
        {view === 'discover' && <Discover go={go} />}
        {view === 'quest' && (
          <Quest points={points} isDone={isDone} toggleQuest={toggleQuest} week={week} reset={reset} go={go} />
        )}
        {view === 'explore' && <Explore go={go} />}
      </main>

      {/* --------------------------- FOOTER --------------------------- */}
      <footer className="mt-4 border-t-[1.5px] border-line bg-chalk text-paper">
        <div className="shell py-9">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper/10">
                  <Doodle name="sprout" className="h-4.5 w-4.5 text-mint" />
                </span>
                <span className="text-[0.9375rem] font-bold">Let’s Conserve</span>
              </div>
              <p className="mt-2.5 max-w-xs text-[0.8125rem] leading-relaxed text-paper/55">
                {APP_DESCRIPTION}. Learn something. Discover something. Do something.
              </p>
              <div className="mt-3">
                <StickmanArt name="horizon" tone="dark" className="h-16 w-56 opacity-80" />
              </div>
            </div>

            <div>
              <p className="chapter mb-2.5 text-mint">Sections</p>
              <ul className="space-y-1.5">
                {TABS.filter((t) => t.id !== 'home').map((t) => (
                  <li key={t.id}>
                    <button type="button" onClick={() => go(t.id)} className="text-[0.8125rem] text-paper/70 hover:text-gold">
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="chapter mb-2.5 text-mint">Where to start</p>
              <p className="text-[0.8125rem] leading-relaxed text-paper/55">
                Understand an issue, find a way to act, practise a habit, then reach for a real tool.
              </p>
              <Btn variant="ghostLight" className="mt-3 !px-3.5 !py-1.5 !text-[0.75rem]" onClick={() => go('quest')}>
                This week’s quest
              </Btn>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-paper/12 pt-4">
            <p className="text-[0.6875rem] text-paper/40">Version 1. Progress stays in this browser.</p>
            <p className="text-[0.6875rem] text-paper/40">React, Vite, Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
