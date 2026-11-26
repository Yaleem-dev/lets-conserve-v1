import { useMemo, useState } from 'react'
import { useT, useC } from '../i18n.jsx'
import { Icon, BadgeArt, TopArt } from '../components/StickmanArt.jsx'
import { Btn, Chapter, Chip, Pill, Meter } from '../components/ui.jsx'
import { quests, questCategories, badges } from '../data/content.js'

export default function Quest({ points, isDone, toggleQuest, week, reset, go }) {
  const t = useT()
  const c = useC()
  const [cat, setCat] = useState('All')
  const [flash, setFlash] = useState(null)

  const featured = quests[week.index % quests.length]
  const list = useMemo(() => (cat === 'All' ? quests : quests.filter((q) => q.category === cat)), [cat])
  const doneCount = quests.filter((q) => isDone(q.id)).length
  const max = quests.reduce((s, q) => s + q.points, 0) + 25
  const nextBadge = badges.find((b) => points < b.at)

  const onToggle = (q) => {
    toggleQuest(q.id)
    if (!isDone(q.id)) {
      setFlash(q.id)
      window.setTimeout(() => setFlash(null), 1600)
    }
  }

  return (
    <div className="fade-up">
      <section className="shell pt-4 md:pt-6">
        <div className="overflow-hidden rounded-[22px] border-[1.5px] border-line">
          <TopArt variant="quest" />
        </div>
      </section>

      <section className="shell pt-7 md:pt-10">
        <Chapter>{t('quest.chapter')}</Chapter>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="display max-w-xl text-[2.1rem] md:text-[2.7rem]">
            {t('quest.title')}
          </h1>
          <div className="flex items-end gap-3">
            <div className="text-right">
              <p className="text-3xl font-bold tabular-nums">{points}</p>
              <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-slate">{t('quest.points')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-5">
        <div className="card p-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[0.75rem] font-bold uppercase tracking-wider text-slate">{t('quest.record')}</p>
              <p className="mt-0.5 text-[1.5rem] font-bold tabular-nums">
                {points} <span className="text-sm font-medium text-slate">/ {max}</span>
              </p>
            </div>
            <p className="text-[0.8125rem] text-slate">{t('quest.doneOf', { a: doneCount, b: quests.length })}</p>
          </div>
          <div className="mt-2.5">
            <Meter value={points} max={max} />
          </div>
          <p className="mt-1.5 text-[0.8125rem] text-slate">
            {nextBadge ? `${nextBadge.at - points} to ${nextBadge.label}` : 'All badges unlocked'}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 border-t border-line-soft pt-3">
            {badges.map((b) => {
              const has = points >= b.at
              return (
                <span
                  key={b.id}
                  className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-2.5 py-1 text-[0.75rem] font-bold ${
                    has ? 'border-leaf-edge bg-leaf text-green-deep' : 'border-line text-slate'
                  }`}
                >
                  <BadgeArt id={b.id} className="h-3.5 w-3.5" />
                  {t(`badge.${b.id}`)}
                </span>
              )
            })}
          </div>
        </div>
      </section>


      <section className="shell mt-3">
        <div className="card-chalk relative overflow-hidden p-5">
          <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2">
                <span className="chapter rounded-full border-[1.5px] border-leaf-edge bg-leaf px-2.5 py-1 text-green-deep">{t('home.thisWeek')}</span>
                <span className="text-[0.75rem] text-paper/50">{week.label}</span>
              </div>
              <h2 className="mt-2 text-[1.4rem] text-paper">{c(`q.${featured.id}.title`, featured.title)}</h2>
              <p className="mt-0.5 max-w-sm text-[0.9375rem] text-paper/70">{c(`q.${featured.id}.text`, featured.text)}</p>
              <Btn variant="leaf" className="mt-3.5" onClick={() => onToggle(featured)} aria-pressed={isDone(featured.id)}>
                <Icon name={isDone(featured.id) ? 'check' : 'arrow'} className="h-4 w-4" strokeWidth={2.6} />
                {isDone(featured.id) ? t('home.done') : t('home.markComplete')}
              </Btn>
            </div>
            <img
              src={featured.img}
              alt={featured.title}
              loading="lazy"
              decoding="async"
              width="760"
              height="507"
              className="h-24 w-full rounded-[14px] object-cover"
            />
          </div>
        </div>
      </section>

      <section id="all-quests" className="shell mt-6 pb-9">
        <div className="mb-3 flex items-end justify-between border-b-[1.5px] border-line pb-3">
          <div>
            <Chapter>{t('quest.all')}</Chapter>
            <h2 className="mt-1 text-xl">{t('quest.pickFits')}</h2>
          </div>
          <button
            type="button"
            onClick={() => window.confirm('Reset points and quests on this device?') && reset()}
            className="text-[0.75rem] font-semibold text-slate underline underline-offset-4 hover:text-rose"
          >
            {t('quest.reset')}
          </button>
        </div>

        <div className="mb-3.5 flex flex-wrap gap-2">
          {questCategories.map((k) => (
            <Pill key={k} active={cat === k} onClick={() => setCat(k)}>
              {c(`cat.${k}`, k)}
            </Pill>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((q, n) => {
            const done = isDone(q.id)
            return (
              <article
                key={q.id}
                className={`rounded-[18px] border-[1.5px] p-3.5 ${
                  done ? 'border-leaf-2 bg-leaf-3' : `border-line ${['bg-butter','bg-mint-tint','bg-sky-tint','bg-blush','bg-lilac','bg-tan','bg-gold-tint','bg-panel'][n % 8]}`
                }`}
              >
                <img
                  src={q.img}
                  alt={q.title}
                  loading="lazy"
                  decoding="async"
                  width="760"
                  height="507"
                  className="h-24 w-full rounded-[12px] object-cover"
                />
                <h3 className="mt-1.5 text-[0.9375rem] leading-snug">{c(`q.${q.id}.title`, q.title)}</h3>
                <p className="text-[0.75rem] leading-snug text-slate">{c(`q.${q.id}.text`, q.text)}</p>

                <div className="mt-2 flex items-center justify-between border-t border-line/70 pt-2">
                  <button
                    type="button"
                    onClick={() => onToggle(q)}
                    aria-pressed={done}
                    aria-label={`${done ? 'Undo' : 'Complete'} ${q.title}`}
                    className={`flex h-6 w-6 items-center justify-center rounded-md border-[1.5px] transition-colors ${
                      done ? 'border-green-deep bg-green-deep text-paper' : 'border-ink/25 bg-panel text-transparent hover:border-leaf-2 hover:bg-leaf'
                    }`}
                  >
                    <Icon name="check" className="h-3 w-3" strokeWidth={3.4} />
                  </button>
                  <span className={`text-[0.75rem] font-bold tabular-nums ${flash === q.id ? 'text-green' : 'text-gold-deep'}`}>
                    +{q.points}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="shell pb-10">
        <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="max-w-sm text-[0.9375rem] text-ink-soft">{t('quest.addUp')}</p>
          <Btn variant="leaf" onClick={() => go('explore')}>
            {t('quest.exploreRes')}
            <Icon name="arrow" className="h-4 w-4" />
          </Btn>
        </div>
      </section>
    </div>
  )
}
