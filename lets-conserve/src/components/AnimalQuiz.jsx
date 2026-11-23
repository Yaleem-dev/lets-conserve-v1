import { useMemo, useState } from 'react'
import { AnimalArt } from './StickmanArt.jsx'
import { Btn, Chapter } from './ui.jsx'

/* IUCN Red List categories confirmed against the Red List and IUCN
   announcements in this pass. Nothing here is from memory. */
const ANIMALS = {
  lion: {
    name: 'Lion',
    tag: 'The leader',
    status: 'Vulnerable',
    about: 'Lions have lost most of their historic range and are listed as Vulnerable on the IUCN Red List.',
    help: 'Back ranger patrols and community conservancies, and never buy wildlife products.',
    ink: '#8a5a12',
    tint: '#fdf1c6',
    chipBg: '#f7c445',
    chipInk: '#3a2404',
  },
  elephant: {
    name: 'African forest elephant',
    tag: 'The long game',
    status: 'Critically Endangered',
    about: 'Forest elephants were uplisted to Critically Endangered in 2021 after decades of poaching and forest loss.',
    help: 'Choose forest friendly products and support rangers working in the Congo Basin.',
    ink: '#a5372f',
    tint: '#fbe2e2',
    chipBg: '#f2a3a3',
    chipInk: '#5c1813',
  },
  turtle: {
    name: 'Hawksbill turtle',
    tag: 'The steady one',
    status: 'Critically Endangered',
    about: 'Hawksbills are Critically Endangered: hunted for their shells and squeezed off nesting beaches.',
    help: 'Skip tortoiseshell, cut single use plastic and keep beaches clear.',
    ink: '#1d5fa8',
    tint: '#dcecfa',
    chipBg: '#9fd0f5',
    chipInk: '#0d3a63',
  },
  leopard: {
    name: 'Snow leopard',
    tag: 'The quiet one',
    status: 'Vulnerable',
    about: 'Snow leopards are Vulnerable, with fewer than 10,000 mature adults thought to remain across Central Asia.',
    help: 'Support herder led schemes that insure livestock instead of hunting cats.',
    ink: '#5b3fa8',
    tint: '#ece4fb',
    chipBg: '#c9b8f2',
    chipInk: '#2f1d63',
  },
  penguin: {
    name: 'African penguin',
    tag: 'The team player',
    status: 'Critically Endangered',
    about: 'African penguins were uplisted to Critically Endangered in 2024 as the fish they feed on moved away.',
    help: 'Pick sustainable seafood and back colony monitoring around Cape Town.',
    ink: '#1c6b4a',
    tint: '#d8f2e4',
    chipBg: '#a6e5c0',
    chipInk: '#0f3b28',
  },
  gorilla: {
    name: 'Mountain gorilla',
    tag: 'The protector',
    status: 'Endangered',
    about: 'Mountain gorillas moved from Critically Endangered to Endangered in 2018 as numbers passed 1,000. Still Endangered.',
    help: 'Fund ranger patrols and avoid charcoal cut from protected forest.',
    ink: '#3c5a49',
    tint: '#e4eede',
    chipBg: '#bcd6b4',
    chipInk: '#1b3326',
  },
}

const PROMPTS = [
  {
    q: 'A group chat needs a plan. You',
    options: [
      { label: 'Take the lead and hand out jobs', w: { lion: 2, gorilla: 1 } },
      { label: 'Keep the plan small and steady', w: { penguin: 2, turtle: 1 } },
      { label: 'Go quiet and fix one detail', w: { leopard: 2, elephant: 1 } },
    ],
  },
  {
    q: 'Your ideal weekend',
    options: [
      { label: 'Rallying friends to clean a street', w: { penguin: 2, lion: 1 } },
      { label: 'A slow walk somewhere green', w: { turtle: 2, leopard: 1 } },
      { label: 'Planting things that outlive you', w: { elephant: 2, gorilla: 1 } },
    ],
  },
  {
    q: 'A problem lands on your desk',
    options: [
      { label: 'Break it into steps and start', w: { gorilla: 2, penguin: 1 } },
      { label: 'Read everything first', w: { turtle: 2, elephant: 1 } },
      { label: 'Back whoever is already on it', w: { lion: 2, leopard: 1 } },
    ],
  },
  {
    q: 'What keeps you going',
    options: [
      { label: 'A visible win', w: { lion: 2, penguin: 1 } },
      { label: 'Progress nobody claps for', w: { leopard: 2, turtle: 1 } },
      { label: 'Knowing this place is better later', w: { elephant: 2, gorilla: 1 } },
    ],
  },
  {
    q: 'Pick a role on a new project',
    options: [
      { label: 'The one who decides', w: { lion: 2, gorilla: 1 } },
      { label: 'The one who does the long haul', w: { turtle: 2, penguin: 1 } },
      { label: 'The one who watches the edges', w: { leopard: 2, elephant: 1 } },
    ],
  },
]

const ORDER = ['lion', 'elephant', 'leopard', 'penguin', 'turtle', 'gorilla']

export default function AnimalQuiz() {
  const [picks, setPicks] = useState([])
  const [copied, setCopied] = useState(false)

  const step = picks.length
  const finished = step >= PROMPTS.length

  const animal = useMemo(() => {
    const tally = {}
    picks.forEach((w) => {
      Object.entries(w).forEach(([k, v]) => {
        tally[k] = (tally[k] || 0) + v
      })
    })
    let best = ORDER[0]
    ORDER.forEach((k) => {
      if ((tally[k] || 0) > (tally[best] || 0)) best = k
    })
    return ANIMALS[best]
  }, [picks])

  const pick = (i) => setPicks((prev) => [...prev, PROMPTS[step].options[i].w])
  const reset = () => {
    setPicks([])
    setCopied(false)
  }

  const share = async () => {
    const text = `I got the ${animal.name} (${animal.status}) on the Let's Conserve eco animal quiz.`
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My eco animal', text, url })
        return
      } catch {
        /* dismissed or blocked, fall back to copying */
      }
    }
    const payload = `${text} ${url}`
    try {
      await navigator.clipboard.writeText(payload)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      const box = document.createElement('textarea')
      box.value = payload
      document.body.appendChild(box)
      box.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2400)
      } finally {
        document.body.removeChild(box)
      }
    }
  }

  if (finished) {
    return (
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line-soft bg-blush px-4 py-2.5">
          <Chapter>Your animal</Chapter>
          <span className="text-[0.6875rem] font-bold text-[#7a2b24]">{animal.status}</span>
        </div>

        <div className="p-4 sm:p-5" aria-live="polite">
          <div className="flex items-start gap-3.5">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[1.5px]"
              style={{ background: animal.tint, borderColor: animal.ink }}
            >
              <AnimalArt name={Object.keys(ANIMALS).find((k) => ANIMALS[k] === animal)} color={animal.ink} className="h-10 w-10" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-slate">{animal.tag}</p>
              <h3 className="mt-0.5 text-[1.3rem] leading-tight">{animal.name}</h3>
              <span
                className="mt-1.5 inline-flex items-center rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.05em]"
                style={{ background: animal.chipBg, color: animal.chipInk }}
              >
                {animal.status}
              </span>
            </div>
          </div>

          <p className="mt-3 text-[0.875rem] leading-snug text-ink-soft">{animal.about}</p>
          <p
            className="mt-2 rounded-xl px-3 py-2 text-[0.8125rem] font-semibold leading-snug"
            style={{ background: animal.tint, color: animal.ink }}
          >
            {animal.help}
          </p>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <Btn variant="leaf" className="!px-4 !py-2 !text-[0.8125rem]" onClick={share}>
              {copied ? 'Link copied' : 'Share my animal'}
            </Btn>
            <Btn variant="ghost" className="!px-4 !py-2 !text-[0.8125rem]" onClick={reset}>
              Play again
            </Btn>
          </div>
        </div>
      </div>
    )
  }

  const p = PROMPTS[step]

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line-soft bg-mint-tint px-4 py-2.5">
        <Chapter>Question {step + 1} of {PROMPTS.length}</Chapter>
        <span className="text-[0.6875rem] font-bold tabular-nums text-green-deep">{step}/{PROMPTS.length}</span>
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-[0.9375rem] font-bold leading-snug">{p.q}</p>

        <div className="mt-3 flex flex-col gap-2">
          {p.options.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => pick(i)}
              className="flex w-full items-center gap-2.5 rounded-xl border-[1.5px] border-line bg-card px-3 py-2.5 text-left text-[0.875rem] font-semibold leading-snug text-ink-soft transition-colors hover:border-leaf-edge hover:bg-leaf-3"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-[0.625rem] font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="min-w-0">{o.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {PROMPTS.map((_, n) => (
            <span key={n} className={`h-1.5 flex-1 rounded-full ${n < step ? 'bg-green' : 'bg-line-soft'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
