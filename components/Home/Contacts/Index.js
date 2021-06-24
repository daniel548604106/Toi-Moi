import React from 'react';
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';
import Contact from './Contact';
const Index = ({ chats }) => {
  return (
    <div className=" p-2 sticky top-[80px]">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <h2>Contact</h2>
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-6  cursor-pointer" />
          <VideoCameraIcon className="h-6 cursor-pointer" />
          <DotsHorizontalIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {chats && chats.map((chat) => <Contact key={chat._id} chat={chat} />)}
    </div>
  );
};

export default Index;
