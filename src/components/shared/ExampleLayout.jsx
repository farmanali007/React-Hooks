/**
 * Wraps each lesson with title, analogy, and "what to watch" tips.
 */
export default function ExampleLayout({
  title,
  level,
  analogy,
  whatToWatch,
  children,
}) {
  return (
    <article className="example-layout">
      <header className="example-header">
        <div className="example-meta">
          <h2>{title}</h2>
          <span className={`level-badge level-${level}`}>{level}</span>
        </div>
        <p className="analogy">
          <strong>Analogy:</strong> {analogy}
        </p>
        <div className="what-to-watch">
          <strong>What to observe:</strong>
          <ul>
            {whatToWatch.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </header>
      {children}
    </article>
  )
}
