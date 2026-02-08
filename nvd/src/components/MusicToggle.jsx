import { useEffect, useRef, useState } from 'react'

const FADE_DURATION_MS = 3000

export default function MusicToggle({ onPaceChange, stopMusic }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    if (onPaceChange) {
      onPaceChange(isOn)
    }
  }, [isOn, onPaceChange])

  useEffect(() => {
    if (stopMusic && audioRef.current) {
      fadeTo(0, () => {
        audioRef.current.pause()
      })
      setIsOn(false)
    }
  }, [stopMusic])

  const clearFade = () => {
    if (fadeRef.current) {
      cancelAnimationFrame(fadeRef.current)
      fadeRef.current = null
    }
  }

  const fadeTo = (targetVolume, onDone) => {
    const audio = audioRef.current
    if (!audio) return

    clearFade()
    const startVolume = audio.volume
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / FADE_DURATION_MS, 1)
      const nextVolume = startVolume + (targetVolume - startVolume) * progress
      audio.volume = Math.max(0, Math.min(1, nextVolume))

      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else {
        clearFade()
        if (onDone) onDone()
      }
    }

    fadeRef.current = requestAnimationFrame(step)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!isOn) {
      audio.volume = 0
      try {
        await audio.play()
        fadeTo(0.9)
        setIsOn(true)
      } catch {
        // ignore autoplay errors; user can tap again
      }
    } else {
      fadeTo(0, () => {
        audio.pause()
      })
      setIsOn(false)
    }
  }

  const label = isOn ? 'Pause music' : 'Play music'

  return (
    <div className="music-toggle-shell">
      <audio ref={audioRef} src="/audio/romantic.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        className={`music-toggle-button ${isOn ? 'music-toggle-button--on' : ''}`}
        aria-label={label}
      >
        <span className="music-toggle-icon">{isOn ? '⏸' : '▶'}</span>
        <span className="music-toggle-label">Soft background music</span>
      </button>
    </div>
  )
}

