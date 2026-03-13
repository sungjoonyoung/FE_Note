import { useState } from 'react'
import './App.css'
import guzig from './img/guzig.png'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={guzig} width="100%" onClick={()=>{
        window.open("https://github.com/sungjoonyoung")
      }}></img>
    </>
  )
}

export default App
