import { Component, useEffect, useMemo, useState } from 'react'
import { LookDefs, Icon, Scene, Strip, Doodle, StickScene, EarthMark } from './components/StickmanArt.jsx'
import { Points, Meter, Btn } from './components/ui.jsx'
import { useProgress, currentWeek } from './hooks/useProgress.js'
import { quests, badges, APP_DESCRIPTION } from './data/content.js'
import Home from './views/Home.jsx'
import Learn from './views/Learn.jsx'
import Discover from './views/Discover.jsx'
import Quest from './views/Quest.jsx'
import Explore from './views/Explore.jsx'


/* A single view failing should never blank the whole app: show a small
   recoverable panel instead of a white screen. */
class Boundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    if (typeof console !== 'undefined') console.error('view error:', error)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="shell py-10">
          <div className="card p-6">
            <p className="chapter text-slate">Something broke</p>
            <h2 className="mt-2 text-xl">This section did not load</h2>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">
              The rest of the app still works. Try another tab.
            </p>
            <button
              type="button"
              onClick={() => this.setState({ error: null })}
              className="mt-3 rounded-full border-[1.5px] border-leaf-edge bg-leaf px-5 py-2.5 text-sm font-bold text-green-deep"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

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
      <LookDefs />

      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-chalk focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper">
        Skip to content
      </a>

      {/* --------------------------- HEADER --------------------------- */}
      <header className="sticky top-0 z-40 border-b-[1.5px] border-line bg-page/95 backdrop-blur-md">
        <div className="shell">
          <div className="flex h-16 items-center justify-between gap-3">
            <button type="button" onClick={() => go('home')} className="flex shrink-0 items-center gap-2.5" aria-label="Let’s Conserve home">
              <EarthMark className="h-9 w-9 shrink-0" />
              <span className="text-left leading-none">
                <span className="block text-[1.0625rem] font-bold tracking-tight text-brand-green">Let’s Conserve</span>
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
                    view === t.id ? 'bg-leaf text-green-deep shadow-[inset_0_0_0_1.5px_var(--color-leaf-edge)]' : 'text-ink-soft hover:bg-leaf-3 hover:text-green-deep'
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
                className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-line bg-card/70 text-ink md:hidden"
              >
                <Icon name={menu ? 'close' : 'menu'} className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
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
                    view === t.id ? 'bg-leaf text-green-deep shadow-[inset_0_0_0_1.5px_var(--color-leaf-edge)]' : 'text-ink-soft'
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
        <Boundary key={view}>
        {view === 'home' && (
          <Home quest={featured} points={points} isDone={isDone} toggleQuest={toggleQuest} go={go} week={week} />
        )}
        {view === 'learn' && <Learn quiz={quiz} recordQuiz={recordQuiz} />}
        {view === 'discover' && <Discover go={go} />}
        {view === 'quest' && (
          <Quest points={points} isDone={isDone} toggleQuest={toggleQuest} week={week} reset={reset} go={go} />
        )}
        {view === 'explore' && <Explore go={go} />}
        </Boundary>
      </main>

      {/* --------------------------- FOOTER --------------------------- */}
      <footer className="mt-3 overflow-hidden border-t-[1.5px] border-line bg-chalk text-paper">
        <div className="shell py-8">
          <StickScene name="horizon" tone="dark" className="mb-7 h-20 w-full max-w-[520px]" />
          <div className="grid gap-7 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <EarthMark color="#9fd0f5" heartColor="#a8e56f" className="h-6 w-6 shrink-0" />
                <span className="text-[0.9375rem] font-bold text-leaf">Let’s Conserve</span>
              </div>
              <p className="mt-2 max-w-xs text-[0.8125rem] leading-relaxed text-paper/80">
                {APP_DESCRIPTION}.
              </p>
              <div className="mt-3 w-full max-w-[260px] overflow-hidden">
                <Strip
                  tone="dark"
                  className="h-9 w-full"
                  names={['tree', 'bulb', 'bin', 'droplet', 'bike']}
                />
              </div>
            </div>

            <div>
              <p className="chapter mb-2.5 text-leaf">Sections</p>
              <ul className="space-y-1.5">
                {TABS.filter((t) => t.id !== 'home').map((t) => (
                  <li key={t.id}>
                    <button type="button" onClick={() => go(t.id)} className="text-[0.8125rem] text-paper/85 hover:text-leaf">
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="chapter mb-2.5 text-leaf">Start here</p>
              <p className="text-[0.8125rem] leading-relaxed text-paper/80">
                Understand, act, repeat.
              </p>
              <Btn variant="warm" className="mt-3 !px-4 !py-2 !text-[0.8125rem]" onClick={() => go('quest')}>
                This week’s quest
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Btn>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-paper/12 pt-4">
            <p className="text-[0.6875rem] text-paper/70">Version 1. Progress stays in this browser.</p>
            <a
              href="https://yaleem-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold text-paper/90 underline decoration-leaf/60 decoration-1 underline-offset-4 transition-colors hover:text-leaf hover:decoration-leaf"
            >
              In collaboration with Yaleem-dev
              <Icon name="external" className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
