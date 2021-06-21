import React from 'react';
import {
  PhoneIcon,
  InformationCircleIcon,
  VideoCameraIcon
} from '@heroicons/react/solid';
import Image from 'next/image';
const Header = ({ openChatUser, connectedUsers }) => {
  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0;
  return (
    <div className="border-b-2 flex items-center justify-between p-3">
      <div className="flex items-center">
        {openChatUser.profileImage && (
          <Image
            className="rounded-full cursor-pointer"
            src={openChatUser.profileImage || ''}
            width="50"
            height="50"
          />
        )}
        <div className="ml-3">
          <p className="text-lg font-medium cursor-pointer hover:underline">
            {openChatUser.name}
          </p>
          {isOnline && <p className="text-sm text-gray-500">目前在線上</p>}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <PhoneIcon className="h-6 text-blue-600 cursor-pointer" />
        <VideoCameraIcon className="h-6 text-blue-600 cursor-pointer" />
        <InformationCircleIcon className="h-6 text-blue-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
