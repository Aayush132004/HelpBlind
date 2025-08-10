// import React from 'react';
// import { User, Phone, Mail, MapPin, GraduationCap, FileText, Calendar, Shield } from 'lucide-react';
// import { useState } from 'react';
// import { useEffect } from 'react'; 
// import axiosClient from '../../utils/axiosClient';
// import useGlobal from '../../utils/GlobalContext';
// import { Navigate } from 'react-router-dom';

// import Navbar from '../../components/Navbar';

// // Mock student data
// const stddata = {
//   aadhaarNumber: "123456789012",
//   fullName: "Arjun Kumar Sharma",
//   mobileNumber: "9876543210",
//   email: "arjun.sharma@email.com",
//   age: 22,
//   state: "Maharashtra",
//   city: "Mumbai",
//   educationLevel: "Undergraduate",
//   disability: "None",
//   role: "student",
//   profile: {
//     url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
//   },
//   adhaarCard: {
//     url: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"
//   },
//   createdAt: "2024-01-15"
// };

// function StudentProfile() {

//     const [ studentData, setStudentData ] = useState(stddata);
//     const {user , setuser} = useGlobal();

//     const getstudentprofile = async () => {
//         try {
//             console.log(user._id)
//             const response = await axiosClient.post(`/auth/getstudentprofile`, {user});

//             console.log(response.data.student);
//             setStudentData(response.data.student);
//         } catch (error) {
//             console.error("Error fetching student profile:", error);
//         }

//     }

//     useEffect(() => {
//         if (user && user._id) {
//             getstudentprofile();
//         }   

//     }, [user]);

//     // if (!user || user.role !== "student") {
//     //     return <Navigate to="/login" />;
//     // }  



//   return (
//     <>
//     <Navbar />
//     <div className="min-h-screen bg-slate-100 p-4">
        
//       <div className="max-w-4xl mx-auto">
        
//         {/* Main Profile Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
//           <div className="p-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className="relative">
//                 <img
//                   src={studentData.profile.url}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full object-cover border-4 border-slate-100"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
//               </div>
//               <div className="flex-1">
//                 <h1 className="text-2xl font-bold text-slate-900 mb-1">{studentData.fullName}</h1>
//                 <p className="text-slate-600 mb-2 capitalize">{studentData.role}</p>
//                 <div className="flex items-center text-slate-500 text-sm">
//                   <MapPin className="w-4 h-4 mr-1" />
//                   {studentData.city}, {studentData.state}
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
//                   Edit Profile
//                 </button>
//                 <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
//                   Download
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Information Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* Personal Details */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center mb-4">
//               <User className="w-5 h-5 text-slate-600 mr-2" />
//               <h2 className="font-semibold text-slate-900">Personal Details</h2>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Full Name</label>
//                 <p className="text-slate-900 font-medium">{studentData.fullName}</p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Age</label>
//                 <p className="text-slate-900 font-medium">{studentData.age} years</p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Disability</label>
//                 <p className="text-slate-900 font-medium">{studentData.disability}</p>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center mb-4">
//               <Phone className="w-5 h-5 text-slate-600 mr-2" />
//               <h2 className="font-semibold text-slate-900">Contact Info</h2>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Mobile</label>
//                 <p className="text-slate-900 font-medium">{studentData.mobileNumber}</p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</label>
//                 <p className="text-slate-900 font-medium">{studentData.email}</p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Location</label>
//                 <p className="text-slate-900 font-medium">{studentData.city}, {studentData.state}</p>
//               </div>
//             </div>
//           </div>

//           {/* Education */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center mb-4">
//               <GraduationCap className="w-5 h-5 text-slate-600 mr-2" />
//               <h2 className="font-semibold text-slate-900">Education</h2>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Level</label>
//                 <p className="text-slate-900 font-medium">{studentData.educationLevel}</p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Status</label>
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                   Active
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Documents and Security */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
//           {/* Documents */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center mb-4">
//               <FileText className="w-5 h-5 text-slate-600 mr-2" />
//               <h2 className="font-semibold text-slate-900">Documents</h2>
//             </div>
//             <div className="space-y-4">
//               <div className="border border-slate-200 rounded-xl p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h3 className="font-medium text-slate-900">Aadhaar Card</h3>
//                     <p className="text-sm text-slate-500">Identity Document</p>
//                   </div>
//                   <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
//                     Verified
//                   </span>
//                 </div>
//                 <img 
//                   src={studentData.adhaarCard.url} 
//                   alt="Aadhaar Card"
//                   className="w-full h-24 object-cover rounded-lg border border-slate-200"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Security Info */}
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center mb-4">
//               <Shield className="w-5 h-5 text-slate-600 mr-2" />
//               <h2 className="font-semibold text-slate-900">Security</h2>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Aadhaar Number</label>
//                 <p className="text-slate-900 font-mono font-medium">
//                   {studentData.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Account Created</label>
//                 <div className="flex items-center text-slate-900 font-medium">
//                   <Calendar className="w-4 h-4 mr-2 text-slate-500" />
//                   {new Date(studentData.createdAt).toLocaleDateString('en-US', { 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default StudentProfile;


import React from 'react';
import { User, Phone, Mail, MapPin, GraduationCap, FileText, Calendar, Shield, BookOpen, Users, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import axiosClient from '../../utils/axiosClient';
import useGlobal from '../../utils/GlobalContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Mock data for both roles
const mockStudentData = {
  aadhaarNumber: "123456789012",
  fullName: "Arjun Kumar Sharma",
  mobileNumber: "9876543210",
  email: "arjun.sharma@email.com",
  age: 22,
  state: "Maharashtra",
  city: "Mumbai",
  educationLevel: "Undergraduate",
  disability: "None",
  role: "student",
  profile: {
    url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  adhaarCard: {
    url: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  createdAt: "2024-01-15"
};

const mockScribeData = {
  aadhaarNumber: "987654321098",
  fullName: "Priya Singh",
  mobileNumber: "9123456789",
  email: "priya.singh@email.com",
  age: 28,
  state: "Delhi",
  city: "New Delhi",
  highestQualification: "Master's in Education",
  role: "scribe",
  profile: {
    url: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  aadhaarCard: {
    url: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  qualificationImgLink: {
    url: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  permanentstudent: [],
  tempstudent: [],
  bookedDates: [],
  createdAt: "2024-01-10"
};

function UnifiedProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setuser } = useGlobal();

  // if( !user ) {
  //   return <Navigate to="/login" />;
  // }

  const getProfileData = async () => {
    try {
      setIsLoading(true);
      console.log(user._id, user.role);
      
      const endpoint = user.role === "student" ? "/auth/getstudentprofile" : "/auth/getscribeprofile";
      const response = await axiosClient.post(endpoint, { user });

      const profileKey = user.role === "student" ? "student" : "scribe";
      console.log(response.data[profileKey]);
      setProfileData(response.data[profileKey]);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Use mock data as fallback
      setProfileData(user.role === "student" ? mockStudentData : mockScribeData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getProfileData();
    } else {
      // Use mock data if no user
      setProfileData(mockStudentData);
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!profileData) {
    return <Navigate to="/login" />;
  }

  const isScribe = profileData.role === "scribe";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <img
                    src={profileData.profile?.url || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">{profileData.fullName}</h1>
                  <p className="text-slate-600 mb-2 capitalize">{profileData.role}</p>
                  <div className="flex items-center text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.city}, {profileData.state}
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-slate-600 mr-2" />
                <h2 className="font-semibold text-slate-900">Personal Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Full Name</label>
                  <p className="text-slate-900 font-medium">{profileData.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Age</label>
                  <p className="text-slate-900 font-medium">{profileData.age} years</p>
                </div>
                {!isScribe && (
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Disability</label>
                    <p className="text-slate-900 font-medium">{profileData.disability || 'None'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-slate-600 mr-2" />
                <h2 className="font-semibold text-slate-900">Contact Info</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Mobile</label>
                  <p className="text-slate-900 font-medium">{profileData.mobileNumber}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</label>
                  <p className="text-slate-900 font-medium">{profileData.email || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Location</label>
                  <p className="text-slate-900 font-medium">{profileData.city}, {profileData.state}</p>
                </div>
              </div>
            </div>

            {/* Education/Qualification */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-5 h-5 text-slate-600 mr-2" />
                <h2 className="font-semibold text-slate-900">
                  {isScribe ? 'Qualification' : 'Education'}
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {isScribe ? 'Highest Qualification' : 'Education Level'}
                  </label>
                  <p className="text-slate-900 font-medium">
                    {isScribe ? profileData.highestQualification : profileData.educationLevel}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Status</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Scribe Information */}
          {isScribe && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Student Connections */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-5 h-5 text-slate-600 mr-2" />
                  <h2 className="font-semibold text-slate-900">Student Connections</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Permanent Students</span>
                    <span className="font-semibold text-slate-900">
                      {profileData.permanentstudent?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Temporary Assignments</span>
                    <span className="font-semibold text-slate-900">
                      {profileData.tempstudent?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Booked Dates</span>
                    <span className="font-semibold text-slate-900">
                      {profileData.bookedDates?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-slate-600 mr-2" />
                  <h2 className="font-semibold text-slate-900">Availability</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Next Available</label>
                    <p className="text-slate-900 font-medium">Today</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents and Security */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-slate-600 mr-2" />
                <h2 className="font-semibold text-slate-900">Documents</h2>
              </div>
              <div className="space-y-4">
                {/* Aadhaar Card */}
                <div className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-slate-900">Aadhaar Card</h3>
                      <p className="text-sm text-slate-500">Identity Document</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Verified
                    </span>
                  </div>
                  <img
                    src={profileData.aadhaarCard?.url || profileData.adhaarCard?.url || "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    alt="Aadhaar Card"
                    className="w-full h-24 object-cover rounded-lg border border-slate-200"
                  />
                </div>

                {/* Qualification Document (Scribe only) */}
                {isScribe && profileData.qualificationImgLink?.url && (
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-slate-900">Qualification Certificate</h3>
                        <p className="text-sm text-slate-500">Education Document</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Verified
                      </span>
                    </div>
                    <img
                      src={profileData.qualificationImgLink.url}
                      alt="Qualification Certificate"
                      className="w-full h-24 object-cover rounded-lg border border-slate-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-slate-600 mr-2" />
                <h2 className="font-semibold text-slate-900">Security</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Aadhaar Number</label>
                  <p className="text-slate-900 font-mono font-medium">
                    {profileData.aadhaarNumber?.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Account Created</label>
                  <div className="flex items-center text-slate-900 font-medium">
                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                    {new Date(profileData.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnifiedProfile;