import React from 'react'
import Image from 'next/image'
import { UserIcon } from '@heroicons/react/outline'
const UserCard = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
      <Image src={} height={60} width={60} className="rounded-full cursor-pointer"  />
      <div className="ml-[10px]">
        <h2 className="text-md font-semibold"></h2>
        <span></span>
      </div>
      <span className="rounded-full p-2 bg-gray-100">
        <UserIcon className="h-6"/>
      </span>
      </div>
    </div>
  )
}

export default UserCard
