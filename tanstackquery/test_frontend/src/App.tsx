
import './App.css'
import { useState } from 'react'
import Componented from './Componented'
import RefetchData from './RefetchData';

function App() {
  const [showComponent, setShowComponent] = useState<boolean>(true);
  return (
    <>
      <button onClick={() => setShowComponent((prev) => !prev)}>
        Render the component or not
      </button>
      { showComponent && <Componented /> }
      { showComponent && <RefetchData />}
    </>
  )
}

export default App
