import React from 'react';

const Loader = () => {
  return (
    <div className="loaderBounce text-white p-2 flex space-x-2">
      <div className="w-2 h-2 bg-secondary text-white rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-secondary text-white rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-secondary text-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
