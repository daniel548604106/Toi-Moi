import React from 'react';
import Image from 'next/image';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
const MessageDropDownList = ({ message }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/messages?message=${message.messagesWith}`)}
      className="relative group cursor-pointer  flex items-center p-2 mb-3 rounded-lg hover:bg-gray-100"
    >
      <Image
        className="rounded-full cursor-pointer"
        src={message.profileImage}
        width={60}
        height={60}
      />
      <div className="ml-[10px]">
        <p>{message.name}</p>
        <p className="text-gray-500">{message.lastMessage}</p>
      </div>
      <span className="hidden group-hover:block  absolute top-1/2 transform -translate-y-1/2 right-4 p-2 rounded-full  bg-secondary text-secondary shadow-lg cursor-pointer">
        <DotsHorizontalIcon className="h-6" />
      </span>
    </div>
  );
};

export default MessageDropDownList;
