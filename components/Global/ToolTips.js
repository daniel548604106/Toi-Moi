import React from 'react';

const ToolTips = ({ children }) => {
  return (
    <div className="z-50  hidden text-white whitespace-nowrap bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 rounded-lg p-2 px-5 text-xs">
      {children}
    </div>
  );
};

export default ToolTips;
