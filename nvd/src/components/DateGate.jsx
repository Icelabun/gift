import { useState } from 'react'
import { valentinesWeek } from '../data/valentinesWeek'
import { getTodayMMDD, isBeforeStart, isUnlocked } from '../utils/dateUtils'
import Countdown from './Countdown'
import DayCard from './DayCard'
import DayView from './DayView'
import AfterDark from './AfterDark'

export default function DateGate({ pacing, onFinalScreen }) {
  const today = getTodayMMDD()
  const [activeDay, setActiveDay] = useState(null)
  const [afterDarkOpen, setAfterDarkOpen] = useState(false)

  if (isBeforeStart()) {
    return (
      <div className="gate-shell">
        <Countdown />
      </div>
    )
  }

  const handleSelectDay = (day) => {
    if (!isUnlocked(day.date)) return
    setActiveDay(day)
  }

  const isToday = (mmdd) => mmdd === today

  return (
    <div className="gate-shell fade-in-soft">
      <header className="week-header">
        <p className="eyebrow">Valentine’s Week</p>
        <h1 className="week-title">One day at a time.</h1>
        <p className="week-sub">
          Everything here opens only when it’s meant to. Pause. Reread. Let each line
          find you.
        </p>
      </header>

      <div className="day-grid">
        {valentinesWeek.map((day) => (
          <DayCard
            key={day.date}
            day={day}
            unlocked={isUnlocked(day.date)}
            isToday={isToday(day.date)}
            onSelect={() => handleSelectDay(day)}
          />
        ))}
      </div>

      {activeDay && (
        <DayView
          day={activeDay}
          pacing={pacing}
          onClose={() => setActiveDay(null)}
          onOpenAfterDark={() => {
            setActiveDay(null)
            setAfterDarkOpen(true)
          }}
          onFinalScreen={onFinalScreen}
        />
      )}

      {afterDarkOpen && (
        <AfterDark pacing={pacing} onClose={() => setAfterDarkOpen(false)} />
      )}
    </div>
  )
}

