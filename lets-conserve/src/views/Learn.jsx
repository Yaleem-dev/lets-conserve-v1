import { useMemo, useState } from 'react'
import { Art, Doodle, Icon, TopArt } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Meter } from '../components/ui.jsx'
import { learnTopics, learnCategories, facts, quizQuestions, videos } from '../data/content.js'
import { useT, useC } from '../i18n.jsx'
import { QUIZ_BONUS } from '../hooks/useProgress.js'

const TINTS = ['bg-blush', 'bg-mint-tint', 'bg-sky-tint', 'bg-lilac', 'bg-tan', 'bg-butter', 'bg-panel']

function Card({ topic, tint = 'bg-panel' }) {
  const c = useC()
  const [open, setOpen] = useState(false)
  return (
    <article className={`overflow-hidden rounded-[18px] border-[1.5px] border-line ${tint}`}>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center gap-3 p-4 text-left">
        <Art name={topic.art} variant="doodle" className="h-12 w-20 shrink-0" />
        <div className="min-w-0 flex-1">
          <Chip tone="soft">{c(`cat.${topic.category}`, topic.category)}</Chip>
          <h3 className="mt-1 text-[1rem] leading-tight">{c(`t.${topic.id}.title`, topic.title)}</h3>
          {!open && <p className="truncate text-[0.8125rem] text-slate">{c(`t.${topic.id}.lede`, topic.lede)}</p>}
        </div>
        <Icon name="chevron" className={`h-4 w-4 shrink-0 text-slate transition-transform ${open ? 'rotate-90' : ''}`} strokeWidth={2.4} />
      </button>

      {open && (
        <div className="border-t border-line-soft px-4 pb-4 pt-3">
          <p className="text-[0.9375rem] font-semibold text-ink-soft">{c(`t.${topic.id}.lede`, topic.lede)}</p>
          <ul className="mt-2 space-y-1.5">
            {topic.points.map((p, i) => (
              <li key={p} className="flex gap-2 text-[0.875rem] text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                {c(`t.${topic.id}.p${i}`, p)}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 rounded-lg bg-leaf-3 px-3 py-2 text-[0.8125rem] text-green-deep">{c(`t.${topic.id}.fact`, topic.fact)}</p>
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
          <Art name={win ? 'celebrate' : 'learn'} variant="stick" className="h-20 w-28 shrink-0" />
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
          let cls = 'border-line bg-panel hover:border-leaf-edge hover:bg-leaf-3'
          if (shown && isAns) cls = 'border-leaf-edge bg-leaf text-green-deep'
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

export default function Learn({ quiz, recordQuiz, go }) {
  const t = useT()
  const c = useC()
  const [cat, setCat] = useState('All')
  const list = useMemo(() => (cat === 'All' ? learnTopics : learnTopics.filter((t) => t.category === cat)), [cat])
  const featured = videos[0]
  const others = videos.slice(1)

  return (
    <div className="fade-up">
      <section className="shell pt-4 md:pt-6">
        <div className="overflow-hidden rounded-[22px] border-[1.5px] border-line">
          <TopArt variant="learn" />
        </div>
      </section>

      <section className="shell mt-4">
        <Chapter>{t('learn.chapter')}</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="display max-w-xl text-[2.1rem] md:text-[2.7rem]">
            <span className="doodle-underline">{t('learn.title')}</span>
          </h1>
          <Art name="learn" variant="stick" className="h-20" />
        </div>
      </section>

      <section className="shell mt-5 pb-7">
        <div className="mb-3 border-b-[1.5px] border-line pb-3">
          <Chapter>{t('learn.explainers')}</Chapter>
          <h2 className="mt-1 text-xl">{t('learn.pickOne')}</h2>
        </div>
        <div className="mb-3.5 flex flex-wrap gap-2">
          {learnCategories.map((k) => (
            <Pill key={k} active={cat === k} onClick={() => setCat(k)}>
              {c(`cat.${k}`, k)}
            </Pill>
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {list.map((t, n) => (
            <Card key={t.id} topic={t} tint={TINTS[n % TINTS.length]} />
          ))}
        </div>
      </section>

      <section className="shell pb-7">
        <div className="mb-3 border-b-[1.5px] border-line pb-3">
          <Chapter>{t('learn.goDeeper')}</Chapter>
        </div>
        <a
          href="https://climatescience.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 rounded-[18px] border-[1.5px] border-line bg-lilac p-4 transition-colors hover:border-leaf-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <h3 className="text-[1rem]">ClimateScience</h3>
            <p className="mt-0.5 text-[0.8125rem] text-slate">Free courses, plus a global youth olympiad.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-bold text-green-deep">
            climatescience.org
            <Icon name="external" className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
        </a>
      </section>

      <section className="shell pb-7">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b-[1.5px] border-line pb-3">
          <div>
            <Chapter>{t('learn.watch')}</Chapter>
            <h2 className="mt-1 text-xl">{t('learn.shortLessons')}</h2>
          </div>
          <span className="text-[0.75rem] font-semibold text-slate">Khan Academy</span>
        </div>
        <div className="overflow-hidden rounded-[18px] border-[1.5px] border-line bg-chalk">
          <div className="relative aspect-video w-full overflow-hidden bg-chalk">
            <img
              src={`https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
              title={featured.title}
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
        <p className="mt-2 text-[0.8125rem] font-bold text-ink-soft">
          {featured.title}
          <span className="font-normal text-slate"> · {featured.topic} · {featured.length}</span>
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {others.map((v, n) => (
            <article
              key={v.id}
              className={`overflow-hidden rounded-[18px] border-[1.5px] border-line ${['bg-mint-tint', 'bg-tan', 'bg-blush'][n % 3]}`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-chalk">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <div className="p-3">
                <p className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-slate">
                  {v.topic} · {v.length}
                </p>
                <h3 className="mt-0.5 text-[0.9375rem] leading-snug">{v.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2.5 rounded-[18px] border-[1.5px] border-line bg-butter p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[0.875rem] leading-snug text-ink-soft">
            Every lesson here is free, ad free, and made by Khan Academy.
          </p>
          <a
            href="https://www.khanacademy.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-leaf-edge bg-leaf px-4 py-2 text-[0.875rem] font-bold text-ink transition-colors hover:bg-leaf-2"
          >
            khanacademy.org
            <Icon name="external" className="h-3.5 w-3.5" strokeWidth={2.4} />
          </a>
        </div>
      </section>

      <section className="shell pb-7">
        <div className="mb-3 border-b-[1.5px] border-line pb-3">
          <Chapter>{t('home.didYouKnow')}</Chapter>
          <h2 className="mt-1 text-xl">{t('home.fourThings')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map((f, n) => (
            <div key={f.text} className={`rounded-[18px] border-[1.5px] border-line p-3.5 ${['bg-blush', 'bg-mint-tint', 'bg-sky-tint', 'bg-lilac'][n % 4]}`}>
              <img
                src={f.img}
                alt={f.alt}
                loading="lazy"
                decoding="async"
                width="760"
                height="507"
                className="h-24 w-full rounded-[12px] object-cover"
              />
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-soft">{c(`f.${n}`, f.text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-7">
        <div className="mb-3 flex items-end justify-between border-b-[1.5px] border-line pb-3">
          <div>
            <Chapter>{t('learn.knowledgeCheck')}</Chapter>
            <h2 className="mt-1 text-xl">{t('learn.fiveQ', { n: QUIZ_BONUS })}</h2>
          </div>
          <span className="text-[0.75rem] text-slate">Best {quiz.best}/{quizQuestions.length}</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
          <Quiz recordQuiz={recordQuiz} best={quiz.best} />
          <aside className="card-chalk relative overflow-hidden p-5">
            <Doodle name="bulb" tone="dark" className="absolute right-4 top-4 h-6 w-6 opacity-80" />
            <Chapter tone="dark">{t('learn.whyBother')}</Chapter>
            <p className="mt-2 text-[0.9375rem] text-paper/80">{t('learn.guessing')}</p>
            <Art name="explore" variant="stick" tone="dark" className="mt-3 h-20" />
          </aside>
        </div>
      </section>

      <section className="shell pb-10">
        <button
          type="button"
          onClick={() => go('discover')}
          className="card flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left transition hover:border-leaf-edge hover:bg-leaf-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
        >
          <div>
            <Chapter>{t('learn.next')}</Chapter>
            <h3 className="mt-1 text-lg">{t('learn.findWay')}</h3>
          </div>
          <svg viewBox="0 0 56 34" className="h-10 w-16 shrink-0" fill="none" stroke="var(--color-warm-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="13" cy="17" r="8.5" />
              <path d="M13 12.5v9M8.5 17h9" />
              <path d="M27 17h15M37 12l5.5 5-5.5 5" />
              <path d="M47 8l3.5-3M50 16h4M47 25l3.5 3" opacity="0.65" />
            </svg>
        </button>
      </section>
    </div>
  )
}
