import React from 'react';
import StoryCard from './StoryCard';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import genderAvatar from '../../../utils/genderAvatar';
const Stories = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="flex w-full  space-x-1   overflow-hidden ">
      <div className="relative h-44 flex-shrink-0   w-1/4 sm:w-1/5 flex flex-col rounded-md transition duration-75 cursor-pointer hover:opacity-80 ">
        <div className="h-full w-full">
          <Image
            className=" h-full rounded-3xl"
            src={userInfo.profileImage || genderAvatar(userInfo.gender)}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className="rounded-full p-1 absolute z-10 top-1/2 text-secondary left-1/2 transform -translate-x-1/2 border-4 border-white bg-main ">
          <PlusIcon className="h-6 " />
        </span>
        <div className="bg-secondary text-secondary h-1/2">Create Story</div>
      </div>
      {stories.map((story) => (
        <StoryCard
          key={story.name}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))}
    </div>
  );
};

export default Stories;