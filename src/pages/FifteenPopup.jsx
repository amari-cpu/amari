import React, { useState } from 'react';

const FifteenPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

//   const handleEndMeeting = () => {
//     setIsOpen(false);
//     // Add your end meeting logic here
//     console.log("Meeting ended");
//   };

//   const handleProceed = () => {
//     setIsOpen(false);
//     // Add your proceed logic here
//     console.log("Meeting continuing");
//   };

//   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {/* Clock Icon */}
            <svg 
              className="w-6 h-6 text-blue-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path 
                strokeWidth="2"
                d="M12 6v6l4 4"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">
              Time Check
            </h2>
          </div>
          <p className="text-gray-600">
            You have been in this meeting for 15 minutes. Would you like to continue or end the meeting?
          </p>
        </div>

        {/* Footer with Buttons */}
        <div className="flex gap-3">
          <button
            // onClick={handleEndMeeting}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            End Meeting
          </button>
          <button
            // onClick={handleProceed}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FifteenPopup;