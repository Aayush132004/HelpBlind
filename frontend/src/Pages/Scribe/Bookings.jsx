import React, { useState, useEffect } from 'react';
import { BookOpen, Phone, MessageSquare } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar'; // Import the shared Navbar component
import axiosClient from '../../utils/axiosClient';
import { Link } from 'react-router';

const Bookings = () => {
    // Access global state for theme and language from context (used by Navbar)
    const { language, highContrast } = useGlobal();
    const [announcements, setAnnouncements] = useState('');
    const [permanentStudents, setPermanentStudents] = useState([]);
    const {user,setUser}=useGlobal();
    
    

    const translations = {
        en: {
            // skipToMain: 'Skip to main content', // Removed
            mainContent: 'Scribe Booking Page',
            permanentStudents: 'Your Permanent Students',
            noPermanentStudents: 'You currently have no permanent students assigned.',
            fullName: 'Full Name',
            age: 'Age',

            mobileNumber: 'Mobile Number',
            email: 'Email',
            highestQualification: 'Highest Qualification',
            call: 'Call',
            chat: 'Chat',
            calling: 'Calling',
            chatting: 'Initiating chat',
            callInitiated: (name) => `Call initiated with ${name}.`,
            chatInitiated: (name) => `Chat initiated with ${name}.`
        },
        hi: {
            // skipToMain: 'मुख्य सामग्री पर जाएँ', // Removed
            mainContent: 'स्क्राइब बुकिंग पृष्ठ',
            permanentStudents: 'आपके स्थायी छात्र',
            noPermanentStudents: 'आपके पास वर्तमान में कोई स्थायी छात्र नहीं है।',
            fullName: 'पूरा नाम',
            age: 'आयु',
            mobileNumber: 'मोबाइल नंबर',
            email: 'ईमेल',
            highestQualification: 'उच्चतम योग्यता',
            call: 'कॉल करें',
            chat: 'चैट करें',
            calling: 'कॉल कर रहे हैं',
            chatting: 'चैट शुरू कर रहे हैं',
            callInitiated: (name) => `${name} के साथ कॉल शुरू की गई।`,
            chatInitiated: (name) => `${name} के साथ चैट शुरू की गई।`
        }
    };

    const getallstudents = async ()=>{

        try {
            console.log(user,2)
        const res = await axiosClient.post("/auth/getPermanentStudents" , {user})
        // alert("hiii")

        console.log(res.data.permanentstudent);
        setPermanentStudents(res.data.permanentstudent);
        
        
        } catch (error) {

        console.log(error)
        
        }
   }
   console.log(permanentStudents)

    const t = translations[language];

    // Effect for announcements to clear them after some time
    useEffect(() => {
        
        if (announcements) {
            const timeout = setTimeout(() => setAnnouncements(''), 3000);
            
            console.log(permanentStudents)
            return () => clearTimeout(timeout);
            

        }
    }, [announcements ]);

    useEffect(()=>{
        if (user && user._id) {
        getallstudents();
    }
        
    },[user])

    // Theme-dependent classes based on GlobalContext's highContrast state
    const baseClasses = highContrast
        ? 'bg-black text-white'
        : 'bg-gray-900 text-gray-100';

    const cardClasses = highContrast
        ? 'card bg-gray-900 border border-white shadow-lg text-white'
        : 'card bg-gray-800 shadow-xl text-gray-100';

    const buttonClasses = highContrast
        ? 'btn bg-white text-black border-white hover:bg-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
        : 'btn bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900';

    const handleCallStudent = (studentId, studentName) => {
        setAnnouncements(t.callInitiated(studentName));
        console.log(`Initiating call with student ID: ${studentId} (Name: ${studentName})`);
        // In a real app, this would trigger a call mechanism, passing studentId
        alert(`${t.calling} ${studentName}... (ID: ${studentId}) - Simulated`);
    };

    const handleChatStudent = (studentId, studentName) => {
        setAnnouncements(t.chatInitiated(studentName));
        console.log(`Initiating chat with student ID: ${studentId} (Name: ${studentName})`);
        // In a real app, this would open a chat interface, passing studentId
        alert(`${t.chatting} ${studentName}... (ID: ${studentId}) - Simulated`);
    };

    return (
        <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
            {/* Screen Reader Announcements (for page-specific actions) */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {announcements}
            </div>

            {/* The skip link and its associated translation are removed */}

            {/* Render the shared Navbar component */}
            <Navbar />

            {/* Main Content */}
            <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8">
                <section aria-labelledby="permanent-students-heading">
                    <h2 id="permanent-students-heading" className={`text-3xl font-bold mb-8 text-green-500`}>
                        {t.permanentStudents}
                    </h2>

                    {permanentStudents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {permanentStudents.map((student) => (
                                <article key={student._id} className={`${cardClasses} p-6 shadow-lg rounded-lg`}>
                                    <h3 className="text-xl font-semibold mb-3 text-blue-400">
                                        <BookOpen size={20} className="inline-block mr-2 text-green-500" aria-hidden="true" />
                                        {student.fullName}
                                    </h3>
                                    <p className="mb-1"><strong>{t.age}:</strong> {student.age}</p>
                                    <p className="mb-1"><strong>{t.mobileNumber}:</strong> {student.mobileNumber}</p>
                                    <p className="mb-1"><strong>{t.email}:</strong> {student.email || 'N/A'}</p>
                                    <p className="mb-4"><strong>{t.highestQualification}:</strong> {student.educationLevel}</p>
                                    <div className="flex gap-4 mt-4">
                                      
                                        <Link to={`/chat/${student._id}`}><button
                                            //onClick={() => handleChatStudent(student._id, student.fullName)}
                                            className={`${buttonClasses} flex-1 flex items-center justify-center gap-2`}
                                            aria-label={`${t.chat} ${student.fullName}`}
                                        >
                                            <MessageSquare size={18} aria-hidden="true" />
                                            <span>{t.chat}</span>
                                        </button></Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.noPermanentStudents}
                        </p>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className={`py-6 px-6 text-center text-sm ${highContrast ? 'bg-black border-t border-white' : 'bg-gray-900 border-t border-gray-700'}`} role="contentinfo">
                <p>&copy; {new Date().getFullYear()} {translations.en.appName}. {translations.en.tagline}</p>
            </footer>
        </div>
    );
};

export default Bookings;