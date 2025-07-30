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

import React, { useState } from 'react'
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';

const StudentHome = () => {
  const {language, setLanguage} = useGlobal();
  const {isAuthenticated, setIsAuthenticated} = useGlobal();
  const {user, setUser} = useGlobal();
  const {highContrast, setHighContrast} = useGlobal();
  const [availablescribe , setavailablescribe] = useState();
  
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

      // Reset form after successful submission
      // setScribeRequest({
      //   examDate: '',
      //   examTime: '',
      //   city: '',
      //   examLanguage: ''
      // });

      // setIsRequestSent(true);

      // // Hide the success message after 5 seconds
      // setTimeout(() => {
      //   setIsRequestSent(false);
      // }, 5000);

      // alert("hi");

     

    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

 

   const select = async(scb)=>{
    alert(scb.fullName);
    try {
      const response = await axiosClient.post('/auth/seltscb',  {scb , user , date : scribeRequest.examDate});
      console.log('Scribe request submitted:');
      // setavailablescribe(response.data.data);

    
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } 

  }

  function isDateBooked(scribe, targetDate) {
  const target = new Date(targetDate).toDateString();

  return scribe.bookedDates.some(date => new Date(date).toDateString() === target);
}


  return (
    <div className={`min-h-screen ${highContrast ? 'bg-white text-black' : 'bg-gray-50'}`}>
      <Navbar/>
      
      <div className="container mx-auto px-4 py-8 text-stone-950">
        {/* Success Message Box */}
        {/* {availablescribe != null && (
         availablescribe.map((scb)=>{
           <div className="max-w-2xl mx-auto mb-6">
            <div className={`${highContrast ? 'bg-green-100 border-2 border-green-800 text-green-800' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${highContrast ? 'text-green-800' : 'text-green-400'}`}>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-semibold ${highContrast ? 'text-green-800' : 'text-green-800'}`}>
                    Request Sent Successfully!
                  </h3>
                  <p className={`mt-1 text-sm ${highContrast ? 'text-green-700' : 'text-green-600'}`}>
                    Your scribe request has been submitted. You will receive a confirmation call within 24-48 hours.
                  </p>
                  <p className={`mt-1 text-xs ${highContrast ? 'text-green-600' : 'text-green-500'}`}>
                    Request ID: SR-{Date.now().toString().slice(-6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
         })
        )}
         */}
         {availablescribe != null &&  (
  availablescribe.map((scb, index) => {
    return ( !isDateBooked(scb , scribeRequest.examDate ) &&(
      
      <div key={index} className="max-w-2xl mx-auto mb-6 ">
        <div className={`${highContrast ? 'bg-green-100 border-2 border-green-800 text-green-800' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}>
          <div className="flex items-center text-black">
            <div className={`flex-shrink-0 ${highContrast ? 'text-green-800' : 'text-green-400'}`}>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div> {scb.fullName} </div>

             <div> <button onClick={ ()=>{select(scb)}}>select it</button> </div>

            
           
          </div>

        </div>
      </div>
    ))
  })
)}

        <div className="max-w-2xl mx-auto">
          <div className={`${highContrast ? 'bg-gray-100 border-2 border-black' : 'bg-white shadow-lg'} rounded-lg p-8`}>
            <h2 className={`text-3xl font-bold mb-8 text-center ${highContrast ? 'text-black' : 'text-gray-800'}`}>
              Request a Scribe
            </h2>
            
            <form className="space-y-6">
              {/* Exam Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                    Exam Date *
                  </label>
                  <input
                    type="date"
                    value={scribeRequest.examDate}
                    onChange={(e) => handleInputChange('examDate', e.target.value)}
                    className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
                      highContrast 
                        ? 'border-2 border-black bg-white text-black focus:ring-black' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                    Exam Time *
                  </label>
                  <input
                    type="time"
                    value={scribeRequest.examTime}
                    onChange={(e) => handleInputChange('examTime', e.target.value)}
                    className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
                      highContrast 
                        ? 'border-2 border-black bg-white text-black focus:ring-black' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                  City *
                </label>
                <select
                  value={scribeRequest.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
                    highContrast 
                      ? 'border-2 border-black bg-white text-black focus:ring-black' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${highContrast ? 'text-black' : 'text-gray-700'}`}>
                  Exam Language *
                </label>
                <select
                  value={scribeRequest.examLanguage}
                  onChange={(e) => handleInputChange('examLanguage', e.target.value)}
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
                    highContrast 
                      ? 'border-2 border-black bg-white text-black focus:ring-black' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                >
                  <option value="">Select Language</option>
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
                className={`w-full py-4 px-6 rounded-md font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  highContrast
                    ? 'bg-black text-white hover:bg-gray-800 border-2 border-black disabled:bg-gray-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </div>
                ) : (
                  'Submit Scribe Request'
                )}
              </button>
            </form>

            {/* Info Box */}
            <div className={`mt-8 p-4 rounded-md ${highContrast ? 'bg-gray-200 border-2 border-black' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`text-sm ${highContrast ? 'text-black' : 'text-blue-800'}`}>
                <span className="font-semibold">Note:</span> Please submit your scribe request at least 7 days before your exam date. 
                You will receive a confirmation call within 24-48 hours of submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentHome