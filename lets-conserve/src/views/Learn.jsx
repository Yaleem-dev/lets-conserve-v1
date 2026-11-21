import { useMemo, useState } from 'react'
import { StickmanArt, Doodle, Icon } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Meter, Head } from '../components/ui.jsx'
import { learnTopics, learnCategories, facts, quizQuestions } from '../data/content.js'
import { QUIZ_BONUS } from '../hooks/useProgress.js'

function Card({ topic }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="card overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center gap-3 p-4 text-left">
        <div className="h-14 w-20 shrink-0">
          <StickmanArt name={topic.art} tone="light" className="h-14 w-20" />
        </div>
        <div className="min-w-0 flex-1">
          <Chip tone="mint">{topic.category}</Chip>
          <h3 className="mt-1 text-[1rem] leading-tight">{topic.title}</h3>
          {!open && <p className="mt-0.5 truncate text-[0.8125rem] text-slate">{topic.lede}</p>}
        </div>
        <Icon name="chevron" className={`h-4 w-4 shrink-0 text-slate transition-transform ${open ? 'rotate-90' : ''}`} strokeWidth={2.4} />
      </button>

      {open && (
        <div className="border-t border-line-soft px-4 pb-4 pt-3.5">
          <p className="text-[0.9375rem] font-semibold text-ink-soft">{topic.lede}</p>
          <ul className="mt-2.5 space-y-1.5">
            {topic.points.map((p) => (
              <li key={p} className="flex gap-2 text-[0.875rem] leading-relaxed text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-lg bg-gold-tint px-3 py-2 text-[0.8125rem] text-gold-deep">{topic.fact}</p>
        </div>
      )}
    </article>
  )
}

function Quiz({ recordQuiz, best, passed }) {
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
      <div className="card p-5 md:p-6">
        <div className="flex items-center gap-4">
          <StickmanArt name={win ? 'celebrate' : 'learning'} tone="light" className="h-20 w-28 shrink-0" />
          <div>
            <Chapter>Result</Chapter>
            <p className="mt-1 text-2xl font-bold tabular-nums">
              {score} / {quizQuestions.length}
            </p>
            <p className="mt-1 text-[0.875rem] text-slate">
              {win ? `Bonus earned. ${QUIZ_BONUS} points, once per device.` : 'Read the cards above, then try again.'}
            </p>
            <Btn
              variant="leaf"
              className="mt-3"
              onClick={() => {
                setI(0)
                setPicked(null)
                setScore(0)
                setDone(false)
              }}
            >
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
      <h3 className="mt-3.5 text-[1rem] leading-snug">{q.q}</h3>

      <div className="mt-3 space-y-2">
        {q.options.map((o, n) => {
          const isAns = n === q.answer
          const isPick = n === picked
          const shown = picked !== null
          let cls = 'border-line bg-card hover:border-green'
          if (shown && isAns) cls = 'border-green bg-leaf'
          else if (shown && isPick) cls = 'border-rose/60 bg-[#fbe7ec]'
          return (
            <button
              key={o}
              type="button"
              onClick={() => pick(n)}
              disabled={shown}
              className={`flex w-full items-center gap-2.5 rounded-xl border-[1.5px] px-3 py-2.5 text-left text-[0.875rem] transition-colors ${cls}`}
            >
              <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-current/30 text-[0.625rem] font-bold">
                {shown && isAns ? <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} /> : String.fromCharCode(65 + n)}
              </span>
              {o}
            </button>
          )
        })}
      </div>

      {picked !== null && <p className="mt-3 rounded-lg bg-paper-2 px-3 py-2 text-[0.8125rem] text-ink-soft">{q.why}</p>}

      <div className="mt-3.5 flex justify-end">
        <Btn variant="leaf" onClick={next} disabled={picked === null} className="disabled:opacity-40">
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
      <section className="shell pt-8 md:pt-12">
        <Chapter>Chapter 01</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="display max-w-xl text-[2.2rem] md:text-[2.9rem]">
            Understand an <span className="doodle-underline">issue</span>
          </h1>
          <StickmanArt name="learning" tone="light" className="h-20 w-28" />
        </div>
      </section>

      <section className="shell mt-7 pb-8">
        <Head chapter="Explainers" title="Pick one" />
        <div className="mb-4 flex flex-wrap gap-2">
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

      <section className="shell pb-8">
        <Head chapter="Did you know" title="Four facts" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, n) => (
            <div key={f.text} className={`rounded-[18px] border-[1.5px] border-line p-4 ${['bg-leaf', 'bg-[#e3f0f8]', 'bg-gold-tint', 'bg-[#fbe7ec]'][n]}`}>
              <Doodle name="star" className="h-4 w-4 text-green-deep/60" />
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-soft">{f.text}</p>
              <p className="mt-2 text-[0.625rem] font-bold uppercase tracking-wider text-slate">{f.source}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-8">
        <Head
          chapter="Knowledge check"
          title={`Five questions, ${QUIZ_BONUS} points`}
          action={<span className="text-[0.75rem] text-slate">Best: {quiz.best}/{quizQuestions.length}</span>}
        />
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Quiz recordQuiz={recordQuiz} best={quiz.best} passed={quiz.passed} />
          <aside className="card-chalk relative overflow-hidden p-5">
            <Doodle name="star" className="absolute right-4 top-4 h-5 w-5 text-gold/60" />
            <Chapter>Why bother</Chapter>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-paper/80">
              Guessing teaches nothing. The explanations are the point.
            </p>
            <StickmanArt name="quiz" tone="dark" className="mt-3 h-20 w-full" />
          </aside>
        </div>
      </section>

      <section className="shell pb-12">
        <div className="card relative overflow-hidden p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Chapter>Next</Chapter>
              <h3 className="mt-1.5 text-lg">Now find a way to act</h3>
            </div>
            <StickmanArt name="walking" tone="light" className="h-20 w-28" />
          </div>
        </div>
      </section>
    </div>
  )
}
