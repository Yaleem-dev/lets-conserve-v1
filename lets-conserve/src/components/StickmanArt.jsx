/* ------------------------------------------------------------------
   Stickman & outline art library
   Hand-drawn feel: single stroke weight, rounded caps, no fills.
   Every figure is inline SVG so it inherits currentColor.
------------------------------------------------------------------ */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Frame({ children, className = '', viewBox = '0 0 220 150' }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" focusable="false" {...S}>
      {children}
    </svg>
  )
}

const Ground = () => (
  <line x1="16" y1="127" x2="204" y2="127" opacity="0.22" />
)

/* ------------------------------- figures ------------------------------ */

const ArtPlant = () => (
  <Frame>
    <Ground />
    <path d="M152 127 V88" />
    <path d="M152 104 C136 102 128 90 130 77 C146 79 152 90 152 104 Z" />
    <path d="M152 116 C168 114 176 102 174 89 C158 91 152 102 152 116 Z" />
    <path d="M138 127 q14 -7 28 0" opacity="0.5" />

    <circle cx="76" cy="60" r="9.5" />
    <path d="M76 70 V101" />
    <path d="M76 79 L94 86" />
    <path d="M76 101 L64 127" />
    <path d="M76 101 L90 127" />

    <path d="M94 82 h14a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1 -2.5 2.5h-14a2.5 2.5 0 0 1 -2.5 -2.5v-10a2.5 2.5 0 0 1 2.5 -2.5z" />
    <path d="M110 86 l12 -6" />
    <path d="M96 82 c3 -6 8 -8 12 -7" />
    <path d="M126 92 v6" opacity="0.75" />
    <path d="M131 99 v9" opacity="0.75" />
    <path d="M124 105 v5" opacity="0.5" />
  </Frame>
)

const ArtWalk = () => (
  <Frame>
    <Ground />
    <circle cx="84" cy="56" r="9.5" />
    <path d="M84 66 L79 95" />
    <path d="M82 74 L99 82" />
    <path d="M82 76 L66 86" />
    <path d="M79 95 L64 118" />
    <path d="M79 95 L96 110 L102 127" />

    <circle cx="172" cy="42" r="12" />
    <path d="M172 22 v-6M172 68 v-6M192 42 h6M146 42 h6M186 28 l5 -5M153 61 l5 -5M186 56 l5 5M153 23 l5 5" opacity="0.6" />
    <path d="M40 44 q6 -6 12 0 q6 -6 12 0" opacity="0.45" />
    <path d="M30 62 q5 -5 10 0 q5 -5 10 0" opacity="0.3" />
  </Frame>
)

const ArtRecycle = () => (
  <Frame>
    <Ground />
    <path d="M86 76 h48 l-5 44a6 6 0 0 1 -6 5h-26a6 6 0 0 1 -6 -5z" />
    <path d="M79 76 h62" />
    <path d="M99 76 l3 -8h16l3 8" />

    <path d="M104 100 a13 13 0 0 1 13 -4" opacity="0.8" />
    <path d="M136 100 a13 13 0 0 1 -13 13" opacity="0.8" />
    <path d="M104 100 a13 13 0 0 1 13 13" opacity="0.8" />
    <path d="M117 96 l0 5 5 -1" opacity="0.8" />
    <path d="M117 113 l-5 -2 3 -5" opacity="0.8" />

    <circle cx="48" cy="60" r="9.5" />
    <path d="M48 70 L50 98" />
    <path d="M49 78 L66 70" />
    <path d="M49 80 L36 92" />
    <path d="M50 98 L38 127" />
    <path d="M50 98 L64 127" />
    <path d="M62 58 h11 v20h-11z" transform="rotate(-14 67 68)" />
  </Frame>
)

const ArtLearn = () => (
  <Frame>
    <Ground />
    <circle cx="110" cy="48" r="9.5" />
    <path d="M110 58 V86" />
    <path d="M110 86 c-14 0 -20 8 -26 14" />
    <path d="M110 86 c14 0 20 8 26 14" />
    <path d="M84 100 h52" opacity="0.0" />

    <path d="M92 88 c9 -5 15 -4 18 0 c3 -4 9 -5 18 0 l0 16 c-9 -4 -15 -4 -18 0 c-3 -4 -9 -4 -18 0 z" />
    <path d="M110 88 v16" />

    <path d="M152 44 q10 -6 20 0 q-10 6 -20 0z" opacity="0.55" />
    <path d="M40 52 q10 -6 20 0 q-10 6 -20 0z" opacity="0.35" />
    <path d="M64 30 q0 12 -8 16" opacity="0.25" />
  </Frame>
)

const ArtOutdoor = () => (
  <Frame>
    <Ground />
    <path d="M14 120 L52 70 L76 100 L92 82 L124 120" />
    <path d="M118 120 L152 78 L196 120" />
    <path d="M52 70 l-6 8 h12 z" opacity="0.5" />
    <circle cx="166" cy="34" r="11" />
    <path d="M166 16 v-5M166 57 v5M185 34 h5M142 34 h5" opacity="0.55" />
    <path d="M34 40 q5 -5 10 0 q5 -5 10 0" opacity="0.4" />

    <circle cx="96" cy="66" r="8" />
    <path d="M96 74 V98" />
    <path d="M96 82 L110 90" />
    <path d="M96 82 L84 90" />
    <path d="M96 98 L88 120" />
    <path d="M96 98 L106 120" />
    <path d="M88 78 c-6 0 -8 4 -8 9v9h16v-9c0 -5 -2 -9 -8 -9z" opacity="0.45" />
  </Frame>
)

const ArtCleanup = () => (
  <Frame>
    <Ground />
    <circle cx="72" cy="52" r="9.5" />
    <path d="M72 62 L74 96" />
    <path d="M73 72 L90 80" />
    <path d="M73 74 L56 84" />
    <path d="M74 96 L62 127" />
    <path d="M74 96 L88 127" />

    <path d="M90 80 L118 112" />
    <path d="M112 106 l10 10" />
    <path d="M114 120 l6 6" opacity="0.6" />

    <path d="M148 84 h34 a4 4 0 0 1 4 4 v34 a4 4 0 0 1 -4 4 h-34 a4 4 0 0 1 -4 -4 v-34 a4 4 0 0 1 4 -4z" />
    <path d="M156 84 c0 -8 5 -12 9 -12 c5 0 9 4 9 12" />
    <path d="M150 96 h30" opacity="0.4" />
    <path d="M160 118 q5 -10 14 -12" opacity="0.45" />
  </Frame>
)

const ArtTree = () => (
  <Frame>
    <Ground />
    <path d="M110 127 V78" />
    <path d="M110 96 l-16 -12" />
    <path d="M110 104 l16 -12" />
    <path d="M110 78 c-26 0 -40 -18 -38 -36 c2 -16 16 -26 32 -26 c20 0 34 14 34 32 c0 18 -12 30 -28 30z" />
    <path d="M96 40 q14 -10 28 0" opacity="0.4" />
    <path d="M64 56 q-10 -8 -6 -18" opacity="0.3" />
  </Frame>
)

const ArtLeaf = () => (
  <Frame>
    <path d="M110 120 C74 112 52 84 56 44 C96 48 122 74 110 120 Z" />
    <path d="M110 120 C74 100 66 74 56 44" opacity="0.55" />
    <path d="M92 84 l-16 2M100 100 l-18 4M84 66 l-14 0" opacity="0.35" />
    <path d="M148 118 q14 -6 26 -2" opacity="0.25" />
  </Frame>
)

const ArtSun = () => (
  <Frame>
    <circle cx="110" cy="72" r="28" />
    <path d="M110 30 V16M110 128 V114M152 72 h14M54 72 h14M140 42 l10 -10M70 102 l10 -10M140 102 l10 10M70 42 l10 10" />
    <path d="M26 120 q14 -8 28 0" opacity="0.3" />
  </Frame>
)

const ArtCycle = () => (
  <Frame>
    <path d="M110 34 a38 38 0 0 1 33 19" />
    <path d="M148 40 l-6 16 -12 -8" />
    <path d="M148 76 a38 38 0 0 1 -33 40" />
    <path d="M136 128 l-16 -12 16 -8" />
    <path d="M72 104 a38 38 0 0 1 0 -46" opacity="0.85" />
    <path d="M60 68 l4 -16 12 8" opacity="0.85" />
    <circle cx="110" cy="75" r="11" opacity="0.35" />
  </Frame>
)

const ArtShare = () => (
  <Frame>
    <Ground />
    <circle cx="72" cy="58" r="9.5" />
    <path d="M72 68 V102" />
    <path d="M72 78 L86 86" />
    <path d="M72 78 L58 88" />
    <path d="M72 102 L62 127" />
    <path d="M72 102 L82 127" />

    <circle cx="148" cy="58" r="9.5" />
    <path d="M148 68 V102" />
    <path d="M148 78 L134 86" />
    <path d="M148 102 L138 127" />
    <path d="M148 102 L158 127" />

    <path d="M96 44 q14 -10 28 0" opacity="0.5" />
    <path d="M124 44 l-4 -5 6 -2" opacity="0.5" />
    <path d="M96 60 q14 10 28 0" opacity="0.25" />
  </Frame>
)

const ArtCelebrate = () => (
  <Frame>
    <Ground />
    <circle cx="110" cy="56" r="10" />
    <path d="M110 66 V100" />
    <path d="M110 74 L92 54" />
    <path d="M110 74 L128 54" />
    <path d="M110 100 L96 127" />
    <path d="M110 100 L126 127" />
    <circle cx="80" cy="34" r="2.5" opacity="0.6" />
    <circle cx="140" cy="30" r="2.5" opacity="0.6" />
    <circle cx="64" cy="62" r="2" opacity="0.45" />
    <circle cx="158" cy="66" r="2" opacity="0.45" />
    <path d="M70 44 l-6 -6M150 44 l6 -6M96 22 l-2 -8M126 22 l2 -8" opacity="0.4" />
  </Frame>
)

const ArtQuiz = () => (
  <Frame>
    <path d="M64 30 h72 a6 6 0 0 1 6 6 v68 a6 6 0 0 1 -6 6 h-72 a6 6 0 0 1 -6 -6 v-68 a6 6 0 0 1 6 -6z" />
    <path d="M78 52 h36M78 66 h44M78 80 h22" opacity="0.5" />
    <circle cx="150" cy="96" r="24" />
    <path d="M142 88 c0 -6 5 -9 9 -9 c5 0 9 3 9 9 c0 5 -5 6 -8 9 v3" />
    <circle cx="152" cy="108" r="2" />
  </Frame>
)

const ART = {
  plant: ArtPlant,
  walk: ArtWalk,
  recycle: ArtRecycle,
  learn: ArtLearn,
  outdoor: ArtOutdoor,
  cleanup: ArtCleanup,
  tree: ArtTree,
  leaf: ArtLeaf,
  sun: ArtSun,
  cycle: ArtCycle,
  share: ArtShare,
  celebrate: ArtCelebrate,
  quiz: ArtQuiz,
}

export function StickmanArt({ name = 'plant', className = 'h-32 w-full' }) {
  const Component = ART[name] || ArtPlant
  return <Component className={className} />
}

/* -------------------------------- icons ------------------------------- */

const ICONS = {
  home: <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M9.5 20v-6h5v6" />,
  learn: <path d="M4 4.5h6.5a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4zM20 4.5h-6.5a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2H20z" />,
  discover: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z" />,
  quest: <path d="M5 21V4M5 4h11l-1.5 4L16 12H5" />,
  explore: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />,
  arrow: <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />,
  check: <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />,
  search: <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM16.2 16.2 21 21" />,
  external: <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19.5v-11A1.5 1.5 0 0 1 5.5 7H11" />,
  leaf: <path d="M20 4c-8 0-14 4-14 10a6 6 0 0 0 6 6c6 0 8-8 8-16zM6 20c2-4 5-7 9-9" />,
  spark: <path d="M12 3v5M12 16v5M4.5 12h5M14.5 12h5M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />,
  chevron: <path d="M8.5 5.5 15 12l-6.5 6.5" />,
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name] || ICONS.spark}
    </svg>
  )
}

/* -------------------------------- badges ------------------------------ */

export function BadgeArt({ id, className = 'h-9 w-9' }) {
  const shapes = {
    seed: <><ellipse cx="12" cy="14" rx="5" ry="7" /><path d="M12 7v-3" /></>,
    sprout: <><path d="M12 21v-8" /><path d="M12 13C8 13 6 10 6 7c4 0 6 3 6 6z" /><path d="M12 15c4 0 6-3 6-6-4 0-6 3-6 6z" /></>,
    grove: <><path d="M6 21v-6M12 21v-9M18 21v-7" /><circle cx="6" cy="9" r="3.5" /><circle cx="12" cy="7" r="4" /><circle cx="18" cy="10" r="3.5" /></>,
    canopy: <><path d="M4 19h16" /><path d="M8 19v-4M16 19v-4M12 19v-6" /><path d="M4 12c0-4 3.5-7 8-7s8 3 8 7" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[id] || shapes.seed}
    </svg>
  )
}
