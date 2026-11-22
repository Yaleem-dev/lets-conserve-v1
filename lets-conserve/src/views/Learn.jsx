import { useMemo, useState } from 'react'
import { Scene, Doodle, Icon } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Meter } from '../components/ui.jsx'
import { learnTopics, learnCategories, facts, quizQuestions } from '../data/content.js'
import { QUIZ_BONUS } from '../hooks/useProgress.js'

function Card({ topic }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="card overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center gap-3 p-4 text-left">
        <Scene name={topic.art} className="h-14 w-24 shrink-0" size="h-9 w-9" />
        <div className="min-w-0 flex-1">
          <Chip tone="soft">{topic.category}</Chip>
          <h3 className="mt-1 text-[1rem] leading-tight">{topic.title}</h3>
          {!open && <p className="truncate text-[0.8125rem] text-slate">{topic.lede}</p>}
        </div>
        <Icon name="chevron" className={`h-4 w-4 shrink-0 text-slate transition-transform ${open ? 'rotate-90' : ''}`} strokeWidth={2.4} />
      </button>

      {open && (
        <div className="border-t border-line-soft px-4 pb-4 pt-3">
          <p className="text-[0.9375rem] font-semibold text-ink-soft">{topic.lede}</p>
          <ul className="mt-2 space-y-1.5">
            {topic.points.map((p) => (
              <li key={p} className="flex gap-2 text-[0.875rem] text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 rounded-lg bg-leaf-3 px-3 py-2 text-[0.8125rem] text-green-deep">{topic.fact}</p>
        </div>
      )}
    </article>
  )
}

function Quiz({ recordQuiz, best }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const q = quizQuestions[i]

  const pick = (n) => {
    if (picked !== null) return
    setPicked(n)
    if (n === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (i + 1 >= quizQuestions.length) {
      recordQuiz(score, quizQuestions.length)
      setDone(true)
    } else {
      setI(i + 1)
      setPicked(null)
    }
  }

  if (done) {
    const win = score / quizQuestions.length >= 0.6
    return (
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <Scene name={win ? 'celebrate' : 'learn'} className="h-16 w-24 shrink-0" size="h-12 w-12" />
          <div>
            <Chapter>Result</Chapter>
            <p className="mt-1 text-2xl font-bold tabular-nums">
              {score} / {quizQuestions.length}
            </p>
            <p className="mt-0.5 text-[0.875rem] text-slate">
              {win ? `Bonus earned. ${QUIZ_BONUS} points.` : 'Read the cards, then retry.'}
            </p>
            <Btn variant="leaf" className="mt-2.5 !py-2" onClick={() => { setI(0); setPicked(null); setScore(0); setDone(false) }}>
              Try again
            </Btn>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <Chapter>{`Question ${i + 1} of ${quizQuestions.length}`}</Chapter>
        <span className="text-[0.75rem] tabular-nums text-slate">{score} right</span>
      </div>
      <div className="mt-2">
        <Meter value={i} max={quizQuestions.length} tone="bg-gold" />
      </div>
      <h3 className="mt-3 text-[1rem] leading-snug">{q.q}</h3>

      <div className="mt-2.5 space-y-2">
        {q.options.map((o, n) => {
          const isAns = n === q.answer
          const isPick = n === picked
          const shown = picked !== null
          let cls = 'border-line bg-card hover:border-leaf-2 hover:bg-leaf-3'
          if (shown && isAns) cls = 'border-leaf-2 bg-leaf text-green-deep'
          else if (shown && isPick) cls = 'border-rose/50 bg-[#fbe7ec]'
          return (
            <button
              key={o}
              type="button"
              onClick={() => pick(n)}
              disabled={shown}
              className={`flex w-full items-center gap-2.5 rounded-xl border-[1.5px] px-3 py-2.5 text-left text-[0.875rem] font-medium transition-colors ${cls}`}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current/30 text-[0.625rem] font-bold">
                {shown && isAns ? <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} /> : String.fromCharCode(65 + n)}
              </span>
              {o}
            </button>
          )
        })}
      </div>

      {picked !== null && <p className="mt-2.5 rounded-lg bg-leaf-3 px-3 py-2 text-[0.8125rem] text-green-deep">{q.why}</p>}

      <div className="mt-3 flex justify-end">
        <Btn variant="leaf" onClick={next} disabled={picked === null} className="!py-2 disabled:opacity-40">
          {i + 1 >= quizQuestions.length ? 'See result' : 'Next'}
          <Icon name="arrow" className="h-4 w-4" />
        </Btn>
      </div>
    </div>
  )
}

export default function Learn({ quiz, recordQuiz }) {
  const [cat, setCat] = useState('All')
  const list = useMemo(() => (cat === 'All' ? learnTopics : learnTopics.filter((t) => t.category === cat)), [cat])

  return (
    <div className="fade-up">
      <section className="shell pt-7 md:pt-10">
        <Chapter>Chapter 01</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="display max-w-xl text-[2.1rem] md:text-[2.7rem]">
            Understand an <span className="doodle-underline">issue</span>
          </h1>
          <Scene name="learn" className="h-16" size="h-10 w-10" />
        </div>
      </section>

      <section className="shell mt-5 pb-7">
        <div className="mb-3 border-b-[1.5px] border-line pb-3">
          <Chapter>Explainers</Chapter>
          <h2 className="mt-1 text-xl">Pick one</h2>
        </div>
        <div className="mb-3.5 flex flex-wrap gap-2">
          {learnCategories.map((c) => (
            <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Pill>
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {list.map((t) => (
            <Card key={t.id} topic={t} />
          ))}
        </div>
      </section>

      <section className="shell pb-7">
        <div className="mb-3 border-b-[1.5px] border-line pb-3">
          <Chapter>Did you know</Chapter>
          <h2 className="mt-1 text-xl">Four facts</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map((f, n) => (
            <div key={f.text} className={`rounded-[18px] border-[1.5px] border-line p-3.5 ${['bg-leaf-3', 'bg-[#e6f6d6]', 'bg-gold-tint', 'bg-card'][n]}`}>
              <Scene name={f.art} className="h-12" size="h-7 w-7" />
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-soft">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-7">
        <div className="mb-3 flex items-end justify-between border-b-[1.5px] border-line pb-3">
          <div>
            <Chapter>Knowledge check</Chapter>
            <h2 className="mt-1 text-xl">Five questions, {QUIZ_BONUS} points</h2>
          </div>
          <span className="text-[0.75rem] text-slate">Best {quiz.best}/{quizQuestions.length}</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
          <Quiz recordQuiz={recordQuiz} best={quiz.best} />
          <aside className="card-chalk relative overflow-hidden p-5">
            <Doodle name="bulb" className="absolute right-4 top-4 h-6 w-6 opacity-70" />
            <Chapter tone="dark">Why bother</Chapter>
            <p className="mt-2 text-[0.9375rem] text-paper/80">Guessing teaches nothing.</p>
            <Scene name="explore" className="mt-3 h-16" size="h-10 w-10" />
          </aside>
        </div>
      </section>

      <section className="shell pb-10">
        <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <Chapter>Next</Chapter>
            <h3 className="mt-1 text-lg">Find a way to act</h3>
          </div>
          <Scene name="community" className="h-14" size="h-9 w-9" />
        </div>
      </section>
    </div>
  )
}
