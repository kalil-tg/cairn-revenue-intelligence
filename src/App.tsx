import { useState } from 'react'
import { DealExplorer, ForecastOverview } from './components/Dashboard'
import { ProductTourDialog, RequestAccessDialog } from './components/Dialogs'
import { activity } from './data'
import { ActivityIcon, ArrowIcon, PlayIcon } from './icons'

function Brand() {
  return <a className="wordmark" href="#top" aria-label="Cairn home">CAIRN</a>
}

export default function App() {
  const [accessOpen, setAccessOpen] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)

  return (
    <div className="page-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header shell-wide">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#use-cases">Use cases</a>
          <a href="#company">Company</a>
        </nav>
        <button className="button button-primary header-cta" type="button" onClick={() => setAccessOpen(true)}>Request access</button>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation"><a href="#product">Product</a><a href="#use-cases">Use cases</a><a href="#company">Company</a></nav>
        </details>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero-section">
          <div className="hero-grid shell-wide">
            <div className="hero-copy">
              <h1>See the quarter<br />before it<br />happens.</h1>
              <p>Cairn turns every call, email, and pipeline change into a forecast your team can trust.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#product">Explore the forecast</a>
                <button className="button button-secondary" type="button" onClick={() => setTourOpen(true)}><PlayIcon />Watch 90 sec</button>
              </div>
            </div>
            <ForecastOverview compact />
          </div>
          <div className="signal-line signal-line-hero" aria-hidden="true"><span /></div>
        </section>

        <section className="workflow-section" aria-labelledby="workflow-title">
          <div className="shell-wide">
            <div className="section-intro workflow-intro">
              <div><h2 id="workflow-title">Built for how<br />revenue teams work.</h2><p>One shared view of what changed, what matters,<br />and what to do next.</p></div>
              <div className="continuum" aria-hidden="true"><span>From activity to action</span><i /></div>
            </div>

            <div className="workflow-steps">
              <article><span className="section-number">01</span><h3>Connect the signals</h3><p>Calls, emails, CRM activity, and buying intent move into one timeline.</p></article>
              <article><span className="section-number">02</span><h3>Read the risk</h3><p>Cairn explains momentum, blockers, and confidence in plain language.</p></article>
              <article><span className="section-number">03</span><h3>Act with context</h3><p>Every recommendation links back to the evidence behind it.</p></article>
            </div>

            <div className="signal-workflow">
              <ol className="activity-timeline" aria-label="Recent revenue signals">
                {activity.map(([time, title, company, icon]) => (
                  <li key={`${time}-${title}`}><time>{time}</time><span className="timeline-node" aria-hidden="true" /><span className="activity-icon"><ActivityIcon type={icon} /></span><span><b>{title}</b><small>{company}</small></span></li>
                ))}
              </ol>
              <div className="signal-engine" aria-label="Cairn analysis engine">
                <span className="engine-box" aria-hidden="true">C</span>
                <ul><li><i className="trend-up" aria-hidden="true">↗</i><span><b>Momentum</b><small>Improving</small></span><em className="dot-success" aria-hidden="true" /></li><li><i aria-hidden="true">—</i><span><b>Risk</b><small>Pricing pushback</small></span><em className="dot-warning" aria-hidden="true" /></li><li><i aria-hidden="true">▥</i><span><b>Confidence</b><small>Medium</small></span><em className="dot-warning" aria-hidden="true" /></li></ul>
              </div>
              <ol className="recommended-actions" aria-label="Recommended next actions">
                <li><button type="button"><span><b>Reinforce ROI value</b><small>Arcadia Labs · Due this week</small></span><ArrowIcon /></button></li>
                <li><button type="button"><span><b>Prepare pricing response</b><small>Northstar Health · Due this week</small></span><ArrowIcon /></button></li>
                <li><button type="button"><span><b>Engage economic buyer</b><small>Modo Systems · Next week</small></span><ArrowIcon /></button></li>
              </ol>
            </div>

            <div className="workflow-dashboard"><ForecastOverview /></div>
          </div>
        </section>

        <section className="product-section" id="product" aria-labelledby="product-title">
          <div className="shell-wide">
            <span className="section-number">03</span>
            <h2 id="product-title">The forecast, explained.</h2>
            <p className="section-lead">Move from a number to the evidence behind it.</p>
            <DealExplorer />
          </div>
          <div className="signal-line signal-line-product" aria-hidden="true"><span /></div>
        </section>

        <section className="use-cases-section" id="use-cases" aria-labelledby="use-cases-title">
          <div className="shell-wide">
            <div className="section-intro">
              <div><h2 id="use-cases-title">Built for the decisions<br />that move revenue.</h2><p>One intelligence layer. Three clearer ways to lead.</p></div>
            </div>
            <div className="use-cases-grid">
              <div className="role-list">
                <ol><li><span>01</span><b>Sales leadership</b></li><li><span>02</span><b>Revenue operations</b></li><li><span>03</span><b>Frontline managers</b></li></ol>
                <a className="button button-secondary" href="#company">Explore use cases <span className="accent-square" aria-hidden="true" /></a>
              </div>
              <div className="decision-view">
                <dl><div><dt>Commit</dt><dd><span style={{ '--position': '56%' } as React.CSSProperties} /></dd></div><div><dt>Best case</dt><dd><span style={{ '--position': '82%' } as React.CSSProperties} /></dd></div><div><dt>Pipeline</dt><dd><span style={{ '--position': '22%' } as React.CSSProperties} /></dd></div></dl>
                <h3>Call the quarter with confidence.</h3>
                <p>See the range, the risk, and the evidence behind every change.</p>
                <ul><li>Know where the forecast moved</li><li>See which deals changed it</li><li>Align the team on next actions</li></ul>
              </div>
            </div>
            <p className="use-cases-statement">Less time defending the number. More time changing it.</p>
          </div>
          <div className="signal-line signal-line-use-cases" aria-hidden="true"><span /></div>
        </section>

        <section className="final-section" id="company" aria-labelledby="final-title">
          <div className="shell-wide final-cta">
            <h2 id="final-title">Forecast with<br />conviction.</h2>
            <p>Give every revenue decision the context it deserves.</p>
            <div><button className="button button-primary" type="button" onClick={() => setAccessOpen(true)}>Request access <span className="button-square" aria-hidden="true" /></button><a className="button button-secondary" href="#product">Explore the product <span className="button-square" aria-hidden="true" /></a></div>
          </div>
          <footer className="site-footer shell-wide">
            <div><Brand /><p>Revenue intelligence for teams that lead with evidence.</p></div>
            <nav aria-label="Footer navigation"><a href="#product">Product</a><a href="#use-cases">Use cases</a><a href="#company">Company</a><a href="#privacy">Privacy</a></nav>
            <p>© 2026 Cairn Systems.</p>
          </footer>
          <div className="signal-line signal-line-final" aria-hidden="true"><span /></div>
        </section>
      </main>

      <RequestAccessDialog open={accessOpen} onClose={() => setAccessOpen(false)} />
      <ProductTourDialog open={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  )
}
