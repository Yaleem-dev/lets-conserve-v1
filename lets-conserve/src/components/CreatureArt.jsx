/* Inline creature illustrations for the Eco-Creatures result card.
   Filled, chunky, high contrast, no external assets. */

const PALETTE = {
  outline: '#14352a',
}

const ART = {
  lion: (
    <>
      <ellipse cx="50" cy="52" rx="30" ry="28" fill="#e5a52a" />
      <circle cx="50" cy="52" r="20" fill="#f7d089" />
      <circle cx="43" cy="47" r="2.6" fill={PALETTE.outline} />
      <circle cx="57" cy="47" r="2.6" fill={PALETTE.outline} />
      <path d="M46 58c2.5 2.4 5.5 2.4 8 0" stroke={PALETTE.outline} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M50 52v3.5" stroke={PALETTE.outline} strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="32" r="6" fill="#e5a52a" />
      <circle cx="66" cy="32" r="6" fill="#e5a52a" />
    </>
  ),
  penguin: (
    <>
      <ellipse cx="50" cy="56" rx="21" ry="30" fill="#1d3f4f" />
      <ellipse cx="50" cy="60" rx="13" ry="22" fill="#f4f8f4" />
      <circle cx="43" cy="42" r="2.6" fill="#f4f8f4" />
      <circle cx="57" cy="42" r="2.6" fill="#f4f8f4" />
      <path d="M50 46l6 5-6 5-6-5z" fill="#f2a63c" />
      <path d="M29 58c-5 3-6 8-3 12M71 58c5 3 6 8 3 12" stroke="#1d3f4f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M40 84h8M52 84h8" stroke="#f2a63c" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  turtle: (
    <>
      <path d="M22 60c0-16 12.5-28 28-28s28 12 28 28z" fill="#2f7d4f" />
      <path d="M22 60h56" stroke="#1d5238" strokeWidth="2.4" />
      <path d="M50 34v26M36 40l3 20M64 40l-3 20M28 52h44" stroke="#1d5238" strokeWidth="1.8" fill="none" />
      <circle cx="50" cy="27" r="8" fill="#7ac48a" />
      <circle cx="48" cy="25" r="1.8" fill={PALETTE.outline} />
      <path d="M24 64c-6 2-9 6-9 10M76 64c6 2 9 6 9 10M34 70c-3 4-3 7-1 10M66 70c3 4 3 7 1 10" stroke="#2f7d4f" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  mangrove: (
    <>
      <path d="M50 18v34" stroke="#1d5238" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="30" r="15" fill="#3f8f56" />
      <circle cx="38" cy="38" r="10" fill="#4f9f63" />
      <circle cx="62" cy="38" r="10" fill="#4f9f63" />
      <path d="M50 52c-8 6-12 12-14 20M50 52c8 6 12 12 14 20M50 52v20M42 56c-4 6-5 11-5 16M58 56c4 6 5 11 5 16" stroke="#1d5238" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M14 76c10-4 18 3 28 0s18-4 26 0 16 3 18 1v13H14z" fill="#4fb0c9" opacity="0.85" />
    </>
  ),
  flytrap: (
    <>
      <path d="M50 55c-8-6-16-2-16 6s8 14 16 10z" fill="#8fc95f" />
      <path d="M50 55c8-6 16-2 16 6s-8 14-16 10z" fill="#7ab84f" />
      <path d="M40 60c4 2 8 2 10 0s6-2 10 0" stroke="#b8452f" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M36 53l-4-3M40 51l-2-4M44 51l1-4M56 51l-1-4M60 51l2-4M64 53l4-3" stroke="#5f9c33" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M50 78c-2 4-6 6-8 10M50 78c2 4 6 6 8 10" stroke="#5f9c33" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M50 72v6" stroke="#5f9c33" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  glowworm: (
    <>
      <rect x="10" y="12" width="80" height="76" rx="12" fill="#1b2a4a" />
      <circle cx="30" cy="26" r="1.6" fill="#f4f8f4" />
      <circle cx="70" cy="22" r="1.3" fill="#f4f8f4" />
      <circle cx="80" cy="40" r="1.3" fill="#f4f8f4" />
      <ellipse cx="52" cy="54" rx="15" ry="9" fill="#3c4a3a" />
      <circle cx="36" cy="52" r="7" fill="#3c4a3a" />
      <path d="M58 56c8 2 14 0 16-4" stroke="#b8f07a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="72" cy="58" rx="12" ry="9" fill="#d8f79a" opacity="0.5" />
      <ellipse cx="72" cy="57" rx="7" ry="6" fill="#eafbc0" />
      <path d="M44 44l-6-6M52 42v-8M30 50l-6-2" stroke="#3c4a3a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M24 78c6-3 12 2 18 0s12-3 18 0 12 2 16 0" stroke="#4f6b4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  ),
  monarch: (
    <>
      <path d="M50 50c-14-18-34-16-34 0s18 20 34 6z" fill="#f08a3c" />
      <path d="M50 50c14-18 34-16 34 0s-18 20-34 6z" fill="#f4a055" />
      <path d="M50 50c-8-10-20-10-22 0s10 14 22 2zM50 50c8-10 20-10 22 0s-10 14-22 2z" fill="#f6c07a" opacity="0.7" />
      <path d="M50 44v26M34 34l10 18M66 34L56 52M30 48l12 4M70 48l-12 4" stroke="#14352a" strokeWidth="2.2" fill="none" />
      <circle cx="24" cy="40" r="2" fill="#f4f8f4" />
      <circle cx="76" cy="40" r="2" fill="#f4f8f4" />
      <path d="M50 40l-3-8M50 40l3-8" stroke="#14352a" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="58" rx="3" ry="10" fill="#14352a" />
    </>
  ),
  bee: (
    <>
      <ellipse cx="50" cy="56" rx="24" ry="18" fill="#f2c445" />
      <path d="M34 46v22M50 40v32M66 46v22" stroke="#14352a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="30" cy="52" r="9" fill="#a8791a" />
      <path d="M38 36c8-10 22-10 28 2-8 4-20 4-28-2z" fill="#eaf6ff" opacity="0.9" />
      <path d="M38 36c8-10 22-10 28 2-8 4-20 4-28-2z" stroke="#7fa9c9" strokeWidth="1.8" fill="none" />
      <path d="M26 44l-8-6M26 60l-8 8" stroke="#14352a" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="30" cy="50" r="2" fill="#14352a" />
    </>
  ),
  leopard: (
    <>
      <circle cx="50" cy="54" r="24" fill="#e8eef0" />
      <path d="M30 34l6-8 8 6M70 34l-6-8-8 6" fill="#e8eef0" />
      <circle cx="42" cy="50" r="3" fill="#6fbf90" />
      <circle cx="58" cy="50" r="3" fill="#6fbf90" />
      <path d="M46 62c2.5 2 5.5 2 8 0" stroke="#14352a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="36" cy="42" r="2" fill="#9fb4b8" />
      <circle cx="64" cy="42" r="2" fill="#9fb4b8" />
      <circle cx="40" cy="58" r="2" fill="#9fb4b8" />
      <circle cx="60" cy="58" r="2" fill="#9fb4b8" />
      <circle cx="50" cy="38" r="1.8" fill="#9fb4b8" />
      <path d="M74 62c8 4 10 14 4 20" stroke="#e8eef0" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),
  gorilla: (
    <>
      <circle cx="50" cy="48" r="25" fill="#3c4a46" />
      <circle cx="50" cy="52" r="17" fill="#55665f" />
      <circle cx="43" cy="48" r="2.6" fill="#e8eef0" />
      <circle cx="57" cy="48" r="2.6" fill="#e8eef0" />
      <path d="M44 60c4 3 8 3 12 0" stroke="#e8eef0" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M50 52v5M46 55h8" stroke="#3c4a46" strokeWidth="2" strokeLinecap="round" />
      <circle cx="26" cy="44" r="7" fill="#3c4a46" />
      <circle cx="74" cy="44" r="7" fill="#3c4a46" />
      <path d="M26 74c6-8 16-12 24-12s18 4 24 12" fill="#3c4a46" />
    </>
  ),
}

export default function CreatureArt({ name = 'lion', className = 'h-24 w-24' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      stroke={PALETTE.outline}
      strokeWidth="2.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {ART[name] || ART.lion}
    </svg>
  )
}
