import React from 'react'
import Image from 'next/image'
const StoryCard = ({name, profile, src}) => {
  return (
    <div className="relative h-56 w-32 rounded-md transition duration-75 cursor-pointer  hover:animate-pulse  hover:scale-110">
      <Image className="absolute top-10 rounded-full z-50" src={profile} width={40} height={40} layout="fixed" objectFit="cover"/>
      <Image className="object-cover filter rounded-full lg:rounded-3xl brightness-75" layout="fill" src={src} />
      {
        src
      }

    </div>
  )
}

export default StoryCard
