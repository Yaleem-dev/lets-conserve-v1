/* ------------------------------------------------------------------
   Eco line-art doodle library
   Single stroke #2E5A36, no fill, rounded terminals, uniform weight,
   slightly wobbly hand-drawn feel (feTurbulence displacement).
   Each doodle is mapped to a real subject: water, waste, nature,
   energy, transport, climate, people.
------------------------------------------------------------------ */

const STROKE = 1.15
/* Wide hue ring, not an eco-green monoculture. Every glyph takes a hue
   from its own name, so a strip of eight icons reads as eight colours.
   `ink` holds the one fixed colour used for figures on light surfaces. */
const HUES = {
  light: ['#1C6B45', '#0F6E8C', '#B4610A', '#A23B2C', '#6F3C96', '#0E7490',
          '#3F6E13', '#AE2F62', '#2B5FA3', '#8A6A0A', '#4B7F52', '#96502A'],
  dark:  ['#8ADE9F', '#86D2F0', '#F3C463', '#F2A08F', '#CBA9F2', '#8FE3DD',
          '#D3EA84', '#F6A2C8', '#A6C1F7', '#EBD57F', '#A7E3A0', '#F0BC8E'],
}

function hueFor(name, tone) {
  const ring = HUES[tone === 'dark' ? 'dark' : 'light']
  let n = 7
  for (const ch of String(name)) n = (n * 33 + ch.charCodeAt(0)) % 9973
  return ring[n % ring.length]
}

/* No SVG filter primitives here on purpose. feTurbulence + feDisplacementMap
   blur the strokes and, on mobile GPUs, can paint large corrupted bands
   (the horizontal streak glitch). The hand-drawn feel lives in the path
   data itself, so every line stays crisp. */
export function LookDefs() {
  return null
}

/* --------------------------- doodle glyphs -------------------------- */
/* 24x24 grid, stroke only, round caps. */
const G = {
  /* --- recycling and waste --- */
  bin: (
    <>
      <path d="M5 7h14l-1.2 13.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z" />
      <path d="M3.4 7h17.2M9.5 7V4.4h5V7" />
      <path d="M12 10.4a3.4 3.4 0 0 1 2.9 1.6" />
      <path d="M16.4 14.2a3.4 3.4 0 0 1-4.4 3.2" />
      <path d="M8.9 15.4A3.4 3.4 0 0 1 10 11.2" />
      <path d="M14.6 11.4l.6-.6-.8-.6M11.9 17.3l-.6.4.5.6M9.6 11.5l-.6.5.7.6" />
    </>
  ),
  recycleHeart: (
    <>
      <path d="M12 20.4C6.6 16.6 3.2 13.6 3.2 9.9A4.7 4.7 0 0 1 12 7.2a4.7 4.7 0 0 1 8.8 2.7c0 3.7-3.4 6.7-8.8 10.5z" />
      <path d="M9.4 10.6a3 3 0 0 1 4.4-.5" />
      <path d="M14.6 12.4a3 3 0 0 1-2.6 3.4" />
      <path d="M10.2 14.2a3 3 0 0 1-.9-2.4" />
      <path d="M13.5 9.6l.6-.2-.2-.6" />
    </>
  ),
  globeArrows: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M5 12h14M12 5c2.4 2 3.6 4.4 3.6 7S14.4 17 12 19c-2.4-2-3.6-4.4-3.6-7S9.6 7 12 5z" />
      <path d="M2.6 9.4a9.6 9.6 0 0 1 3.4-4.6" />
      <path d="M3.8 5.6l1.8-.6.4 1.8" />
      <path d="M21.4 14.6a9.6 9.6 0 0 1-3.4 4.6" />
      <path d="M20.2 18.4l-1.8.6-.4-1.8" />
    </>
  ),

  /* --- water and weather --- */
  droplet: (
    <>
      <path d="M12 3.2c3.2 4 5.4 6.9 5.4 9.6a5.4 5.4 0 0 1-10.8 0c0-2.7 2.2-5.6 5.4-9.6z" />
      <path d="M9.6 13.4a2.6 2.6 0 0 0 1.6 2.6" />
    </>
  ),
  droplets: (
    <>
      <path d="M9.4 4.4c2.4 3 4 5.1 4 7.1a4 4 0 0 1-8 0c0-2 1.6-4.1 4-7.1z" />
      <path d="M17.4 12.4c1.5 1.9 2.5 3.2 2.5 4.5a2.5 2.5 0 0 1-5 0c0-1.3 1-2.6 2.5-4.5z" />
    </>
  ),
  tap: (
    <>
      <path d="M4.6 6.6h9.2a2.6 2.6 0 0 1 2.6 2.6v2.4" />
      <path d="M16.4 11.6h2.6v3h-2.6z" />
      <path d="M8.2 6.6V4.2M6.6 4.2h3.2" />
      <path d="M4.6 6.2v.8" />
      <path d="M17.7 17.2c1 1.3 1.6 2.1 1.6 2.9a1.6 1.6 0 0 1-3.2 0c0-.8.6-1.6 1.6-2.9z" />
    </>
  ),
  umbrella: (
    <>
      <path d="M2.6 12.2a9.4 9.4 0 0 1 18.8 0z" />
      <path d="M12 12.2v6.2a2.2 2.2 0 0 0 4.4 0" />
      <path d="M7.4 12.2c0-2.6 2-4.6 4.6-4.6s4.6 2 4.6 4.6" opacity="0.55" />
      <path d="M6.4 4.4l-1-1.6M12 3.2V1.4M17.6 4.4l1-1.6" />
    </>
  ),
  waves: (
    <>
      <path d="M3 8.4c1.6-1.8 3.2-1.8 4.8 0s3.2 1.8 4.8 0 3.2-1.8 4.8 0 2.6 1.4 3.6.6" />
      <path d="M3 13.4c1.6-1.8 3.2-1.8 4.8 0s3.2 1.8 4.8 0 3.2-1.8 4.8 0 2.6 1.4 3.6.6" />
      <path d="M3 18.4c1.6-1.8 3.2-1.8 4.8 0s3.2 1.8 4.8 0 3.2-1.8 4.8 0 2.6 1.4 3.6.6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </>
  ),

  /* --- nature and plants --- */
  tree: (
    <>
      <path d="M12 21v-5.4" />
      <path d="M12 15.6c-4.4 0-7.2-2.8-7.2-6.2C4.8 5.6 8 3 12 3s7.2 2.6 7.2 6.4c0 3.4-2.8 6.2-7.2 6.2z" />
      <path d="M9 9c1.8-1.4 4.2-1.4 6 0" opacity="0.55" />
      <path d="M9.6 18.4h4.8" />
    </>
  ),
  pine: (
    <>
      <path d="M12 2.6l4.4 6H16l4 5.4h-3.2l3.4 4.4H3.8L7.2 14H4l4-5.4H6.4z" />
      <path d="M12 18.4V21.4M10 21.4h4" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C10 4 4.6 8.6 4.6 14.6A5 5 0 0 0 9.6 19.6C15.6 19.6 20 13.6 20 4z" />
      <path d="M5.6 20.4C7.6 15.6 10.6 12 15 9.4" />
      <path d="M12.4 6.4l-1 2.4M9.4 10.4l-2.4 1" opacity="0.5" />
    </>
  ),
  sprig: (
    <>
      <path d="M4.6 20.4C6 13.4 9 7.4 14.4 3.6" />
      <path d="M7.4 16.4c-2.6.2-4.4-.8-5-2.6 2.4-.6 4.4.2 5 2.6z" />
      <path d="M9.6 12.4c.4-2.6 1.8-4.2 3.8-4.4-.2 2.4-1.4 4-3.8 4.4z" />
      <path d="M12.4 8.6c-2.4.6-4.2 0-5-1.8 2.2-.8 4.2-.2 5 1.8z" />
      <path d="M6.4 18.4c2.6-.6 4.4.2 5 2-2.2.6-4.2 0-5-2z" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="8.4" r="2.4" />
      <path d="M12 6a2.6 2.6 0 1 1 0-.2zM12 8.4c0-2.4 1-4 2.6-4s2.6 1.6 2.6 4-1 3.4-2.6 3.4" />
      <path d="M12 8.4c2.4 0 4 1 4 2.6s-1.6 2.6-4 2.6-3.4-1-3.4-2.6" />
      <path d="M12 8.4c0 2.4-1 4-2.6 4s-2.6-1.6-2.6-4 1-3.4 2.6-3.4" />
      <path d="M12 10.8v9.6" />
      <path d="M12 16.4c-2 .2-3.2-.6-3.6-2.2 1.8-.4 3.2.2 3.6 2.2z" />
    </>
  ),
  apple: (
    <>
      <path d="M12 8c-3.6-1.4-6.8.8-6.8 5.2 0 4 2.6 7.4 4.4 7.4.9 0 1.7-.5 2.4-.5s1.5.5 2.4.5c1.8 0 4.4-3.4 4.4-7.4C18.8 8.8 15.6 6.6 12 8z" />
      <path d="M12 8V4.6" />
      <path d="M12 5.4c1.4-1.4 3-1.6 4-.8-.6 1.6-2 2.2-4 2z" />
    </>
  ),
  ladybug: (
    <>
      <ellipse cx="12" cy="13.6" rx="5.6" ry="6.4" />
      <path d="M12 7.4v12.6" />
      <path d="M12 7.2a3 3 0 0 1 3 1.6M12 7.2a3 3 0 0 0-3 1.6" />
      <path d="M12 5.6l-1.4-1.6M12 5.6l1.4-1.6" />
      <path d="M6.8 11l-1.8-.6M6.4 14.6l-2 .4M7.6 17.8l-1.6 1.2M17.2 11l1.8-.6M17.6 14.6l2 .4M16.4 17.8l1.6 1.2" />
      <circle cx="9.6" cy="11.4" r=".9" /><circle cx="14.6" cy="13.4" r=".9" /><circle cx="9.8" cy="16.4" r=".9" />
    </>
  ),
  butterfly: (
    <>
      <path d="M12 8.4v8.4" />
      <path d="M12 8.6C10 5.2 6.4 4 4.8 5.6s-.6 5 2.6 6.2c2 .8 4 .2 4.6-1.4" />
      <path d="M12 8.6c2-3.4 5.6-4.6 7.2-3s.6 5-2.6 6.2c-2 .8-4 .2-4.6-1.4" />
      <path d="M12 12.4c-1.6 2.6-4 3.4-5.2 2.2s-.2-3.6 2.2-4.4" />
      <path d="M12 12.4c1.6 2.6 4 3.4 5.2 2.2s.2-3.6-2.2-4.4" />
      <path d="M12 8.4l-1.6-2.4M12 8.4l1.6-2.4" />
    </>
  ),

  /* --- energy --- */
  bulb: (
    <>
      <path d="M12 3.4a6 6 0 0 1 3.6 10.8c-.6.5-1 1.2-1 2v.6H9.4v-.6c0-.8-.4-1.5-1-2A6 6 0 0 1 12 3.4z" />
      <path d="M9.8 19.4h4.4M10.6 21.6h2.8" />
      <path d="M9.6 10.4c0-1.4 1-2.6 2.4-2.6" opacity="0.6" />
      <path d="M4.4 6.6l-1.6-1M19.6 6.6l1.6-1M12 .8" opacity="0.6" />
    </>
  ),
  plug: (
    <>
      <path d="M14.6 9.4l4-4" />
      <path d="M11.4 6.2l3.2 3.2-1.6 1.6a3.4 3.4 0 0 1-4.8 0l-.6-.6a3.4 3.4 0 0 1 0-4.8z" />
      <path d="M7 10.6l-3.4 3.4a2 2 0 0 0 0 2.8l1.2 1.2a2 2 0 0 0 2.8 0l3.4-3.4" />
      <path d="M4.6 3.4l1.8 1.8M8.6 2.2l1 1.4" />
    </>
  ),
  atom: (
    <>
      <ellipse cx="12" cy="12" rx="9.4" ry="4" />
      <ellipse cx="12" cy="12" rx="9.4" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.4" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  wind: (
    <>
      <path d="M2.6 8.4h10.8a2.6 2.6 0 1 0-2.6-2.6" />
      <path d="M2.6 13.4h13.8a2.6 2.6 0 1 1-2.6 2.6" />
      <path d="M5.4 18.4h6.8" />
    </>
  ),

  /* --- transport --- */
  bike: (
    <>
      <circle cx="6.2" cy="16.4" r="4" />
      <circle cx="18" cy="16.4" r="4" />
      <path d="M6.2 16.4l3.4-6.6h5.2l3.2 6.6" />
      <path d="M9.6 9.8h4M13.4 6.4h2.6l1.4 3.4" />
      <path d="M6.2 16.4h5.8l2.6-6.6" />
      <path d="M11.4 4.4h2.6" />
    </>
  ),
  car: (
    <>
      <path d="M2.6 15.4v-2.2l2-4.4A2 2 0 0 1 6.4 7.4h11.2a2 2 0 0 1 1.8 1.4l2 4.4v2.2" />
      <path d="M2.6 15.4h18.8" />
      <path d="M6.4 15.4a1.9 1.9 0 1 0 3.8 0 1.9 1.9 0 1 0-3.8 0M13.8 15.4a1.9 1.9 0 1 0 3.8 0 1.9 1.9 0 1 0-3.8 0" />
      <path d="M5 11.4h14M9.4 7.6v3.8" />
    </>
  ),

  /* --- people and places --- */
  house: (
    <>
      <path d="M3.4 11.4L12 4l8.6 7.4" />
      <path d="M5.4 10v9.4h13.2V10" />
      <path d="M9.6 19.4v-5.2h4.8v5.2" />
      <path d="M17.4 12.4a5.4 5.4 0 0 1-2 6.4" opacity="0.55" />
    </>
  ),
  factory: (
    <>
      <path d="M3.4 19.4V10l5 3.4V10l5 3.4V10l4.4 3v6.4z" />
      <path d="M3.4 19.4h17.2" />
      <path d="M7 6.4V3.4M11 6.4V4.4" />
      <path d="M16.4 19.4a4 4 0 0 1 .4-6.6" opacity="0.55" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8M12 3.6c2.8 2.4 4.2 5.2 4.2 8.4S14.8 18 12 20.4C9.2 18 7.8 15.2 7.8 12S9.2 6 12 3.6z" />
    </>
  ),

  /* --- people, simple line figures (not stick) --- */
  person: (
    <>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M6.4 20.4a5.6 5.6 0 0 1 11.2 0" />
      <path d="M9.4 13.6h5.2" opacity="0.5" />
    </>
  ),
  duo: (
    <>
      <circle cx="8.6" cy="7.6" r="2.8" />
      <circle cx="16" cy="8.4" r="2.4" />
      <path d="M3.4 19.4a5.2 5.2 0 0 1 10.4 0" />
      <path d="M14.4 19.4a4.4 4.4 0 0 1 6.2-4" />
    </>
  ),
  kite: (
    <>
      <path d="M12 3.4l5 5-5 6-5-6z" />
      <path d="M12 3.4v11M7 8.4h10" />
      <path d="M12 14.4c0 2-1.6 2.6-2.6 3.6 1.6.6 2 1.6 1.6 2.6" />
    </>
  ),
  hand: (
    <>
      <path d="M8.4 13.4V5.8a1.8 1.8 0 0 1 3.6 0v5.4" />
      <path d="M12 11.2V4.6a1.8 1.8 0 0 1 3.6 0v6.6" />
      <path d="M15.6 11.2V7.6a1.8 1.8 0 0 1 3.6 0v8a5.6 5.6 0 0 1-5.6 5.6h-1.4a4.8 4.8 0 0 1-3.4-1.4L5 16" />
    </>
  ),
}

/* Thin single stroke plus a faint offset ghost trace. Two overlapping
   lines that never quite meet is what makes a sketch read as sketched
   rather than as a geometric icon. `tone` swaps the hue ring for dark
   panels so nothing disappears into the chalkboard. */
export function Doodle({ name = 'leaf', className = 'h-6 w-6', tone = 'light', title, color, style }) {
  const glyph = G[name] || G.leaf
  const stroke = color || hueFor(name, tone)
  /* Slight weight drift per glyph: a drawn line is never one width. */
  let n = 5
  for (const ch of String(name)) n = (n * 29 + ch.charCodeAt(0)) % 977
  const weight = STROKE + ((n % 5) - 2) * 0.09
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      stroke={stroke}
      strokeWidth={weight.toFixed(2)}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <g>{glyph}</g>
      <g opacity="0.26" transform="translate(0.45 0.38) rotate(-2.2 12 12)">
        {glyph}
      </g>
    </svg>
  )
}

/* A cluster of doodles, used where a single glyph is too small to read */
export function DoodleCluster({ names = ['leaf', 'droplet', 'sun'], className = 'h-16 w-full' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {names.map((n, i) => (
        <Doodle key={`${n}-${i}`} name={n} className="h-full w-auto" />
      ))}
    </div>
  )
}

/* ------------------------- tiny UI icons --------------------------- */
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
  chevron: 'M8.5 5.5L15 12l-6.5 6.5',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6L6 18',
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={ICONS[name] || ICONS.arrow} />
    </svg>
  )
}

/* --------------------------- big scenes ---------------------------- */
/* Compositional scenes built from the same single-stroke language.
   Each scene is topic specific, so a card about water gets water. */
const SCENES = {
  water: ['droplet', 'tap', 'waves'],
  waste: ['bin', 'recycleHeart', 'globeArrows'],
  nature: ['tree', 'leaf', 'sprig'],
  forest: ['pine', 'tree', 'leaf'],
  energy: ['bulb', 'plug', 'sun'],
  climate: ['sun', 'wind', 'globe'],
  transport: ['bike', 'car', 'wind'],
  garden: ['flower', 'butterfly', 'ladybug'],
  harvest: ['apple', 'leaf', 'sprig'],
  home: ['house', 'bulb', 'droplet'],
  community: ['duo', 'house', 'tree'],
  learn: ['person', 'bulb', 'leaf'],
  explore: ['globe', 'kite', 'wind'],
  celebrate: ['person', 'sun', 'kite'],
  place: ['house', 'tree', 'bike'],

  /* one distinct set per quest card: no two actions share a combo */
  plant: ['sprig', 'hand', 'droplet'],
  outdoors: ['tree', 'kite', 'wind'],
  cleanup: ['hand', 'bin', 'droplets'],
  walk: ['bike', 'person', 'wind'],
  pollinator: ['flower', 'butterfly', 'sun'],
  teach: ['duo', 'hand', 'bulb'],
}

export function Scene({ name = 'nature', tone = 'light', className = 'h-full w-full' }) {
  const set = (SCENES[name] || SCENES.nature).slice(0, 3)
  const tilt = ['-7deg', '3deg', '-3deg']
  return (
    <div
      className={`grid w-full items-center gap-1.5 overflow-hidden ${className}`}
      style={{ gridTemplateColumns: `repeat(${set.length}, minmax(0, 1fr))`, gridAutoRows: '100%' }}
    >
      {set.map((g, i) => (
        <div key={`${g}-${i}`} className="flex min-w-0 items-center justify-center">
          <Doodle
            name={g}
            tone={tone}
            className="block h-full w-full"
            style={{ transform: `rotate(${tilt[i % 3]})`, opacity: i === 1 ? 1 : 0.9 }}
          />
        </div>
      ))}
    </div>
  )
}

/* a wide doodle strip for hero and footer bands */
export function Strip({ className = 'h-20 w-full', names = ['tree', 'bulb', 'bin', 'droplet', 'bike', 'leaf', 'sun', 'globe'], tone = 'light' }) {
  return (
    <div
      className={`grid w-full items-center gap-1 overflow-hidden ${className}`}
      style={{ gridTemplateColumns: `repeat(${names.length}, minmax(0, 1fr))`, gridAutoRows: '100%' }}
    >
      {names.map((n, i) => (
        <div key={`${n}-${i}`} className="flex min-w-0 items-center justify-center">
          <Doodle
            name={n}
            tone={tone}
            className="block h-full w-full"
            style={{ transform: `rotate(${i % 2 ? 4 : -4}deg)` }}
          />
        </div>
      ))}
    </div>
  )
}

/* milestone badge glyphs, same single-stroke language */
export function BadgeArt({ id, className = 'h-9 w-9' }) {
  const shapes = {
    seed: <><ellipse cx="12" cy="14" rx="5" ry="7" /><path d="M12 7V4" /></>,
    sprout: <><path d="M12 21v-8" /><path d="M12 13C8 13 6 10 6 7c4 0 6 3 6 6z" /><path d="M12 15c4 0 6-3 6-6-4 0-6 3-6 6z" /></>,
    grove: <><path d="M6 21v-6M12 21v-9M18 21v-7" /><circle cx="6" cy="9" r="3.5" /><circle cx="12" cy="7" r="4" /><circle cx="18" cy="10" r="3.5" /></>,
    canopy: <><path d="M4 19h16" /><path d="M8 19v-4M16 19v-4M12 19v-6" /><path d="M4 12c0-4 3.5-7 8-7s8 3 8 7" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[id] || shapes.seed}
    </svg>
  )
}

/* ==================================================================
   Stickman scenes, restored from v2 and re-palettised.
   Multi-colour single-stroke figures on a wavy ground line: people
   planting, walking, sorting, learning, cleaning, celebrating.
   These sit alongside the flat eco doodles so a page never shows the
   same illustration language twice in a row.
   No SVG filters: crisp strokes, no mobile GPU artefacts.
================================================================== */

/* gold, mint, sky, rose, cream. On cream cards the pale tones darken
   so nothing disappears. */
/* Chalk-side hues, bright enough to sit on #0f2418. */
const RING_DARK = ['#F3C463', '#8ADE9F', '#86D2F0', '#F2A08F', '#CBA9F2', '#D3EA84', '#F6A2C8', '#8FE3DD', '#F0BC8E']
/* Card-side versions of the same ring, darkened so thin lines stay legible. */
const RING_LIGHT = ['#9A6B08', '#276C50', '#28688C', '#A23B2C', '#6F3C96', '#3F6E13', '#AE2F62', '#0E7490', '#96502A']

/* Rotating the ring per scene means two scenes on one page never land on
   the same colour order. `e` stays fixed: it is the figure ink. */
function pal(tone, seed = '') {
  const ring = tone === 'dark' ? RING_DARK : RING_LIGHT
  let n = 3
  for (const ch of String(seed)) n = (n * 31 + ch.charCodeAt(0)) % 9973
  const k = n % ring.length
  const pick = (i) => ring[(k + i) % ring.length]
  return {
    a: pick(0), b: pick(2), c: pick(3), d: pick(5), f: pick(6), g: pick(7),
    e: tone === 'dark' ? '#F2F3E6' : '#1B3828',
  }
}

function ChalkScene({ children, tone = 'light', seed = '', className = '', viewBox = '14 14 192 132' }) {
  const p = pal(tone, seed)
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
    <ChalkScene tone={tone} seed="planting" className={className}>
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
    </ChalkScene>
  )
}

export function ArtWalking({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="walking" className={className}>
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
    </ChalkScene>
  )
}

export function ArtRecycling({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="recycling" className={className}>
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
    </ChalkScene>
  )
}

export function ArtLearning({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="learning" className={className}>
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
    </ChalkScene>
  )
}

export function ArtOutdoors({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="outdoors" className={className}>
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
    </ChalkScene>
  )
}

export function ArtCleanup({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="cleanup" className={className}>
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
    </ChalkScene>
  )
}

export function ArtTree({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="tree" className={className}>
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
    </ChalkScene>
  )
}

export function ArtLeaf({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="leaf" className={className}>
      {(p) => (
        <>
          <path d="M108 128C70 118 50 88 56 44c42 4 68 32 52 84z" stroke={p.b} />
          <path d="M108 128C72 106 64 78 56 44" stroke={p.b} opacity="0.6" />
          <path d="M90 88l-16 2M98 104l-19 4M82 68l-14 0" stroke={p.a} opacity="0.75" />
          <path d="M150 104q12-6 24-2" stroke={p.c} opacity="0.6" strokeWidth="2" />
          <path d="M34 104v-10M29 99h10" stroke={p.d} opacity="0.7" strokeWidth="2" />
        </>
      )}
    </ChalkScene>
  )
}

export function ArtSun({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="sun" className={className}>
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
    </ChalkScene>
  )
}

export function ArtCycle({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="cycle" className={className}>
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
    </ChalkScene>
  )
}

export function ArtShare({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="share" className={className}>
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
    </ChalkScene>
  )
}

export function ArtCelebrate({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="celebrate" className={className}>
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
    </ChalkScene>
  )
}

export function ArtQuiz({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="quiz" className={className}>
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
    </ChalkScene>
  )
}

/* a wide landscape strip, used as a divider band */
export function ArtHorizon({ tone, className }) {
  return (
    <ChalkScene tone={tone} seed="horizon" className={className} viewBox="0 0 320 90">
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
    </ChalkScene>
  )
}

/* name -> {stick, doodles}: which stickman scene an art key can borrow */
const ART_MIX = {
  plant:      { stick: 'planting' },
  outdoors:   { stick: 'outdoors' },
  cleanup:    { stick: 'cleanup' },
  walk:       { stick: 'walking' },
  transport:  { stick: 'walking' },
  pollinator: { stick: 'tree' },
  teach:      { stick: 'share' },
  community:  { stick: 'share' },
  learn:      { stick: 'learning' },
  waste:      { stick: 'recycling' },
  celebrate:  { stick: 'celebrate' },
  quiz:       { stick: 'quiz' },
  climate:    { stick: 'cycle' },
  garden:     { stick: 'tree' },
  forest:     { stick: 'tree' },
  harvest:    { stick: 'tree' },
  nature:     { stick: 'tree' },
  explore:    { stick: 'outdoors' },
  place:      { stick: 'outdoors' },
  energy:     { stick: null },
  water:      { stick: null },
  home:       { stick: null },
}

export function StickScene({ name = 'planting', tone = 'light', className = 'h-24 w-full' }) {
  const S = STICK[name] || STICK.planting
  return <S tone={tone} className={className} />
}

/* One entry point used by every view.
   variant="stick"  -> multi-colour figure scene on a ground line
   variant="doodle" -> flat single-stroke object trio
   variant="auto"   -> figure if the topic has one and the box is tall
   Both styles share the same frame, so mixing them reads as one set. */
export function Art({ name = 'nature', variant = 'auto', tone = 'light', className = 'h-16 w-full' }) {
  const m = ART_MIX[name] || {}
  const tall = /h-(1[6-9]|2[0-9]|3[0-9]|[4-9][0-9])/.test(className)
  const useStick = variant === 'stick' || (variant === 'auto' && m.stick && tall)
  if (useStick && m.stick) {
    return (
      <div className={`art-frame ${className}`}>
        <StickScene name={m.stick} tone={tone} className="h-full w-full" />
      </div>
    )
  }
  return (
    <div className={`art-frame ${className}`}>
      <Scene name={name} tone={tone} />
    </div>
  )
}

const STICK = {
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
