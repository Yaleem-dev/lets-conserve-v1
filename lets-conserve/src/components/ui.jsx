import { Icon } from './StickmanArt.jsx'

/* light green button, the primary action style */
export function Btn({ children, onClick, variant = 'leaf', className = '', ...rest }) {
  const styles = {
    leaf: 'bg-leaf text-green-deep border-leaf-2 hover:bg-leaf-2',
    chalk: 'bg-chalk text-paper border-chalk hover:bg-chalk-2',
    gold: 'bg-gold text-chalk border-gold-deep',
    ghost: 'bg-transparent text-ink-soft border-line hover:border-green hover:text-green-deep',
    ghostLight: 'bg-transparent text-paper/90 border-paper/35 hover:border-gold hover:text-gold',
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

export function Chapter({ children, tone = 'dark', className = '' }) {
  const color = tone === 'dark' ? 'text-mint' : 'text-green'
  return <p className={`chapter ${color} ${className}`}>{children}</p>
}

export function Chip({ children, tone = 'leaf' }) {
  const tones = {
    leaf: 'bg-leaf text-green-deep',
    gold: 'bg-gold-tint text-gold-deep',
    mint: 'bg-[#e2f4ea] text-green-deep',
    sky: 'bg-[#e3f0f8] text-[#2F7DA6]',
    rose: 'bg-[#fbe7ec] text-[#C05575]',
    chalk: 'bg-[#14271f]/8 text-ink-soft',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-[0.04em] uppercase ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function Pill({ active, children, onClick, dot }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'inline-flex items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-[0.8125rem] font-bold transition-colors',
        active
          ? 'border-green bg-green text-paper'
          : 'border-line bg-card text-ink-soft hover:border-green/50 hover:text-green-deep',
      ].join(' ')}
    >
      {dot && <span className="h-2 w-2 rounded-full bg-gold" />}
      {children}
    </button>
  )
}

export function Points({ points, className = '', tone = 'light' }) {
  const light = tone === 'light'
  return (
    <span
      title="Eco-Points saved on this device"
      className={[
        'inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-[0.8125rem] font-bold tabular-nums',
        light ? 'border-line bg-card text-ink' : 'border-paper/30 text-paper',
        className,
      ].join(' ')}
    >
      <Icon name="leaf" className="h-3.5 w-3.5 text-green" strokeWidth={2.4} />
      {points}
    </span>
  )
}

export function Meter({ value, max, tone = 'bg-green', track = 'bg-line-soft' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full ${track}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${tone} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Ext({ href, children = 'Visit', tone = 'light' }) {
  const color = tone === 'light' ? 'text-green-deep hover:text-green' : 'text-gold hover:text-gold/80'
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
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3.5">
      <div>
        {chapter && <Chapter tone={tone}>{chapter}</Chapter>}
        <h2 className={`mt-1.5 text-xl md:text-[1.4rem] ${tone === 'dark' ? 'text-paper' : ''}`}>{title}</h2>
      </div>
      {action}
    </div>
  )
}
