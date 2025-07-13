# Usage Documentation for `App.js`

## Overview

The `App.js` file contains a React functional component that renders a metronome interface using the `react-metronome` library. It allows users to control the tempo, view beat and elapsed time information, and send practice time data to a backend API.

## Functionalities

### Metronome Interface

- The component uses the `Metronome` component from the `react-metronome` package.
- The tempo is initially set to 120 BPM.
- The metronome provides various data and control functions via a render prop, including:
  - `tempo`: Current tempo in beats per minute.
  - `beatsPerMeasure`: Number of beats per measure.
  - `playing`: Boolean indicating if the metronome is playing.
  - `beat`: Current beat number.
  - `elapsedTime`: Elapsed time for the current beat.
  - `totalElapsedTime`: Total elapsed time since the metronome started.
  - `elapsedTimes`: A Map object tracking elapsed time for each tempo.
  - `onPlay`: Function to toggle play/pause.
  - `onTempoChange`: Function to change the tempo.

### UI Elements

- Tempo display with BPM and time signature.
- Tempo slider input to adjust the tempo between 40 and 240 BPM.
- Display of current beat and elapsed time.
- List of elapsed times for each tempo.
- Play/Pause button to start or stop the metronome.
- A "Send Practice Time" button to manually send practice data to the backend.

### Sending Practice Time Data

- The component tracks practice time data in the form of a Map (`elapsedTimes`) where keys are tempos (BPM) and values are durations.
- A function `sendPracticeTime` converts this Map into an array of objects and sends it as JSON to the backend API endpoint `/api/practice` via a POST request.
- Practice time data is sent automatically every 600 seconds (10 minute) using a timer set up with `useEffect`.
- The "Send Practice Time" button allows manual sending of the current practice data.
- Error handling is included to log failures in sending data.

## How to Use

1. Adjust the tempo using the slider.
2. Start or stop the metronome using the play/pause button.
3. Monitor the current beat, elapsed time, and elapsed times per tempo.
4. Practice time data is sent automatically every minute.
5. Optionally, click the "Send Practice Time" button to send data immediately.

## Notes

- The `musicId` is currently hardcoded as `"some-music-id"` and should be replaced with the actual music identifier as needed.
- The component ensures that practice time data is sent in a structured format suitable for backend processing.
