import React from 'react';
import {
  PencilAltIcon,
  VideoCameraIcon,
  SearchIcon
} from '@heroicons/react/solid';
const Header = () => {
  return (
    <div className=" p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold ">聊天室</h2>
        <div className="flex items-center">
          <PencilAltIcon className="h-6 w-6 rounded-full bg-gray-100" />
          <VideoCameraIcon className="h-6 w-6 rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="rounded-2xl bg-gray-200 flex items-center p-2">
        <SearchIcon className="h-5 mr-2" />
        <input
          type="text"
          className="w-full bg-gray-200 focus:outline-none"
          placeholder="搜尋 Messenger"
        />
      </div>
    </div>
  );
};

export default Header;