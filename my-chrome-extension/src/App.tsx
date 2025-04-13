import sttLogo from './assets/SignToText.svg'
import WebcamToggle from './popups'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://en.wikipedia.org/wiki/American_Sign_Language" target="_blank">
          <img src={sttLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>SignToText</h1>
      <div className="card">
        <WebcamToggle/>
        <p>
          Click on the button to begin/end recording
        </p>
      </div>
      <div className="read-the-docs">
        <p>
          Go to the web permissions for SignToText and change camera permissions to "Allow" 
        </p>
      </div>
    </>
  )
}

export default App

//<input type="checkbox" id="sCamera" name="interest" value="coding"/>
//<label htmlFor="sCamera">Open Camera</label>