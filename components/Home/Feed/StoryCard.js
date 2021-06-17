import React from 'react';
import Image from 'next/image';
const StoryCard = ({ name, profile, src }) => {
  return (
    <div className="relative h-56 w-full rounded-md transition duration-75 cursor-pointer hover:opacity-80  ">
      <Image
        className="absolute left-5 top-5 border-blue-500 rounded-full z-10"
        src={profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />
      <Image
        className="object-cover filter rounded-3xl hover:scale-110 "
        layout="fill"
        src={src}
      />
      <span className="text-white bottom-3 left-3 absolute max-w-[50px] truncate">
        {name}
      </span>
    </div>
  );
};

export default StoryCard;
