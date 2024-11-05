import React from "react";

const EmailConflictModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50"> {/* Change 'justify-center' to 'justify-start' */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm mx-auto mt-10"> {/* Add margin-top to create space from the top */}
      <h2 className="font-bold text-lg text-black">Email Already in Use</h2>
<p className="mt-2 text-black">The email address you entered is already associated with an account.</p>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailConflictModal;
