import React from 'react';

const Loader = () => {
  return (
    <div class="loader p-2 flex space-x-2">
      <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
      <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
      <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
