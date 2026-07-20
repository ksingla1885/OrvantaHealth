import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Universal BackButton component that appears across the site.
 * Hidden on the root homepage (`/`).
 */
const BackButton = ({ customClass = '', variant = 'floating' }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Only show floating back button on /login and /register pages (rest of pages already have back buttons)
    const allowedAuthPaths = ['/login', '/register'];
    if (variant === 'floating' && !allowedAuthPaths.includes(location.pathname)) {
        return null;
    }

    const handleGoBack = () => {
        // If browser history exists, go back, otherwise go to home
        if (window.history.length > 1 && window.history.state?.idx > 0) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    if (variant === 'inline') {
        return (
            <button
                onClick={handleGoBack}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200/80 text-slate-700 hover:text-brand-dark hover:bg-white hover:border-brand-teal/40 transition-all shadow-sm group font-semibold text-xs ${customClass}`}
                title="Go to previous page"
            >
                <ArrowLeft className="h-4 w-4 text-brand-teal group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
            </button>
        );
    }

    // Default: Floating button positioned on bottom-left to avoid clashing with bottom-right chatbot
    return (
        <button
            onClick={handleGoBack}
            className={`fixed bottom-6 left-6 z-[9999] flex items-center gap-2 px-4 py-3 rounded-2xl bg-brand-dark/90 text-white backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-brand-teal hover:scale-105 active:scale-95 transition-all duration-300 group ${customClass}`}
            title="Go to previous page"
            aria-label="Go Back"
        >
            <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-4 w-4 text-brand-teal group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
                Back
            </span>
        </button>
    );
};

export default BackButton;
