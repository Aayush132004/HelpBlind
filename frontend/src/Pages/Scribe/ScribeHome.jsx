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
// import React from 'react'
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import { useState } from 'react';
// import axiosClient from '../../utils/axiosClient';

// const ScribeHome = () => {
//   const {language, setLanguage} = useGlobal();
//   const {isAuthenticated, setIsAuthenticated} = useGlobal();
//   const {user, setUser} = useGlobal();
//   const {highContrast, setHighContrast} = useGlobal();

//   const [tempstudent, settempstudent] = useState();
//   const [loading, setLoading] = useState(false);
//   const [acceptingId, setAcceptingId] = useState(null);
//   const [ reqdata, setReqdata] = useState(null);

//   console.log(user, 1)

//   const getallstudents = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosClient.post("/auth/getstudents", {user})
//       console.log(res.data.data);
//       settempstudent(res.data.data);
//       console.log(res.data.data2, "tempstudent data2" );
//       setReqdata(res.data.data2); // Store the request data for later use
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false);
//     }
//   }

//   const  formatToIST = (isoString) => {
//   const date = new Date(isoString);

//   const options = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//     timeZone: 'Asia/Kolkata' // IST
//   };

//   return date.toLocaleString('en-IN', options);
// }

//   const Accept = async (std) => {
//     setAcceptingId(std.id || std.student); // Use unique identifier
//     try {
//       const res = await axiosClient.post("/auth/accept", {user, std})
//       console.log(res.data.data);
//       // Refresh the list after accepting
//       getallstudents();
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setAcceptingId(null);
//     }
//   }

//   return (
//     <div className={`min-h-screen ${highContrast ? 'bg-white' : 'bg-slate-50'}`}>
//       <Navbar/>
      
//       <div className="container mx-auto px-4 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className={`text-3xl font-bold mb-4 ${highContrast ? 'text-black' : 'text-slate-800'}`}>
//             Student Requests
//           </h1>
//           <p className={`text-lg ${highContrast ? 'text-gray-800' : 'text-slate-600'}`}>
//             Review and manage student connection requests
//           </p>
//         </div>

//         {/* Action Button */}
//         <div className="mb-8">
//           <button
//             onClick={() => getallstudents()}
//             disabled={loading}
//             className={`
//               ${highContrast 
//                 ? 'bg-blue-800 hover:bg-blue-900 border-2 border-blue-900 text-white' 
//                 : 'bg-blue-600 hover:bg-blue-700 text-white'
//               } 
//               font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 
//               disabled:opacity-50 disabled:cursor-not-allowed
//               flex items-center gap-2
//             `}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Loading...
//               </>
//             ) : (
//               <>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Get All Students
//               </>
//             )}
//           </button>
//         </div>

//         {/* Student Requests List */}
//         {reqdata != null && reqdata.length > 0 ? (
//           <div className="space-y-4">
//             {reqdata.map((request, index) => (
//               <div key={index} className="max-w-4xl mx-auto">
//                 <div className={`
//                   ${highContrast 
//                     ? 'bg-white border-3 border-gray-900 shadow-lg' 
//                     : 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
//                   } 
//                   rounded-xl p-6 transition-all duration-200
//                 `}>
//                   <div className="flex items-center justify-between">
//                     {/* Student Info */}
//                     <div className="flex items-center space-x-4">
//                       <div className={`
//                         flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
//                         ${highContrast ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-600'}
//                       `}>
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                         </svg>
//                       </div>
                      
//                       <div>
//                         <h3 className={`text-xl font-semibold ${highContrast ? 'text-black' : 'text-gray-900'}`}>
//                           {request.studentId}
//                         </h3>
//                         <p className={`text-sm ${highContrast ? 'text-gray-700' : 'text-gray-500'} flex items-center mt-1`}>
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
//                           </svg>
                         
//                           Request Date: {formatToIST(request.date)}
//                           <div className='text-black'>{std.city}</div>
//                         </p>
                        
//                       </div>
//                     </div>

//                     {/* Action Button */}
//                     <div className="flex-shrink-0">
//                       <button
//                         onClick={() => Accept(std)}
//                         disabled={acceptingId === (std.id || std.student)}
//                         className={`
//                           ${highContrast 
//                             ? 'bg-green-800 hover:bg-green-900 border-2 border-green-900 text-white' 
//                             : 'bg-green-600 hover:bg-green-700 text-white'
//                           }
//                           font-medium py-2 px-6 rounded-lg transition-all duration-200
//                           disabled:opacity-50 disabled:cursor-not-allowed
//                           flex items-center gap-2
//                         `}
//                       >
//                         {acceptingId === (std.id || std.student) ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Accepting...
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                             </svg>
//                             Accept Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : tempstudent != null && tempstudent.length === 0 ? (
//           /* Empty State */
//           <div className="text-center py-12">
//             <div className={`
//               w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4
//               ${highContrast ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'}
//             `}>
//               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//             </div>
//             <h3 className={`text-xl font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-900'}`}>
//               No Student Requests
//             </h3>
//             <p className={`${highContrast ? 'text-gray-700' : 'text-gray-500'}`}>
//               There are currently no pending student connection requests.
//             </p>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   )
// }

// export default ScribeHome;

// import React from 'react'
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import { useState } from 'react';
// import axiosClient from '../../utils/axiosClient';

// const ScribeHome = () => {
//   const {language, setLanguage} = useGlobal();
//   const {isAuthenticated, setIsAuthenticated} = useGlobal();
//   const {user, setUser} = useGlobal();
//   const {highContrast, setHighContrast} = useGlobal();

//   const [tempstudent, settempstudent] = useState();
//   const [loading, setLoading] = useState(false);
//   const [acceptingId, setAcceptingId] = useState(null);
//   const [reqdata, setReqdata] = useState(null);
//   const[ rejdec , setrejdec] = useState("");
//   const [rej, setrej] = useState(false);


//   console.log(user, 1)

//   const getallstudents = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosClient.post("/auth/getstudents", {user})
//       console.log(res.data.data);
//       settempstudent(res.data.data);
//       console.log(res.data.data2, "tempstudent data2" );
//       setReqdata(res.data.data2); // Store the request data for later use
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false);
//     }
//   }

//   const formatToIST = (isoString) => {
//     const date = new Date(isoString);

//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       timeZone: 'Asia/Kolkata' // IST
//     };

//     return date.toLocaleString('en-IN', options);
//   }

//   const Accept = async (request) => {
//     // TODO: Implement accept functionality

//     try {
//       const res = await axiosClient.post("/auth/acceptrequest", request)
//       alert("Request accepted successfully!");
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const Reject = async (request) => {
    
//      try {
//       const res = await axiosClient.post("/auth/acceptrequest", request)
//       alert("Request rejected successfully!");
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className={`min-h-screen ${highContrast ? 'bg-white' : 'bg-slate-50'}`}>
//       <Navbar/>
      
//       <div className="container mx-auto px-4 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className={`text-3xl font-bold mb-4 ${highContrast ? 'text-black' : 'text-slate-800'}`}>
//             Student Requests
//           </h1>
//           <p className={`text-lg ${highContrast ? 'text-gray-800' : 'text-slate-600'}`}>
//             Review and manage student connection requests
//           </p>
//         </div>

//         {/* Action Button */}
//         <div className="mb-8">
//           <button
//             onClick={() => getallstudents()}
//             disabled={loading}
//             className={`
//               ${highContrast 
//                 ? 'bg-blue-800 hover:bg-blue-900 border-2 border-blue-900 text-white' 
//                 : 'bg-blue-600 hover:bg-blue-700 text-white'
//               } 
//               font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 
//               disabled:opacity-50 disabled:cursor-not-allowed
//               flex items-center gap-2
//             `}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Loading...
//               </>
//             ) : (
//               <>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Get All Students
//               </>
//             )}
//           </button>
//         </div>

//         {/* Student Requests List */}
//         {reqdata != null && reqdata.length > 0 ? (
//           <div className="space-y-4">
//             {reqdata.filter(request => request.isAccepted === 'wait').map((request, index) => (
//               <div key={request._id || index} className="max-w-4xl mx-auto">
//                 <div className={`
//                   ${highContrast 
//                     ? 'bg-white border-3 border-gray-900 shadow-lg' 
//                     : 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
//                   } 
//                   rounded-xl p-6 transition-all duration-200
//                 `}>
//                   <div className="flex items-center justify-between">
//                     {/* Student Info */}
//                     <div className="flex items-center space-x-4">
//                       <div className={`
//                         flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
//                         ${highContrast ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-600'}
//                       `}>
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                         </svg>
//                       </div>
                      
//                       <div>
//                         <h3 className={`text-xl font-semibold ${highContrast ? 'text-black' : 'text-gray-900'}`}>
//                           Student ID: {request.studentId}
//                         </h3>
//                         <div className={`text-sm ${highContrast ? 'text-gray-700' : 'text-gray-500'} space-y-1`}>
//                           <p className="flex items-center">
//                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
//                             </svg>
//                             Request Date: {formatToIST(request.date)}
//                           </p>
//                           <p className="flex items-center">
//                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                             </svg>
//                             City: {request.city}
//                           </p>
//                           <p className="flex items-center">
//                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12l4 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
//                             </svg>
//                             Language: {request.language}
//                           </p>
//                           {request.description && (
//                             <p className="flex items-start">
//                               <svg className="w-4 h-4 mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                               </svg>
//                               Description: {request.description}
//                             </p>
//                           )}
//                           <p className="flex items-center">
//                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                             Status: {request.isAccepted}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex-shrink-0 flex gap-3">
//                       {/* Accept Button */}
//                       <button
//                         onClick={() => Accept(request)}
//                         disabled={acceptingId === request._id}
//                         className={`
//                           ${highContrast 
//                             ? 'bg-green-800 hover:bg-green-900 border-2 border-green-900 text-white' 
//                             : 'bg-green-600 hover:bg-green-700 text-white'
//                           }
//                           font-medium py-2 px-4 rounded-lg transition-all duration-200
//                           disabled:opacity-50 disabled:cursor-not-allowed
//                           flex items-center gap-2
//                         `}
//                       >
//                         {acceptingId === request._id ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Accepting...
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                             </svg>
//                             Accept
//                           </>
//                         )}
//                       </button>

//                       {/* Reject Button */}
//                       <button
//                         onClick={() => Reject(request)}
//                         disabled={acceptingId === request._id}
//                         className={`
//                           ${highContrast 
//                             ? 'bg-red-800 hover:bg-red-900 border-2 border-red-900 text-white' 
//                             : 'bg-red-600 hover:bg-red-700 text-white'
//                           }
//                           font-medium py-2 px-4 rounded-lg transition-all duration-200
//                           disabled:opacity-50 disabled:cursor-not-allowed
//                           flex items-center gap-2
//                         `}
//                       >
//                         {acceptingId === request._id ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Reject
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : reqdata != null && reqdata.filter(request => request.isAccepted === 'wait').length === 0 ? (
//           /* Empty State */
//           <div className="text-center py-12">
//             <div className={`
//               w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4
//               ${highContrast ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'}
//             `}>
//               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//             </div>
//             <h3 className={`text-xl font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-900'}`}>
//               No Student Requests
//             </h3>
//             <p className={`${highContrast ? 'text-gray-700' : 'text-gray-500'}`}>
//               There are currently no pending student connection requests.
//             </p>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   )
// }

// export default ScribeHome;

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
  const [rejectingId, setRejectingId] = useState(null);
  const [reqdata, setReqdata] = useState(null);
  const [rejdec, setrejdec] = useState("");
  const [rej, setrej] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentRejectRequest, setCurrentRejectRequest] = useState(null);

  console.log(user, 1)

  const getallstudents = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/getstudents", {user})
      console.log(res.data.data);
      settempstudent(res.data.data);
      console.log(res.data.data2, "tempstudent data2" );
      setReqdata(res.data.data2); // Store the request data for later use
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const formatToIST = (isoString) => {
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

  const Accept = async (request) => {
    setAcceptingId(request._id);
    // alert(request._id);
    try {
      const res = await axiosClient.post("/auth/acceptrequest", {
        request
  
      })
      alert("Request accepted successfully!");
      // Refresh the list
      getallstudents();
    } catch (error) {
      console.log(error)
      alert("Error accepting request");
    } finally {
      setAcceptingId(null);
    }
  }

  const handleRejectClick = (request) => {
    setCurrentRejectRequest(request);
    setShowRejectModal(true);
    setrejdec(""); // Clear previous description
  }

  const Reject = async () => {
    if (!currentRejectRequest) return;
    
    if (!rejdec.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setRejectingId(currentRejectRequest._id);
    console.log("Rejecting request:", currentRejectRequest._id, "Reason:", rejdec);
    try {
      const res = await axiosClient.post("/auth/rejectrequest", {
         currentRejectRequest,
        status: 'rejected',
        rejectionReason: rejdec
      })
      alert("Request rejected successfully!");
      // Refresh the list
      getallstudents();
      // Close modal
      setShowRejectModal(false);
      setCurrentRejectRequest(null);
      setrejdec("");
    } catch (error) {
      console.log(error)
      alert("Error rejecting request");
    } finally {
      setRejectingId(null);
    }
  }

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setCurrentRejectRequest(null);
    setrejdec("");
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
        {reqdata != null && reqdata.length > 0 ? (
          <div className="space-y-4">
            {reqdata.filter(request => request.isAccepted === 'wait').map((request, index) => (
              <div key={request._id || index} className="max-w-4xl mx-auto">
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
                          Student ID: {request.studentId}
                        </h3>
                        <div className={`text-sm ${highContrast ? 'text-gray-700' : 'text-gray-500'} space-y-1`}>
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                            </svg>
                            Request Date: {formatToIST(request.date)}
                          </p>
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            City: {request.city}
                          </p>
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12l4 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                            </svg>
                            Language: {request.language}
                          </p>
                          {request.description && (
                            <p className="flex items-start">
                              <svg className="w-4 h-4 mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Description: {request.description}
                            </p>
                          )}
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Status: {request.isAccepted}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex-shrink-0 flex gap-3">
                      {/* Accept Button */}
                      <button
                        onClick={() => Accept(request)}
                        disabled={acceptingId === request._id || rejectingId === request._id}
                        className={`
                          ${highContrast 
                            ? 'bg-green-800 hover:bg-green-900 border-2 border-green-900 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                          }
                          font-medium py-2 px-4 rounded-lg transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center gap-2
                        `}
                      >
                        {acceptingId === request._id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            Accept
                          </>
                        )}
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() => handleRejectClick(request)}
                        disabled={acceptingId === request._id || rejectingId === request._id}
                        className={`
                          ${highContrast 
                            ? 'bg-red-800 hover:bg-red-900 border-2 border-red-900 text-white' 
                            : 'bg-red-600 hover:bg-red-700 text-white'
                          }
                          font-medium py-2 px-4 rounded-lg transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center gap-2
                        `}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reqdata != null && reqdata.filter(request => request.isAccepted === 'wait').length === 0 ? (
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
              No Pending Requests
            </h3>
            <p className={`${highContrast ? 'text-gray-700' : 'text-gray-500'}`}>
              There are currently no pending student connection requests waiting for approval.
            </p>
          </div>
        ) : null}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`
              ${highContrast ? 'bg-white border-2 border-black' : 'bg-white'} 
              rounded-xl shadow-xl max-w-md w-full mx-4
            `}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${highContrast ? 'text-black' : 'text-gray-900'}`}>
                    Reject Request
                  </h3>
                  <button
                    onClick={closeRejectModal}
                    className={`
                      ${highContrast ? 'text-black hover:bg-gray-200' : 'text-gray-400 hover:text-gray-600'}
                      rounded-full p-1 transition-colors
                    `}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className={`mb-4 ${highContrast ? 'text-gray-800' : 'text-gray-600'}`}>
                  Please provide a reason for rejecting this request:
                </p>
                
                <textarea
                  value={rejdec}
                  onChange={(e) => setrejdec(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className={`
                    w-full p-3 border rounded-lg resize-none h-32
                    ${highContrast 
                      ? 'border-2 border-gray-800 bg-white text-black focus:border-blue-800' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    }
                    outline-none transition-colors text-black
                  `}
                />
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={closeRejectModal}
                    className={`
                      flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200
                      ${highContrast 
                        ? 'bg-gray-200 text-black hover:bg-gray-300 border-2 border-gray-400' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={Reject}
                    disabled={rejectingId !== null || !rejdec.trim()}
                    className={`
                      flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2
                      ${highContrast 
                        ? 'bg-red-800 hover:bg-red-900 text-white border-2 border-red-900' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                      }
                    `}
                  >
                    {rejectingId !== null ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Rejecting...
                      </>
                    ) : (
                      'Confirm Reject'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScribeHome;