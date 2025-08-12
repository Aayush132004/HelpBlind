import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useGlobal from '../utils/GlobalContext';
import Navbar from '../components/Navbar';
import axiosClient from '../utils/axiosClient';

import {
    Chat,
    Channel,
    ChannelHeader,
    MessageInput,
    MessageList,
    Thread,
    Window
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/v2/index.css';
import './styles/dark-chat-theme.css';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { VideoIcon } from 'lucide-react';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY // Replace with your actual key

const ChatPage = () => {
    const { language, highContrast, user, isAuthenticated } = useGlobal();
    const { id: targetUserId } = useParams();
    const navigate = useNavigate();

    const [chatClient, setChatClient] = useState(null)
    const [channel, setChannel] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null);
    const [announcements, setAnnouncements] = useState('');

    const translations = {
        en: {
            loading: 'Connecting to chat...',
            failed: 'Could not connect to chat. Please try again later.',
            tokenError: 'Failed to fetch chat token. Please try again.',
            connecting: 'Connecting to chat...',
            appName: 'ScribeConnect',
            tagline: 'Bridging Learning Through Accessibility',
            // Added for chat functionality
            videoCall: 'Video Call',
            callMessage: (url) => `I've started a video call. Join me here: ${url}`,
        },
        hi: {
            loading: 'चैट से कनेक्ट हो रहा है...',
            failed: 'चैट से कनेक्ट नहीं हो सका। कृपया बाद में पुनः प्रयास करें।',
            tokenError: 'चैट टोकन प्राप्त करने में विफल। कृपया पुनः प्रयास करें।',
            connecting: 'चैट से कनेक्ट हो रहा है...',
            appName: 'स्क्राइबकनेक्ट',
            tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
            // Added for chat functionality
            videoCall: 'वीडियो कॉल',
            callMessage: (url) => `मैंने एक वीडियो कॉल शुरू की है। यहां जुड़ें: ${url}`,
        }
    };

    const t = translations[language];

    // Consolidated useEffect hook to handle all initialization logic
    useEffect(() => {
        setLoading(true);

        const initChat = async () => {
          //console.log(user)
            // Check if all necessary information is available before proceeding
            // This is the core fix: ensure `user` and `targetUserId` are not null/undefined.
            if ( !user ) {
                console.log("Missing user, target ID, or API key. Chat initialization paused.");
                setLoading(false);
                return;
            }

            try {
                // Step 1: Fetch the token
                console.log("Fetching chat token...");
                const response = await axiosClient.post("/auth/token",{user});
                
                if (!response.data ) {
                    throw new Error("Token not found in response.");
                }
                const fetchedToken = response.data.token;

                // Step 2: Initialize the chat client
                //console.log(t.connecting);
                const client = StreamChat.getInstance(STREAM_API_KEY);
                console.log(1)
                await client.connectUser({
                    id: user._id,
                    name: user.fullName || user.email,
                    image: user.profile?.url || '',
                }, fetchedToken);
                console.log(2)
                // Step 3: Set up the channel
                
                console.log(user._id,targetUserId,3);
                const channelId = [user._id, targetUserId].sort().join("-");
                const currChannel = client.channel("messaging", channelId, {
                    
                    members: [user._id, targetUserId]
                });
                await currChannel.watch();
                
                setChatClient(client);
                setChannel(currChannel);

            } catch (err) {
                console.error("Error in initializing chat", err);
                setAnnouncements(t.failed);
                setChatClient(null);
                setChannel(null);
            } finally {
                setLoading(false);
            }
        };

        initChat();

        return () => {
            if (chatClient) {
                chatClient.disconnectUser();
            }
        };
    }, [ user, targetUserId]);

    const handleVideoCall = () => {
        if (channel) {
            const callUrl = `${window.location.origin}/call/${channel.id}`;
            //navigate(`/call/${channel.id}`);
            channel.sendMessage({
                text : `I've started a video call. Join me here: ${callUrl}`
            });
        }
    }

    const baseClasses = highContrast
        ? 'bg-black text-white'
        : 'bg-gray-900 text-gray-100';

    if (loading || !chatClient || !channel) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${baseClasses}`}>
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-lg">{t.loading}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {announcements}
            </div>
            <Navbar />
            <main id="main-content" role="main" aria-label={t.mainContent} className="h-[calc(100vh-70px)]">
                <div className={`dark-chat-theme ${highContrast ? 'high-contrast' : ''}`}>
                    <Chat client={chatClient}>
                        <Channel channel={channel}>
                            <div className="relative h-[calc(100vh-70px)] w-full">
                                <button
                                    className={`absolute right-6 top-3 z-10 p-2 rounded-full transition-colors ${
                                        highContrast 
                                            ? 'bg-white text-black hover:bg-gray-200 border-2 border-white' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                    onClick={handleVideoCall}
                                    aria-label={t.videoCall}
                                >
                                    <VideoIcon className='size-6'/>
                                </button>
                                <Window className="h-full">
                                    <ChannelHeader />
                                    <MessageList />
                                    <MessageInput focus />
                                </Window>
                            </div>
                            <Thread/>
                        </Channel>
                    </Chat>
                </div>
            </main>
        </div>
    );
}

export default ChatPage;