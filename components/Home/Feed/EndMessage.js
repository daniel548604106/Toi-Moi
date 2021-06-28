import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
const EndMessage = () => {
  return (
    <div className="text-center shadow-lg flex items-center flex-col justify-center p-5 rounded-lg bg-secondary text-secondary">
      <CheckCircleIcon className="h-10 text-main mb-3" />
      <h2 className="text-lg sm:text-2xl font-semibold">
        You've completely caught up for now
      </h2>
    </div>
  );
};

export default EndMessage;
