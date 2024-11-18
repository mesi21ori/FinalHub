// src/components/ConfirmationNotification.tsx
import React from 'react';

interface ConfirmationNotificationProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationNotification: React.FC<ConfirmationNotificationProps> = ({ visible, onClose, onConfirm }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#E5E5CB] bg-opacity-15">
            <div className="bg-[#E5E5CB]   p-16 rounded-lg shadow-xl  w-100"> {/* Increased width to w-96 */}
                <h2 className="text-[#3C2A21] text-lg mb-4">Are you sure you want to delete your account?</h2>
                <div className="flex justify-center space-x-20"> {/* Added gap using space-x-4 */}
                    <button 
                        onClick={onConfirm} 
                        className="bg-[#3C2A21] text-white py-1.5 px-4 rounded-full shadow-md hover:bg-opacity-80 transition"
                    >
                        Yes
                    </button>
                    <button 
                        onClick={onClose} 
                        className="bg-[#3C2A21] text-white py-1.5 px-4 rounded-full shadow-md hover:bg-opacity-80 transition"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationNotification;