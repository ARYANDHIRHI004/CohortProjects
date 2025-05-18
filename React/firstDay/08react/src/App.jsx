import { useEffect, useState } from "react"

const App = () => {

  const [message, setMessage] = useState("")

  

  useEffect((params) => {
    fetch("https://api.freeapi.app/api/v1/public/stocks/stock/random")
    .then((res)=>res.json())
    .then(data => 
      setMessage(data.data.Name)
    )
  },[setMessage])


  return (
    <div>
        <h1>React indepth</h1>
        <p>{message}</p>
    </div>
  )
}

export default App