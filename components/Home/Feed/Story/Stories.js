import React from 'react';
import StoryCard from './StoryCard';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import genderAvatar from '../../../../utils/genderAvatar';
const Stories = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="flex w-full mt-2 space-x-1   overflow-hidden ">
      <div className="relative  flex-shrink-0   w-1/3 sm:w-1/4 2xl:w-1/5  rounded-md transition duration-75 cursor-pointer hover:opacity-80 ">
        <img
          className="h-30 sm:h-44 w-full relative object-cover rounded-3xl rounded-b-none"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <div className="relative text-sm sm:text-md px-1 py-5 rounded-b-3xl text-center bg-secondary text-secondary">
          Create Story
          <span className="rounded-full p-1 absolute z-10 -translate-y-1/2 top-0 text-white left-1/2 transform -translate-x-1/2 border-4 border-white bg-main ">
            <PlusIcon className="h-6 " />
          </span>
        </div>
      </div>

      {/* {stories.map((story) => (
        <StoryCard
          key={story.name}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))} */}
    </div>
  );
};

export default Stories;
