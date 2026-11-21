/* ------------------------------------------------------------------
   Chalk and stickman art library (v2)
   Hand-drawn SVG scenes, multi-colour, with a turbulence filter that
   roughens every stroke like chalk on a board. Two tones: "dark" for
   chalkboard panels, "light" for cream cards.
------------------------------------------------------------------ */

export function ChalkDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <filter id="chalky" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.045" numOctaves="3" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="chalky-soft" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

/* gold, mint, sky, rose, cream. On cream cards the pale tones darken
   so nothing disappears. */
const DARK = { a: '#E5B842', b: '#5CB888', c: '#4FA3D1', d: '#DE708E', e: '#F1F1E8', f: '#8FD3A8' }
const LIGHT = { a: '#B98A12', b: '#2E7D5B', c: '#2F7DA6', d: '#C05575', e: '#1F5A42', f: '#5FA97E' }

function pal(tone) {
  return tone === 'dark' ? DARK : LIGHT
}

function Scene({ children, tone = 'light', className = '', viewBox = '0 0 220 150', filter = true }) {
  const p = pal(tone)
  const common = {
    fill: 'none',
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  return (
    <svg
      viewBox={viewBox}
      className={className}
      aria-hidden="true"
      focusable="false"
      filter={filter ? 'url(#chalky)' : undefined}
    >
      <g {...common}>{typeof children === 'function' ? children(p) : children}</g>
    </svg>
  )
}

/* organic ground line, as on the PDF pages */
const ground = (p, y = 132) => (
  <path
    d={`M6 ${y} q24 -7 48 0 t48 0 t48 0 t52 0`}
    stroke={p.b}
    opacity="0.55"
    strokeWidth="2"
  />
)

const head = (p, x, y, r = 10, color) => <circle cx={x} cy={y} r={r} stroke={color || p.a} />

/* ------------------------------- scenes ------------------------------ */

export function ArtPlanting({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <circle cx="176" cy="42" r="13" stroke={p.a} />
          <path d="M176 22v-6M176 68v-6M196 42h6M150 42h6M190 28l5-5M157 61l5-5" stroke={p.a} opacity="0.8" />
          <path d="M28 40q7-7 14 0q7-7 14 0" stroke={p.e} opacity="0.7" strokeWidth="2" />

          {/* planter */}
          <head p={p} x="66" y="66" />
          <path d="M66 76v30" stroke={p.e} />
          <path d="M66 88l20 8" stroke={p.e} />
          <path d="M66 88l-16 10" stroke={p.e} />
          <path d="M66 106l-12 24M66 106l14 24" stroke={p.e} />

          {/* sapling */}
          <path d="M122 130v-30" stroke={p.b} />
          <path d="M122 112c-15-2-22-13-20-25c15 2 22 13 20 25z" stroke={p.b} />
          <path d="M122 122c16-2 23-13 21-25c-16 2-23 13-21 25z" stroke={p.b} />
          <path d="M108 130q14-6 28 0" stroke={p.a} opacity="0.8" strokeWidth="2" />

          {/* watering can */}
          <path d="M96 92h20v16H96z" stroke={p.c} opacity="0.95" />
          <path d="M116 96l12-6" stroke={p.c} />
          <path d="M100 92c3-7 9-9 13-8" stroke={p.c} />
          <path d="M130 98v6M134 104v8" stroke={p.c} opacity="0.7" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

export function ArtWalking({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <circle cx="78" cy="60" r="10" stroke={p.a} />
          <path d="M78 70v28" stroke={p.e} />
          <path d="M76 80l18 8" stroke={p.e} />
          <path d="M76 82l-16 10" stroke={p.e} />
          <path d="M78 98l-14 26" stroke={p.e} />
          <path d="M78 98l16 14l6 18" stroke={p.e} />

          <path d="M28 116c0-10 8-16 16-16s16 6 16 16" stroke={p.b} />
          <path d="M44 100v-8" stroke={p.b} />
          <path d="M34 104l10-10l10 10" stroke={p.b} opacity="0.8" />

          <circle cx="168" cy="44" r="14" stroke={p.a} />
          <path d="M168 24v-6M168 68v6M188 44h6M148 44h6" stroke={p.a} opacity="0.75" />
          <path d="M200 96q-8 -6 -16 0" stroke={p.c} opacity="0.6" strokeWidth="2" />
          <path d="M118 34q6-6 12 0q6-6 12 0" stroke={p.e} opacity="0.55" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

export function ArtRecycling({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <path d="M88 76h46l-5 46h-36z" stroke={p.e} />
          <path d="M82 76h58" stroke={p.a} />
          <path d="M100 76l3-9h16l3 9" stroke={p.a} />

          {/* recycle arrows */}
          <path d="M104 100a13 13 0 0 1 13-5" stroke={p.b} />
          <path d="M130 100a13 13 0 0 1-11 14" stroke={p.b} />
          <path d="M104 102a13 13 0 0 1 12 13" stroke={p.b} />
          <path d="M117 95v5l5-1" stroke={p.b} />
          <path d="M120 115l-6-2 4-5" stroke={p.b} />

          <circle cx="46" cy="62" r="10" stroke={p.d} />
          <path d="M46 72v28" stroke={p.d} />
          <path d="M46 80l16-8" stroke={p.d} />
          <path d="M46 82l-14 10" stroke={p.d} />
          <path d="M46 100l-12 26M46 100l14 26" stroke={p.d} />
          <path d="M60 62h12v18H60z" stroke={p.a} transform="rotate(-12 66 71)" />
        </>
      )}
    </Scene>
  )
}

export function ArtLearning({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <circle cx="108" cy="52" r="10" stroke={p.a} />
          <path d="M108 62v26" stroke={p.e} />
          <path d="M108 88c-12 0-18 8-24 14" stroke={p.e} />
          <path d="M108 88c12 0 18 8 24 14" stroke={p.e} />
          <path d="M88 90c9-5 15-4 20 0c5-4 11-5 20 0v16c-9-4-15-4-20 0c-5-4-11-4-20 0z" stroke={p.b} />
          <path d="M108 90v16" stroke={p.b} />

          {/* chalk doodles */}
          <path d="M156 44q9-6 18 0q-9 6-18 0z" stroke={p.c} opacity="0.8" />
          <path d="M36 50q9-6 18 0q-9 6-18 0z" stroke={p.d} opacity="0.7" />
          <path d="M166 104v-10M161 99h10" stroke={p.a} opacity="0.9" strokeWidth="2" />
          <path d="M44 96v-8M40 92h8" stroke={p.a} opacity="0.6" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

export function ArtOutdoors({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <path d="M8 122l36-46l24 30l14-16l30 32" stroke={p.c} />
          <path d="M110 122l34-42l42 42" stroke={p.b} />
          <path d="M44 76l-6 8h12z" stroke={p.c} opacity="0.8" />
          <circle cx="172" cy="34" r="12" stroke={p.a} />
          <path d="M172 16v-5M172 57v5M190 34h5M149 34h5" stroke={p.a} opacity="0.7" strokeWidth="2" />
          <path d="M22 40q6-6 12 0q6-6 12 0" stroke={p.e} opacity="0.6" strokeWidth="2" />

          <circle cx="96" cy="66" r="8" stroke={p.d} />
          <path d="M96 74v24" stroke={p.d} />
          <path d="M96 82l14 8" stroke={p.d} />
          <path d="M96 82l-12 8" stroke={p.d} />
          <path d="M96 98l-8 24M96 98l10 24" stroke={p.d} />
        </>
      )}
    </Scene>
  )
}

export function ArtCleanup({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <circle cx="66" cy="54" r="10" stroke={p.a} />
          <path d="M66 64v32" stroke={p.a} />
          <path d="M66 74l16 8" stroke={p.a} />
          <path d="M66 76l-14 10" stroke={p.a} />
          <path d="M66 96l-12 26M66 96l14 26" stroke={p.a} />
          <path d="M82 82l26 30" stroke={p.e} />
          <path d="M104 108l8 8" stroke={p.e} strokeWidth="3" />

          <path d="M138 84h34v40h-34z" stroke={p.b} />
          <path d="M145 84c0-9 5-14 10-14s10 5 10 14" stroke={p.b} />
          <path d="M140 96h30" stroke={p.b} opacity="0.6" />
          <path d="M150 116q6-10 15-12" stroke={p.d} opacity="0.8" />
          <path d="M186 60v-9M182 55h9" stroke={p.c} strokeWidth="2" opacity="0.7" />
        </>
      )}
    </Scene>
  )
}

export function ArtTree({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <path d="M110 130V86" stroke={p.b} />
          <path d="M110 104l-16-12M110 112l16-12" stroke={p.b} />
          <path d="M110 86c-26 0-42-18-40-38c2-18 18-30 36-30c22 0 38 15 38 34c0 20-14 34-34 34z" stroke={p.b} />
          <path d="M94 44q16-11 32 0" stroke={p.f} opacity="0.8" />
          <path d="M62 60q-10-9-6-19" stroke={p.a} opacity="0.75" />
          <circle cx="168" cy="34" r="9" stroke={p.a} opacity="0.9" />
        </>
      )}
    </Scene>
  )
}

export function ArtLeaf({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          <path d="M108 128C70 118 50 88 56 44c42 4 68 32 52 84z" stroke={p.b} />
          <path d="M108 128C72 106 64 78 56 44" stroke={p.b} opacity="0.6" />
          <path d="M90 88l-16 2M98 104l-19 4M82 68l-14 0" stroke={p.a} opacity="0.75" />
          <path d="M150 104q12-6 24-2" stroke={p.c} opacity="0.6" strokeWidth="2" />
          <path d="M34 104v-10M29 99h10" stroke={p.d} opacity="0.7" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

export function ArtSun({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          <circle cx="110" cy="72" r="30" stroke={p.a} />
          <path d="M110 28V14M110 130v-14M154 72h14M52 72h14M140 42l10-10M70 112l10-10M140 102l10 10M70 32l10 10" stroke={p.a} />
          <circle cx="100" cy="68" r="1.6" fill={p.a} stroke="none" />
          <circle cx="120" cy="68" r="1.6" fill={p.a} stroke="none" />
          <path d="M102 80q8 7 16 0" stroke={p.a} />
          <path d="M24 124q24-8 48 0" stroke={p.b} opacity="0.6" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

export function ArtCycle({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          <path d="M110 34a38 38 0 0 1 33 19" stroke={p.b} />
          <path d="M148 40l-6 16-12-8" stroke={p.b} />
          <path d="M148 76a38 38 0 0 1-33 40" stroke={p.c} />
          <path d="M136 128l-16-12 16-8" stroke={p.c} />
          <path d="M72 104a38 38 0 0 1 0-46" stroke={p.a} />
          <path d="M60 68l4-16 12 8" stroke={p.a} />
          <circle cx="110" cy="75" r="12" stroke={p.d} opacity="0.85" />
          <path d="M104 75h12M110 69v12" stroke={p.d} strokeWidth="2" opacity="0.7" />
        </>
      )}
    </Scene>
  )
}

export function ArtShare({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <circle cx="70" cy="58" r="10" stroke={p.a} />
          <path d="M70 68v30" stroke={p.a} />
          <path d="M70 78l14 8" stroke={p.a} />
          <path d="M70 78l-12 10" stroke={p.a} />
          <path d="M70 98l-10 26M70 98l10 26" stroke={p.a} />

          <circle cx="150" cy="58" r="10" stroke={p.d} />
          <path d="M150 68v30" stroke={p.d} />
          <path d="M150 78l-14 8" stroke={p.d} />
          <path d="M150 98l-10 26M150 98l10 26" stroke={p.d} />
          <path d="M94 46q16-10 32 0" stroke={p.c} opacity="0.85" />
          <path d="M120 46l-4-5 6-2" stroke={p.c} opacity="0.85" />
          <path d="M100 66q12 8 24 0" stroke={p.b} opacity="0.6" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

export function ArtCelebrate({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          {ground(p)}
          <circle cx="110" cy="58" r="10" stroke={p.a} />
          <path d="M110 68v30" stroke={p.a} />
          <path d="M110 76l-18-20M110 76l18-20" stroke={p.a} />
          <path d="M110 98l-13 26M110 98l13 26" stroke={p.a} />
          <circle cx="78" cy="32" r="2.6" fill={p.c} stroke="none" />
          <circle cx="142" cy="28" r="2.6" fill={p.d} stroke="none" />
          <circle cx="62" cy="62" r="2" fill={p.b} stroke="none" />
          <circle cx="160" cy="66" r="2" fill={p.a} stroke="none" />
          <path d="M68 44l-7-7M152 44l7-7M96 20l-2-9M126 20l2-9" stroke={p.b} opacity="0.8" strokeWidth="2" />
        </>
      )}
    </Scene>
  )
}

export function ArtQuiz({ tone, className }) {
  return (
    <Scene tone={tone} className={className}>
      {(p) => (
        <>
          <path d="M64 28h72a7 7 0 0 1 7 7v68a7 7 0 0 1-7 7H64a7 7 0 0 1-7-7V35a7 7 0 0 1 7-7z" stroke={p.e} />
          <path d="M74 52h38M74 68h46M74 84h24" stroke={p.b} opacity="0.75" />
          <circle cx="150" cy="96" r="24" stroke={p.a} />
          <path d="M142 88c0-6 5-9 9-9c5 0 9 3 9 9c0 5-5 6-8 9v3" stroke={p.a} />
          <circle cx="152" cy="108" r="2" fill={p.a} stroke="none" />
          <path d="M186 40v-9M181 35h9" stroke={p.c} strokeWidth="2" opacity="0.7" />
        </>
      )}
    </Scene>
  )
}

/* a wide landscape strip, used as a divider band */
export function ArtHorizon({ tone, className }) {
  return (
    <Scene tone={tone} className={className} viewBox="0 0 320 90">
      {(p) => (
        <>
          <path d="M0 74q40 -10 80 0t80 0t80 0t80 0" stroke={p.b} opacity="0.5" strokeWidth="2" />
          <circle cx="52" cy="26" r="12" stroke={p.a} />
          <path d="M52 8v-4M52 48v4M70 26h4M30 26h4" stroke={p.a} opacity="0.7" strokeWidth="2" />
          <path d="M222 74V42" stroke={p.b} />
          <path d="M222 58c-12-2-18-11-16-21c12 2 18 11 16 21z" stroke={p.b} />
          <path d="M222 66c13-2 19-11 17-21c-13 2-19 11-17 21z" stroke={p.b} />
          <circle cx="150" cy="46" r="6" stroke={p.d} />
          <path d="M150 52v16M150 58l10 6M150 58l-8 6M150 68l-7 8M150 68l8 8" stroke={p.d} />
          <path d="M112 34q5-5 10 0q5-5 10 0" stroke={p.e} opacity="0.6" strokeWidth="2" />
          <path d="M264 30q5-5 10 0q5-5 10 0" stroke={p.e} opacity="0.45" strokeWidth="2" />
          <circle cx="288" cy="14" r="2" fill={p.a} stroke="none" />
        </>
      )}
    </Scene>
  )
}

const SCENES = {
  planting: ArtPlanting,
  walking: ArtWalking,
  recycling: ArtRecycling,
  learning: ArtLearning,
  outdoors: ArtOutdoors,
  cleanup: ArtCleanup,
  tree: ArtTree,
  leaf: ArtLeaf,
  sun: ArtSun,
  cycle: ArtCycle,
  share: ArtShare,
  celebrate: ArtCelebrate,
  quiz: ArtQuiz,
  horizon: ArtHorizon,
}

export function StickmanArt({ name = 'planting', tone = 'light', className = 'h-32 w-full' }) {
  const Component = SCENES[name] || ArtPlanting
  return <Component tone={tone} className={className} />
}

/* ------------------------- doodles and icons ------------------------- */

export function Doodle({ name = 'star', className = 'h-6 w-6', color = 'currentColor' }) {
  const paths = {
    star: 'M12 3v5M12 16v5M4 12h5M15 12h5M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3',
    cloud: 'M5 16h12a4 4 0 0 0 0-8a6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 5 16z',
    bird: 'M3 13c4-6 7-6 9 0c2-6 5-6 9 0',
    sprout: 'M12 21v-7M12 14c-4 0-6-3-6-6c4 0 6 3 6 6zM12 16c4 0 6-3 6-6c-4 0-6 3-6 6z',
    wave: 'M2 12c3-5 6-5 9 0s6 5 9 0',
    arc: 'M3 20A9 9 0 0 1 21 20',
    heart: 'M12 20s-7-4.5-7-9a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 4.5-7 9-7 9z',
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name] || paths.star} />
    </svg>
  )
}

const ICONS = {
  home: 'M3 10.5L12 3l9 7.5M5.5 9.5V20h13V9.5M9.5 20v-6h5v6',
  learn: 'M4 4.5h6.5a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4zM20 4.5h-6.5a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2H20z',
  discover: 'M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2l2-5z',
  quest: 'M5 21V4M5 4h11l-1.5 4L16 12H5',
  explore: 'M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z',
  arrow: 'M5 12h13M13 6.5L18.5 12L13 17.5',
  check: 'M4.5 12.5L9.5 17.5L19.5 6.5',
  search: 'M11 18a7 7 0 1 0 0-14a7 7 0 0 0 0 14zM16.2 16.2L21 21',
  external: 'M14 4h6v6M20 4l-8.5 8.5M18 14v5.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19.5v-11A1.5 1.5 0 0 1 5.5 7H11',
  leaf: 'M20 4c-8 0-14 4-14 10a6 6 0 0 0 6 6c6 0 8-8 8-16zM6 20c2-4 5-7 9-9',
  chevron: 'M8.5 5.5L15 12l-6.5 6.5',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6L6 18',
  pin: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z',
  hand: 'M8 13V6a1.8 1.8 0 0 1 3.6 0v5M11.6 11V5a1.8 1.8 0 0 1 3.6 0v6M15.2 11V7a1.8 1.8 0 0 1 3.6 0v8a6 6 0 0 1-6 6h-1.4a5 5 0 0 1-3.6-1.6L5 16',
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={ICONS[name] || ICONS.arrow} />
    </svg>
  )
}

export function BadgeArt({ id, className = 'h-9 w-9', color = 'currentColor' }) {
  const shapes = {
    seed: <><ellipse cx="12" cy="14" rx="5" ry="7" /><path d="M12 7V4" /></>,
    sprout: <><path d="M12 21v-8" /><path d="M12 13C8 13 6 10 6 7c4 0 6 3 6 6z" /><path d="M12 15c4 0 6-3 6-6-4 0-6 3-6 6z" /></>,
    grove: <><path d="M6 21v-6M12 21v-9M18 21v-7" /><circle cx="6" cy="9" r="3.5" /><circle cx="12" cy="7" r="4" /><circle cx="18" cy="10" r="3.5" /></>,
    canopy: <><path d="M4 19h16" /><path d="M8 19v-4M16 19v-4M12 19v-6" /><path d="M4 12c0-4 3.5-7 8-7s8 3 8 7" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[id] || shapes.seed}
    </svg>
  )
}
