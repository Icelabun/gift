import { useEffect, useState } from 'react'
import { getCountdownParts, getNextUnlockDate, isBeforeStart } from '../utils/dateUtils'

export default function Countdown() {
  const [parts, setParts] = useState(() => {
    const target = getNextUnlockDate()
    return getCountdownParts(target)
  })

  useEffect(() => {
    if (!isBeforeStart()) return

    const interval = setInterval(() => {
      const target = getNextUnlockDate()
      setParts(getCountdownParts(target))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isBeforeStart() || !parts) {
    return null
  }

  const { days, hours, minutes, seconds } = parts

  return (
    <div className="countdown-shell fade-in-soft">
      <p className="eyebrow">Valentine’s Week is on its way</p>
      <h1 className="countdown-heading">Soft things take time.</h1>
      <p className="countdown-sub">
        This unfolds on its own. No skipping ahead. No rushing the good parts.
      </p>
      <div className="countdown-grid">
        <div className="countdown-unit">
          <span className="countdown-number">{days}</span>
          <span className="countdown-label">days</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-number">{hours}</span>
          <span className="countdown-label">hours</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-number">{minutes}</span>
          <span className="countdown-label">minutes</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-number">{seconds}</span>
          <span className="countdown-label">seconds</span>
        </div>
      </div>
      <p className="countdown-footnote">
        When the time is right, the first day will bloom open on its own.
      </p>
    </div>
  )
}

