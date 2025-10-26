import React, { useEffect } from 'react';

const ThankYouModal = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      {/* Background overlay with blur */}
      <div 
        className="absolute inset-0 bg-white/10" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 animate-scaleIn max-w-sm mx-4">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-1">Your request has been sent successfully!</p>
          <p className="text-gray-500 text-sm">You'll be notified soon for updates</p>
        </div>

        {/* Progress bar for auto-close */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-green-500 h-1 rounded-full transition-all duration-3000 ease-linear"
            style={{ width: '100%' }}
          />
        </div>

        {/* Close button (optional) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThankYouModal;