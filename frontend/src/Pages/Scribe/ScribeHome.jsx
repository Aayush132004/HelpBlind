import React from 'react'
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import axiosClient from '../../utils/axiosClient';
const ScribeHome = () => {
  const {language, setLanguage}= useGlobal();
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();
   const {highContrast, setHighContrast} = useGlobal();

   const [ tempstudent , settempstudent] = useState();
   console.log(user,1)

   const getallstudents = async ()=>{

    try {
      const res = await axiosClient.post("/auth/getstudents" , {user})
      // alert("hiii")

       console.log(res.data.data);
       settempstudent(res.data.data);
       
      
    } catch (error) {

      console.log(error)
      
    }
   }

   const Accept = async (std)=>{

    // alert(std.student);

    try {
      const res = await axiosClient.post("/auth/accept" , {user , std})
      // alert("hiii")

      console.log(res.data.data);
      //  settempstudent(res.data.data);
      
    } catch (error) {

      console.log(error)
      
    }
   }

  return (
    <div>
      <Navbar/>
       {tempstudent != null && (
  tempstudent.map((std, index) => {
    return (
      <div key={index} className="max-w-2xl mx-auto mb-6 ">
        <div className={`${highContrast ? 'bg-green-100 border-2 border-green-800 text-green-800' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}>
          <div className="flex items-center text-black">
            <div className={`flex-shrink-0 ${highContrast ? 'text-green-800' : 'text-green-400'}`}>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div> {std.student} </div>
            <div> {std.date} </div>

             <div> <button onClick={ ()=>{Accept(std)}}>Accept it</button> </div>

            
           
          </div>

        </div>
      </div>
    )
  })
)}
      <div className="text-white">
  <button
    onClick={() => getallstudents()}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
  >
    Get All Students
  </button>
</div>
    </div>
  )
}

export default ScribeHome
