
import './App.css'
import { useState } from 'react'
import Componented from './Componented'

function App() {
  const [showComponent, setShowComponent] = useState<boolean>(true);
  return (
    <>
      <button onClick={() => setShowComponent((prev) => !prev)}>
        Render the component or not
      </button>
      { showComponent && <Componented/> }
    </>
  )
}

export default App
