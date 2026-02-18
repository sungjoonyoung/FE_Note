import './App.css'
import {Button,Navbar,Container,Nav} from 'react-bootstrap'
import bg from './img/girlsofthemonth-20250716-172650-014.jpg'
import { use, useState,useEffect, createContext, lazy,Suspense} from 'react'
// import Button from 'react-bootstrap/Button';
import data from './data.js'
import { propTypes } from 'react-bootstrap/esm/Image.js'
import { Routes, Route, Link, useNavigate,Outlet, json} from 'react-router-dom'
import axios from 'axios'
import Watched from './routes/Watched.jsx'
import { useQuery } from '@tanstack/react-query'
export let Context1=createContext()

// import Detail from './routes/Detail.jsx'
// import Cart from './routes/Cart.jsx'

const Detail=lazy(()=>import('./routes/Detail.jsx'))
const Cart=lazy(()=>import('./routes/Cart.jsx'))


function App() {
  

  useEffect(()=>{
    if (localStorage.getItem('watched')==null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])
  // let obj={name:'kim'}
  // localStorage.setItem('data',JSON.stringify(obj))
  // let 꺼낸거=localStorage.getItem('data')
  // console.log(JSON.parse(꺼낸거).name)

  let result=useQuery({
    queryKey:['getName'],
    queryFn:()=>{
      return axios.get('https://codingapple1.github.io/userdata.json')
      .then(a=>a.data)
    }
  })
  console.log(result.data)
  // result.isPending


  let [shoes,setShoes]=useState(data)
  let navigate=useNavigate();
  let [more,setMore]=useState(0);
  let [loading,setLoading]=useState("");
  let [fade,setFade]=useState('end')
  let [재고]=useState([10,11,12])

  useEffect(()=>{
    let a=setTimeout(() => {
      setFade('end')
    }, 10);
    return ()=>{
      clearTimeout(a)
      setFade('')
    }
  },[])

  return (
    <div className={'App start '+fade}>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <Nav.Link onClick={()=>{navigate('/')}}>홈</Nav.Link>
            {/* <Nav.Link href='/detail'>상세페이지</Nav.Link> */}
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>앞</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>카트</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/watched')}}>최근본상품</Nav.Link>
            {/* <Link to='/'>홈</Link>
            <Link to='/detail'>상세페이지</Link> */}
          </Nav>
          <Nav className='ms-auto' style={{ color: 'white' }}>
            {result.isPending&&'로딩중'}
            {result.isError&&'에러남'}
            {result.isSuccess&&result.data.name}
          </Nav>
        </Container>
      </Navbar>
      

      

      <Suspense fallback={<div>로딩중임</div>}>
      <Routes>
        <Route className='start end' path='/' element={ // 메인페이지
          <div className={'start end'} style={{ textAlign: 'center' }}>
            <div className='main-bg' style={{backgroundImage:'url('+bg+')'}}></div>
            <div>메인페이지임</div>
            <button onClick={()=>{
              let copy=[...shoes];
              copy.sort((a,b)=>{return a.title.localeCompare(b.title)});
              shoes=setShoes(copy);
            }}>소팅</button>
            <div className="container">
              <div className="row">
                {
                  shoes.map(function(a,i){
                    return(
                      <>
                        <Modal shoes={shoes} id={i} navigate={navigate}></Modal>
                      </>
                    )
                  })
                }
              </div>
            </div>
            {
              more<2
              ?(<><button onClick={()=>{
                setLoading("로딩중");
                axios.get('https://codingapple1.github.io/shop/data'+(more+2)+'.json')
                .then((결과)=>{
                  console.log(결과.data)
                  let copy=[...shoes,...결과.data]
                  setShoes(copy)
                  setMore(more+1)
                  setTimeout(()=>{
                    setLoading("");
                  }, 5000); // 1초 유지
                })
                .catch(()=>{
                  console.log('실패함 ㅅㄱ')
                  setLoading("");
                })

                // fetch('https://codingapple1.github.io/shop/data'+(mo'.json'')

                // axios.post('/asdasd',{name:'kim'});
                // Promise.all([axios.get('/url1'),axios.get('url2')])
                // .then(()=>{

                // })
                // axios.get('/url1')
                // axios.get('/url2')
              }}>더보기</button>{loading}</>)
              :null
            }
          </div>
        }/>
        <Route path='/detail/:id' element={
          <Context1.Provider value={{재고,shoes}}>
              <Detail shoes={shoes}></Detail>

          </Context1.Provider>
        }/>


        
        <Route path='/about' element={<About></About>}>
          <Route path='member' element={<div>멤버임</div>}></Route>
          <Route path='location' element={<div>위치정보임</div>}></Route>
        </Route>
        <Route path='event' element={<><h4>오늘의 이벤트</h4><Outlet></Outlet></>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>

        <Route path='*' element={<div>없는페이지요</div>}/>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/watched' element={<Watched shoes={shoes}></Watched>}></Route>
      </Routes>
      </Suspense>

    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Modal(props){
  return(
    <div className="col-md-4" onClick={()=>{props.navigate('/detail/'+(props.shoes[props.id].id))}}>
      <img src={"https://codingapple1.github.io/shop/shoes"+(props.shoes[props.id].id+1)+".jpg"} width="80%"/>
      <h4>{props.shoes[props.id].title}</h4>
      <p>{props.shoes[props.id].content}</p>
    </div>
  )
}

export default App

/*



      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src={import.meta.env.BASE_URL + '20251022_140941.jpg'} width="80%" />
            <h4>{shoes[0].title}</h4>
            <p>상품설명</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/>
            <h4>상품명</h4>
            <p>상품설명</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/>
            <h4>상품명</h4>
            <p>상품설명</p>
          </div>
        </div>
      </div> 



*/