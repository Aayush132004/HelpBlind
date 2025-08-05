// // import React from 'react'
// // import useGlobal from '../../utils/GlobalContext';
// // import Navbar from '../../components/Navbar';
// // const StudentHome = () => {
// //       const {language, setLanguage}= useGlobal();
// //   const {isAuthenticated,setIsAuthenticated}=useGlobal();
// //   const {user,setUser}=useGlobal();
// //    const {highContrast, setHighContrast} = useGlobal();
// //   return (
// //     <div>
// //       <Navbar/>
// //     </div>
// //   )
// // }

// // export default StudentHome

// import React, { useState } from 'react'
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import axios from 'axios'; // Make sure axios is imported
// import axiosClient from '../../utils/axiosClient';

// const StudentHome = () => {
//   const {language, setLanguage} = useGlobal();
//   const {isAuthenticated, setIsAuthenticated} = useGlobal();
//   const {user, setUser} = useGlobal();
//   const {highContrast, setHighContrast} = useGlobal();
  
//   const [scribeRequest, setScribeRequest] = useState({
//     examDate: '',
//     examTime: '',
//     city: '',
//     examLanguage: '',
//     examSubject: '',
//     examType: '',
//     specialRequirements: '',
//     contactNumber: '',
//     examVenue: ''
//   });

//   const [isRequestSent, setIsRequestSent] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const cities = [
//     'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
//     'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
//     'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
//     'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik'
//   ];

//   const languages = [
//     'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 
//     'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Odia', 'Punjabi',
//     'Assamese', 'Nepali', 'Sanskrit'
//   ];

//   const examTypes = [
//     'Board Exam', 'Competitive Exam', 'University Exam', 'Entrance Exam',
//     'Professional Exam', 'Certification Exam', 'Other'
//   ];

//   const handleInputChange = (field, value) => {
//     setScribeRequest(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // const handleSubmitRequest = async () => {
//   //   // Basic validation
//   //   const requiredFields = ['examDate', 'city', 'examLanguage', 'examSubject', 'examType'];
//   //   const missingFields = requiredFields.filter(field => !scribeRequest[field].trim());
    
//   //   if (missingFields.length > 0) {
//   //     alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
//   //     return;
//   //   }

//   //   setIsSubmitting(true);

//   //   try {
//   //     // Here you would typically call your API to submit the scribe request
//   //     console.log('Submitting scribe request:', scribeRequest);
      
//   //     // Simulate API call delay
//   //     await new Promise(resolve => setTimeout(resolve, 1500));
      
//   //     // Reset form after submission
//   //     setScribeRequest({
//   //       examDate: '',
//   //       examTime: '',
//   //       city: '',
//   //       examLanguage: '',
//   //       examSubject: '',
//   //       examType: '',
//   //       specialRequirements: '',
//   //       contactNumber: '',
//   //       examVenue: ''
//   //     });
      
//   //     setIsRequestSent(true);
      
//   //     // Hide the success message after 5 seconds
//   //     setTimeout(() => {
//   //       setIsRequestSent(false);
//   //     }, 5000);
      
//   //   } catch (error) {
//   //     console.error('Error submitting request:', error);
//   //     alert('Failed to submit request. Please try again.');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };
   

// const handleSubmitRequest = async () => {
  
//   const requiredFields = ['examDate', 'city', 'examLanguage', 'examSubject', 'examType'];
//   const missingFields = requiredFields.filter(field => !scribeRequest[field].trim());

//   if (missingFields.length > 0) {
//     alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     // Replace this URL with your actual API endpoint
//     const response = await axiosClient.post('/auth/stdreg', scribeRequest);

//     console.log('Scribe request submitted:', response.data);

//     // Reset form after successful submission
//     // setScribeRequest({
//     //   examDate: '',
//     //   examTime: '',
//     //   city: '',
//     //   examLanguage: '',
//     //   examSubject: '',
//     //   examType: '',
//     //   specialRequirements: '',
//     //   contactNumber: '',
//     //   examVenue: ''
//     // });

//     // setIsRequestSent(true);

//     // // Hide the success message after 5 seconds
//     // setTimeout(() => {
//     //   setIsRequestSent(false);
//     // }, 5000);

//   } catch (error) {
//     console.error('Error submitting request:', error);
//     alert('Failed to submit request. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <div className={`min-h-screen ${highContrast ? 'bg-white text-black' : 'bg-gray-50'}`}>
//       <Navbar/>
      
//       <div className="container mx-auto px-4 py-8 text-stone-950">
//         {/* Success Message Box */}
//         {isRequestSent && (
//           <div className="max-w-2xl mx-auto mb-6">
//             <div className={`${highContrast ? 'bg-green-100 border-2 border-green-800 text-green-800' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}>
//               <div className="flex items-center">
//                 <div className={`flex-shrink-0 ${highContrast ? 'text-green-800' : 'text-green-400'}`}>
//                   <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className={`text-lg font-semibold ${highContrast ? 'text-green-800' : 'text-green-800'}`}>
//                     Request Sent Successfully!
//                   </h3>
//                   <p className={`mt-1 text-sm ${highContrast ? 'text-green-700' : 'text-green-600'}`}>
//                     Your scribe request has been submitted. You will receive a confirmation call within 24-48 hours.
//                   </p>
//                   <p className={`mt-1 text-xs ${highContrast ? 'text-green-600' : 'text-green-500'}`}>
//                     Request ID: SR-{Date.now().toString().slice(-6)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <div className="max-w-2xl mx-auto">
//           <div className={`${highContrast ? 'bg-gray-100 border-2 border-black' : 'bg-white shadow-lg'} rounded-lg p-8`}>
//             <h2 className={`text-3xl font-bold mb-8 text-center ${highContrast ? 'text-black' : 'text-gray-800'}`}>
//               Request a Scribe
//             </h2>
            
//             <form className="space-y-6">
//               {/* Exam Date and Time */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                     Exam Date *
//                   </label>
//                   <input
//                     type="date"
//                     value={scribeRequest.examDate}
//                     onChange={(e) => handleInputChange('examDate', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                       highContrast 
//                         ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                     Exam Time
//                   </label>
//                   <input
//                     type="time"
//                     value={scribeRequest.examTime}
//                     onChange={(e) => handleInputChange('examTime', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                       highContrast 
//                         ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   />
//                 </div>
//               </div>

//               {/* City */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                   City *
//                 </label>
//                 <select
//                   value={scribeRequest.city}
//                   onChange={(e) => handleInputChange('city', e.target.value)}
//                   className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                     highContrast 
//                       ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                   }`}
//                 >
//                   <option value="">Select City</option>
//                   {cities.map(city => (
//                     <option key={city} value={city}>{city}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Language */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                   Exam Language *
//                 </label>
//                 <select
//                   value={scribeRequest.examLanguage}
//                   onChange={(e) => handleInputChange('examLanguage', e.target.value)}
//                   className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                     highContrast 
//                       ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                   }`}
//                 >
//                   <option value="">Select Language</option>
//                   {languages.map(lang => (
//                     <option key={lang} value={lang}>{lang}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Exam Subject and Type */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                     Exam Subject *
//                   </label>
//                   <input
//                     type="text"
//                     value={scribeRequest.examSubject}
//                     onChange={(e) => handleInputChange('examSubject', e.target.value)}
//                     placeholder="e.g., Mathematics, English, Physics"
//                     className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                       highContrast 
//                         ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                     Exam Type *
//                   </label>
//                   <select
//                     value={scribeRequest.examType}
//                     onChange={(e) => handleInputChange('examType', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                       highContrast 
//                         ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   >
//                     <option value="">Select Exam Type</option>
//                     {examTypes.map(type => (
//                       <option key={type} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Exam Venue */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                   Exam Venue/Center
//                 </label>
//                 <input
//                   type="text"
//                   value={scribeRequest.examVenue}
//                   onChange={(e) => handleInputChange('examVenue', e.target.value)}
//                   placeholder="Enter exam center/venue details"
//                   className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                     highContrast 
//                       ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                   }`}
//                 />
//               </div>

//               {/* Contact Number */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                   Contact Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={scribeRequest.contactNumber}
//                   onChange={(e) => handleInputChange('contactNumber', e.target.value)}
//                   placeholder="Enter your contact number"
//                   className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                     highContrast 
//                       ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                   }`}
//                 />
//               </div>

//               {/* Special Requirements */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                   Special Requirements/Notes
//                 </label>
//                 <textarea
//                   value={scribeRequest.specialRequirements}
//                   onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
//                   placeholder="Any special requirements or additional information..."
//                   rows="4"
//                   className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors resize-vertical ${
//                     highContrast 
//                       ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                   }`}
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="button"
//                 onClick={handleSubmitRequest}
//                 disabled={isSubmitting}
//                 className={`w-full py-4 px-6 rounded-md font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//                   highContrast
//                     ? 'bg-black text-white hover:bg-gray-800 border-2 border-black disabled:bg-gray-600'
//                     : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting Request...
//                   </div>
//                 ) : (
//                   'Submit Scribe Request'
//                 )}
//               </button>
//             </form>

//             {/* Info Box */}
//             <div className={`mt-8 p-4 rounded-md ${highContrast ? 'bg-gray-200 border-2 border-black' : 'bg-blue-50 border border-blue-200'}`}>
//               <p className={`text-sm ${highContrast ? 'text-black' : 'text-blue-800'}`}>
//                 <span className="font-semibold">Note:</span> Please submit your scribe request at least 7 days before your exam date. 
//                 You will receive a confirmation call within 24-48 hours of submission.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentHome

// import React, { useState } from 'react'
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import axiosClient from '../../utils/axiosClient';

// const StudentHome = () => {
//   const {language, setLanguage} = useGlobal();
//   const {isAuthenticated, setIsAuthenticated} = useGlobal();
//   const {user, setUser} = useGlobal();
//   const {highContrast, setHighContrast} = useGlobal();
//   const [availablescribe , setavailablescribe] = useState();
  
//   const [scribeRequest, setScribeRequest] = useState({
//     examDate: '',
//     examTime: '',
//     city: '',
//     examLanguage: ''
//   });

//   const [isRequestSent, setIsRequestSent] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const cities = [
//     'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
//     'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
//     'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
//     'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik'
//   ];

//   const languages = [
//     'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 
//     'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Odia', 'Punjabi',
//     'Assamese', 'Nepali', 'Sanskrit'
//   ];

//   const handleInputChange = (field, value) => {
//     setScribeRequest(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmitRequest = async () => {
//     const requiredFields = ['examDate', 'examTime', 'city', 'examLanguage'];
//     const missingFields = requiredFields.filter(field => !scribeRequest[field].trim());

//     if (missingFields.length > 0) {
//       alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axiosClient.post('/auth/stdreq', scribeRequest);
//       console.log('Scribe request submitted:', response.data.data);
//       setavailablescribe(response.data.data);

//       // Reset form after successful submission
//       // setScribeRequest({
//       //   examDate: '',
//       //   examTime: '',
//       //   city: '',
//       //   examLanguage: ''
//       // });

//       // setIsRequestSent(true);

//       // // Hide the success message after 5 seconds
//       // setTimeout(() => {
//       //   setIsRequestSent(false);
//       // }, 5000);

//       // alert("hi");

     

//     } catch (error) {
//       console.error('Error submitting request:', error);
//       alert('Failed to submit request. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

 

//    const select = async(scb)=>{
//     alert(scb.fullName);
//     try {
//       const response = await axiosClient.post('/auth/seltscb',  {scb , user , date : scribeRequest.examDate});
//       console.log('Scribe request submitted:');
//       // setavailablescribe(response.data.data);

    
//     } catch (error) {
//       console.error('Error submitting request:', error);
//       alert('Failed to submit request. Please try again.');
//     } 

//   }

//   function isDateBooked(scribe, targetDate) {
//   const target = new Date(targetDate).toDateString();

//   return scribe.bookedDates.some(date => new Date(date).toDateString() === target);
// }


//   return (
//     <div className={`min-h-screen ${highContrast ? 'bg-white text-black' : 'bg-gray-50'}`}>
//       <Navbar/>
      
//       <div className="container mx-auto px-4 py-8 text-stone-950">
//         {/* Success Message Box */}
//         {/* {availablescribe != null && (
//          availablescribe.map((scb)=>{
//            <div className="max-w-2xl mx-auto mb-6">
//             <div className={`${highContrast ? 'bg-green-100 border-2 border-green-800 text-green-800' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}>
//               <div className="flex items-center">
//                 <div className={`flex-shrink-0 ${highContrast ? 'text-green-800' : 'text-green-400'}`}>
//                   <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className={`text-lg font-semibold ${highContrast ? 'text-green-800' : 'text-green-800'}`}>
//                     Request Sent Successfully!
//                   </h3>
//                   <p className={`mt-1 text-sm ${highContrast ? 'text-green-700' : 'text-green-600'}`}>
//                     Your scribe request has been submitted. You will receive a confirmation call within 24-48 hours.
//                   </p>
//                   <p className={`mt-1 text-xs ${highContrast ? 'text-green-600' : 'text-green-500'}`}>
//                     Request ID: SR-{Date.now().toString().slice(-6)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//          })
//         )}
//          */}
//          {availablescribe != null &&  (
//   availablescribe.map((scb, index) => {
//     return ( !isDateBooked(scb , scribeRequest.examDate ) &&(
      
//       <div key={index} className="max-w-2xl mx-auto mb-6 ">
//         <div className={`${highContrast ? 'bg-green-100 border-2 border-green-800 text-green-800' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}>
//           <div className="flex items-center text-black">
//             <div className={`flex-shrink-0 ${highContrast ? 'text-green-800' : 'text-green-400'}`}>
//               <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div> {scb.fullName} </div>

//              <div> <button onClick={ ()=>{select(scb)}}>select it</button> </div>

            
           
//           </div>

//         </div>
//       </div>
//     ))
//   })
// )}

//         <div className="max-w-2xl mx-auto">
//           <div className={`${highContrast ? 'bg-gray-100 border-2 border-black' : 'bg-white shadow-lg'} rounded-lg p-8`}>
//             <h2 className={`text-3xl font-bold mb-8 text-center ${highContrast ? 'text-black' : 'text-gray-800'}`}>
//               Request a Scribe
//             </h2>
            
//             <form className="space-y-6">
//               {/* Exam Date and Time */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                     Exam Date *
//                   </label>
//                   <input
//                     type="date"
//                     value={scribeRequest.examDate}
//                     onChange={(e) => handleInputChange('examDate', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                       highContrast 
//                         ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                     Exam Time *
//                   </label>
//                   <input
//                     type="time"
//                     value={scribeRequest.examTime}
//                     onChange={(e) => handleInputChange('examTime', e.target.value)}
//                     className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                       highContrast 
//                         ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   />
//                 </div>
//               </div>

//               {/* City */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                   City *
//                 </label>
//                 <select
//                   value={scribeRequest.city}
//                   onChange={(e) => handleInputChange('city', e.target.value)}
//                   className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                     highContrast 
//                       ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                   }`}
//                 >
//                   <option value="">Select City</option>
//                   {cities.map(city => (
//                     <option key={city} value={city}>{city}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Language */}
//               <div>
//                 <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
//                   Exam Language *
//                 </label>
//                 <select
//                   value={scribeRequest.examLanguage}
//                   onChange={(e) => handleInputChange('examLanguage', e.target.value)}
//                   className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
//                     highContrast 
//                       ? 'border-2 border-black bg-white text-black focus:ring-black' 
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                   }`}
//                 >
//                   <option value="">Select Language</option>
//                   {languages.map(lang => (
//                     <option key={lang} value={lang}>{lang}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="button"
//                 onClick={handleSubmitRequest}
//                 disabled={isSubmitting}
//                 className={`w-full py-4 px-6 rounded-md font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//                   highContrast
//                     ? 'bg-black text-white hover:bg-gray-800 border-2 border-black disabled:bg-gray-600'
//                     : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting Request...
//                   </div>
//                 ) : (
//                   'Submit Scribe Request'
//                 )}
//               </button>
//             </form>

//             {/* Info Box */}
//             <div className={`mt-8 p-4 rounded-md ${highContrast ? 'bg-gray-200 border-2 border-black' : 'bg-blue-50 border border-blue-200'}`}>
//               <p className={`text-sm ${highContrast ? 'text-black' : 'text-blue-800'}`}>
//                 <span className="font-semibold">Note:</span> Please submit your scribe request at least 7 days before your exam date. 
//                 You will receive a confirmation call within 24-48 hours of submission.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentHome

import React, { useState } from 'react'
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';

const StudentHome = () => {

  const {language, setLanguage} = useGlobal();
  const {isAuthenticated, setIsAuthenticated} = useGlobal();
  const {user, setUser} = useGlobal();
  const {highContrast, setHighContrast} = useGlobal();
  const [availablescribe, setavailablescribe] = useState();
  const [selectingScribe, setSelectingScribe] = useState(null);
  
  const [scribeRequest, setScribeRequest] = useState({
    examDate: '',
    examTime: '',
    city: '',
    examLanguage: ''
  });

  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik'
  ];

  const languages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 
    'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Odia', 'Punjabi',
    'Assamese', 'Nepali', 'Sanskrit'
  ];

  const handleInputChange = (field, value) => {
    setScribeRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitRequest = async () => {
    const requiredFields = ['examDate', 'examTime', 'city', 'examLanguage'];
    const missingFields = requiredFields.filter(field => !scribeRequest[field].trim());

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosClient.post('/auth/stdreq', scribeRequest);
      console.log('Scribe request submitted:', response.data.data);
      setavailablescribe(response.data.data);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const select = async(scb) => {
    setSelectingScribe(scb.fullName);
    try {
      const response = await axiosClient.post('/auth/seltscb', {scb, user, date: scribeRequest.examDate , scribeRequest});
      console.log('Scribe selected successfully');
      alert(` Request to Scribe ${scb.fullName} has been sent for your exam!`);
      // You might want to update the UI or redirect here
    } catch (error) {
      console.error('Error selecting scribe:', error);
      alert('Failed to select scribe. Please try again.');
    } finally {
      setSelectingScribe(null);
    }
  }

  function isDateBooked(scribe, targetDate) {
    const target = new Date(targetDate).toDateString();
    return scribe.bookedDates.some(date => new Date(date).toDateString() === target);
  }

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-white' : 'bg-slate-50'} text-black`}>
      <Navbar/>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        {/* <div className="mb-8 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${highContrast ? 'text-black' : 'text-slate-800'}`}>
            Scribe Services
          </h1>
          <p className={`text-lg ${highContrast ? 'text-gray-800' : 'text-slate-600'}`}>
            Request professional scribe assistance for your examinations
          </p>
        </div> */}

        {/* Available Scribes Section */}
        {availablescribe != null && availablescribe.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${highContrast ? 'text-black' : 'text-slate-800'}`}>
                Available Scribes
              </h2>
              <p className={`text-lg ${highContrast ? 'text-gray-700' : 'text-slate-600'}`}>
                Select your preferred scribe for <span className="font-semibold text-blue-600">{scribeRequest.examDate}</span>
              </p>
            </div>
            
            <div className="grid gap-6 mb-8">
              {availablescribe.map((scb, index) => (
                !isDateBooked(scb, scribeRequest.examDate) && (
                  <div key={index} className="max-w-5xl mx-auto">
                    <div className={`
                      relative overflow-hidden group
                      ${highContrast 
                        ? 'bg-white border-3 border-gray-900 shadow-xl' 
                        : 'bg-gradient-to-r from-white to-blue-50 border border-gray-200 shadow-lg hover:shadow-2xl'
                      } 
                      rounded-2xl p-8 transition-all duration-300 transform hover:scale-[1.02]
                    `}>
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="1"/>
                          </pattern>
                          <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        {/* Scribe Info */}
                        <div className="flex items-center space-x-6">
                          {/* Enhanced Avatar */}
                          <div className="relative">
                            {/* <div className={`
                              w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold relative
                              ${highContrast ? 'bg-blue-800 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'}
                            `}>
                              <img className='' src={scb.url} alt="" />
                              {scb.fullName.charAt(0).toUpperCase()}
                            </div> */}
                            <div
  className={`
    w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold relative
    ${highContrast ? 'bg-blue-800 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'}
  `}
>
  {scb.url ? (
    <img
      className="w-full h-full object-cover rounded-full"
      src={scb.url}
      alt={`${scb.fullName}'s profile picture`}
    />
  ) : (
    <span>{scb.fullName.charAt(0).toUpperCase()}</span>
  )}
</div>
                            {/* Online indicator */}
                            <div className={`
                              absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white
                              ${highContrast ? 'bg-green-600' : 'bg-green-500'}
                            `}>
                              <div className="w-full h-full rounded-full bg-green-400 animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className={`text-2xl font-bold ${highContrast ? 'text-black' : 'text-gray-900'}`}>
                              {scb.fullName}
                            </h3>
                            
                            {/* Status Badge */}
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              highContrast ? 'bg-green-200 text-green-900' : 'bg-green-100 text-green-800'
                            }`}>
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Available
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div className={`flex items-center text-sm ${highContrast ? 'text-gray-700' : 'text-gray-600'}`}>
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                                </svg>
                                <span className="font-medium">{scribeRequest.examDate}</span>
                              </div>
                              
                              {scb.experience && (
                                <div className={`flex items-center text-sm ${highContrast ? 'text-gray-700' : 'text-gray-600'}`}>
                                  <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                  </svg>
                                  <span className="font-medium">{scb.experience} years exp.</span>
                                </div>
                              )}

                              {scb.rating && (
                                <div className={`flex items-center text-sm ${highContrast ? 'text-gray-700' : 'text-gray-600'}`}>
                                  <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="font-medium">{scb.rating}/5 rating</span>
                                </div>
                              )}

                              {scb.specialization && (
                                <div className={`flex items-center text-sm ${highContrast ? 'text-gray-700' : 'text-gray-600'}`}>
                                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                  <span className="font-medium">{scb.specialization}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Select Button */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => select(scb)}
                            disabled={selectingScribe === scb.fullName}
                            className={`
                              relative overflow-hidden group
                              ${highContrast 
                                ? 'bg-blue-800 hover:bg-blue-900 border-2 border-blue-900 text-white' 
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                              }
                              font-semibold py-4 px-8 rounded-xl transition-all duration-300
                              disabled:opacity-50 disabled:cursor-not-allowed
                              flex items-center gap-3 min-w-[160px] justify-center
                              transform hover:scale-105 active:scale-95
                            `}
                          >
                            {/* Button Background Animation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            
                            {selectingScribe === scb.fullName ? (
                              <>
                                <div className="relative">
                                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                </div>
                                <span>Selecting...</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Select Scribe</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                     
                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                        highContrast ? 'bg-blue-800' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Request Form */}
        <div className="max-w-3xl mx-auto">
          {isSubmitting ? (
            /* Circular Loading Animation */
            <div className={`${highContrast ? 'bg-white border-3 border-black shadow-lg' : 'bg-white shadow-xl border border-gray-100'} rounded-full w-80 h-80 mx-auto flex flex-col items-center justify-center`}>
              <div className="relative">
                {/* Outer spinning ring */}
                <div className={`w-32 h-32 rounded-full border-8 ${highContrast ? 'border-gray-300' : 'border-gray-200'}`}></div>
                <div className={`absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-transparent ${highContrast ? 'border-t-black border-r-black' : 'border-t-blue-600 border-r-purple-600'} animate-spin`}></div>
                
                {/* Inner pulsing circle */}
                <div className={`absolute top-4 left-4 w-24 h-24 rounded-full ${highContrast ? 'bg-gray-200' : 'bg-gradient-to-br from-blue-100 to-purple-100'} animate-pulse flex items-center justify-center`}>
                  <svg className={`w-12 h-12 ${highContrast ? 'text-black' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <h3 className={`text-xl font-bold mb-2 ${highContrast ? 'text-black' : 'text-gray-800'}`}>
                  Finding Available Scribes
                </h3>
                <p className={`text-sm ${highContrast ? 'text-gray-700' : 'text-gray-600'}`}>
                  Please wait while we search for scribes in your area...
                </p>
                <div className="flex justify-center mt-4 space-x-1">
                  <div className={`w-2 h-2 rounded-full ${highContrast ? 'bg-black' : 'bg-blue-600'} animate-bounce`} style={{animationDelay: '0ms'}}></div>
                  <div className={`w-2 h-2 rounded-full ${highContrast ? 'bg-black' : 'bg-blue-600'} animate-bounce`} style={{animationDelay: '150ms'}}></div>
                  <div className={`w-2 h-2 rounded-full ${highContrast ? 'bg-black' : 'bg-blue-600'} animate-bounce`} style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Form */
            <div className={`${highContrast ? 'bg-white border-3 border-black shadow-lg' : 'bg-white shadow-xl border border-gray-100'} rounded-2xl p-8`}>
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold mb-2 ${highContrast ? 'text-black' : 'text-gray-800'}`}>
                  Request a Scribe
                </h2>
                <p className={`${highContrast ? 'text-gray-700' : 'text-gray-600'}`}>
                  Fill in your exam details to find available scribes
                </p>
              </div>
              
              <form className="space-y-6">
              {/* Exam Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
                      </svg>
                      Exam Date *
                    </span>
                  </label>
                  <input
                    type="date"
                    value={scribeRequest.examDate}
                    onChange={(e) => handleInputChange('examDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-4 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      highContrast 
                        ? 'border-2 border-black bg-white text-black focus:ring-black focus:border-black' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Exam Time *
                    </span>
                  </label>
                  <input
                    type="time"
                    value={scribeRequest.examTime}
                    onChange={(e) => handleInputChange('examTime', e.target.value)}
                    className={`w-full px-4 py-4 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      highContrast 
                        ? 'border-2 border-black bg-white text-black focus:ring-black focus:border-black' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className={`block text-sm font-semibold mb-3 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    City *
                  </span>
                </label>
                <select
                  value={scribeRequest.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-4 py-4 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    highContrast 
                      ? 'border-2 border-black bg-white text-black focus:ring-black focus:border-black' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                  }`}
                >
                  <option value="">Select your city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className={`block text-sm font-semibold mb-3 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Exam Language *
                  </span>
                </label>
                <select
                  value={scribeRequest.examLanguage}
                  onChange={(e) => handleInputChange('examLanguage', e.target.value)}
                  className={`w-full px-4 py-4 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    highContrast 
                      ? 'border-2 border-black bg-white text-black focus:ring-black focus:border-black' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                  }`}
                >
                  <option value="">Select exam language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] ${
                  highContrast
                    ? 'bg-black text-white hover:bg-gray-800 border-2 border-black disabled:bg-gray-600'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-blue-300 disabled:to-blue-400 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Available Scribes
                </div>
              </button>
            </form>

            {/* Info Box */}
            <div className={`mt-8 p-6 rounded-xl ${highContrast ? 'bg-gray-100 border-2 border-gray-400' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'}`}>
              <div className="flex items-start">
                <div className={`flex-shrink-0 ${highContrast ? 'text-black' : 'text-blue-600'}`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className={`font-semibold mb-2 ${highContrast ? 'text-black' : 'text-blue-900'}`}>
                    Important Information
                  </h4>
                  <ul className={`text-sm space-y-1 ${highContrast ? 'text-gray-800' : 'text-blue-800'}`}>
                    <li>• Submit your request at least 7 days before your exam date</li>
                    <li>• You will receive a confirmation call within 24-48 hours</li>
                    <li>• All scribes are professionally trained and certified</li>
                    <li>• Free cancellation up to 48 hours before the exam</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>

  )

}

export default StudentHome;