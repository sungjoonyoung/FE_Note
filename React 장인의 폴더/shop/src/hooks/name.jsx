import axios from "axios"
import { useEffect, useState } from "react"

export function useName(){
  let [name,setName]=useState('')
  // useEffect(()=>{
axios.get('/username.json')
  .then((a)=>{
    setName(a.data)
  })
  //  },[])
  return [name,setName];
}