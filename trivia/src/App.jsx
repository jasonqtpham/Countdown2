import { useState } from 'react'
import './App.css'
import TriviaApp from './components/TriviaApp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TriviaApp />
    </>
  )
}

export default App
