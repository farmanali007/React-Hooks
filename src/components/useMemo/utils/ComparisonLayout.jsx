/**
 * Side-by-side panels: WITHOUT useMemo vs WITH useMemo.
 */
export default function ComparisonLayout({ withoutPanel, withPanel }) {
  return (
    <div className="comparison-grid">
      <section className="panel panel-bad">
        <h3>Without useMemo</h3>
        <p className="panel-hint">
          Heavy work runs on every parent re-render, even when inputs are unchanged.
        </p>
        {withoutPanel}
      </section>
      <section className="panel panel-good">
        <h3>With useMemo</h3>
        <p className="panel-hint">
          Heavy work runs only when dependencies in the array actually change.
        </p>
        {withPanel}
      </section>
    </div>
  )
}
