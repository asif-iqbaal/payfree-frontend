// Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>

        {/* Pulsing Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping"></div>
      </div>
    </div>
  );
};

export default Loader;
