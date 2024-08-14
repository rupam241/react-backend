import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'

function App() {
  const [loading,setLoading]=useState(true);

  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }

      else{
        dispatch(logout({}))
      }
    })
    .finally(()=>{
      setLoading(falses)
    })
  },[])
  
  return !loading? (
    <div ></div>
  ) :null
}

export default App 