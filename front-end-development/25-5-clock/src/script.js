const initialState = {
  time: 1500,
  sessionLength: 25,
  breakLength: 5,
  isRunning: false,
  isBreak: false
}

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return {
        ...state,
        isRunning: true
        // TODO: Sync time with sessionLength in some way on start
      }
      
    case "STOP":
      return { ...state, isRunning: false }
      
    case "RESET":
      // const sound = document.querySelector("#beep")
      // sound.pause()
      // sound.currentTime = 0
      return initialState
      
    case "DECREASE_SESSION":
      if (state.isRunning) return state
      return {
        ...state,
        sessionLength: state.sessionLength > 1 ? state.sessionLength - 1 : 1,
        time: state.isBreak ? 
                state.time : 
                (state.sessionLength > 1 ? state.sessionLength - 1 : 1) * 60
      }
      
    case "INCREASE_SESSION":
      if (state.isRunning) return state
      return {
        ...state, 
        sessionLength: state.sessionLength < 60 ? state.sessionLength + 1 : 60,
        time: state.isBreak ?
                state.time : 
                (state.sessionLength < 60 ? state.sessionLength + 1 : 60) * 60
      }

    case "DECREASE_BREAK":
      if (state.isRunning) return state
      return {
        ...state,
        breakLength: state.breakLength > 1 ? state.breakLength - 1 : 1,
        time: state.isBreak ?
                (state.breakLength > 1 ? state.breakLength - 1 : 1) * 60 :
                state.time
      }
      
    case "INCREASE_BREAK":
      if (state.isRunning) return state
      return { 
        ...state, 
        breakLength: state.breakLength < 60 ? state.breakLength + 1 : 60,
        time: state.isBreak ?
                (state.breakLength < 60 ? state.breakLength + 1 : 60) * 60 :
                state.time
      }
      
    case "TICK":
      if (state.time === 0) {
        const sound = document.querySelector("#beep")
        sound.play()
        return {
          ...state,
          isRunning: true,
          isBreak: !state.isBreak,
          time: state.isBreak ? state.sessionLength * 60 : state.breakLength * 60
        }
      }
      return { ...state, time: state.time - 1 }
      
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { time, sessionLength, breakLength, isRunning, isBreak } = state

  React.useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        dispatch({ type: "TICK" })
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [isRunning, isBreak, sessionLength, breakLength])
  
  function handleStartStop() {
    if (isRunning) dispatch({type: "STOP"})
    else dispatch({type: "START"})
  }
  
  function handleReset() {
    // Test kept failing if I stopped audio inside the reducer
    const sound = document.querySelector("#beep")
    sound.pause()
    sound.currentTime = 0
    dispatch({type: "RESET"})
  }
  
  const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  const seconds = String(time % 60).padStart(2, '0')

  return (
    <>
      
    <div id="app-container">
      <h1>25 + 5 Clock</h1>
      <div id="length-wrapper">
        <div className="length-control">
          <h3 id="break-label">Break length</h3>
          <button id="break-decrement" onClick={() => dispatch({type: "DECREASE_BREAK"})}>
            <i class="fa fa-arrow-down fa-2x"></i>
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => dispatch({type: "INCREASE_BREAK"})}>
            <i class="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
        
        <div className="length-control">
          <h3 id="session-label">Session length</h3>
          <button id="session-decrement" onClick={() => dispatch({type: "DECREASE_SESSION"})}>
            <i class="fa fa-arrow-down fa-2x"></i>
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => dispatch({type: "INCREASE_SESSION"})}>
            <i class="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
      </div>
      
      <div id="timer-wrapper">
        <h3 id="timer-label">{isBreak ? "Break" : "Session"}</h3>
        <div id="time-left">{minutes}:{seconds}</div>
      </div>
      <div>
        <button id="start_stop" onClick={() => handleStartStop()}>
          {isRunning ? 
            <i class="fa fa-pause fa-2x"></i>: 
            <i class="fa fa-play fa-2x"></i>}
        </button>
        <button id="reset" onClick={() => handleReset()}>
          <i class="fa fa-refresh fa-2x"></i>
        </button>   
      </div>
      <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
            <div id="footer">
        by <a href="https://github.com/nickpartalis" target="_blank">nickpartalis</a>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)
