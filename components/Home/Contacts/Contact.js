import React from 'react'
import Image from 'next/image'
const Contact = ({src,name}) => {
  return (
    <div className="mb-2 relative flex items-center space-x-3 py-2 px-3 rounded-md  hover:bg-gray-200 cursor-pointer">
      <Image objectFit="cover" className="rounded-full relative" src={src} height={40} width={40} layout="fixed"/>
      <p>{name}</p>
      <div className="absolute bottom-[5px] left-[20px] bg-green-400 w-2 h-2 rounded-full z-40"></div>
    </div>
  )
}

export default Contact
