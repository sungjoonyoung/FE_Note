import { configureStore, createSlice } from '@reduxjs/toolkit'

import user from './store/userSlice.jsx'



let data=createSlice({
  name:'data',
  initialState:[
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ] ,
  reducers:{
    increaseCount(state,id){
      let ind=state.findIndex((a)=>a.id===id.payload);
      state[ind].count++;
    },
    insertItem(state,action){
      let ind=state.findIndex((a)=>a.id===action.payload.id)
      {
        ind==-1
        ?state.push(action.payload)
        :state[ind].count++;
        // console.log(state[ind].count)
      }
    },
    eraseItem(state,action){
      let ind=state.findIndex((a)=>a.id===action.payload);
      state.splice(ind,1)
    }
  }
})

export let {increaseCount,insertItem,eraseItem}=data.actions

export default configureStore({
  reducer: {
    user:user.reducer,
    data:data.reducer
  }
})