// import '../App.css'
import { use, useContext, useEffect, useState } from "react";
import { RouterProvider, useParams } from "react-router-dom";
import styled from "styled-components";
import {Button,Nav} from 'react-bootstrap'

import {Context1} from './../App.jsx'
import { useDispatch, useSelector } from "react-redux";

import { insertItem } from "../store.jsx";
import data from "../data.js";
import { useLike } from "../hooks/like.jsx";
import axios from "axios";
import { useName } from "../hooks/name.jsx";

let YellowBtn=styled.button`
  background: ${props=>props.bg};
  color:${props=>props.bg=='blue'?'white':'black'};
  padding:10px;
`

let Box=styled.div`
  background:grey;
  padding:20px;
`
function Detail(props){
  
  let [like,setLike]=useLike()

  let watched=JSON.parse(localStorage.getItem('watched'))
  
  let {재고,shoes}=useContext(Context1)

  let [count,setCount]=useState(0)
  let [timalert,setTimealert]=useState(0)
  let [numalert,setNumalert]=useState(true)
  let [입력값,입력값변경]=useState("")
  let [탭,탭변경]=useState(1)

  let state=useSelector((state)=>state);
  let dispatch=useDispatch();

  let [name,setName]=useName();
  
  useEffect(()=>{
    console.log('안녕')
    // for(var i=0;i<10000;i++){
    //   console.log(1);
    // }
    let a=setTimeout(()=>{setTimealert(1)},2000)
    console.log(2);
    
    return()=>{
      //기존 타이머는 제거해 주세여~~
      clearTimeout(a);
      //기존 데이터 요청은 삭제햊세요~
      console.log(1);
    }
  })

  useEffect(()=>{
    // /^[0-9]+$/.test(입력값)==true?setNumalert(true):setNumalert(false);
    if(isNaN(입력값)==true){
      alert('숫자만 입력하세여')
    }

  },[입력값])


  let {id}=useParams();
  console.log(id);

  useEffect(()=>{
    // watched.push(id)
    watched=[id,...watched]
    const set=new Set(watched)
    watched=[...set]
    console.log(set)
    localStorage.setItem('watched',JSON.stringify(watched))
  },[])

  let 찾은상품=props.shoes.find((x)=>{
    return x.id==id;
  })
  
  let [fade,setFade]=useState('')
  useEffect(()=>{
    let a=setTimeout(() => {
      setFade('end')
    }, 10);
    return ()=>{
      clearTimeout(a)
      setFade('')
    }
  },[탭])

  return(
    <div className={'start '+fade}>
      <YellowBtn bg='blue'>버튼</YellowBtn>
      <YellowBtn bg='yellow'>버튼</YellowBtn>
      <div className="container">
        {count}
        <button onClick={()=>{setTimealert(0)}}>버튼</button>
        {
          timalert==0
          ?<div className="alert alert-warning">2초이내 구매시 할인</div>
          :null
        }
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+(parseInt(찾은상품.id)+1)+".jpg"} width="100%" />
          </div>
          <div className="col-md-6">

            {like}<span onClick={()=>setLike((a)=>{return a+1})}>❤️</span>
            by {name}
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
            <button className="btn btn-danger" onClick={()=>{
              dispatch(insertItem({id:찾은상품.id,name:찾은상품.title,count:1}))
            }}>주문하기</button> 
          </div>
        </div>
      </div>
      {
        numalert==false
        ?<div className="alert alert-warning">경고 : 숫자만 입력하세요</div>
        :null
      }
      <input onChange={(e)=>{
        console.log(e.target.value)
        입력값변경(e.target.value)
      }}></input>

      <Nav fill variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} 탭변경={탭변경} shoes={props.shoes}></TabContent>
    </div>
  )
}
function TabContent({탭,탭변경,shoes}){
  let {재고}=useContext(Context1)
  let [fade,setFade]=useState('')
  useEffect(()=>{
    let a=setTimeout(() => {
      setFade('end')
    }, 10);
    return ()=>{
      clearTimeout(a)
      setFade('')
    }
  },[탭])
  return (<div className={'start '+fade}>
    {[<div>{shoes[0].title}</div>,<div>내용1</div>,<div>내용2</div>][탭]}
  </div>)
  // if(탭==0){
  //   return<div>내용0</div>
  // }
  // if(탭==1){
  //   return<div>내용1</div>
  // }
  // if(탭==2){
  //   return<div>내용2</div>
  // }
}
export default Detail;