import React from 'react';
import { CheckIcon } from '@heroicons/react/outline';
const Notification = ({ notification }) => {
  return (
    <div
      className={`${
        notification ? ' opacity-100 ' : 'opacity-0'
      }  transition delay-150 ease-in-out  duration-500  fixed flex items-center space-x-2 bottom-10 z-50 left-1/2 transform -translate-x-1/2 rounded-lg p-2 text-white bg-main`}
    >
      <CheckIcon className="h-5" />
      <span>{notification}</span>
    </div>
  );
};

export default Notification;
