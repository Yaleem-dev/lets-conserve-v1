import { Icon } from './StickmanArt.jsx'

export function SectionHead({ eyebrow, title, sub, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-2xl md:text-[1.75rem]">{title}</h2>
        {sub && <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function Pill({ active, children, onClick, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors',
        active
          ? 'border-moss bg-moss text-white'
          : 'border-line bg-surface text-ink-soft hover:border-[#c9c7bb] hover:text-ink',
      ].join(' ')}
    >
      {children}
      {typeof count === 'number' && (
        <span className={active ? 'text-white/70' : 'text-slate'}>{count}</span>
      )}
    </button>
  )
}

export function Chip({ children, tone = 'moss' }) {
  const tones = {
    moss: 'bg-moss-tint text-moss-deep',
    clay: 'bg-clay-tint text-clay',
    sky: 'bg-sky-tint text-sky',
    gold: 'bg-gold-tint text-gold',
    quiet: 'bg-paper-2 text-slate',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.02em] ${tones[tone] || tones.moss}`}>
      {children}
    </span>
  )
}

export function PointsChip({ points, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] font-bold tabular-nums ${className}`}
      title="Eco-Points earned on this device"
    >
      <Icon name="leaf" className="h-4 w-4 text-moss" strokeWidth={2} />
      {points}
      <span className="font-medium text-slate">Eco-Points</span>
    </span>
  )
}

export function Progress({ value, max, tone = 'bg-moss' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-line-soft" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${tone} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-moss-deep hover:text-moss ${className}`}
    >
      {children}
      <Icon name="external" className="h-3.5 w-3.5" strokeWidth={2} />
    </a>
  )
}

export function Empty({ children }) {
  return (
    <div className="rounded-[14px] border border-dashed border-line bg-surface/60 px-6 py-12 text-center text-sm text-slate">
      {children}
    </div>
  )
}
