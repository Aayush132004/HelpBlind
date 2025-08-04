import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Phone, MessageSquare, Users } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';
import { Link } from 'react-router';

const BookingStudent = () => {
    // Access global state for theme and language from context
    const { language, highContrast } = useGlobal();
    const { user } = useGlobal();
    const [announcements, setAnnouncements] = useState('');
    const [permanentScribe, setPermanentScribe] = useState(null); // Changed to null for single object
    const [isLoading, setIsLoading] = useState(true); // Added a loading state
    
    // Translations
    const translations = {
        en: {
            mainContent: 'Scribe Booking Page',
            permanentScribeHeading: 'Your Permanent Scribe',
            noPermanentScribe: 'You currently have no permanent scribe assigned.',
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
            chatInitiated: (name) => `Chat initiated with ${name}.`,
            loading: 'Loading scribe data...',
            appName: 'ScribeConnect',
            tagline: 'Bridging Learning Through Accessibility',
        },
        hi: {
            mainContent: 'स्क्राइब बुकिंग पृष्ठ',
            permanentScribeHeading: 'आपके स्थायी स्क्राइब',
            noPermanentScribe: 'आपके पास वर्तमान में कोई स्थायी स्क्राइब नहीं है।',
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
            chatInitiated: (name) => `${name} के साथ चैट शुरू की गई।`,
            loading: 'स्क्राइब डेटा लोड हो रहा है...',
            appName: 'स्क्राइबकनेक्ट',
            tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
        }
    };
    
    const t = translations[language];

    // Effect for announcements to clear them after some time
    useEffect(() => {
        if (announcements) {
            const timeout = setTimeout(() => setAnnouncements(''), 3000);
            return () => clearTimeout(timeout);
        }
    }, [announcements]);

    // Fetch permanent scribe data from API
    const getPermanentScribe = async () => {
        if (!user || !user._id) {
            console.log("User not logged in or user ID not available.");
            setIsLoading(false);
            return;
        }

        try {
            console.log(`Fetching permanent scribe for user ID: ${user._id}`);
            const res = await axiosClient.post("/auth/getPermanentScribe", { user });
            console.log("API Response:", res.data);
            setPermanentScribe(res.data.permanentscibe);
        } catch (error) {
            console.error('Failed to fetch permanent scribe:', error);
            setPermanentScribe(null); // Ensure state is cleared on error
        } finally {
            setIsLoading(false);
        }
    };

    // Call the fetch function when the user object is available
    useEffect(() => {
        getPermanentScribe();
    }, [user]);

    // Theme-dependent classes
    const baseClasses = highContrast
        ? 'bg-black text-white'
        : 'bg-gray-900 text-gray-100';

    const cardClasses = highContrast
        ? 'card bg-gray-900 border border-white shadow-lg text-white'
        : 'card bg-gray-800 shadow-xl text-gray-100';

    const buttonClasses = highContrast
        ? 'btn bg-white text-black border-white hover:bg-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
        : 'btn bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900';

    const handleCallScribe = (scribeId, scribeName) => {
        setAnnouncements(t.callInitiated(scribeName));
        console.log(`Initiating call with scribe ID: ${scribeId} (Name: ${scribeName})`);
        // In a real app, this would trigger a call mechanism, passing scribeId
        alert(`${t.calling} ${scribeName}... (ID: ${scribeId}) - Simulated`);
    };

    const handleChatScribe = (scribeId, scribeName) => {
        
        setAnnouncements(t.chatInitiated(scribeName));
        console.log(`Initiating chat with scribe ID: ${scribeId} (Name: ${scribeName})`);
        // In a real app, this would open a chat interface, passing scribeId
        alert(`${t.chatting} ${scribeName}... (ID: ${scribeId}) - Simulated`);
    };

    return (
        <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {announcements}
            </div>
            
            <Navbar />

            <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8">
                <section aria-labelledby="permanent-scribe-heading">
                    <h2 id="permanent-scribe-heading" className={`text-3xl font-bold mb-8 text-blue-500`}>
                        {t.permanentScribeHeading}
                    </h2>

                    {isLoading ? (
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.loading}
                        </p>
                    ) : permanentScribe ? (
                        <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
                            <article key={permanentScribe._id} className={`${cardClasses} p-6 shadow-lg rounded-lg`}>
                                <h3 className="text-xl font-semibold mb-3 text-green-400">
                                    <Users size={20} className="inline-block mr-2 text-blue-500" aria-hidden="true" />
                                    {permanentScribe.fullName}
                                </h3>
                                <p className="mb-1"><strong>{t.age}:</strong> {permanentScribe.age}</p>
                                <p className="mb-1"><strong>{t.mobileNumber}:</strong> {permanentScribe.mobileNumber}</p>
                                <p className="mb-1"><strong>{t.email}:</strong> {permanentScribe.email || 'N/A'}</p>
                                <p className="mb-4"><strong>{t.highestQualification}:</strong> {permanentScribe.highestQualification}</p>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={() => handleCallScribe(permanentScribe._id, permanentScribe.fullName)}
                                        className={`${buttonClasses} flex-1 flex items-center justify-center gap-2`}
                                        aria-label={`${t.call} ${permanentScribe.fullName}`}
                                    >
                                        <Phone size={18} aria-hidden="true" />
                                        <span>{t.call}</span>
                                    </button>
                                    <Link to={`/chat/${permanentScribe._id}`}><button
                                        
                                        className={`${buttonClasses} flex-1 flex items-center justify-center gap-2`}
                                        aria-label={`${t.chat} ${permanentScribe.fullName}`}
                                    >
                                        <MessageSquare size={18} aria-hidden="true" />
                                        <span>{t.chat}</span>
                                    </button></Link>
                                </div>
                            </article>
                        </div>
                    ) : (
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.noPermanentScribe}
                        </p>
                    )}
                </section>
            </main>

            <footer className={`py-6 px-6 text-center text-sm ${highContrast ? 'bg-black border-t border-white' : 'bg-gray-900 border-t border-gray-700'}`} role="contentinfo">
                <p>&copy; {new Date().getFullYear()} {translations.en.appName}. {translations.en.tagline}</p>
            </footer>
        </div>
    );
};

export default BookingStudent;
