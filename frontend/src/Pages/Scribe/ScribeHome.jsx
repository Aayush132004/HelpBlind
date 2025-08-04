// import React from 'react'
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import { useState } from 'react';
// import axiosClient from '../../utils/axiosClient';
// const ScribeHome = () => {
//   const {language, setLanguage}= useGlobal();
//   const {isAuthenticated,setIsAuthenticated}=useGlobal();
//   const {user,setUser}=useGlobal();
//    const {highContrast, setHighContrast} = useGlobal();

//    const [ tempstudent , settempstudent] = useState();
//    console.log(user,1)

//    const getallstudents = async ()=>{

//     try {
//       const res = await axiosClient.post("/auth/getstudents" , {user})
//       // alert("hiii")

//        console.log(res.data.data);
//        settempstudent(res.data.data);
       
      
//     } catch (error) {

//       console.log(error)
      
//     }
//    }

//    const Accept = async (std)=>{

//     // alert(std.student);

//     try {
//       const res = await axiosClient.post("/auth/accept" , {user , std})
//       // alert("hiii")

//       console.log(res.data.data);
//       //  settempstudent(res.data.data);
      
//     } catch (error) {

//       console.log(error)
      
//     }
//    }

//   return (
//     <div>
//       <Navbar/>
//        {tempstudent != null && (
//   tempstudent.map((std, index) => {
//     return (
//       <div key={index} className="max-w-2xl mx-auto mb-6 ">
//         <div className={`${highContrast ? 'bg-green-100 border-2 border-green-800 text-green-800' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}>
//           <div className="flex items-center text-black">
//             <div className={`flex-shrink-0 ${highContrast ? 'text-green-800' : 'text-green-400'}`}>
//               <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div> {std.student} </div>
//             <div> {std.date} </div>

//              <div> <button onClick={ ()=>{Accept(std)}}>Accept it</button> </div>

            
           
//           </div>

//         </div>
//       </div>
//     )
//   })
// )}
//       <div className="text-white">
//   <button
//     onClick={() => getallstudents()}
//     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
//   >
//     Get All Students
//   </button>
// </div>
//     </div>
//   )
// }

// export default ScribeHome
import React from 'react'
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import axiosClient from '../../utils/axiosClient';

const ScribeHome = () => {
  const {language, setLanguage} = useGlobal();
  const {isAuthenticated, setIsAuthenticated} = useGlobal();
  const {user, setUser} = useGlobal();
  const {highContrast, setHighContrast} = useGlobal();

  const [tempstudent, settempstudent] = useState();
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);

  console.log(user, 1)

  const getallstudents = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/getstudents", {user})
      console.log(res.data.data);
      settempstudent(res.data.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const  formatToIST = (isoString) => {
  const date = new Date(isoString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata' // IST
  };

  return date.toLocaleString('en-IN', options);
}

  const Accept = async (std) => {
    setAcceptingId(std.id || std.student); // Use unique identifier
    try {
      const res = await axiosClient.post("/auth/accept", {user, std})
      console.log(res.data.data);
      // Refresh the list after accepting
      getallstudents();
    } catch (error) {
      console.log(error)
    } finally {
      setAcceptingId(null);
    }
  }

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-white' : 'bg-slate-50'}`}>
      <Navbar/>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${highContrast ? 'text-black' : 'text-slate-800'}`}>
            Student Requests
          </h1>
          <p className={`text-lg ${highContrast ? 'text-gray-800' : 'text-slate-600'}`}>
            Review and manage student connection requests
          </p>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={() => getallstudents()}
            disabled={loading}
            className={`
              ${highContrast 
                ? 'bg-blue-800 hover:bg-blue-900 border-2 border-blue-900 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              } 
              font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Get All Students
              </>
            )}
          </button>
        </div>

        {/* Student Requests List */}
        {tempstudent != null && tempstudent.length > 0 ? (
          <div className="space-y-4">
            {tempstudent.map((std, index) => (
              <div key={index} className="max-w-4xl mx-auto">
                <div className={`
                  ${highContrast 
                    ? 'bg-white border-3 border-gray-900 shadow-lg' 
                    : 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
                  } 
                  rounded-xl p-6 transition-all duration-200
                `}>
                  <div className="flex items-center justify-between">
                    {/* Student Info */}
                    <div className="flex items-center space-x-4">
                      <div className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                        ${highContrast ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-600'}
                      `}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      <div>
                        <h3 className={`text-xl font-semibold ${highContrast ? 'text-black' : 'text-gray-900'}`}>
                          {std.student}
                        </h3>
                        <p className={`text-sm ${highContrast ? 'text-gray-700' : 'text-gray-500'} flex items-center mt-1`}>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                          </svg>
                         
                          Request Date: {formatToIST(std.date)}
                          <div className='text-black'>{std.city}</div>
                        </p>
                        
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => Accept(std)}
                        disabled={acceptingId === (std.id || std.student)}
                        className={`
                          ${highContrast 
                            ? 'bg-green-800 hover:bg-green-900 border-2 border-green-900 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                          }
                          font-medium py-2 px-6 rounded-lg transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center gap-2
                        `}
                      >
                        {acceptingId === (std.id || std.student) ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Accepting...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Accept Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : tempstudent != null && tempstudent.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className={`
              w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4
              ${highContrast ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'}
            `}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className={`text-xl font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-900'}`}>
              No Student Requests
            </h3>
            <p className={`${highContrast ? 'text-gray-700' : 'text-gray-500'}`}>
              There are currently no pending student connection requests.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ScribeHome;