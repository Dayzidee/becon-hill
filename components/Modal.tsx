import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: 'info' | 'danger' | 'success';
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'info'
}) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger': return 'bg-red-600 hover:bg-red-700';
            case 'success': return 'bg-green-600 hover:bg-green-700';
            default: return 'bg-[#066aab] hover:bg-[#05588f]';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <div className="text-gray-600 text-sm leading-relaxed">
                        {children}
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        {cancelText}
                    </button>
                    {onConfirm && (
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`px-4 py-2 text-sm font-bold text-white rounded-lg transition-all ${getTypeStyles()}`}
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
