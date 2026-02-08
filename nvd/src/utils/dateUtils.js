const START_MM_DD = '02-07'
const END_MM_DD = '02-14'

export function getTodayMMDD() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

export function isUnlocked(dayMMDD) {
  const today = getTodayMMDD()
  return dayMMDD <= today && dayMMDD >= START_MM_DD && dayMMDD <= END_MM_DD
}

export function isBeforeStart() {
  const today = getTodayMMDD()
  return today < START_MM_DD
}

export function getNextUnlockDate() {
  const today = getTodayMMDD()
  if (today < START_MM_DD) return START_MM_DD
  if (today >= END_MM_DD) return null

  const [monthStr, dayStr] = today.split('-')
  const month = Number(monthStr)
  const day = Number(dayStr) + 1
  const nextDay = String(day).padStart(2, '0')
  return `${String(month).padStart(2, '0')}-${nextDay}`
}

export function getCountdownParts(targetDate) {
  if (!targetDate) return null

  const [monthStr, dayStr] = targetDate.split('-')
  const now = new Date()
  const year = now.getFullYear()
  const target = new Date(year, Number(monthStr) - 1, Number(dayStr), 0, 0, 0, 0)

  const diffMs = target.getTime() - now.getTime()
  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

