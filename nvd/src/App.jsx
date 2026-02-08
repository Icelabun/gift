import { useState } from 'react'
import DateGate from './components/DateGate'
import MusicToggle from './components/MusicToggle'
import './styles/base.css'
import './styles/animations.css'
import './styles/afterDark.css'

function App() {
  const [pacing, setPacing] = useState('normal')
  const [stopMusic, setStopMusic] = useState(false)

  const handlePaceChange = (isOn) => {
    setPacing(isOn ? 'slow' : 'normal')
  }

  const handleFinalScreen = () => {
    setStopMusic(true)
  }

  return (
    <div className={`app-shell ${pacing === 'slow' ? 'pace-slow' : ''}`}>
      <div className="app-frame">
        <header className="app-header">
          <div className="app-title-block">
            <span className="app-title">Valentine’s Week</span>
            <span className="app-subtitle">February 7 – 14</span>
          </div>
        </header>
        <main className="app-main">
          <DateGate pacing={pacing} onFinalScreen={handleFinalScreen} />
        </main>
      </div>
      <MusicToggle onPaceChange={handlePaceChange} stopMusic={stopMusic} />
    </div>
  )
}

export default App
