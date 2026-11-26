import { useMemo, useState } from 'react'
import { Art, Doodle, Icon, HeroArt, TopArt } from '../components/StickmanArt.jsx'
import EcoCreaturesQuiz from '../components/EcoCreaturesQuiz.jsx'
import { facts } from '../data/content.js'
import { Btn, Chapter, Chip } from '../components/ui.jsx'
import { organizations, resources } from '../data/content.js'
import { useT, useC } from '../i18n.jsx'

export default function Home({ quest, points, isDone, toggleQuest, go, week }) {
  const t = useT()
  const c = useC()
  const [flash, setFlash] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    const email = 'team-tariqlawal@proton.me'
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      window.prompt('Copy this address', email)
    }
  }
  const done = isDone(quest.id)

  const handle = () => {
    toggleQuest(quest.id)
    if (!done) {
      setFlash(true)
      window.setTimeout(() => setFlash(false), 1800)
    }
  }

  const cards = [
    { view: 'learn', scene: 'learn', title: t('nav.learn'), line: t('home.cardLearn'), tone: 'bg-leaf-3' },
    { view: 'discover', scene: 'community', title: t('nav.discover'), line: t('home.cardAct'), tone: 'bg-sky-tint' },
    { view: 'explore', scene: 'explore', title: t('nav.explore'), line: t('home.cardRes'), tone: 'bg-blush' },
  ]

  const featured = useMemo(
    () => [
      { name: 'Sierra Club', region: 'United States', abbr: 'SC', block: 'bg-leaf-3', ink: 'text-green-deep' },
      { name: 'The Wildlife Trusts', region: 'United Kingdom', abbr: 'WT', block: 'bg-gold-tint', ink: 'text-gold-deep' },
      { name: 'Wildlife and Environment Society of South Africa (WESSA)', region: 'South Africa', abbr: 'WE', block: 'bg-sky-tint', ink: 'text-sky' },
      { name: 'Nigerian Conservation Foundation (NCF)', region: 'Nigeria', abbr: 'NC', block: 'bg-blush', ink: 'text-rose' },
    ],
    [],
  )

  return (
    <div className="fade-up">
      {/* ---------------------------- HERO ---------------------------- */}
      <section className="shell pt-4 md:pt-6">
        <div className="overflow-hidden rounded-[22px] border-[1.5px] border-line">
          <TopArt variant="home" />
        </div>
      </section>

      <section className="shell mt-3 md:mt-4">
        <div className="card-hero relative overflow-hidden px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-11">
          <div className="relative grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
            <div className="min-w-0">
              <Chapter>{t('home.welcome')}</Chapter>
              <h1
                className="display mt-3 text-ink"
                style={{ fontSize: 'clamp(1.65rem, 6.6vw, 3.1rem)' }}
              >
                {t('home.heroA')}
                <br />
                {t('home.heroB')} <span className="text-brand-green">{t('home.heroC')}</span>
              </h1>
              <p className="mt-3 flex flex-col gap-0.5 text-[0.9375rem] font-bold leading-snug">
                <span className="text-brand-blue">{t('home.line1')}</span>
                <span className="text-blush-ink">{t('home.line2')}</span>
                <span className="text-mint-ink">{t('home.line3')}</span>
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Btn variant="warm" onClick={() => go('quest')}>
                  {t('home.weekQuest')}
                  <Icon name="arrow" className="h-4 w-4" />
                </Btn>
                <Btn variant="leaf" onClick={() => go('learn')}>
                  {t('home.startLearning')}
                </Btn>
              </div>
            </div>

            <div className="w-full min-w-0">
              <HeroArt className="h-36 w-full sm:h-44" />
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
                <Chip tone="gold">{t('home.thisWeek')}</Chip>
                <span className="text-[0.75rem] font-semibold text-slate">{week.label}</span>
              </div>
              <h2 className="mt-2 text-[1.4rem] md:text-[1.6rem]">{c(`q.${quest.id}.title`, quest.title)}</h2>
              <p className="mt-0.5 text-[0.9375rem] text-ink-soft">{c(`q.${quest.id}.text`, quest.text)}</p>
              <div className="mt-3.5 flex flex-wrap items-center gap-3">
                <Btn variant="leaf" onClick={handle} aria-pressed={done}>
                  <Icon name={done ? 'check' : 'arrow'} className="h-4 w-4" strokeWidth={2.6} />
                  {done ? t('home.done') : t('home.markComplete')}
                </Btn>
                <span className="text-[0.8125rem] font-bold text-green-deep">+{quest.points} {t('home.points')}</span>
              </div>
            </div>
            <img
              src={quest.img}
              alt={quest.title}
              loading="lazy"
              decoding="async"
              width="760"
              height="507"
              className="h-24 w-full rounded-[14px] object-cover sm:w-40"
            />
          </div>

        </div>
      </section>

      {/* ----------------------- ECO-CREATURES QUIZ ------------------ */}
      <section className="shell mt-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b-[1.5px] border-line pb-3">
          <div>
            <Chapter>{t('home.creatures')}</Chapter>
            <h2 className="mt-1 text-xl">{t('home.creatureQ')}</h2>
          </div>
        </div>
        <EcoCreaturesQuiz />
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
            <Chapter>{t('nav.discover')}</Chapter>
            <h2 className="mt-1 text-xl">{t('home.orgs')}</h2>
          </div>
          <button type="button" onClick={() => go('discover')} className="text-[0.8125rem] font-bold text-green-deep underline decoration-leaf-2 decoration-2 underline-offset-4">
            {t('home.fullDirectory')}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {featured.map((x, i) => (
            <div key={x.name} className={`rounded-[18px] border-[1.5px] border-line p-3.5 ${['bg-leaf-3', 'bg-gold-tint', 'bg-mint-tint', 'bg-blush'][i]}`}>
              <div className={`flex h-12 items-center justify-center rounded-[12px] ${x.block}`}>
                <span className={`text-[0.9375rem] font-black tracking-[0.1em] ${x.ink}`}>{x.abbr}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[0.8125rem] font-bold leading-snug">{x.name}</p>
              <p className="text-[0.6875rem] font-semibold text-slate">{x.region}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- FACTS ------------------------- */}
      <section className="shell pb-12">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b-[1.5px] border-line pb-3">
          <div>
            <Chapter>{t('home.didYouKnow')}</Chapter>
            <h2 className="mt-1 text-xl">{t('home.fourThings')}</h2>
          </div>
          <button type="button" onClick={() => go('learn')} className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold text-green-deep">
            {t('home.moreInLearn')}
            <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.text}
              className={`rounded-[18px] border-[1.5px] border-line p-3.5 ${['bg-blush', 'bg-mint-tint', 'bg-sky-tint', 'bg-lilac'][i % 4]}`}
            >
              <img
                src={f.img}
                alt={f.alt}
                loading="lazy"
                decoding="async"
                width="760"
                height="507"
                className="h-24 w-full rounded-[12px] object-cover"
              />
              <p className="mt-1.5 text-[0.8125rem] font-semibold leading-snug text-ink-soft">{c(`f.${i}`, f.text)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------- SUPPORT ------------------------- */}
      <section className="shell pb-10">
        <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <Chapter>{t('home.supportUs')}</Chapter>
            <p className="mt-1 max-w-md text-[0.9375rem] leading-snug text-ink-soft">
              {t('home.supportLine')}
            </p>
            <a
              href="mailto:team-tariqlawal@proton.me"
              className="mt-1.5 inline-block break-all text-[0.8125rem] font-bold text-green-deep underline decoration-leaf-2 decoration-2 underline-offset-4 hover:text-green"
            >
              team-tariqlawal@proton.me
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="mailto:team-tariqlawal@proton.me"
              className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-leaf-edge bg-leaf px-4 py-2 text-[0.9375rem] font-bold text-ink transition-colors hover:bg-leaf-2"
            >
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
              {t('home.supportUs')}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-line bg-panel px-4 py-2 text-[0.9375rem] font-bold text-green-deep transition-colors hover:border-leaf-2 hover:bg-leaf-3"
            >
              {copied ? t('home.copied') : t('home.copyEmail')}
            </button>
          </div>
        </div>
        <p aria-live="polite" className="sr-only">{copied ? 'Email address copied' : ''}</p>
      </section>
    </div>
  )
}
