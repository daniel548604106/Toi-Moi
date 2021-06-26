import React from 'react';
import Image from 'next/image';
import genderAvatar from '../../../utils/genderAvatar';
const Contact = ({ chat }) => {
  return (
    <div className="mb-2 flex items-center space-x-3 py-1 px-3 rounded-md  hover:bg-gray-200 cursor-pointer">
      <span className="relative flex items-center">
        <Image
          objectFit="cover"
          className="rounded-full relative"
          src={chat.profileImage || genderAvatar(chat.gender)}
          height={40}
          width={40}
          layout="fixed"
        />
        <div className="absolute bottom-[5px] right-0 bg-green-400 w-2 h-2 rounded-full z-40"></div>
      </span>
      <p>{chat.name}</p>
    </div>
  );
};

export default Contact;
