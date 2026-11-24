import { Icon, Doodle } from './StickmanArt.jsx'

/* Light green primary button, per the brief. Dark text for AA contrast:
   #1C5238 on #C9EE9C is about 7.4:1. */
export function Btn({ children, onClick, variant = 'leaf', className = '', ...rest }) {
  const styles = {
    leaf: 'bg-leaf text-green-deep border-leaf-edge hover:bg-leaf-2',
    soft: 'bg-leaf-3 text-green-deep border-leaf-edge hover:bg-leaf',
    chalk: 'bg-chalk text-paper border-chalk hover:bg-chalk-2',
    gold: 'bg-gold-tint text-gold-deep border-[#c99a20] hover:bg-gold hover:text-ink',
    warm: 'bg-warm text-warm-ink border-warm-edge hover:bg-warm-2',
    blush: 'bg-blush text-blush-ink border-blush-2 hover:bg-blush-2',
    ghost: 'bg-panel text-ink-soft border-line hover:border-green hover:text-green-deep',
    ghostLight: 'bg-paper/10 text-paper border-paper/40 hover:bg-leaf hover:text-green-deep hover:border-leaf',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] px-5 py-2.5 text-sm font-bold transition-all active:translate-y-[1px] ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Chapter({ children, tone = 'light', className = '' }) {
  const color = tone === 'dark' ? 'text-leaf' : 'text-green'
  return <p className={`chapter ${color} ${className}`}>{children}</p>
}

export function Chip({ children, tone = 'leaf' }) {
  const tones = {
    leaf: 'bg-leaf text-green-deep',
    soft: 'bg-leaf-3 text-green-deep',
    gold: 'bg-gold-tint text-gold-deep',
    chalk: 'bg-chalk/8 text-ink-soft',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-[0.04em] uppercase ${tones[tone]}`}>
      {children}
    </span>
  )
}

/* Active pill is light green, never dark green. */
export function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'inline-flex items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-[0.8125rem] font-bold transition-colors',
        active
          ? 'border-leaf-edge bg-leaf text-green-deep shadow-[inset_0_0_0_1px_rgba(16,64,42,0.10)]'
          : 'border-line bg-panel text-ink-soft hover:border-leaf-edge hover:bg-leaf-3',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/* Segmented toggle: active segment is light green. */
export function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-1.5 rounded-full border-[1.5px] border-line bg-panel/80 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={`flex-1 rounded-full px-4 py-2.5 text-[0.875rem] font-bold transition-colors ${
            value === o.id ? 'bg-leaf text-green-deep' : 'text-ink-soft hover:bg-leaf-3 hover:text-green-deep'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Points({ points, className = '', tone = 'light' }) {
  const light = tone === 'light'
  return (
    <span
      title="Eco-Points saved on this device"
      className={[
        'inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-[0.8125rem] font-bold tabular-nums',
        light ? 'border-leaf-2 bg-leaf-3 text-green-deep' : 'border-paper/30 text-paper',
        className,
      ].join(' ')}
    >
      <Doodle name="leaf" className="h-3.5 w-3.5" filter={false} />
      {points}
    </span>
  )
}

export function Meter({ value, max, tone = 'bg-green', track = 'bg-line' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full ${track}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${tone} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Ext({ href, children = 'Learn more', tone = 'light' }) {
  const color = tone === 'light' ? 'text-green-deep hover:text-green' : 'text-leaf hover:text-white'
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-[0.8125rem] font-bold ${color}`}>
      {children}
      <Icon name="external" className="h-3.5 w-3.5" strokeWidth={2.4} />
    </a>
  )
}

export function Head({ chapter, title, action, tone = 'light' }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b-[1.5px] border-line pb-3.5">
      <div>
        {chapter && <Chapter tone={tone}>{chapter}</Chapter>}
        <h2 className={`mt-1.5 text-xl md:text-[1.4rem]`}>{title}</h2>
      </div>
      {action}
    </div>
  )
}
