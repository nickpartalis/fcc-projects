const data = [
  { letter: 'Q',
    keycode: 81,
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  { letter: 'W',
    keycode: 87,
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
  { letter: 'E',
    keycode: 69,
    id: 'Kick-and-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  { letter: 'A',
    keycode: 65,
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  { letter: 'S',
    keycode: 83,
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  { letter: 'D',
    keycode: 68,
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  },
  { letter: 'Z',
    keycode: 90,
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  { letter: 'X',
    keycode: 88,
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  { letter: 'C',
    keycode: 67,
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
]

function App() {
  const [powerOn, setPowerOn] = React.useState(true)
  
  function handlePowerToggle() {
    document.querySelector("#display").textContent = ""
    setPowerOn(current => !current)
  }
  
  return (
    <div id="drum-machine">
      <div id="drum-pads">
        {data.map((el, i) => (
          <Pad key={i} data={data[i]} powerOn={powerOn} />
        ))}
      </div>
      <div id="side-panel">
        <h3>Drum Machine</h3>
        <div id="display"></div>
        <div id="power-btn" 
          className={`btn ${powerOn ? "on" : "off"}`}
          onClick={handlePowerToggle}
        >
          <i className="fa-solid fa-power-off"></i>
        </div>
      </div>
    </div>
  )
}

function Pad({data, powerOn}) {
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])
  
  function playSound() {
    if (powerOn) {
      let audio = document.getElementById(data.letter)
      document.querySelector("#display").textContent = data.id
      audio.currentTime = 0
      audio.play()
    }
  }
  
  function handleKeyPress(e) {
    if (e.keyCode === data.keycode) {
      playSound()
    }
  }
  
  return (
    <div 
      className={`drum-pad btn ${powerOn ? "on" : "off"}`}
      id={data.id} 
      onClick={() => playSound()}
    >
      <audio id={data.letter} src={data.url} className="clip"></audio>
      <span>{data.letter}</span>
    </div>
   )
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
