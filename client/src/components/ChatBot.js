'use client';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
import { useState } from 'react';
import { useCompletion } from 'ai/react';

export default function RenderChatBot () {
  const [userPrompt, setUserPrompt] = useState('');  // For storing user input
  const { completion, complete, isLoading } = useCompletion({
    api: `${serverUrl}/ai/stream`,
    credentials: 'include',
    streamProtocol: 'text',
    onResponse: () => {
      console.log('Got data');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    await complete(userPrompt); // Send the user input prompt to the AI model
    setUserPrompt(''); // Clear input after submit
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 tracking-tight">AI Chat Assistant</h1>
        
        <div className="space-y-4 overflow-y-auto h-80 p-4 bg-gray-50 rounded-lg shadow-inner">
          {/* AI Response and User Messages */}
          <div className="space-y-2">
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-3 rounded-xl max-w-xs shadow-lg transform transition-all hover:scale-105">
                <p className="text-sm">{completion}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-xl max-w-xs shadow-lg transform transition-all hover:scale-105">
                <p className="text-sm">{userPrompt}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Input form with smooth transition */}
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}  // Update state as user types
            required
            className="w-full p-3 text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all hover:scale-105"
            placeholder="Ask me anything..."
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-gradient-to-r from-pink-500 to-pink-700 text-white p-3 rounded-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} transform transition-all hover:scale-110`}
          >
            {isLoading ? 'Generating...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
