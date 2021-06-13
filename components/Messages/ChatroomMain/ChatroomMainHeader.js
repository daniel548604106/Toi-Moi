import React from 'react';
import {
  PhoneIcon,
  InformationCircleIcon,
  VideoCameraIcon
} from '@heroicons/react/solid';
import Image from 'next/image';
const Header = ({ openChatUser }) => {
  return (
    <div className="shadow-md flex items-center justify-between p-3">
      <div className="flex items-center">
        {openChatUser.profileImage && (
          <Image
            className="rounded-full "
            src={openChatUser.profileImage || ''}
            width="50"
            height="50"
          />
        )}
        <div className="ml-3">
          <p className="text-lg font-medium">{openChatUser.name}</p>
          <p className="text-sm text-gray-500">目前在線上</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <PhoneIcon className="h-6 text-blue-600" />
        <VideoCameraIcon className="h-6 text-blue-600" />
        <InformationCircleIcon className="h-6 text-blue-600" />
      </div>
    </div>
  );
};

export default Header;
