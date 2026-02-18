import { Table } from "react-bootstrap"

function Watched(props){

  // let obj={name:'kim'}
  // localStorage.setItem('data',JSON.stringify(obj))
  let watched=JSON.parse(localStorage.getItem('watched'))
  // console.log(JSON.parse(watched).name)
  console.log(watched)
  return(
      <Table>
        <thead>
          <tr>
          <th>#</th>
          <th>상품명</th>
          </tr>
        </thead>
        <tbody>
          {
            watched.length!=0
            ?(
              watched.map((datum,i)=>{
                let ind=props.shoes.findIndex((a)=>a.id==datum)
                console.log(ind)
                if(ind==-1)return null
                return(
                  <tr key={i}>
                      <td>{props.shoes[ind].id}</td>
                      <td>{props.shoes[ind].title}</td>
                      {/* <td>{props.shoes[ind].content}</td> */}
                  </tr>
                )
              })
            )
            :<div>상품이 없습니다.</div>
          }
        </tbody>
    </Table>    
  )
}
export default Watched;