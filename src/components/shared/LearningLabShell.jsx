import { useState } from 'react'
import '../../styles/hooksLab.css'

/**
 * Reusable sidebar + lesson layout for any hook course.
 */
export default function LearningLabShell({
  title,
  intro,
  lessons,
  onBack,
  comparisonHint,
}) {
  const [activeId, setActiveId] = useState(lessons[0]?.id)
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0]
  const ActiveComponent = active?.Component

  if (!ActiveComponent) return null

  return (
    <div className="hooks-lab">
      <aside className="lab-sidebar">
        <button type="button" className="back-btn" onClick={onBack}>
          ← All Hooks
        </button>
        <h1>{title}</h1>
        <p className="lab-intro">{intro}</p>
        {comparisonHint && (
          <p className="lab-intro lab-hint">{comparisonHint}</p>
        )}
        <nav>
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <button
                  type="button"
                  className={lesson.id === activeId ? 'active' : ''}
                  onClick={() => setActiveId(lesson.id)}
                >
                  {lesson.label}
                  <span className={`nav-level level-${lesson.level}`}>
                    {lesson.level}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="lab-main">
        <ActiveComponent key={activeId} />
      </main>
    </div>
  )
}
