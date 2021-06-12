import React from 'react'
import {PhoneIcon ,InformationCircleIcon , VideoCameraIcon} from '@heroicons/react/solid'
import Image from 'next/image'
const Header = () => {
  return (
    <div className="shadow-md flex items-center justify-between p-3">
      <div className="flex items-center">
        <Image className="rounded-full mr-2" src="https://images.unsplash.com/photo-1623343407692-f2ce2e215964?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" width={50} height={50}/>
        <div>
        <p className="text-lg font-medium">milan</p>
        <p className="text-sm text-gray-500">目前在線上</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <PhoneIcon className="h-6 text-blue-600"/>
        <VideoCameraIcon className="h-6 text-blue-600"/>
        <InformationCircleIcon className="h-6 text-blue-600"/>
      </div>
    </div>
  )
}

export default Header
