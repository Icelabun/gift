import { useEffect, useState } from 'react'

const lines = [
  '“This part is quieter.',
  'Slower.',
  'A little closer.',
  '',
  'I like the way you make me forget everything else.',
  'And I like that you know it.”',
]

export default function AfterDark({ pacing, onClose }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    const baseDelay = pacing === 'slow' ? 1800 : 1400

    function revealNext(index) {
      if (cancelled || index > lines.length) return
      setVisibleCount(index)
      if (index < lines.length) {
        setTimeout(() => revealNext(index + 1), baseDelay)
      }
    }

    revealNext(1)

    return () => {
      cancelled = true
    }
  }, [pacing])

  return (
    <div className="overlay-backdrop overlay-backdrop--dark">
      <div className="after-dark-shell overlay-panel">
        <button
          type="button"
          className="overlay-close"
          onClick={onClose}
          aria-label="Close after dark mode"
        >
          ×
        </button>
        <p className="after-dark-tag">After Dark</p>
        <div className="after-dark-body">
          {lines.slice(0, visibleCount).map((line, index) => (
            <p
              key={index}
              className={`after-dark-line ${
                line.trim() ? 'after-dark-line--text' : 'after-dark-line--spacer'
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

