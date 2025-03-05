"use client"
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface BankModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BankModal: React.FC<BankModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        // Prevent background scrolling when modal is open
        if (typeof document !== 'undefined' && isOpen) {
            document.body.classList.add('overflow-hidden');
        } else if (typeof document !== 'undefined') {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.body.classList.remove('overflow-hidden');
            }
        };
    }, [isOpen]);

    useEffect(() => {
        // Add event listener to close modal when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            const modal = document.getElementById('modal');
            if (modal && !modal.contains(event.target as Node)) {
                onClose();
            }
        };

        if (typeof document !== 'undefined' && isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Modal */}
            <div
                id="modal"
                className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded shadow-lg transition-all duration-300 w-full max-w-2xl overflow-hidden ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%]'
                }`}
                style={{ transitionProperty: 'opacity, transform' }}
            >
                {/* Close Button */}
                <div className="flex justify-end items-center p-2">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Header */}
                

                {/* Modal Content */}
                <div className="p-6 px-14 overflow-y-auto max-h-[70vh]">{children}</div>
            </div>
        </>
    );
};

export default BankModal;
