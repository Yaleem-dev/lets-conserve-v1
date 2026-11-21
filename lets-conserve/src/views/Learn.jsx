import { useMemo, useState } from 'react'
import { StickmanArt, Icon } from '../components/StickmanArt.jsx'
import { SectionHead, Pill, Chip, Progress, Empty } from '../components/ui.jsx'
import { learnTopics, learnCategories, didYouKnow, natureSpotlights, quizQuestions } from '../data/content.js'
import { QUIZ_BONUS } from '../hooks/useProgress.js'

/* ------------------------------ explainers --------------------------- */

function Explainer({ topic, open, onToggle }) {
  return (
    <article className="card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <div className="hidden h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-paper-2/70 sm:flex">
          <StickmanArt name={topic.art} className="h-12 w-20 text-moss" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>{topic.category}</Chip>
            <span className="text-[0.75rem] text-slate">{topic.minutes} min read</span>
          </div>
          <h3 className="mt-2 text-[1.0625rem] leading-snug">{topic.title}</h3>
          {!open && (
            <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-slate">
              {topic.lede}
            </p>
          )}
        </div>
        <Icon
          name="chevron"
          className={`mt-1 h-4 w-4 shrink-0 text-slate transition-transform ${open ? 'rotate-90' : ''}`}
          strokeWidth={2.2}
        />
      </button>

      {open && (
        <div className="border-t border-line-soft px-5 pb-6 pt-5">
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{topic.lede}</p>
          <ul className="mt-4 space-y-2.5">
            {topic.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss/60" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-lg border border-gold/25 bg-gold-tint/60 px-4 py-3">
            <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-gold uppercase">Fact worth keeping</p>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{topic.fact}</p>
          </div>
        </div>
      )}
    </article>
  )
}

/* -------------------------------- quiz ------------------------------- */

function Quiz({ recordQuiz, best, passed }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = quizQuestions.length
  const q = quizQuestions[index]

  const choose = (i) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) setCorrect((c) => c + 1)
  }

  const next = () => {
    if (index + 1 >= total) {
      const finalCorrect = correct
      recordQuiz(finalCorrect, total)
      setFinished(true)
      return
    }
    setIndex(index + 1)
    setPicked(null)
  }

  const restart = () => {
    setIndex(0)
    setPicked(null)
    setCorrect(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((correct / total) * 100)
    const hitBonus = pct >= 60
    return (
      <div className="card p-6 md:p-8">
        <div className="flex items-start gap-5">
          <StickmanArt
            name={hitBonus ? 'celebrate' : 'learn'}
            className="hidden h-24 w-32 shrink-0 text-moss sm:block"
          />
          <div className="flex-1">
            <p className="eyebrow">Knowledge check complete</p>
            <h3 className="mt-2 text-2xl tabular-nums">
              {correct} of {total} correct
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">
              {hitBonus
                ? `That is ${pct}% — you have earned the ${QUIZ_BONUS}-point bonus. It is awarded once per device.`
                : `${pct}% — you need 60% for the bonus. Read the explainers above and try again; answers are explained as you go.`}
            </p>
            <div className="mt-4 max-w-sm">
              <Progress value={correct} max={total} />
            </div>
            <button
              type="button"
              onClick={restart}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2.5 text-sm font-bold text-white hover:bg-moss-deep"
            >
              Try again
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <p className="mt-3 text-[0.75rem] text-slate">
              Best score so far: {Math.max(best, correct)}/{total}
              {passed ? ' · bonus earned' : ''}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">
          Question {index + 1} of {total}
        </p>
        <span className="text-[0.75rem] tabular-nums text-slate">{correct} correct</span>
      </div>
      <div className="mt-3">
        <Progress value={index} max={total} />
      </div>

      <h3 className="mt-5 text-[1.0625rem] leading-snug">{q.question}</h3>

      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer
          const isPicked = i === picked
          const revealed = picked !== null

          let cls = 'border-line bg-surface text-ink hover:border-moss/50'
          if (revealed && isAnswer) cls = 'border-moss bg-moss-tint text-moss-deep'
          else if (revealed && isPicked) cls = 'border-clay/50 bg-clay-tint text-clay'

          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              disabled={revealed}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[0.9375rem] transition-colors ${cls}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current/30 text-[0.6875rem] font-bold">
                {revealed && isAnswer ? <Icon name="check" className="h-3 w-3" strokeWidth={3} /> : String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className="mt-4 rounded-lg border border-line-soft bg-paper-2/60 px-4 py-3">
          <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{q.explain}</p>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[0.75rem] text-slate">60% needed for the bonus</span>
        <button
          type="button"
          onClick={next}
          disabled={picked === null}
          className="inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:bg-moss-deep disabled:cursor-not-allowed disabled:opacity-35"
        >
          {index + 1 >= total ? 'See result' : 'Next question'}
          <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  )
}

/* -------------------------------- view ------------------------------- */

export default function Learn({ quiz, recordQuiz }) {
  const [category, setCategory] = useState('All')
  const [openId, setOpenId] = useState(learnTopics[0].id)

  const filtered = useMemo(
    () => (category === 'All' ? learnTopics : learnTopics.filter((t) => t.category === category)),
    [category],
  )

  const counts = useMemo(() => {
    const map = { All: learnTopics.length }
    learnTopics.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + 1
    })
    return map
  }, [])

  return (
    <div className="fade-up">
      <header className="shell pt-10 pb-8 md:pt-14">
        <p className="eyebrow">Learn · Understand an issue</p>
        <h1 className="mt-3 max-w-2xl text-[2.1rem] leading-[1.1] md:text-[2.7rem]">
          The natural world, without the jargon
        </h1>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Short, honest explanations of the three planetary crises — climate change,
          biodiversity loss and pollution — plus the ideas behind a circular economy.
          Every claim here is a summary of established science or UN assessment.
        </p>
      </header>

      <section className="shell pb-12">
        <SectionHead
          eyebrow="Environmental explainers"
          title="Start wherever you are"
          sub="Open a card to read it. Each one takes a few minutes and assumes nothing."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {learnCategories.map((c) => (
            <Pill key={c} active={category === c} onClick={() => setCategory(c)} count={counts[c] || 0}>
              {c}
            </Pill>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((t) => (
            <Explainer
              key={t.id}
              topic={t}
              open={openId === t.id}
              onToggle={() => setOpenId(openId === t.id ? null : t.id)}
            />
          ))}
        </div>
      </section>

      {/* --------------------------- did you know -------------------------- */}
      <section className="shell pb-12">
        <SectionHead
          eyebrow="Did you know?"
          title="Five facts that stick"
          sub="Short, surprising, and sourced — the kind of thing you repeat to someone else."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {didYouKnow.map((f) => (
            <div key={f.id} className="card p-5">
              <Icon name="spark" className="h-4 w-4 text-gold" strokeWidth={2} />
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{f.text}</p>
              <p className="mt-3 text-[0.6875rem] font-semibold tracking-wide text-slate uppercase">
                {f.source}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ quiz ------------------------------- */}
      <section className="shell pb-12">
        <SectionHead
          eyebrow="Knowledge check"
          title={`Seven questions · ${QUIZ_BONUS} Eco-Points`}
          sub="Answers are explained after each question. The bonus is awarded once per device."
        />
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <Quiz recordQuiz={recordQuiz} best={quiz.best} passed={quiz.passed} />
          <aside className="card h-fit p-6">
            <p className="eyebrow">Your record</p>
            <p className="mt-3 text-3xl font-bold tabular-nums">
              {quiz.best}
              <span className="text-base font-medium text-slate">/{quizQuestions.length}</span>
            </p>
            <p className="mt-1 text-[0.8125rem] text-slate">
              {quiz.attempts === 0 ? 'No attempts yet' : `${quiz.attempts} attempt${quiz.attempts > 1 ? 's' : ''}`}
            </p>
            <div className="mt-4 border-t border-line-soft pt-4">
              <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
                {quiz.passed
                  ? 'Bonus earned. Reading the explainers first is why it worked.'
                  : 'Read the explainers above before attempting — the questions are drawn from them.'}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* --------------------------- spotlights ---------------------------- */}
      <section className="shell pb-16">
        <SectionHead
          eyebrow="Nature spotlights"
          title="Close to home"
          sub="Species and ecosystems worth knowing, with a Nigerian focus."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {natureSpotlights.map((s) => (
            <div key={s.id} className="rounded-[14px] border border-line bg-paper-2/60 p-5">
              <p className="text-[0.6875rem] font-bold tracking-[0.1em] text-moss uppercase">{s.type}</p>
              <h3 className="mt-2 text-[0.9375rem]">{s.name}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <Empty>No explainers in this category yet.</Empty>}
      </section>
    </div>
  )
}
