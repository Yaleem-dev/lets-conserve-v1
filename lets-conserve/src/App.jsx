import { useEffect, useMemo, useState } from 'react'
import { Icon, StickmanArt } from './components/StickmanArt.jsx'
import { PointsChip, Progress } from './components/ui.jsx'
import { useProgress, currentWeek } from './hooks/useProgress.js'
import { quests, questBadges } from './data/content.js'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const week = useMemo(() => currentWeek(), [])
  const progress = useProgress(quests)
  const { points, quiz, isDone, toggleQuest, recordQuiz, reset } = progress

  useEffect(() => {
    const onHash = () => setView(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (id) => {
    if (!VALID.has(id)) return
    setView(id)
    setMenuOpen(false)
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `#${id}`)
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  useEffect(() => {
    document.title =
      view === 'home'
        ? "Let's Conserve — Learn. Discover. Do."
        : `${TABS.find((t) => t.id === view).label} · Let's Conserve`
  }, [view])

  const featured = quests[week.index % quests.length]
  const maxPoints = quests.reduce((s, q) => s + q.points, 0) + 25
  const nextBadge = questBadges.find((b) => points < b.at)

  return (
    <div className="min-h-screen bg-paper">
      {/* --------------------------- SKIP LINK --------------------------- */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>

      {/* ----------------------------- HEADER ---------------------------- */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
        <div className="shell">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* wordmark */}
            <button
              type="button"
              onClick={() => go('home')}
              className="flex shrink-0 items-center gap-2.5 text-left"
              aria-label="Let's Conserve — home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-moss text-paper">
                <StickmanArt name="leaf" className="h-6 w-6 text-paper" />
              </span>
              <span className="leading-none">
                <span className="block text-[1.0625rem] font-bold tracking-[-0.02em]">Let’s Conserve</span>
                <span className="mt-1 hidden text-[0.625rem] font-medium tracking-[0.1em] text-slate uppercase sm:block">
                  Learn · Discover · Do
                </span>
              </span>
            </button>

            {/* desktop tabs */}
            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(t.id)}
                  aria-current={view === t.id ? 'page' : undefined}
                  className={[
                    'relative rounded-full px-3.5 py-2 text-[0.875rem] font-bold transition-colors',
                    view === t.id ? 'text-moss-deep' : 'text-ink-soft hover:text-ink',
                  ].join(' ')}
                >
                  {t.label}
                  {view === t.id && (
                    <span className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-moss" />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <PointsChip points={points} className="hidden sm:inline-flex" />
              <button
                type="button"
                onClick={() => go('quest')}
                className="hidden rounded-full bg-moss px-4 py-2 text-[0.8125rem] font-bold text-white hover:bg-moss-deep lg:inline-flex"
              >
                Weekly quest
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-label="Menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* thin points bar on mobile */}
        <div className="border-t border-line-soft px-5 py-2 sm:hidden">
          <div className="flex items-center justify-between gap-3 text-[0.75rem]">
            <span className="font-semibold text-slate">
              {points} Eco-Points{nextBadge ? ` · ${nextBadge.at - points} to ${nextBadge.label}` : ''}
            </span>
            <div className="w-24">
              <Progress value={points} max={maxPoints} />
            </div>
          </div>
        </div>

        {/* mobile menu */}
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-line bg-surface md:hidden">
            <div className="shell py-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(t.id)}
                  className={[
                    'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-[0.9375rem] font-bold',
                    view === t.id ? 'bg-moss-tint text-moss-deep' : 'text-ink-soft',
                  ].join(' ')}
                >
                  <Icon name={t.icon} className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* ------------------------------ MAIN ----------------------------- */}
      <main id="main">
        {view === 'home' && (
          <Home
            quest={featured}
            points={points}
            isDone={isDone}
            toggleQuest={toggleQuest}
            go={go}
            week={week}
          />
        )}
        {view === 'learn' && <Learn quiz={quiz} recordQuiz={recordQuiz} />}
        {view === 'discover' && <Discover go={go} />}
        {view === 'quest' && (
          <Quest
            points={points}
            isDone={isDone}
            toggleQuest={toggleQuest}
            week={week}
            reset={reset}
            go={go}
          />
        )}
        {view === 'explore' && <Explore go={go} />}
      </main>

      {/* ----------------------------- FOOTER ---------------------------- */}
      <footer className="border-t border-line bg-paper-2/50">
        <div className="shell py-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-moss text-paper">
                  <StickmanArt name="leaf" className="h-5 w-5 text-paper" />
                </span>
                <span className="text-[0.9375rem] font-bold">Let’s Conserve</span>
              </div>
              <p className="mt-3 max-w-sm text-[0.8125rem] leading-relaxed text-slate">
                A web platform for everyday eco-action. Learn something, discover something,
                do something — one small step at a time.
              </p>
              <p className="mt-3 text-[0.75rem] text-slate">
                Version 1 · Progress is stored only in this browser.
              </p>
            </div>

            <div>
              <p className="eyebrow mb-3">Sections</p>
              <ul className="space-y-1.5">
                {TABS.filter((t) => t.id !== 'home').map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => go(t.id)}
                      className="text-[0.8125rem] text-ink-soft hover:text-moss-deep"
                    >
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">The journey</p>
              <p className="text-[0.8125rem] leading-relaxed text-slate">
                Understand an issue → find a response → practise a habit → access
                credible tools. Points reward participation, not competition.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <p className="text-[0.75rem] text-slate">
              Educational content summarises publicly available science and UN assessments.
            </p>
            <p className="text-[0.75rem] text-slate">Built with React, Vite & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
