// import React, { useState, useEffect, useRef } from 'react';
// import { BookOpen, Phone, MessageSquare, Users } from 'lucide-react';
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import axiosClient from '../../utils/axiosClient';
// import { Link } from 'react-router';

// const BookingStudent = () => {
//     // Access global state for theme and language from context
//     const { language, highContrast } = useGlobal();
//     const { user } = useGlobal();
//     const [announcements, setAnnouncements] = useState('');
//     const [permanentScribe, setPermanentScribe] = useState(null); // Changed to null for single object
//     const [isLoading, setIsLoading] = useState(true); // Added a loading state
//     const [ rejectedrequest , setrejectedrequest] = useState();
//     // Translations
//     const translations = {
//         en: {
//             mainContent: 'Scribe Booking Page',
//             permanentScribeHeading: 'Your Permanent Scribe',
//             noPermanentScribe: 'You currently have no permanent scribe assigned.',
//             fullName: 'Full Name',
//             age: 'Age',
//             mobileNumber: 'Mobile Number',
//             email: 'Email',
//             highestQualification: 'Highest Qualification',
//             call: 'Call',
//             chat: 'Chat',
//             calling: 'Calling',
//             chatting: 'Initiating chat',
//             callInitiated: (name) => `Call initiated with ${name}.`,
//             chatInitiated: (name) => `Chat initiated with ${name}.`,
//             loading: 'Loading scribe data...',
//             appName: 'ScribeConnect',
//             tagline: 'Bridging Learning Through Accessibility',
//         },
//         hi: {
//             mainContent: 'स्क्राइब बुकिंग पृष्ठ',
//             permanentScribeHeading: 'आपके स्थायी स्क्राइब',
//             noPermanentScribe: 'आपके पास वर्तमान में कोई स्थायी स्क्राइब नहीं है।',
//             fullName: 'पूरा नाम',
//             age: 'आयु',
//             mobileNumber: 'मोबाइल नंबर',
//             email: 'ईमेल',
//             highestQualification: 'उच्चतम योग्यता',
//             call: 'कॉल करें',
//             chat: 'चैट करें',
//             calling: 'कॉल कर रहे हैं',
//             chatting: 'चैट शुरू कर रहे हैं',
//             callInitiated: (name) => `${name} के साथ कॉल शुरू की गई।`,
//             chatInitiated: (name) => `${name} के साथ चैट शुरू की गई।`,
//             loading: 'स्क्राइब डेटा लोड हो रहा है...',
//             appName: 'स्क्राइबकनेक्ट',
//             tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
//         }
//     };
    
//     const t = translations[language];

//     // Effect for announcements to clear them after some time
//     useEffect(() => {
//         if (announcements) {
//             const timeout = setTimeout(() => setAnnouncements(''), 3000);
//             return () => clearTimeout(timeout);
//         }
//     }, [announcements]);

//     // Fetch permanent scribe data from API
//     const getPermanentScribe = async () => {
//         if (!user || !user._id) {
//             console.log("User not logged in or user ID not available.");
//             setIsLoading(false);
//             return;
//         }

//         try {
//             console.log(`Fetching permanent scribe for user ID: ${user._id}`);
//             const res = await axiosClient.post("/auth/getPermanentScribe", { user });
//             console.log("API Response:", res.data);
//             setPermanentScribe(res.data.permanentscibe);
//         } catch (error) {
//             console.error('Failed to fetch permanent scribe:', error);
//             setPermanentScribe(null); // Ensure state is cleared on error
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const getrejectedRequests = async () => {
//         try {
//             const res = await axiosClient.post("/auth/getRejectedRequests", { user });

//             console.log("hellow", res.data );
//             // setrejectedrequest(res.data);
//             // console.log("Rejected Requests State:", rejectedrequest);
//         }
//         catch (error) {
//             console.error('Failed to fetch rejected requests:', error);
//         }       
            
//     };

//     // Call the fetch function when the user object is available
//     useEffect(() => {
//         getPermanentScribe();
//         getrejectedRequests();
//     }, [user]);

//     // Theme-dependent classes
//     const baseClasses = highContrast
//         ? 'bg-black text-white'
//         : 'bg-gray-900 text-gray-100';

//     const cardClasses = highContrast
//         ? 'card bg-gray-900 border border-white shadow-lg text-white'
//         : 'card bg-gray-800 shadow-xl text-gray-100';

//     const buttonClasses = highContrast
//         ? 'btn bg-white text-black border-white hover:bg-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
//         : 'btn bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900';

//     const handleCallScribe = (scribeId, scribeName) => {
//         setAnnouncements(t.callInitiated(scribeName));
//         console.log(`Initiating call with scribe ID: ${scribeId} (Name: ${scribeName})`);
//         // In a real app, this would trigger a call mechanism, passing scribeId
//         alert(`${t.calling} ${scribeName}... (ID: ${scribeId}) - Simulated`);
//     };

//     const handleChatScribe = (scribeId, scribeName) => {
        
//         setAnnouncements(t.chatInitiated(scribeName));
//         console.log(`Initiating chat with scribe ID: ${scribeId} (Name: ${scribeName})`);
//         // In a real app, this would open a chat interface, passing scribeId
//         alert(`${t.chatting} ${scribeName}... (ID: ${scribeId}) - Simulated`);
//     };

//     return (
//         <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
//             <div aria-live="polite" aria-atomic="true" className="sr-only">
//                 {announcements}
//             </div>
            
//             <Navbar />

//             <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8">
//                 <section aria-labelledby="permanent-scribe-heading">
//                     <h2 id="permanent-scribe-heading" className={`text-3xl font-bold mb-8 text-blue-500`}>
//                         {t.permanentScribeHeading}
//                     </h2>

//                     {isLoading ? (
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.loading}
//                         </p>
//                     ) : permanentScribe ? (
//                         <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
//                             <article key={permanentScribe._id} className={`${cardClasses} p-6 shadow-lg rounded-lg`}>
//                                 <h3 className="text-xl font-semibold mb-3 text-green-400">
//                                     <Users size={20} className="inline-block mr-2 text-blue-500" aria-hidden="true" />
//                                     {permanentScribe.fullName}
//                                 </h3>
//                                 <p className="mb-1"><strong>{t.age}:</strong> {permanentScribe.age}</p>
//                                 <p className="mb-1"><strong>{t.mobileNumber}:</strong> {permanentScribe.mobileNumber}</p>
//                                 <p className="mb-1"><strong>{t.email}:</strong> {permanentScribe.email || 'N/A'}</p>
//                                 <p className="mb-4"><strong>{t.highestQualification}:</strong> {permanentScribe.highestQualification}</p>
//                                 <div className="flex gap-4 mt-4">
//                                     <button
//                                         onClick={() => handleCallScribe(permanentScribe._id, permanentScribe.fullName)}
//                                         className={`${buttonClasses} flex-1 flex items-center justify-center gap-2`}
//                                         aria-label={`${t.call} ${permanentScribe.fullName}`}
//                                     >
//                                         <Phone size={18} aria-hidden="true" />
//                                         <span>{t.call}</span>
//                                     </button>
//                                     <Link to={`/chat/${permanentScribe._id}`}><button
                                        
//                                         className={`${buttonClasses} flex-1 flex items-center justify-center gap-2`}
//                                         aria-label={`${t.chat} ${permanentScribe.fullName}`}
//                                     >
//                                         <MessageSquare size={18} aria-hidden="true" />
//                                         <span>{t.chat}</span>
//                                     </button></Link>
//                                 </div>
//                             </article>
//                         </div>
//                     ) : (
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.noPermanentScribe}
//                         </p>
//                     )}
//                 </section>
//             </main>

//             <footer className={`py-6 px-6 text-center text-sm ${highContrast ? 'bg-black border-t border-white' : 'bg-gray-900 border-t border-gray-700'}`} role="contentinfo">
//                 <p>&copy; {new Date().getFullYear()} {translations.en.appName}. {translations.en.tagline}</p>
//             </footer>
//         </div>
//     );
// };

// export default BookingStudent;
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Phone, MessageSquare, Users, AlertCircle, Calendar, MapPin, Globe, FileText, Clock, X } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';
import { Link } from 'react-router';

const BookingStudent = () => {
    // Access global state for theme and language from context
    const { language, highContrast } = useGlobal();
    const { user } = useGlobal();
    const [announcements, setAnnouncements] = useState('');
    const [permanentScribe, setPermanentScribe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [isLoadingRejected, setIsLoadingRejected] = useState(true);
    const [showRejectedDetails, setShowRejectedDetails] = useState({});

    // Translations
    const translations = {
        en: {
            mainContent: 'Scribe Booking Page',
            permanentScribeHeading: 'Your Permanent Scribe',
            rejectedRequestsHeading: 'Rejected Requests',
            noPermanentScribe: 'You currently have no permanent scribe assigned.',
            noRejectedRequests: 'You have no rejected requests at the moment.',
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
            loadingRejected: 'Loading rejected requests...',
            appName: 'ScribeConnect',
            tagline: 'Bridging Learning Through Accessibility',
            city: 'City',
            date: 'Date',
            language: 'Language',
            description: 'Description',
            requestedOn: 'Requested On',
            rejectedOn: 'Rejected On',
            viewDetails: 'View Details',
            hideDetails: 'Hide Details',
            status: 'Status',
            rejected: 'Rejected',
            noDescription: 'No description provided',
            requestId: 'Request ID',
        },
        hi: {
            mainContent: 'स्क्राइब बुकिंग पृष्ठ',
            permanentScribeHeading: 'आपके स्थायी स्क्राइब',
            rejectedRequestsHeading: 'अस्वीकृत अनुरोध',
            noPermanentScribe: 'आपके पास वर्तमान में कोई स्थायी स्क्राइब नहीं है।',
            noRejectedRequests: 'आपके पास इस समय कोई अस्वीकृत अनुरोध नहीं है।',
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
            loadingRejected: 'अस्वीकृत अनुरोध लोड हो रहे हैं...',
            appName: 'स्क्राइबकनेक्ट',
            tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
            city: 'शहर',
            date: 'दिनांक',
            language: 'भाषा',
            description: 'विवरण',
            requestedOn: 'अनुरोध किया गया',
            rejectedOn: 'अस्वीकृत किया गया',
            viewDetails: 'विवरण देखें',
            hideDetails: 'विवरण छुपाएं',
            status: 'स्थिति',
            rejected: 'अस्वीकृत',
            noDescription: 'कोई विवरण प्रदान नहीं किया गया',
            requestId: 'अनुरोध आईडी',
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
            setPermanentScribe(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getRejectedRequests = async () => {
        if (!user || !user._id) {
            console.log("User not logged in or user ID not available.");
            setIsLoadingRejected(false);
            return;
        }

        try {
            const res = await axiosClient.post("/auth/getRejectedRequests", { user });
            console.log("Rejected requests response:", res.data);
            
            // Assuming the response structure - adjust based on your actual API response
            const requests = Array.isArray(res.data) ? res.data : res.data.rejectedRequests || [];
            setRejectedRequests(requests);
        } catch (error) {
            console.error('Failed to fetch rejected requests:', error);
            setRejectedRequests([]);
        } finally {
            setIsLoadingRejected(false);
        }
    };

    // Call the fetch functions when the user object is available
    useEffect(() => {
        if (user) {
            getPermanentScribe();
            getRejectedRequests();
        }
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

    const secondaryButtonClasses = highContrast
        ? 'btn bg-gray-800 text-white border border-white hover:bg-gray-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
        : 'btn bg-gray-600 text-white border-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900';

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

    const toggleRejectedDetails = (requestId) => {
        setShowRejectedDetails(prev => ({
            ...prev,
            [requestId]: !prev[requestId]
        }));
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {announcements}
            </div>
            
            <Navbar />

            <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8 space-y-12">
                {/* Permanent Scribe Section */}
                <section aria-labelledby="permanent-scribe-heading">
                    <h2 id="permanent-scribe-heading" className={`text-3xl font-bold mb-8 text-blue-500`}>
                        {t.permanentScribeHeading}
                    </h2>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.loading}
                            </p>
                        </div>
                    ) : permanentScribe ? (
                        <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
                            <article className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-green-500`}>
                                <h3 className="text-xl font-semibold mb-3 text-green-400">
                                    <Users size={20} className="inline-block mr-2 text-blue-500" aria-hidden="true" />
                                    {permanentScribe.fullName}
                                </h3>
                                <div className="space-y-2 mb-4">
                                    <p className="flex items-center"><strong className="w-24 inline-block">{t.age}:</strong> {permanentScribe.age}</p>
                                    <p className="flex items-center"><strong className="w-24 inline-block">{t.mobileNumber}:</strong> {permanentScribe.mobileNumber}</p>
                                    <p className="flex items-center"><strong className="w-24 inline-block">{t.email}:</strong> {permanentScribe.email || 'N/A'}</p>
                                    <p className="flex items-start"><strong className="w-24 inline-block">{t.highestQualification}:</strong> <span className="flex-1">{permanentScribe.highestQualification}</span></p>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={() => handleCallScribe(permanentScribe._id, permanentScribe.fullName)}
                                        className={`${buttonClasses} flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200`}
                                        aria-label={`${t.call} ${permanentScribe.fullName}`}
                                    >
                                        <Phone size={18} aria-hidden="true" />
                                        <span>{t.call}</span>
                                    </button>
                                    <Link to={`/chat/${permanentScribe._id}`} className="flex-1">
                                        <button
                                            className={`${buttonClasses} w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200`}
                                            aria-label={`${t.chat} ${permanentScribe.fullName}`}
                                        >
                                            <MessageSquare size={18} aria-hidden="true" />
                                            <span>{t.chat}</span>
                                        </button>
                                    </Link>
                                </div>
                            </article>
                        </div>
                    ) : (
                        <div className={`${cardClasses} p-6 text-center rounded-lg`}>
                            <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.noPermanentScribe}
                            </p>
                        </div>
                    )}
                </section>

                {/* Rejected Requests Section */}
                <section aria-labelledby="rejected-requests-heading">
                    <h2 id="rejected-requests-heading" className={`text-3xl font-bold mb-8 text-red-500`}>
                        {t.rejectedRequestsHeading}
                    </h2>

                    {isLoadingRejected ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mr-3"></div>
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.loadingRejected}
                            </p>
                        </div>
                    ) : rejectedRequests.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rejectedRequests.map((request) => (
                                <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-red-500`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-red-400 flex items-center">
                                            <X size={18} className="mr-2" aria-hidden="true" />
                                            {t.rejected}
                                        </h3>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            highContrast ? 'bg-red-800 text-white' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {t.status}: {t.rejected}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <p className="flex items-center text-sm">
                                            <MapPin size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.city}:</strong> {request.city}
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <Calendar size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.date}:</strong> {formatDate(request.date)}
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <Globe size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.language}:</strong> {request.language}
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <Clock size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.rejectedOn}:</strong> {formatDate(request.updatedAt)}
                                        </p>
                                    </div>

                                    {showRejectedDetails[request._id] && (
                                        <div className={`mt-4 p-3 rounded-lg ${
                                            highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
                                        }`}>
                                            <p className="text-sm mb-2">
                                                <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
                                            </p>
                                            <p className="text-sm mb-2">
                                                <strong>{t.requestedOn}:</strong> {formatDate(request.createdAt)}
                                            </p>
                                            <div className="text-sm">
                                                <strong>{t.description}:</strong>
                                                <p className="mt-1 text-gray-300">
                                                    {request.description || t.noDescription}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => toggleRejectedDetails(request._id)}
                                        className={`${secondaryButtonClasses} w-full mt-4 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
                                        aria-label={showRejectedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                    >
                                        <FileText size={16} aria-hidden="true" />
                                        <span>
                                            {showRejectedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                        </span>
                                    </button>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className={`${cardClasses} p-6 text-center rounded-lg`}>
                            <AlertCircle size={48} className="mx-auto mb-4 text-green-500" />
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.noRejectedRequests}
                            </p>
                        </div>
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

// import React, { useState, useEffect, useRef } from 'react';
// import { BookOpen, Phone, MessageSquare, Users, AlertCircle, Calendar, MapPin, Globe, FileText, Clock, X, ChevronDown, ChevronUp } from 'lucide-react';
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import axiosClient from '../../utils/axiosClient';
// import { Link } from 'react-router';

// const BookingStudent = () => {
//     // Access global state for theme and language from context
//     const { language, highContrast } = useGlobal();
//     const { user } = useGlobal();
//     const [announcements, setAnnouncements] = useState('');
//     const [permanentScribe, setPermanentScribe] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [rejectedRequests, setRejectedRequests] = useState([]);
//     const [isLoadingRejected, setIsLoadingRejected] = useState(true);
//     const [showRejectedDetails, setShowRejectedDetails] = useState({});

//     // Translations
//     const translations = {
//         en: {
//             mainContent: 'Scribe Booking Dashboard',
//             permanentScribeHeading: 'Your Permanent Scribe',
//             rejectedRequestsHeading: 'Recent Rejected Requests',
//             noPermanentScribe: 'No permanent scribe assigned yet.',
//             noRejectedRequests: 'No rejected requests found.',
//             fullName: 'Full Name',
//             age: 'Age',
//             mobileNumber: 'Mobile Number',
//             email: 'Email',
//             highestQualification: 'Highest Qualification',
//             call: 'Call',
//             chat: 'Chat',
//             calling: 'Calling',
//             chatting: 'Initiating chat',
//             callInitiated: (name) => `Call initiated with ${name}.`,
//             chatInitiated: (name) => `Chat initiated with ${name}.`,
//             loading: 'Loading...',
//             loadingRejected: 'Loading requests...',
//             appName: 'ScribeConnect',
//             tagline: 'Bridging Learning Through Accessibility',
//             city: 'City',
//             date: 'Date',
//             language: 'Language',
//             description: 'Description',
//             requestedOn: 'Requested On',
//             rejectedOn: 'Rejected On',
//             viewDetails: 'View Details',
//             hideDetails: 'Hide Details',
//             status: 'Status',
//             rejected: 'Rejected',
//             noDescription: 'No description provided',
//             requestId: 'Request ID',
//         },
//         hi: {
//             mainContent: 'स्क्राइब बुकिंग डैशबोर्ड',
//             permanentScribeHeading: 'आपका स्थायी स्क्राइब',
//             rejectedRequestsHeading: 'हाल के अस्वीकृत अनुरोध',
//             noPermanentScribe: 'अभी तक कोई स्थायी स्क्राइब नहीं मिला।',
//             noRejectedRequests: 'कोई अस्वीकृत अनुरोध नहीं मिला।',
//             fullName: 'पूरा नाम',
//             age: 'आयु',
//             mobileNumber: 'मोबाइल नंबर',
//             email: 'ईमेल',
//             highestQualification: 'उच्चतम योग्यता',
//             call: 'कॉल करें',
//             chat: 'चैट करें',
//             calling: 'कॉल कर रहे हैं',
//             chatting: 'चैट शुरू कर रहे हैं',
//             callInitiated: (name) => `${name} के साथ कॉल शुरू की गई।`,
//             chatInitiated: (name) => `${name} के साथ चैट शुरू की गई।`,
//             loading: 'लोड हो रहा है...',
//             loadingRejected: 'अनुरोध लोड हो रहे हैं...',
//             appName: 'स्क्राइबकनेक्ट',
//             tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
//             city: 'शहर',
//             date: 'दिनांक',
//             language: 'भाषा',
//             description: 'विवरण',
//             requestedOn: 'अनुरोध किया गया',
//             rejectedOn: 'अस्वीकृत किया गया',
//             viewDetails: 'विवरण देखें',
//             hideDetails: 'विवरण छुपाएं',
//             status: 'स्थिति',
//             rejected: 'अस्वीकृत',
//             noDescription: 'कोई विवरण प्रदान नहीं किया गया',
//             requestId: 'अनुरोध आईडी',
//         }
//     };
    
//     const t = translations[language];

//     // Effect for announcements to clear them after some time
//     useEffect(() => {
//         if (announcements) {
//             const timeout = setTimeout(() => setAnnouncements(''), 3000);
//             return () => clearTimeout(timeout);
//         }
//     }, [announcements]);

//     // Fetch permanent scribe data from API
//     const getPermanentScribe = async () => {
//         if (!user || !user._id) {
//             console.log("User not logged in or user ID not available.");
//             setIsLoading(false);
//             return;
//         }

//         try {
//             console.log(`Fetching permanent scribe for user ID: ${user._id}`);
//             const res = await axiosClient.post("/auth/getPermanentScribe", { user });
//             console.log("API Response:", res.data);
//             setPermanentScribe(res.data.permanentscibe);
//         } catch (error) {
//             console.error('Failed to fetch permanent scribe:', error);
//             setPermanentScribe(null);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const getRejectedRequests = async () => {
//         if (!user || !user._id) {
//             console.log("User not logged in or user ID not available.");
//             setIsLoadingRejected(false);
//             return;
//         }

//         try {
//             const res = await axiosClient.post("/auth/getRejectedRequests", { user });
//             console.log("Rejected requests response:", res.data);
            
//             // Assuming the response structure - adjust based on your actual API response
//             const requests = Array.isArray(res.data) ? res.data : res.data.rejectedRequests || [];
//             setRejectedRequests(requests);
//         } catch (error) {
//             console.error('Failed to fetch rejected requests:', error);
//             setRejectedRequests([]);
//         } finally {
//             setIsLoadingRejected(false);
//         }
//     };

//     // Call the fetch functions when the user object is available
//     useEffect(() => {
//         if (user) {
//             getPermanentScribe();
//             getRejectedRequests();
//         }
//     }, [user]);

//     const handleCallScribe = (scribeId, scribeName) => {
//         setAnnouncements(t.callInitiated(scribeName));
//         console.log(`Initiating call with scribe ID: ${scribeId} (Name: ${scribeName})`);
//         alert(`${t.calling} ${scribeName}... (ID: ${scribeId}) - Simulated`);
//     };

//     const handleChatScribe = (scribeId, scribeName) => {
//         setAnnouncements(t.chatInitiated(scribeName));
//         console.log(`Initiating chat with scribe ID: ${scribeId} (Name: ${scribeName})`);
//         alert(`${t.chatting} ${scribeName}... (ID: ${scribeId}) - Simulated`);
//     };

//     const toggleRejectedDetails = (requestId) => {
//         setShowRejectedDetails(prev => ({
//             ...prev,
//             [requestId]: !prev[requestId]
//         }));
//     };

//     const formatDate = (dateString) => {
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//             });
//         } catch (error) {
//             return dateString;
//         }
//     };

//     return (
//         <div className={`min-h-screen transition-colors duration-300 ${
//             highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
//         }`}>
//             <div aria-live="polite" aria-atomic="true" className="sr-only">
//                 {announcements}
//             </div>
            
//             <Navbar />

//             <div className="max-w-6xl mx-auto px-4 py-8">
//                 <header className="mb-8">
//                     <h1 className="text-3xl font-bold text-center mb-2">
//                         {t.mainContent}
//                     </h1>
//                 </header>

//                 <div className="space-y-8">
//                     {/* Permanent Scribe Section */}
//                     <section>
//                         <h2 className="text-2xl font-semibold mb-6 flex items-center">
//                             <Users className="mr-3 text-blue-500" size={24} />
//                             {t.permanentScribeHeading}
//                         </h2>

//                         {isLoading ? (
//                             <div className={`p-8 rounded-xl text-center ${
//                                 highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm border border-gray-200'
//                             }`}>
//                                 <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//                                 <p className="text-gray-500">{t.loading}</p>
//                             </div>
//                         ) : permanentScribe ? (
//                             <div className={`p-6 rounded-xl ${
//                                 highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm border border-gray-200'
//                             }`}>
//                                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                                     <div className="flex-1">
//                                         <h3 className="text-xl font-semibold mb-4 text-green-600">
//                                             {permanentScribe.fullName}
//                                         </h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                                             <div>
//                                                 <span className="font-medium text-gray-600">{t.age}:</span>
//                                                 <span className="ml-2">{permanentScribe.age}</span>
//                                             </div>
//                                             <div>
//                                                 <span className="font-medium text-gray-600">{t.mobileNumber}:</span>
//                                                 <span className="ml-2">{permanentScribe.mobileNumber}</span>
//                                             </div>
//                                             <div>
//                                                 <span className="font-medium text-gray-600">{t.email}:</span>
//                                                 <span className="ml-2">{permanentScribe.email || 'N/A'}</span>
//                                             </div>
//                                             <div>
//                                                 <span className="font-medium text-gray-600">{t.highestQualification}:</span>
//                                                 <span className="ml-2">{permanentScribe.highestQualification}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex gap-3">
//                                         <button
//                                             onClick={() => handleCallScribe(permanentScribe._id, permanentScribe.fullName)}
//                                             className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                                         >
//                                             <Phone size={18} />
//                                             {t.call}
//                                         </button>
//                                         <Link to={`/chat/${permanentScribe._id}`}>
//                                             <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
//                                                 <MessageSquare size={18} />
//                                                 {t.chat}
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className={`p-8 rounded-xl text-center ${
//                                 highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm border border-gray-200'
//                             }`}>
//                                 <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                 <p className="text-gray-500">{t.noPermanentScribe}</p>
//                             </div>
//                         )}
//                     </section>

//                     {/* Rejected Requests Section */}
//                     <section>
//                         <h2 className="text-2xl font-semibold mb-6 flex items-center">
//                             <X className="mr-3 text-red-500" size={24} />
//                             {t.rejectedRequestsHeading}
//                         </h2>

//                         {isLoadingRejected ? (
//                             <div className={`p-8 rounded-xl text-center ${
//                                 highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm border border-gray-200'
//                             }`}>
//                                 <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//                                 <p className="text-gray-500">{t.loadingRejected}</p>
//                             </div>
//                         ) : rejectedRequests.length > 0 ? (
//                             <div className="space-y-4">
//                                 {rejectedRequests.map((request) => (
//                                     <div
//                                         key={request._id}
//                                         className={`p-5 rounded-xl border-l-4 border-red-500 ${
//                                             highContrast ? 'bg-gray-900 border-r border-t border-b border-gray-700' : 'bg-white shadow-sm border-r border-t border-b border-gray-200'
//                                         }`}
//                                     >
//                                         <div className="flex items-start justify-between mb-4">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-4 mb-3">
//                                                     <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
//                                                         {t.rejected}
//                                                     </span>
//                                                     <span className="text-sm text-gray-500">
//                                                         {formatDate(request.updatedAt)}
//                                                     </span>
//                                                 </div>
//                                                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
//                                                     <div className="flex items-center gap-2">
//                                                         <MapPin className="text-gray-400" size={16} />
//                                                         <span className="font-medium">{t.city}:</span>
//                                                         <span>{request.city}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2">
//                                                         <Calendar className="text-gray-400" size={16} />
//                                                         <span className="font-medium">{t.date}:</span>
//                                                         <span>{formatDate(request.date)}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2">
//                                                         <Globe className="text-gray-400" size={16} />
//                                                         <span className="font-medium">{t.language}:</span>
//                                                         <span>{request.language}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <button
//                                                 onClick={() => toggleRejectedDetails(request._id)}
//                                                 className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
//                                             >
//                                                 {showRejectedDetails[request._id] ? (
//                                                     <>
//                                                         {t.hideDetails}
//                                                         <ChevronUp size={16} />
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         {t.viewDetails}
//                                                         <ChevronDown size={16} />
//                                                     </>
//                                                 )}
//                                             </button>
//                                         </div>

//                                         {showRejectedDetails[request._id] && (
//                                             <div className={`pt-4 border-t ${
//                                                 highContrast ? 'border-gray-700' : 'border-gray-200'
//                                             }`}>
//                                                 <div className="space-y-3 text-sm">
//                                                     <div>
//                                                         <span className="font-medium text-gray-600">{t.requestId}:</span>
//                                                         <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
//                                                             {request._id}
//                                                         </code>
//                                                     </div>
//                                                     <div>
//                                                         <span className="font-medium text-gray-600">{t.requestedOn}:</span>
//                                                         <span className="ml-2">{formatDate(request.createdAt)}</span>
//                                                     </div>
//                                                     <div>
//                                                         <span className="font-medium text-gray-600">{t.description}:</span>
//                                                         <p className="mt-1 text-gray-700">
//                                                             {request.description || t.noDescription}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className={`p-8 rounded-xl text-center ${
//                                 highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm border border-gray-200'
//                             }`}>
//                                 <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                 <p className="text-gray-500">{t.noRejectedRequests}</p>
//                             </div>
//                         )}
//                     </section>
//                 </div>
//             </div>

//             <footer className={`mt-16 py-6 text-center text-sm border-t ${
//                 highContrast ? 'bg-black border-gray-700' : 'bg-white border-gray-200'
//             }`}>
//                 <p className="text-gray-500">
//                     &copy; {new Date().getFullYear()} {translations.en.appName}. {translations.en.tagline}
//                 </p>
//             </footer>
//         </div>
//     );
// };

// export default BookingStudent;