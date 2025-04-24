import React from 'react';

export default function SimplePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Simple Page</h1>
      <p className="text-lg text-gray-700 mb-6">This is a basic React page with Tailwind CSS.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition">
        Click Me
      </button>
    </div>
  );
}
