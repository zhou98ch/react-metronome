import React, { useEffect, useRef, useCallback } from 'react'
import { Container, Header, Main, PlayButton, TabularNums } from './AppStyles'
import MdPlayArrow from 'react-icons/lib/md/play-arrow'
import MdPause from 'react-icons/lib/md/pause'
import Metronome from 'react-metronome'

function App() {
  const musicId = "some-music-id" // TODO: replace this with actual musicId as needed
  const intervalRef = useRef(null)
  const elapsedTimesRef = useRef(new Map())
  const lastSentElapsedTimesRef = useRef(new Map())

  // Function to send practice time to backend API
  const sendPracticeTime = useCallback((elapsedTimes) => {
    // Convert Map to array of objects for JSON serialization
    const elapsedTimesArray = Array.from(elapsedTimes.entries()).map(([bpm, duration]) => ({
      bpm,
      duration,
    }))
    const data = {
      musicId: musicId,
      elapsedTimes: elapsedTimesArray,
    }
    fetch('/api/practice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => {
      if (!response.ok) {
        console.error('Failed to send practice time')
      }
    }).catch(error => {
      console.error('Error sending practice time:', error)
    })
  }, [musicId])

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      if (elapsedTimesRef.current !== lastSentElapsedTimesRef.current) {
        sendPracticeTime(elapsedTimesRef.current)
        
        lastSentElapsedTimesRef.current = elapsedTimesRef.current
      }
      else console.log("skip");
    }, 60000) // 10 minute

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [sendPracticeTime])

  return (
    <Metronome
      tempo={120}
      render={({
        tempo,
        beatsPerMeasure,
        playing,
        beat,
        elapsedTime,
        totalElapsedTime,
        elapsedTimes,
        onPlay,
        onTempoChange,
      }) => {
        // Update ref with latest elapsedTimes on each render
        elapsedTimesRef.current = elapsedTimes

        const handleSendClick = () => {
          if (elapsedTimesRef.current !== lastSentElapsedTimesRef.current) {
            sendPracticeTime(elapsedTimes)
            lastSentElapsedTimesRef.current = new Map(elapsedTimes)
          }
        }

        return (
          <Container>
            <Header>
              <div>
                {tempo} <small>BPM</small>
              </div>
              <div>
                {beatsPerMeasure}/{beatsPerMeasure} <small>T.S.</small>
              </div>
            </Header>

            <Main>
              <input
                type="range"
                min={40}
                max={240}
                value={tempo}
                onChange={event => onTempoChange(event.target.value)}
              />

              <TabularNums>
                {beat}/{beatsPerMeasure}
              </TabularNums>

              <TabularNums>
                {elapsedTime}
              </TabularNums>

              <div>
                {[...elapsedTimes.entries()].map(([tempo, time]) => (
                  <p key={tempo}>
                    Tempo: {tempo}, Time: {time.toFixed(0)}s
                  </p>
                ))}
              </div>

              <PlayButton onClick={onPlay}>
                {playing ? <MdPause /> : <MdPlayArrow />}
              </PlayButton>

              <button onClick={handleSendClick} style={{ marginTop: '1rem' }}>
                Send Practice Time
              </button>
            </Main>
          </Container>
        )
      }}
    />
  )
}

export default App
