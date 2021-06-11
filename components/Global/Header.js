import React from 'react'
import Image from 'next/image'
import {SearchIcon,PlayIcon,FlagIcon, ShoppingBagIcon, ShoppingCartIcon} from '@heroicons/react/outline'
import {BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon} from '@heroicons/react/solid'
import HeaderIcon from './HeaderIcon'
import { signOut, useSession } from 'next-auth/client'
const Header = () => {
  const [session] = useSession()
  return (
    <div className="flex items-center sticky top-0 bg-white z-50 shadow-md p-2 sm:px-5 ">
      <div className="w-full max-w-[300px] xl:max-w-[400px] xl:min-w-[300px]">
        <div className="flex items-center ">
        <Image src="https://links.papareact.com/5me" width={40} height={40} layout="fixed"/>
        <form action="" className="flex items-center ml-[10px] border rounded-full p-[5px] bg-gray-100">
          <SearchIcon className="h-5 w-5 text-gray-600"/>
          <input  className="hidden lg:inline-flex outline-none bg-gray-100 ml-[5px]" type="search" placeholder="search"/>
        </form>
        </div>
      </div>
        <div className="flex items-center justify-between flex-grow sm:px-5 sm:mx-0 xl:px-10 xl:mx-10">
          <HeaderIcon active Icon={HomeIcon}/>
          <HeaderIcon Icon={FlagIcon}/>
          <HeaderIcon Icon={PlayIcon}/>
          <HeaderIcon Icon={ShoppingCartIcon}/>
          <HeaderIcon Icon={UserGroupIcon}/>
        </div>
      <div className="flex justify-end items-center sm:space-x-2 w-full max-w-[350px]">
        {/* <Image onClick={() => signOut()} className="cursor-pointer mr-2 rounded-full" layout="fixed" src={session.user.image} width="40" height="40"/> */}
        <p className="pr-2 whitespace-nowrap hidden xl:block">Daniel Yeh</p>
        <ViewGridIcon className="icon"/>
        <BellIcon className="icon"/>
        <ChatIcon className="icon"/>
        <ChevronDownIcon className="icon"/>
      </div>
    </div>
  )
}

export default Header
