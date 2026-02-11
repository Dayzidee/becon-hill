import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`fixed bottom-8 right-8 z-[110] flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border animate-fadeIn ${type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
            }`}>
            <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <span className="text-sm font-bold">{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
};

export default Toast;
