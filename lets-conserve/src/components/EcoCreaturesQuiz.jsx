import { useMemo, useState } from 'react'
import { CreaturesArt } from './StickmanArt.jsx'
import CreatureArt from './CreatureArt.jsx'
import { Btn, Chapter } from './ui.jsx'
import { useC } from '../i18n.jsx'

/* Every conservation status below was checked against the IUCN Red List
   or the assessing body, not written from memory. */
const CREATURES = {
  lion: {
    name: 'Lion',
    kind: 'Animal',
    tag: 'The lead voice',
    status: 'Vulnerable',
    about: 'Lions have lost most of their historic range and are listed as Vulnerable on the IUCN Red List.',
    help: 'Back ranger patrols and community conservancies, and never buy wildlife products.',
    ink: '#8a5a12',
    tint: '#fdf1c6',
    chip: '#f7c445',
    chipInk: '#3a2404',
  },
  leopard: {
    name: 'Snow leopard',
    kind: 'Animal',
    tag: 'The quiet watcher',
    status: 'Vulnerable',
    about: 'Snow leopards are Vulnerable, with only a few thousand thought to remain across the high mountains of Central Asia.',
    help: 'Support herder led schemes that insure livestock instead of hunting cats.',
    ink: '#5b3fa8',
    tint: '#eae4fb',
    chip: '#c9b8f2',
    chipInk: '#2f1d63',
  },
  penguin: {
    name: 'African penguin',
    kind: 'Animal',
    tag: 'The steady team mate',
    status: 'Critically Endangered',
    about: 'African penguins were uplisted to Critically Endangered in 2024 as the fish they feed on moved away from their colonies.',
    help: 'Pick sustainable seafood and back colony monitoring around the Cape.',
    ink: '#1c6b4a',
    tint: '#ddf3e4',
    chip: '#a6e5c0',
    chipInk: '#0f3b28',
  },
  gorilla: {
    name: 'Mountain gorilla',
    kind: 'Animal',
    tag: 'The patient protector',
    status: 'Endangered',
    about: 'Mountain gorillas moved from Critically Endangered to Endangered in 2018 as numbers passed 1,000. They are still Endangered.',
    help: 'Fund ranger patrols and avoid charcoal cut from protected forest.',
    ink: '#3c5a49',
    tint: '#e4eede',
    chip: '#bcd6b4',
    chipInk: '#1b3326',
  },
  turtle: {
    name: 'Hawksbill turtle',
    kind: 'Animal',
    tag: 'The slow and careful one',
    status: 'Critically Endangered',
    about: 'Hawksbills are Critically Endangered: hunted for their shells and squeezed off the beaches they nest on.',
    help: 'Skip tortoiseshell, cut single use plastic and keep beaches clear.',
    ink: '#1d5fa8',
    tint: '#dbeafa',
    chip: '#9fd0f5',
    chipInk: '#0d3a63',
  },
  flytrap: {
    name: 'Venus flytrap',
    kind: 'Plant',
    tag: 'The quick reactor',
    status: 'Vulnerable',
    about: 'Venus flytraps grow wild in a small corner of the Carolinas and are Vulnerable, with poaching a real pressure.',
    help: 'Buy only nursery grown plants and never dig one from the wild.',
    ink: '#a5372f',
    tint: '#fbe2e2',
    chip: '#f2a3a3',
    chipInk: '#5c1813',
  },
  mangrove: {
    name: 'Mangrove',
    kind: 'Plant',
    tag: 'The calm builder',
    status: 'At risk',
    about: 'Half of the world\u2019s mangrove ecosystems are at risk of collapse in the IUCN Red List of Ecosystems, and they shelter coasts and nursery fish.',
    help: 'Support replanting that uses local species, and keep coastlines unbuilt.',
    ink: '#1f6f57',
    tint: '#d9f0e6',
    chip: '#9fd8c2',
    chipInk: '#0d3b2c',
  },
  glowworm: {
    name: 'Glow-worm',
    kind: 'Insect',
    tag: 'The night light',
    status: 'Near Threatened',
    about: 'The common glow-worm is Near Threatened, fading as hedgerows are tidied and street light washes out its signals.',
    help: 'Leave rough grass, skip garden chemicals and keep outdoor lights off.',
    ink: '#7a5c0c',
    tint: '#f7efcf',
    chip: '#e8d27a',
    chipInk: '#3f3104',
  },
  monarch: {
    name: 'Monarch butterfly',
    kind: 'Insect',
    tag: 'The long distance mover',
    status: 'Endangered',
    about: 'The migratory monarch was added to the IUCN Red List as Endangered in 2022, its routes cut by habitat and weather.',
    help: 'Plant native milkweed and leave wild corners of the garden alone.',
    ink: '#a8521c',
    tint: '#fbe6d4',
    chip: '#f3b98a',
    chipInk: '#5c2a08',
  },
  bee: {
    name: 'Wild bee',
    kind: 'Insect',
    tag: 'The quiet worker',
    status: 'Data Deficient',
    about: 'The wild western honey bee is Data Deficient globally, while the same species is Endangered across EU countries. Poor data hides the decline.',
    help: 'Record what you see on a survey app. Records are what fill the gaps.',
    ink: '#8a6a10',
    tint: '#fdf1c6',
    chip: '#f0cf6a',
    chipInk: '#3f3104',
  },
}

const PROMPTS = [
  {
    q: 'A group chat needs a plan. You?',
    options: [
      { label: 'Hold it together and keep everyone steady', for: 'mangrove' },
      { label: 'Watch first, then say the one thing missed', for: 'glowworm' },
      { label: 'Check who else is affected before deciding', for: 'penguin' },
    ],
  },
  {
    q: 'Pick the weekend you would actually enjoy.',
    options: [
      { label: 'A long swim somewhere wild', for: 'turtle' },
      { label: 'Sorting, fixing, tidying one small corner', for: 'bee' },
      { label: 'A slow afternoon reading about something strange', for: 'flytrap' },
    ],
  },
  {
    q: 'Something goes wrong. Your first move?',
    options: [
      { label: 'Take charge and hand out the jobs', for: 'lion' },
      { label: 'Move on instinct, decide later', for: 'monarch' },
      { label: 'Protect the place before the people', for: 'mangrove' },
    ],
  },
  {
    q: 'What kind of progress do you trust?',
    options: [
      { label: 'The kind nobody claps for', for: 'bee' },
      { label: 'The kind that holds a whole team up', for: 'penguin' },
      { label: 'The kind that takes ten years and works', for: 'turtle' },
    ],
  },
  {
    q: 'Pick a role on a new project.',
    options: [
      { label: 'The one who reads the whole manual', for: 'flytrap' },
      { label: 'The one that travels and carries the message', for: 'monarch' },
      { label: 'The one who decides', for: 'lion' },
    ],
  },
]

/* Three options per prompt, five prompts. Ties are broken by the most
   recent pick, so no creature is ever the silent default. */
function resolve(picks) {
  const score = {}
  picks.forEach((k) => {
    score[k] = (score[k] || 0) + 1
  })
  let best = null
  let bestScore = -1
  /* earliest pick wins a tie, so the first choice you make decides
     when every creature scores once */
  picks.forEach((k) => {
    if (score[k] > bestScore) {
      best = k
      bestScore = score[k]
    }
  })
  return best
}

export default function EcoCreaturesQuiz() {
  const [picks, setPicks] = useState([])
  const [note, setNote] = useState('')

  const step = picks.length
  const c = useC()
  const finished = step >= PROMPTS.length
  const key = useMemo(() => (finished ? resolve(picks) : picks[0]), [finished, picks])
  const creature = CREATURES[key]

  const pick = (k) => setPicks((prev) => [...prev, k])
  const reset = () => {
    setPicks([])
    setNote('')
  }

  const share = async () => {
    const text = `I got the ${creature.name} (${creature.status}) on the Let's Conserve Eco-Creatures quiz.`
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My eco creature', text, url })
        setNote('Shared')
        window.setTimeout(() => setNote(''), 2400)
        return
      } catch {
        /* dismissed or unsupported, fall through to copy */
      }
    }
    const payload = `${text} ${url}`
    try {
      await navigator.clipboard.writeText(payload)
      setNote('Copied to clipboard')
      window.setTimeout(() => setNote(''), 2400)
    } catch {
      const box = document.createElement('textarea')
      box.value = payload
      document.body.appendChild(box)
      box.select()
      try {
        document.execCommand('copy')
        setNote('Copied to clipboard')
        window.setTimeout(() => setNote(''), 2400)
      } finally {
        document.body.removeChild(box)
      }
    }
  }

  if (finished) {
    return (
      <div className="card overflow-hidden">
        <CreaturesArt className="h-16 w-full" />
        <div className="flex items-center justify-between border-b border-line-soft bg-blush px-4 py-2.5">
          <Chapter>Your creature</Chapter>
          <span className="text-[0.6875rem] font-bold uppercase tracking-wide text-blush-ink">{creature.kind}</span>
        </div>

        <div className="p-4 sm:p-5" aria-live="polite">
          <div className="flex items-start gap-3.5">
            <span
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-[1.5px]"
              style={{ background: creature.tint, borderColor: creature.ink }}
            >
              <CreatureArt name={key} className="h-16 w-16" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-slate">
                {c(`kind.${creature.kind}`, creature.kind)} · {c(`c.${key}.tag`, creature.tag)}
              </p>
              <h3 className="mt-0.5 text-[1.3rem] leading-tight">{c(`c.${key}.name`, creature.name)}</h3>
              <span
                className="mt-1.5 inline-flex items-center rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.05em]"
                style={{ background: creature.chip, color: creature.chipInk }}
              >
                {c(`status.${creature.status}`, creature.status)}
              </span>
            </div>
          </div>

          <p className="mt-3 text-[0.875rem] leading-snug text-ink-soft">{c(`c.${key}.about`, creature.about)}</p>
          <p
            className="mt-2 rounded-xl px-3 py-2 text-[0.8125rem] font-semibold leading-snug"
            style={{ background: creature.tint, color: creature.ink }}
          >
            {c(`c.${key}.help`, creature.help)}
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <Btn variant="leaf" className="!px-4 !py-2 !text-[0.8125rem]" onClick={share}>
              {note || 'Share my creature'}
            </Btn>
            <Btn variant="ghost" className="!px-4 !py-2 !text-[0.8125rem]" onClick={reset}>
              Play again
            </Btn>
            <span aria-live="polite" className="text-[0.75rem] font-bold text-mint-ink">{note}</span>
          </div>
        </div>
      </div>
    )
  }

  const p = PROMPTS[step]

  return (
    <div className="card overflow-hidden">
      <CreaturesArt className="h-16 w-full" />
      <div className="flex items-center justify-between border-b border-line-soft bg-mint-tint px-4 py-2.5">
        <Chapter>Prompt {step + 1} of {PROMPTS.length}</Chapter>
        <span className="text-[0.6875rem] font-bold tabular-nums text-mint-ink">{step}/{PROMPTS.length}</span>
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-[0.9375rem] font-bold leading-snug">{c(`p.${step}.q`, p.q)}</p>

        <div className="mt-3 flex flex-col gap-2">
          {p.options.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => pick(o.for)}
              className="flex w-full items-center gap-2.5 rounded-xl border-[1.5px] border-line bg-panel px-3 py-2.5 text-left text-[0.875rem] font-semibold leading-snug text-ink-soft transition-colors hover:border-leaf-edge hover:bg-leaf-3"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-[0.625rem] font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="min-w-0">{c(`p.${step}.o${i}`, o.label)}</span>
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
