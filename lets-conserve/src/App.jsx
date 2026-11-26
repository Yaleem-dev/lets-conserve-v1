import { Component, useContext, useEffect, useMemo, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { LookDefs, Icon, Scene, Strip, Doodle, StickScene, EarthMark } from './components/StickmanArt.jsx'
import { Points, Meter, Btn } from './components/ui.jsx'
import { useProgress, currentWeek } from './hooks/useProgress.js'
import { quests, badges } from './data/content.js'
import Home from './views/Home.jsx'
import Learn from './views/Learn.jsx'
import Discover from './views/Discover.jsx'
import Quest from './views/Quest.jsx'
import Explore from './views/Explore.jsx'
import { LangCtx, LangSelect, LangDirSync, LANGS, makeT, makeC, useContentReady } from './i18n.jsx'


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
            <p className="chapter text-slate">{this.props.tr('error.kicker')}</p>
            <h2 className="mt-2 text-xl">{this.props.tr('error.title')}</h2>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">
              {this.props.tr('error.body')}
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

function AppInner() {
  const { t: tr, lang } = useContext(LangCtx)
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
    const label = tr(`nav.${view}`)
    document.title = view === 'home' ? `Let’s Conserve | ${tr('app.description')}` : `${label} | Let’s Conserve`
  }, [view, tr, lang])

  const featured = quests[week.index % quests.length]
  const max = quests.reduce((s, q) => s + q.points, 0) + 25
  const next = badges.find((b) => points < b.at)

  return (
    <div className="min-h-screen">
      <Analytics />
      <LangDirSync />
      <LookDefs />

      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-chalk focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper">
        {tr('skip.content')}
      </a>

      {/* --------------------------- HEADER --------------------------- */}
      <header className="sticky top-0 z-40 border-b-[1.5px] border-line bg-page">
        <div className="shell">
          <div className="flex h-16 items-center justify-between gap-2">
            <button type="button" onClick={() => go('home')} className="flex min-w-0 items-center gap-2 md:gap-2.5" aria-label={tr('home.letsHome')}>
              <EarthMark className="h-9 w-9 shrink-0" />
              <span className="text-left leading-none">
                <span className="block truncate text-[0.9375rem] font-bold tracking-tight text-brand-green sm:text-[1.0625rem]">Let’s Conserve</span>
              </span>
            </button>

            <nav aria-label={tr('nav.primary')} className="hidden items-center gap-0.5 md:flex">
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
                  {tr(`nav.${t.id}`)}
                </button>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5">
              <LangSelect />
              <Points points={points} className="hidden sm:inline-flex" />
              <button
                type="button"
                onClick={() => setMenu(!menu)}
                aria-expanded={menu}
                aria-label={tr('menu.label')}
                className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-line bg-card/70 text-ink md:hidden"
              >
                <Icon name={menu ? 'close' : 'menu'} className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>


        {menu && (
          <nav aria-label={tr('nav.mobile')} className="border-t-[1.5px] border-line bg-card md:hidden">
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
                  {tr(`nav.${t.id}`)}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        <Boundary key={view} tr={tr}>
        {view === 'home' && (
          <Home quest={featured} points={points} isDone={isDone} toggleQuest={toggleQuest} go={go} week={week} />
        )}
        {view === 'learn' && <Learn quiz={quiz} recordQuiz={recordQuiz} go={go} />}
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
                {tr('app.description')}.
              </p>
              <div className="mt-3 w-full max-w-[240px]">
                <Strip
                  tone="dark"
                  className="h-8 w-full"
                  names={['tree', 'bulb', 'bin', 'droplet']}
                />
              </div>
            </div>

            <div>
              <p className="chapter mb-2.5 text-leaf">{tr('footer.sections')}</p>
              <ul className="space-y-1.5">
                {TABS.filter((t) => t.id !== 'home').map((t) => (
                  <li key={t.id}>
                    <button type="button" onClick={() => go(t.id)} className="text-[0.8125rem] text-paper/85 hover:text-leaf">
                      {tr(`nav.${t.id}`)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="chapter mb-2.5 text-leaf">{tr('footer.startHere')}</p>
              <p className="text-[0.8125rem] leading-relaxed text-paper/80">
                {tr('footer.understand')}
              </p>
              <Btn variant="warm" className="mt-3 !px-4 !py-2 !text-[0.8125rem]" onClick={() => go('quest')}>
                {tr('home.weekQuest')}
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Btn>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-paper/12 pt-4">
            <a
              href="https://yaleem-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold text-paper/90 underline decoration-leaf/60 decoration-1 underline-offset-4 transition-colors hover:text-leaf hover:decoration-leaf"
            >
              {tr('footer.collab')}
              <Icon name="external" className="h-3 w-3" />
            </a>
            <a
              href="mailto:team-tariqlawal@proton.me"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-paper/25 px-3.5 py-1.5 text-[0.75rem] font-bold text-paper/90 transition-colors hover:border-leaf hover:bg-leaf hover:text-ink"
            >
              {tr('footer.support')}
              <Icon name="arrow" className="h-3 w-3" strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* The chosen language sits above the app so every view reads one table.
   It is remembered on this device only, never sent anywhere. */
function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('lc-lang')
      return LANGS.some((l) => l.id === saved) ? saved : 'en'
    } catch {
      return 'en'
    }
  })
  const setLang = (id) => {
    if (!LANGS.some((l) => l.id === id)) return
    setLangState(id)
    try {
      localStorage.setItem('lc-lang', id)
    } catch {
      /* private mode: keep the session value */
    }
  }
  const value = useMemo(() => ({ lang, setLang, t: makeT(lang), c: makeC(lang) }), [lang])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
