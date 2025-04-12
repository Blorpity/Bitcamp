//import { useState } from 'react'
import sttLogo from './assets/SIgnToText.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={sttLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>SignToText</h1>
      <div className="card">
        <button id="openCamera">
          Activate/Deactivate Camera
        </button>
        <p>
          Click on the button to begin/end recording
        </p>
      </div>

    </>
  )
}

export default App
