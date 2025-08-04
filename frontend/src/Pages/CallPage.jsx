import React, { useState, useEffect, useRef } from 'react';

import useGlobal from '../utils/GlobalContext';
import Navbar from '../components/Navbar.jsx';
import { useNavigate, useParams } from 'react-router';
import axiosClient from '../utils/axiosClient';


import {
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
    StreamTheme,
    CallControls,
    SpeakerLayout,
    LoadingIndicator
} from '@stream-io/video-react-sdk';


import '@stream-io/video-react-sdk/dist/css/styles.css';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY// Replace with your actual key




const CallContent = () => {
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
    const navigate = useNavigate();

    // If the call has ended, navigate back to the dashboard or home page
    if (callingState === CallingState.LEFT) {
        navigate("/");
    }

    return (
        <StreamTheme className="h-full w-full">
            <div className="flex flex-col h-full">
                <SpeakerLayout className="flex-grow" />
                <CallControls />
            </div>
        </StreamTheme>
    );
};


const CallPage = () => {
    const { language, highContrast, user, isAuthenticated } = useGlobal();
    const { id: callId } = useParams();

    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const [isConnecting, setIsConnecting] = useState(true);
    const [token, setToken] = useState(null);
    const [announcements, setAnnouncements] = useState('');

    // Translations for this component
    const translations = {
        en: {
            loading: 'Connecting to call...',
            failed: 'Could not initialize call. Please check your connection and try again.',
            tokenError: 'Failed to fetch video call token. Please try again.',
            connecting: 'Connecting to Call...',
            joined: 'Joined call successfully',
            appName: 'ScribeConnect',
            tagline: 'Bridging Learning Through Accessibility',
            dashboard: "Dashboard",
            bookings: "Bookings",
        },
        hi: {
            loading: 'कॉल से कनेक्ट हो रहा है...',
            failed: 'कॉल शुरू नहीं हो सकी। कृपया अपना कनेक्शन जांचें और फिर से प्रयास करें।',
            tokenError: 'वीडियो कॉल टोकन प्राप्त करने में विफल। कृपया पुनः प्रयास करें।',
            connecting: 'कॉल से कनेक्ट हो रहा है...',
            joined: 'कॉल में सफलतापूर्वक शामिल हो गए',
            appName: 'स्क्राइबकनेक्ट',
            tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
            dashboard: "डैशबोर्ड",
            bookings: "बुकिंग",
        }
    };
    const t = translations[language];
    

    // Fetch the Stream token when the user is authenticated
    useEffect(() => {
        const fetchToken = async () => {
            if (!isAuthenticated || !user || !user._id) {
                console.log("User not authenticated, skipping token fetch.");
                setIsConnecting(false);
                return;
            }

            try {
                // Using axiosClient from your project to get the token
                const response = await axiosClient.post("/auth/token", { user });
                if (response.data && response.data.token) {
                    setToken(response.data.token);
                } else {
                    throw new Error("Token not found in response.");
                }
            } catch (error) {
                console.error("Error fetching stream token:", error);
                setAnnouncements(t.tokenError);
                setIsConnecting(false);
            }
        };

        fetchToken();
    }, [isAuthenticated, user, t]);

    const callInitRef = useRef(false);
    // Initialize the Stream client and join the call
    useEffect(() => {

        let isInitialized = false;
        const initCall = async () => {
            if (callInitRef.current ||!token || !user || !callId) {
                console.log("Missing token, user, or callId. Cannot initialize call.");
                // This state should not be hit if token fetching works
                setIsConnecting(false);
                return;
            }
            callInitRef.current = true;
            
            try {
                console.log(t.connecting);
                const streamUser = {
                    id: user._id,
                    name: user.fullName || user.email,
                    image: user.profile?.url || `https://placehold.co/150x150/000/FFF?text=${user.fullName ? user.fullName.charAt(0) : 'U'}`,
                };
                
                const videoClient = new StreamVideoClient({
                    apiKey: STREAM_API_KEY,
                    user: streamUser,
                    token: token,
                });

                const callInstance = videoClient.call("default", callId);
                await callInstance.join({ create: true });
                
                console.log(t.joined);
                setClient(videoClient);
                setCall(callInstance);
            } catch (err) {
                console.error("Error in initializing call", err);
                setAnnouncements(t.failed);
            } finally {
                setIsConnecting(false);
            }
        };

        initCall();

        return () => {
            isInitialized = true; // prevent re-execution on unmount
        };
    }, [callId, user, token]);

    // Theme classes for the outer wrapper
    const baseClasses = highContrast
        ? 'bg-black text-white'
        : 'bg-gray-900 text-gray-100';

    if (isConnecting) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${baseClasses}`}>
                <div className="flex flex-col items-center space-y-4">
                    <LoadingIndicator />
                    <p className="text-lg">{t.loading}</p>
                </div>
            </div>
        );
    }
    
    if (!client || !call) {
        return (
            <div className={`min-h-screen flex flex-col ${baseClasses} transition-colors duration-300 font-sans`}>

                <Navbar />
                <main id="main-content" role="main" aria-label={t.mainContent} className="flex-1 overflow-hidden">

                    <div className="text-center p-8 rounded-lg shadow-lg bg-gray-800 border border-red-500">
                        <p className="text-xl font-semibold text-red-400">{t.failed}</p>
                        <p className="mt-4 text-gray-300">
                            Please check your network connection and try again.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {announcements}
            </div>
            
            <Navbar />
            
            <main id="main-content" role="main" aria-label={t.mainContent} className=" h-[calc(100vh-80px)]">
                {client && call ? (
                    <StreamVideo client={client}>
                        <StreamCall call={call}>
                            <CallContent />
                        </StreamCall>
                    </StreamVideo>
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p>{t.failed}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CallPage;
