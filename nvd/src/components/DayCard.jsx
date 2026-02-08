export default function DayCard({ day, unlocked, isToday, onSelect }) {
  const dayLabel = formatDayLabel(day.date)

  return (
    <button
      type="button"
      className={`day-card ${unlocked ? 'day-card--unlocked' : 'day-card--locked'} ${
        isToday ? 'day-card--today' : ''
      }`}
      onClick={unlocked ? onSelect : undefined}
      disabled={!unlocked}
    >
      <div className="day-card-inner">
        <div className="day-card-meta">
          <span className="day-card-date">{dayLabel}</span>
          {isToday && <span className="day-card-pill">today</span>}
          {!unlocked && <span className="day-card-pill">locked</span>}
        </div>
        <h2 className="day-card-title">{day.title}</h2>
        <p className="day-card-copy">
          {unlocked
            ? 'Open slowly. Let every line land.'
            : 'You can’t rush this. It will open when it’s meant to.'}
        </p>
      </div>
    </button>
  )
}

function formatDayLabel(mmdd) {
  const [monthStr, dayStr] = mmdd.split('-')
  const monthNames = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  }
  return `${monthNames[monthStr]} ${Number(dayStr)}`
}

