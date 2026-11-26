import { useId, useRef, useState } from 'react'
import { Btn } from './ui.jsx'
import { useC, useT } from '../i18n.jsx'

// Each result gets its own contour drawing. No filled creature shapes.
export const SKETCHES = {
  lion: 'M78 42 Q55 18 36 45 Q10 60 31 86 Q17 115 47 126 Q62 151 85 130 Q111 143 128 116 Q155 101 135 76 Q149 46 119 37 Q99 17 78 42 Z M51 66 Q49 46 62 52 L69 64 M103 61 Q113 43 123 60 M54 68 Q47 112 84 119 Q124 118 123 70 M67 80l5 1 M103 80l5-1 M79 92q7-6 14 0l-7 7z M86 100v7m0-1q-13 8-18-1m18 1q13 8 18-1',
  leopard: 'M48 57 Q35 21 59 41 L69 53 Q86 47 103 53 L116 37 Q136 24 126 63 Q139 96 117 118 Q87 142 57 116 Q38 97 48 57 Z M64 79l7-2m32 0 7 2 M82 94l8 1-4 6z M86 103q-11 12-19 1m19-1q10 11 19 1 M61 62l4 4m46-5-4 5M54 91l5 2m57-2 5-2M67 105l-5-5m47 5 4-5 M125 119 Q168 126 149 148 Q132 160 134 137',
  penguin: 'M59 45 Q79 17 102 42 Q123 68 121 110 Q117 141 86 141 Q49 140 49 111 Q45 77 59 45 Z M64 75 Q56 98 64 124 Q83 140 106 122 Q116 97 102 74 M67 60l4-2m25 0 4 2 M76 70l10 9 11-9 M51 78 Q27 99 39 114 L51 101 M120 79 Q143 99 132 112 L122 101 M70 141l-16 9 27-2m18-7 16 10-26-3',
  gorilla: 'M49 59 Q25 53 31 79 Q35 92 46 85 M124 60 Q149 53 143 79 Q139 91 128 85 M45 67 Q43 26 86 27 Q130 27 128 72 L128 109 Q114 139 85 139 Q57 136 44 111 Z M58 66 Q70 51 85 65 Q102 50 117 67 L118 108 Q104 127 85 123 Q65 127 54 108 Z M63 77l13 1m21 0 13-1M76 94q11-8 22 0l-4 9H80z M72 113q15 6 28 0 M41 137Q17 146 22 163m106-26q26 9 21 26',
  turtle: 'M48 78 Q62 42 91 50 Q125 53 135 87 Q118 125 80 124 Q51 116 48 78 Z M72 72l22-9 20 21-12 25-25-5z M48 78l24-6m22-9 1-12m19 33 21 3m-33 22 10 13m-35-18-12 14 M131 74Q150 50 164 64Q178 83 145 92 M150 70l2 1 M69 52Q54 21 38 34L55 70 M52 95Q12 92 24 111l32 4 M113 117Q136 141 149 126l-20-24 M72 122q-3 19 6 17l14-14',
  mangrove: 'M88 66v53 M86 85l-20-20m24 20 20-19 M61 68Q28 66 37 48Q25 26 53 26Q62 9 81 26Q103 8 116 30Q144 29 135 49Q148 75 113 70 M86 111Q57 116 47 146m40-30-15 39m20-40 18 41m-17-43q31 7 38 32 M25 153q15-7 29 0t29 0 29 0 29 0 M34 166q14-6 30 0t31 0 31 0',
  flytrap: 'M88 152Q96 122 85 97 M84 125Q55 103 36 120Q50 142 84 133 M88 143Q119 117 137 137Q117 159 88 151 M87 98Q48 103 37 65Q62 55 86 81 Q103 51 136 60Q135 102 87 98 Z M46 69q22 3 39 23m6 0q22-7 36-26 M42 61l-7-9m20 10-2-12m17 15 2-11m12 20 7-12m13-2 1-12m12 8 5-11m9 11 8-9',
  glowworm: 'M36 103Q18 88 32 77Q45 69 53 83 Q80 60 123 86 Q145 106 122 120 Q83 137 52 109 Z M58 82l-4 28m19-33-3 39m22-37-2 38m20-34-2 34 M35 78l-8-16m20 18 9-16 M65 116l-8 15m27-10-4 14m23-13 5 12 M131 84l13-15m-7 26 18-3m-20 18 16 9 M28 145q18-10 35 0t35 0 35 0 M37 38l0-5m-2 2h5 M123 36v-6m-3 3h6',
  monarch: 'M87 74Q59 18 28 35Q9 52 34 87 Q6 105 29 131Q58 146 82 108 M91 74Q118 18 149 35Q169 52 145 87Q172 105 148 131Q120 146 95 108 M87 69Q80 92 87 118Q94 126 98 109L94 77Z M87 72l-9-21m16 21 10-21 M84 83L37 47m47 49-50 28m62-40 48-37m-47 51 49 25 M42 55q-12 12 7 29l31 4M132 56q12 12-7 28l-28 4 M42 103q15-4 34-4m56 4q-15-4-31-4',
  bee: 'M60 68Q32 58 31 81Q27 104 57 107 Q84 131 121 107Q146 82 117 65Q88 49 60 68 Z M67 64q-10 22-3 47m18-53q-8 30 0 58m19-58q-5 28 2 55 M69 59Q48 17 75 24Q98 31 94 58 Q109 18 131 32Q143 52 107 62 M40 72l-15-15m21 13-2-19 M39 83l1 1 M59 110l-10 17m37-9-1 16m24-23 14 13 M137 84l16 7-16 4',
}

function wrap(text, max = 33) {
  const words = text.split(/\s+/); const lines = []; let line = ''
  words.forEach(word => { if ((line + ' ' + word).length > max && line) { lines.push(line); line = word } else line += (line ? ' ' : '') + word })
  if (line) lines.push(line)
  return lines
}

export default function CreatureShareCard({ creature, creatureKey }) {
  const t = useT(); const c = useC(); const ref = useRef(null)
  const [note, setNote] = useState(''); const [busy, setBusy] = useState(false)
  const id = useId().replace(/:/g, '')
  const name = c(`c.${creatureKey}.name`, creature.name)
  const trait = c(`c.${creatureKey}.tag`, creature.tag)
  const url = new URL(window.location.href); url.hash = 'home'; url.searchParams.set('creature', creatureKey)
  const link = url.toString()

  const png = async () => {
    const source = new XMLSerializer().serializeToString(ref.current)
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' }); const object = URL.createObjectURL(blob)
    try {
      const img = new Image(); img.src = object; await img.decode()
      const canvas = document.createElement('canvas'); canvas.width = 1080; canvas.height = 1350
      const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas unavailable')
      ctx.drawImage(img, 0, 0, 1080, 1350)
      return await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('PNG unavailable')), 'image/png'))
    } finally { URL.revokeObjectURL(object) }
  }
  const download = async () => {
    setBusy(true)
    try {
      const blob = await png(); const href = URL.createObjectURL(blob); const a = document.createElement('a')
      a.href = href; a.download = `my-eco-creature-${creatureKey}.png`; a.click()
      setTimeout(() => URL.revokeObjectURL(href), 10000); setNote(t('card.saved'))
    } catch { setNote(t('card.error')) } finally { setBusy(false) }
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(link) } catch {
      const box = document.createElement('textarea'); box.value = link; box.style.position = 'fixed'; box.style.opacity = '0'
      document.body.appendChild(box); box.select()
      try { if (!document.execCommand('copy')) throw new Error('Copy failed') } finally { box.remove() }
    }
    setNote(t('home.copied'))
  }
  const share = async () => {
    setBusy(true)
    try {
      const blob = await png(); const file = new File([blob], `eco-creature-${creatureKey}.png`, { type: 'image/png' })
      if (navigator.share) {
        try {
          if (navigator.canShare?.({ files: [file] })) await navigator.share({ title: name, text: `${name}: ${trait}`, files: [file] })
          else await navigator.share({ title: name, text: `${name}: ${trait}`, url: link })
          return
        } catch (error) { if (error.name === 'AbortError') return }
      }
      await copy()
    } catch { try { await copy() } catch { setNote(t('card.error')) } } finally { setBusy(false) }
  }

  return (
    <section className="mt-5 rounded-2xl border border-line bg-mint-tint p-3" aria-label={t('home.creatures')}>
      <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-label={`${name}: ${trait}`} className="mx-auto h-auto w-full max-w-[390px] rounded-xl" data-creature-card={creatureKey}>
        <title>{name}: {trait}</title>
        <defs>
          <pattern id={`paper-${id}`} width="18" height="18" patternUnits="userSpaceOnUse"><path d="M2 4h2m9 8h1" stroke="#51765d" strokeWidth="1" opacity="0.13"/></pattern>
        </defs>
        <rect width="1080" height="1350" rx="36" fill="#f6efdb"/>
        <rect width="1080" height="1350" rx="36" fill={`url(#paper-${id})`}/>
        <rect x="35" y="35" width="1010" height="1280" rx="26" fill="none" stroke="#28563e" strokeWidth="2"/>
        <g fontFamily="Helvetica, Arial, sans-serif" textAnchor="middle" fill="#173d2c">
          <text x="540" y="128" fontSize="38" letterSpacing="5">Let’s Conserve</text>
          <text x="540" y="202" fontSize="28">{t('home.creatures')}</text>
          <path d="M460 235q80-10 160 0" stroke={creature.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="540" cy="578" r="250" fill={creature.tint}/>
          <g transform="translate(225 265) scale(3.6)" fill="none" stroke={creature.ink} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"><path d={SKETCHES[creatureKey] || SKETCHES.mangrove}/></g>
          {wrap(name, 23).map((line, i) => <text key={i} x="540" y={950 + i * 65} fontSize="58" fontWeight="700">{line}</text>)}
          {wrap(trait).map((line, i) => <text key={i} x="540" y={1082 + i * 40} fontSize="30">{line}</text>)}
          <path d="M440 1180q100 10 200 0" stroke="#28563e" strokeWidth="2" fill="none"/>
          <text x="540" y="1250" fontSize="27">lets-conserve.vercel.app</text>
        </g>
      </svg>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <Btn disabled={busy} onClick={share}>{t('creatures.share')}</Btn>
        <Btn variant="ghost" disabled={busy} onClick={download}>{t('card.download')}</Btn>
      </div>
      <p role="status" className="mt-2 min-h-5 text-center text-sm font-semibold text-green-deep">{note}</p>
    </section>
  )
}
