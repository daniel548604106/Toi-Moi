import React from 'react';
import Image from 'next/image';
import {
  DotsHorizontalIcon,
  UserIcon,
  PlusIcon
} from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import router from 'next/router';
const ProfileCover = ({ user, profile }) => {
  if (!profile) return <dic>Loading</dic>;
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoggedInUser = router.query.id === userInfo.username;
  return (
    <div>
      <div className="relative ">
        <Image
          src={profile.profileCoverImage}
          layout="responsive"
          width={1000}
          height={450}
          className="w-full  rounded-b-lg relative object-cover h-[100px] cursor-pointer"
        />
        <div className="px-10 py-16 sm:py-20 bg-secondary text-secondary border-b">
          <div className="absolute bottom-[50px] left-[30px] flex items-end ">
            <Image
              src={user.profileImage}
              width={130}
              height={130}
              className="object-cover border-2 border-gray-700 outline-white rounded-full cursor-pointer"
            />
            <div className="ml-[20px]">
              <h2 className="text-2xl sm:text-4xl font-semibold">
                {user.name}
              </h2>
              <span className="text-md text-gray-500">@{user.username}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3  bg-secondary text-secondary border-t flex item-center justify-between">
        <ul className="text-sm sm:text-md hidden sm:flex items-center text-gray-600 space-x-1 md:space-x-3">
          <li className="cursor-pointer p-2 px-2 md:px-4 rounded-lg hover:bg-gray-100">
            Homepage
          </li>
          <li className="cursor-pointer p-2 px-2 md:px-4 rounded-lg hover:bg-gray-100">
            Photo
          </li>
          <li className="cursor-pointer p-2 px-2 md:px-4 rounded-lg hover:bg-gray-100 ">
            About
          </li>
        </ul>
        <button className="sm:hidden p-2 px-4 text-sm bg-gray-100 rounded-lg cursor-pointer ">
          More
        </button>
        <div className="flex items-center">
          {isLoggedInUser ? (
            <button className="px-4 py-2 flex whitespace-nowrap items-center rounded-md bg-main text-white">
              <PlusIcon className=" text-sm h-6 mr-[10px]" />
              Add Stories
            </button>
          ) : (
            <button className="px-4 py-2 flex whitespace-nowrap items-center rounded-md bg-main text-white">
              <UserIcon className=" text-sm h-6 mr-[10px]" />
              Add Friend
            </button>
          )}
          <button className="px-4 py-2 rounded-md bg-gray-100 ml-[10px]">
            <DotsHorizontalIcon className=" text-sm h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCover;
