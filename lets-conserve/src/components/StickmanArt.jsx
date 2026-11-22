/* ------------------------------------------------------------------
   Eco line-art doodle library
   Single stroke #2E5A36, no fill, rounded terminals, uniform weight,
   slightly wobbly hand-drawn feel (feTurbulence displacement).
   Each doodle is mapped to a real subject: water, waste, nature,
   energy, transport, climate, people.
------------------------------------------------------------------ */

const STROKE = 2.4
const DOODLE_GREEN = '#2E5A36'

export function LookDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <filter id="wobble" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022 0.03" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="wobble-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
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

export function Doodle({ name = 'leaf', className = 'h-6 w-6', filter = false, title }) {
  const glyph = G[name] || G.leaf
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={DOODLE_GREEN}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter={filter ? 'url(#wobble-soft)' : undefined}
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {glyph}
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
}

export function Scene({ name = 'nature', className = 'h-24 w-full', size = 'h-14 w-14', filter = false }) {
  const set = SCENES[name] || SCENES.nature
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
      {set.map((g, i) => (
        <Doodle
          key={`${g}-${i}`}
          name={g}
          filter={filter}
          className={`${size} ${i === 1 ? 'scale-110' : i === 2 ? 'opacity-70' : ''}`}
        />
      ))}
    </div>
  )
}

/* a wide doodle strip for hero and footer bands */
export function Strip({ className = 'h-20 w-full', names = ['tree', 'bulb', 'bin', 'droplet', 'bike', 'leaf', 'sun', 'globe'], filter = true }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      {names.map((n, i) => (
        <Doodle key={`${n}-${i}`} name={n} filter={filter} className="h-full w-auto opacity-90" />
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
