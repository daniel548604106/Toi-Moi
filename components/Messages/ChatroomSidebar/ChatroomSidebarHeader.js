import React from 'react';
import {
  PencilAltIcon,
  VideoCameraIcon,
  SearchIcon
} from '@heroicons/react/solid';
import Image from 'next/image';
import genderAvatar from '../../../utils/genderAvatar';
import { useSelector } from 'react-redux';
const Header = ({ searchText, setSearchText, addChat }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div className="  p-2">
      <div className="flex items-center justify-between mb-3">
        <Image
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        />
        <h2 className="text-2xl font-semibold ">聊天室</h2>
        <div className="flex items-center">
          <PencilAltIcon className="h-5 w-5  cursor-pointer  rounded-full bg-gray-100" />
          <VideoCameraIcon className="h-5 w-5 ml-[5px] cursor-pointer   rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="rounded-2xl bg-gray-200 flex items-center p-2">
        <SearchIcon className="h-5 mr-2" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          value={searchText}
          className="w-full bg-gray-200 focus:outline-none"
          placeholder="搜尋 Messenger"
        />
      </div>
    </div>
  );
};

export default Header;
