import React from 'react'
import { Routes, Route,Navigate } from "react-router";
import Homepage from './Pages/Homepage';
import ScribeHome from './Pages/Scribe/ScribeHome';
import Login from './Pages/Login';
import ScribeRegister from './Pages/Scribe/ScribeRegister';
import StudentRegister from './Pages/Student/StudentRegister';
import StudentHome from './Pages/Student/StudentHome';
import useGlobal from './utils/GlobalContext';
import axiosClient from './utils/axiosClient';
import { useEffect } from 'react';

const App = () => {
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();

  // console.log(isAuthenticated,user)
  //checkApiCall
  useEffect(()=>{
    const check=async()=>{
    try{
   const response=await axiosClient.get("/auth/check");
   const {_id,fullName,profile,state,city,role}=response?.data?.user
    if(response){
    setIsAuthenticated(true);
     
    setUser(response.data.user);
    }


    }
    catch(e){
      console.log("not verified");
    }
  }
  check();
  },[])
  
 
  return (
   <>
   <Routes>
   <Route
  path="/"
  element={
    isAuthenticated ? (
      user.role === "scribe" ? (
        <Navigate to="/scribeHome" />
      ) : user.role === "student" ? (
        <Navigate to="/studentHome" />
      ) : (
        <Homepage />
      )
    ) : (
      <Homepage />
    )
  }
/>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/scribeRegister' element={<ScribeRegister/>}></Route>
    <Route path='/studentRegister' element={<StudentRegister/>}></Route>
    <Route path='/scribeHome' element={isAuthenticated&&user.role==="scribe"?<ScribeHome/>:<Navigate to="/"></Navigate>}></Route>
    <Route path='/studentHome' element={isAuthenticated&&user.role==="student"?<StudentHome/>:<Navigate to="/"></Navigate>}></Route>

   </Routes>
   </>
  )
}

export default App
