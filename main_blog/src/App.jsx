import { useState } from 'react'
import './App.css'
import guzig from './img/guzig.png'
function App() {
  let [guzigiter, guzigiterCount] = useState([1,1,1,1,1,1,1,1,1,1,1])

  return (
    <>
      {guzigiter.map((n)=>{return(
          <img src={guzig} width="100%" onClick={()=>{
          window.open("https://github.com/sungjoonyoung")
        }}></img>
      )})}
    </>
  )
}

export default App
