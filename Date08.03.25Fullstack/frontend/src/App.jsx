import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login.jsx'


function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("chai")

  return (
    <>
        <Login/>
    </>
  )
}

export default App
