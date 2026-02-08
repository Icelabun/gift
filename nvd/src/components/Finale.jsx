import { useEffect, useState } from 'react'

const FINAL_LINE = '“This is me choosing you.”'

export default function Finale({ pacing, onFinalScreen }) {
  const [stage, setStage] = useState('letter')
  const [hasSeenCelebration, setHasSeenCelebration] = useState(false)
  const [finalLineArmed, setFinalLineArmed] = useState(false)

  useEffect(() => {
    const key = `valentines-finale-seen-${new Date().getFullYear()}`
    const seen = window.localStorage.getItem(key)
    if (seen) {
      setHasSeenCelebration(true)
    }
  }, [])

  useEffect(() => {
    if (stage === 'final' && !finalLineArmed) {
      setFinalLineArmed(true)
      if (onFinalScreen) {
        onFinalScreen()
      }
    }
  }, [stage, finalLineArmed, onFinalScreen])

  const goToCelebration = () => {
    if (hasSeenCelebration) {
      setStage('gift')
      return
    }
    const key = `valentines-finale-seen-${new Date().getFullYear()}`
    window.localStorage.setItem(key, 'true')
    setHasSeenCelebration(true)
    setStage('celebration')
  }

  const pacingClass = pacing === 'slow' ? 'pace-slow' : ''

  if (stage === 'final') {
    return (
      <div className="finale-final-screen">
        <p className="finale-final-line">{FINAL_LINE}</p>
      </div>
    )
  }

  return (
    <div className={`finale-shell ${pacingClass}`}>
      {stage === 'letter' && (
        <section className="finale-section fade-in-soft">
          <p className="finale-tagline">Valentine’s Day</p>
          <h3 className="finale-heading">The quiet kind of certain.</h3>
          <p className="finale-text">
            “Loving you isn’t loud for me.
            <br />
            It’s certain.
            <br />
            It’s the way you cross my mind when nothing prompts it.
            <br />
            It’s how easy it feels to imagine choosing you — again and again.”
          </p>
          <button type="button" className="primary-button" onClick={goToCelebration}>
            Keep going
          </button>
        </section>
      )}

      {stage === 'celebration' && (
        <section className="finale-section finale-section--celebration">
          <div className="finale-fireworks-layer">
            <div className="firework firework--one" />
            <div className="firework firework--two" />
            <div className="firework firework--three" />
            <div className="floating-hearts">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} className={`heart heart-${(index % 4) + 1}`}>
                  ❤
                </span>
              ))}
            </div>
          </div>
          <div className="finale-celebration-copy">
            <p className="finale-heading">Stay with me in this glow for a second.</p>
            <p className="finale-sub">
              Fireworks don’t last long. The feeling underneath them does.
            </p>
            <button
              type="button"
              className="primary-button primary-button--soft"
              onClick={() => setStage('gift')}
            >
              Breathe with me
            </button>
          </div>
        </section>
      )}

      {stage === 'gift' && (
        <section className="finale-section fade-in-soft">
          <p className="finale-heading">A small thing. A real thing.</p>
          <p className="finale-text">
            “This is small compared to how I feel.
            <br />
            But it’s real.
            <br />
            And it’s yours.”
          </p>
          <button
            type="button"
            className="primary-button"
            onClick={() => setStage('quiz')}
          >
            One last little thing
          </button>
        </section>
      )}

      {stage === 'quiz' && (
        <QuizStage onComplete={() => setStage('final')} pacing={pacing} />
      )}
    </div>
  )
}

function QuizStage({ onComplete, pacing }) {
  const [answered, setAnswered] = useState(false)
  const pacingClass = pacing === 'slow' ? 'pace-slow' : ''

  const handleFinish = () => {
    if (!answered) {
      setAnswered(true)
      return
    }
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <section className={`finale-section finale-section--quiz ${pacingClass}`}>
      <p className="finale-heading">Just between us.</p>
      <p className="finale-text">
        Answer this in your head. No right or wrong. Just honest.
      </p>
      <ul className="quiz-list">
        <li className="quiz-item">
          When did you first know you felt something a little different with me?
        </li>
        <li className="quiz-item">
          What’s the small thing I do that you secretly look forward to?
        </li>
        <li className="quiz-item">
          If today could end any way you wanted with me, what would it look like?
        </li>
      </ul>

      {answered && (
        <p className="finale-text finale-text--ending">
          “Turns out…
          <br />
          You already knew all the answers.
          <br />
          So did I.”
        </p>
      )}

      <button
        type="button"
        className="primary-button primary-button--soft"
        onClick={handleFinish}
      >
        {answered ? 'Let it sink in' : 'I’ve answered quietly'}
      </button>
    </section>
  )
}

