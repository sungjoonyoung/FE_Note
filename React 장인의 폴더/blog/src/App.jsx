import { useState } from 'react'
import './App.css'
import React from 'react'


function App() {

  let post='강남 우동 맛집'
  let [글제목,글제목변경]=useState(['남자 코트 추천','강남 우동맛집','파이썬독학'])//변경을 자동으로 해준대
  let [따봉,따봉변경]=useState([0,0,0]);
  let [modal,setModal]=useState(0);
  let [title,setTitle]=useState(2);
  let [입력값,입력값변경]=useState('');

  [1,2,3].map(function(a){
    return '1233211'
  })

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>


      {
        글제목.map(function(a,i){
          return(
            <div className="list" key={i}>
              <h4 onClick={()=>{setModal(true); setTitle(i)}}>{글제목[i]}
                <span onClick={(e)=>{
                  e.stopPropagation();
                  let copy=[...따봉]
                  copy[i]++;
                  따봉변경(copy)
                }}>👍</span>{따봉[i]}
              </h4>
              <p>2월 17일 발행</p>
              <button onClick={()=>{
                let copy=[...글제목]
                copy.splice(i,1);
                글제목변경(copy);
                copy=[...따봉]
                copy.splice(i,1);
                따봉변경(copy)
              }}>삭제</button>
            </div>
          )
        })
      }
      <button onClick={()=>setTitle(0)}>글제목0</button>
      <button onClick={()=>setTitle(1)}>글제목1</button>
      <button onClick={()=>setTitle(2)}>글제목2</button>
      <div>.</div>
      <div>.</div>

      <input onChange={(e)=>{
        입력값변경(e.target.value);
        console.log(입력값);
      }}/>
      <button onClick={()=>{
        let copy=[...글제목];
        // copy.push(입력값);
        copy.unshift(입력값);
        글제목변경(copy);
        copy=[...따봉];
        // copy.push(0);
        copy.unshift(0);
        따봉변경(copy);
      }}>글쓰기</button>



      {
        modal==true
        ?<Modal color={'skyblue'} 글제목변경={글제목변경} 글제목={글제목} title={title}/>
        :null
      }
      

      <Modal2></Modal2>
    </div>
  )
}


function Modal(props){
  return(
    <div className='modal' style={{background:props.color}}>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}

class Modal2 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'kim',
      age:20
    }
  }
  render(){
    return(
      <div>안녕{this.state.age}
        <button onClick={()=>{
          this.setState({age:21})
        }}>버튼</button>
      </div>
    )
  }
}


export default App










{/* 
      <button onClick={()=>{
        let copy=[...글제목]
        copy.sort()
        글제목변경(copy)
      }}>가나다순정렬</button>
      <div></div>
      <button onClick={()=>{
        let copy=[...글제목];
        copy[0]='여자 코트 추천'
        글제목변경(copy);
      }}>버튼</button>
      

      <div className="list">
        <h4>{글제목[0]}<span onClick={()=>{따봉변경(따봉+1)}}>👍</span>{따봉}</h4>
        <p>2월 17일 발행</p>
      </div>


      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{setModal(!modal)}}>{글제목[2]}</h4>
        <p>2월 17일 발행</p>
      </div>

      {
        modal==true?<Modal/>:null
      }
      <Modal/> */}



      
// const Modal=()=>{
//   return(
//     <div className='modal'>
//       <h4>제목</h4>
//       <p>날짜</p>
//       <p>상세내용</p>
//     </div>
//   )
// }