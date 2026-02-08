import Finale from './Finale'
import { valentinesCopy } from '../data/valentinesWeek'

export default function DayView({
  day,
  pacing,
  onClose,
  onOpenAfterDark,
  onFinalScreen,
}) {
  if (!day) return null

  const isFinale = Boolean(day.isFinale)
  const dayLabel = formatDayLabel(day.date)
  const pacingClass = pacing === 'slow' ? 'pace-slow' : ''

  return (
    <div className="overlay-backdrop">
      <div className={`overlay-panel day-view-shell ${pacingClass}`}>
        <button
          type="button"
          className="overlay-close"
          onClick={onClose}
          aria-label="Close letter"
        >
          ×
        </button>

        <p className="day-view-eyebrow">{dayLabel}</p>
        <h2 className="day-view-title">{day.title}</h2>

        {!isFinale && (
          <div className="day-view-body fade-in-soft">
            <MultilineCopy text={valentinesCopy[day.date] || ''} />

            {day.date === '02-13' && (
              <div className="after-dark-entry">
                <p className="after-dark-hint">
                  After this text, unlock After Dark Mode (optional entry).
                </p>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={onOpenAfterDark}
                >
                  Enter After Dark
                </button>
              </div>
            )}
          </div>
        )}

        {isFinale && (
          <div className="day-view-body">
            <Finale pacing={pacing} onFinalScreen={onFinalScreen} />
          </div>
        )}
      </div>
    </div>
  )
}

function MultilineCopy({ text }) {
  return (
    <div className="day-view-text">
      {text.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  )
}

function formatDayLabel(mmdd) {
  const [monthStr, dayStr] = mmdd.split('-')
  const monthNames = {
    '01': 'February', // we only actually use February here
    '02': 'February',
  }
  return `${monthNames[monthStr] || 'February'} ${Number(dayStr)}`
}

