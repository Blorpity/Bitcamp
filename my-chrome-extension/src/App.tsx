import sttLogo from './assets/SignToText.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={sttLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>SignToText</h1>
      <div className="card">
        <input type="checkbox" id="sCamera"/>
        <label htmlFor="sCamera">Open Camera</label>
        <p>
          Click on the checkbox to access the camera and begin recording
        </p>
      </div>

    </>
  )
}

export default App
