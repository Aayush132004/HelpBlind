import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Globe, Users, BookUser, AlertCircle } from 'lucide-react';
import useGlobal from '../utils/GlobalContext';
import Navbar from '../components/Navbar';
import axiosClient from '../utils/axiosClient';

const Dashboard = () => {
    // Access global state for user, theme, and language
    const { user, language, highContrast } = useGlobal();
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Translations for UI text - UPDATED
    const translations = {
        en: {
            mainContent: 'User Dashboard',
            bookingHistory: 'Booking History', // Changed from "Upcoming Bookings"
            loading: 'Loading your history...',
            noHistory: 'You have no past bookings in your history.', // Changed
            error: 'Failed to load booking history. Please try again later.',
            scribeName: 'Scribe Name',
            studentName: 'Student Name',
            city: 'City',
            date: 'Date',
            language: 'Language',
        },
        hi: {
            mainContent: 'उपयोगकर्ता डैशबोर्ड',
            bookingHistory: 'बुकिंग इतिहास', // Changed from "आगामी बुकिंग"
            loading: 'आपका इतिहास लोड हो रहा है...',
            noHistory: 'आपके इतिहास में कोई पिछली बुकिंग नहीं है।', // Changed
            error: 'बुकिंग इतिहास लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।',
            scribeName: 'स्क्राइब का नाम',
            studentName: 'छात्र का नाम',
            city: 'शहर',
            date: 'दिनांक',
            language: 'भाषा',
        }
    };
    const t = translations[language];

    // Fetch history data when the user object is available
    useEffect(() => {
        if (user && user.role) {
            const fetchHistory = async () => {
                setIsLoading(true);
                setError(null);
                
                // Determine the API endpoint based on the user's role
                const endpoint = user.role === 'scribe' 
                    ? '/auth/getScribeHistory' 
                    : '/auth/getStudentHistory';
                
                try {
                    const res = await axiosClient.post(endpoint, { user });
                    setHistory(res.data.history || []);
                } catch (err) {
                    console.error(`Failed to fetch history from ${endpoint}:`, err);
                    setError(t.error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchHistory();
        }
    }, [user, language]); // Rerun if user or language changes

    // Helper function to format date strings
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            });
        } catch (error) {
            return dateString;
        }
    };

    // Theme-dependent classes
    const baseClasses = highContrast ? 'bg-black text-white' : 'bg-gray-900 text-gray-100';
    const cardClasses = highContrast ? 'bg-gray-900 border border-white' : 'bg-gray-800';

    // Render logic for different states (loading, error, no data, data)
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-lg">{t.loading}</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className={`${cardClasses} p-6 text-center rounded-lg shadow-lg border-l-4 border-red-500`}>
                    <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                    <p className="text-lg">{error}</p>
                </div>
            );
        }

        if (history.length === 0) {
            return (
                <div className={`${cardClasses} p-6 text-center rounded-lg shadow-lg border-l-4 border-yellow-500`}>
                    <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
                    <p className="text-lg">{t.noHistory}</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((booking) => (
                    <article key={booking.id} className={`${cardClasses} p-6 rounded-lg shadow-lg transition-transform hover:scale-105 duration-300 border-l-4 border-blue-500`}>
                        <div className="space-y-4">
                            {user.role === 'scribe' ? (
                                <p className="flex items-center text-lg font-semibold text-blue-400">
                                    <BookUser size={20} className="mr-3" aria-hidden="true" />
                                    <span>{booking.studentName}</span>
                                </p>
                            ) : (
                                <p className="flex items-center text-lg font-semibold text-blue-400">
                                    <Users size={20} className="mr-3" aria-hidden="true" />
                                    <span>{booking.scribeName}</span>
                                </p>
                            )}
                            <hr className={`border-gray-600 ${highContrast ? 'border-gray-400' : ''}`} />
                            <p className="flex items-center">
                                <MapPin size={16} className="mr-3 text-gray-400" aria-hidden="true" />
                                <strong className="mr-2">{t.city}:</strong> {booking.city}
                            </p>
                            <p className="flex items-center">
                                <Globe size={16} className="mr-3 text-gray-400" aria-hidden="true" />
                                <strong className="mr-2">{t.language}:</strong> {booking.language}
                            </p>
                            <p className="flex items-start">
                                <Calendar size={16} className="mr-3 mt-1 text-gray-400" aria-hidden="true" />
                                <div>
                                    <strong className="block">{t.date}:</strong>
                                    <span>{formatDate(booking.date)}</span>
                                </div>
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        );
    };

    return (
        <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
            <Navbar />
            <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-8 text-blue-500">
                    {t.bookingHistory}
                </h2>
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;