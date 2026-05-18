/**
 * Side-by-side panels for comparing two approaches.
 */
export default function ComparisonLayout({
  withoutPanel,
  withPanel,
  withoutTitle = 'Without useMemo',
  withTitle = 'With useMemo',
  withoutHint = 'Runs on every re-render, even when inputs did not change.',
  withHint = 'Runs only when dependencies in the array change.',
}) {
  return (
    <div className="comparison-grid">
      <section className="panel panel-bad">
        <h3>{withoutTitle}</h3>
        <p className="panel-hint">{withoutHint}</p>
        {withoutPanel}
      </section>
      <section className="panel panel-good">
        <h3>{withTitle}</h3>
        <p className="panel-hint">{withHint}</p>
        {withPanel}
      </section>
    </div>
  )
}
