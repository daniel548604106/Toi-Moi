import React from 'react';
import StoryCard from './StoryCard';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
const Stories = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const stories = [
    {
      name: 'Bill',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    },
    {
      name: 'Kate',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    },
    {
      name: 'newsdfoi',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    },

    {
      name: 'Daniel Fantastic',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    },
    {
      name: 'Daniel 123',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    }
  ];
  return (
    <div className="flex w-full  space-x-1   overflow-hidden ">
      <div className="relative h-44 flex-shrink-0   w-1/4 sm:w-1/5 flex flex-col rounded-md transition duration-75 cursor-pointer hover:opacity-80 ">
        <div className="h-full w-full">
          <Image
            className=" h-full rounded-3xl"
            src={userInfo.profileImage}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className="rounded-full p-1 absolute z-10 top-1/2 text-white left-1/2 transform -translate-x-1/2 border-4 border-white bg-blue-600 ">
          <PlusIcon className="h-6 " />
        </span>
        <div className="bg-white h-1/2">Create Story</div>
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
