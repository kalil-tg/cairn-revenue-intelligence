import { useRef, useState, type KeyboardEvent } from 'react'
import { deals, type Deal, type DealStatus } from '../data'
import { ArrowIcon, CalendarIcon, ChevronIcon, ClockIcon, PersonIcon, TagIcon } from '../icons'

const tabNames = ['Forecast', 'Pipeline', 'Signals'] as const
type TabName = (typeof tabNames)[number]

function StatusLabel({ status }: { status: DealStatus }) {
  return <span className={`status status-${status.toLowerCase().replace(' ', '-')}`}><i aria-hidden="true" />{status}</span>
}

function ForecastChart() {
  return (
    <div className="forecast-chart">
      <svg viewBox="0 0 640 280" role="img" aria-labelledby="forecast-chart-title forecast-chart-desc">
        <title id="forecast-chart-title">Revenue forecast from April to September</title>
        <desc id="forecast-chart-desc">The forecast rises from 2.4 million euros in April to a projected range of 2.61 to 3.02 million euros in September.</desc>
        <defs>
          <linearGradient id="range-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f5f1eb" stopOpacity="0.23" />
            <stop offset="1" stopColor="#f5f1eb" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <g className="chart-grid"><path d="M0 44h640M0 104h640M0 164h640M0 224h640" /></g>
        <path className="chart-range" d="M382 155 C456 158 518 146 640 42 L640 164 C520 175 455 168 382 155Z" />
        <path className="chart-solid" d="M0 222 C40 199 54 208 86 187 S129 183 161 155 S219 143 260 122 S330 101 382 155" />
        <path className="chart-projected" d="M382 155 C467 145 551 122 640 82" />
        <circle cx="382" cy="155" r="7" />
      </svg>
      <table className="visually-hidden">
        <caption>Revenue forecast values</caption>
        <thead><tr><th>Month</th><th>Forecast</th></tr></thead>
        <tbody><tr><td>April</td><td>€2.4M</td></tr><tr><td>July</td><td>€2.75M</td></tr><tr><td>September</td><td>€2.84M, projected range €2.61M to €3.02M</td></tr></tbody>
      </table>
      <div className="chart-axis" aria-hidden="true"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
    </div>
  )
}

export function ForecastOverview({ compact = false }: { compact?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabName>('Forecast')
  const [quarter, setQuarter] = useState('Q3')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % tabNames.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabNames.length) % tabNames.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabNames.length - 1
    else return
    event.preventDefault()
    const tab = tabNames[next]
    if (tab) setActiveTab(tab)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={`forecast-overview ${compact ? 'is-compact' : ''}`}>
      <div className="dashboard-toolbar">
        <div className="tabs" role="tablist" aria-label="Revenue intelligence view">
          {tabNames.map((tab, index) => (
            <button
              key={tab}
              ref={(node) => { tabRefs.current[index] = node }}
              id={`tab-${compact ? 'compact-' : ''}${tab.toLowerCase()}`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${compact ? 'compact-' : ''}${tab.toLowerCase()}`}
              tabIndex={activeTab === tab ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >{tab}</button>
          ))}
        </div>
        <label className="quarter-control">
          <span className="visually-hidden">Forecast quarter</span>
          <select value={quarter} onChange={(event) => setQuarter(event.target.value)}>
            <option>Q2</option><option>Q3</option><option>Q4</option>
          </select>
          <ChevronIcon />
        </label>
      </div>

      <div id={`panel-${compact ? 'compact-' : ''}${activeTab.toLowerCase()}`} role="tabpanel" aria-labelledby={`tab-${compact ? 'compact-' : ''}${activeTab.toLowerCase()}`} className="dashboard-panel">
        {activeTab === 'Forecast' ? (
          <>
            <div className="forecast-main">
              <p>Revenue forecast · {quarter}</p>
              <strong>€2.84M</strong>
              <span>€2.61M — €3.02M</span>
              <ForecastChart />
            </div>
            <aside className="signal-panel" aria-label="Cairn signal">
              <div className="panel-title"><h3>Cairn signal</h3><span className="signal-square" aria-hidden="true" /></div>
              <p>Three late-stage deals need action this week.</p>
              <ul>
                {deals.slice(0, 3).map((deal) => <li key={deal.id}><span>{deal.company}</span><StatusLabel status={deal.status} /></li>)}
              </ul>
            </aside>
          </>
        ) : null}
        {activeTab === 'Pipeline' ? (
          <div className="pipeline-view">
            <p>Weighted pipeline · {quarter}</p>
            <strong>€6.31M</strong>
            <div className="pipeline-stages"><span><b>18</b>Qualified</span><span><b>11</b>Solution fit</span><span><b>7</b>Commercial</span><span><b>4</b>Commit</span></div>
          </div>
        ) : null}
        {activeTab === 'Signals' ? (
          <div className="signals-view">
            <p>Signal digest · {quarter}</p>
            <ul><li><span>Pricing risk</span><b>Arcadia Labs</b><small>Competitor mentioned 36 minutes ago</small></li><li><span>Momentum</span><b>Northstar Health</b><small>Executive sponsor re-engaged</small></li><li><span>Buying intent</span><b>Modo Systems</b><small>Three high-intent visits today</small></li></ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const filters: Array<'All deals' | DealStatus> = ['All deals', 'At risk', 'On track']

function EvidenceIcon({ type }: { type: Deal['evidence'][number]['type'] }) {
  if (type === 'person') return <PersonIcon />
  if (type === 'pricing') return <TagIcon />
  return <CalendarIcon />
}

export function DealExplorer() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All deals')
  const [selectedId, setSelectedId] = useState(deals[0]?.id ?? '')
  const [briefOpen, setBriefOpen] = useState(false)
  const visibleDeals = filter === 'All deals' ? deals : deals.filter((deal) => deal.status === filter)
  const selected = visibleDeals.find((deal) => deal.id === selectedId) ?? visibleDeals[0] ?? deals[0]

  function chooseFilter(nextFilter: (typeof filters)[number]) {
    setFilter(nextFilter)
    const nextDeals = nextFilter === 'All deals' ? deals : deals.filter((deal) => deal.status === nextFilter)
    if (!nextDeals.some((deal) => deal.id === selectedId)) setSelectedId(nextDeals[0]?.id ?? '')
    setBriefOpen(false)
  }

  if (!selected) return null

  return (
    <div className="deal-explorer">
      <div className="deal-list-panel">
        <h3>Open opportunities</h3>
        <div className="filter-group" role="group" aria-label="Filter open opportunities">
          {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => chooseFilter(item)}>{item}{item !== 'All deals' ? <StatusLabel status={item} /> : null}</button>)}
        </div>
        <div className="deal-list" role="list" aria-label={`${visibleDeals.length} open opportunities`}>
          {visibleDeals.map((deal) => (
            <div key={deal.id} role="listitem">
              <button type="button" className={selected.id === deal.id ? 'is-selected' : ''} aria-current={selected.id === deal.id ? 'true' : undefined} onClick={() => { setSelectedId(deal.id); setBriefOpen(false) }}>
                <span className="deal-company"><i aria-hidden="true" />{deal.company}</span><strong>{deal.amount}</strong><StatusLabel status={deal.status} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <section className="deal-detail" aria-live="polite" aria-labelledby="selected-deal-title">
        <div className="deal-detail-heading"><h3 id="selected-deal-title">{selected.company}</h3><span aria-hidden="true" /></div>
        <p className="detail-label">Why this deal changed</p>
        <p>{selected.summary}</p>
        <ol className="evidence-list">
          {selected.evidence.map((item) => <li key={item.title}><span className="evidence-icon"><EvidenceIcon type={item.type} /></span><span><b>{item.title}</b><small>{item.detail}</small></span></li>)}
        </ol>
        <button className="button button-primary deal-brief-button" type="button" aria-expanded={briefOpen} onClick={() => setBriefOpen((value) => !value)}>{briefOpen ? 'Close deal brief' : selected.action}<ArrowIcon /></button>
        {briefOpen ? <div className="deal-brief" role="status"><b>Recommended move</b><p>{selected.evidence[2]?.detail}. Lead with the strongest evidence and confirm the next decision date.</p></div> : null}
        <p className="updated"><ClockIcon />{selected.updated}</p>
      </section>
    </div>
  )
}
