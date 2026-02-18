import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { increaseCount,eraseItem } from "./../store";
import { increaseAge, changeName } from "../store/userSlice";
import { memo, useMemo, useState } from "react";

// let Child=memo(function(props){
//   console.log('재래더링됨')
//   return <div>{props.count}</div>
// })

// function 함수(){
//   return 반복문 10억번 돌린 결과
// }

function Cart(){

  // let [count,setCount]=useState(0);
  // let result=useMemo(()=>{return 함수()})

  let a=useSelector((state)=>{return state})
  console.log(a.data[0])
  let dispatch=useDispatch()
  
  return(
    <Table>
      {/* <Child count={count}></Child>
      <button onClick={()=>setCount(count+1)}>O</button> */}
      <div>
        {a.user.name} {a.user.age}의 장바구니
      </div>
      <button onClick={()=>{dispatch(increaseAge(100))}}>버튼</button>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {
          a.data.map((datum,i)=>{
            return(
              <tr key={i}>
                <td>{datum.id}</td>
                <td>{datum.name}</td>
                <td>{datum.count}</td>
                <td>
                  <button onClick={()=>{
                    dispatch(increaseCount(datum.id))
                  }}>+</button>
                  <button onClick={()=>{
                    dispatch(eraseItem(datum.id))
                  }}>X</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table> 
  )
}

export default Cart;