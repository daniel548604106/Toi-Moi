import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  PlayIcon,
  FlagIcon,
  ShoppingCartIcon,
  MenuIcon
} from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  PlusIcon,
  ViewGridIcon
} from '@heroicons/react/solid';
import HeaderIcon from './HeaderIcon';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AccountDropDown from './AccountDropDown';
import DropDownMenu from './DropDownMenu';
import DropDownMenuIcon from './DropDownMenuIcon';
import MessageDropDown from './MessageDropDown';
import CreateDropDown from './CreateDropDown';
import NotificationDropDown from './NotificationDropDown';
const Header = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="flex items-center sticky top-0 bg-white z-40 shadow-md p-1 sm:px-5 ">
      <div className="w-1/2">
        <div className="flex space-x-2 items-center ">
          <Image
            onClick={() => router.push('/')}
            className="cursor-pointer"
            src="https://links.papareact.com/5me"
            width={40}
            height={40}
            layout="fixed"
          />
          <form
            action=""
            className=" flex items-center  border rounded-full p-2 bg-gray-100"
          >
            <SearchIcon className="h-5 w-5 text-gray-600" />
            <input
              className="hidden lg:inline-flex outline-none bg-gray-100 ml-[5px]"
              type="search"
              placeholder="search"
            />
          </form>
          <div className="block md:hidden">
            <HeaderIcon Icon={MenuIcon} />
          </div>
        </div>
      </div>

      <div className="hidden w-full md:flex items-center flex-grow sm:px-5 sm:mx-0 xl:px-10">
        <HeaderIcon
          onClick={() => router.push('/')}
          active={router.pathname === '/'}
          Icon={HomeIcon}
        />
        <HeaderIcon Icon={FlagIcon} />
        <HeaderIcon Icon={PlayIcon} />
        <HeaderIcon Icon={ShoppingCartIcon} />
        <HeaderIcon Icon={UserGroupIcon} />
      </div>
      <div className="w-1/2 relative flex justify-end items-center space-x-1 sm:space-x-2 ">
        <div
          onClick={() => router.push(`/${userInfo.username}`)}
          className="flex items-center rounded-full space-x-2 hover:bg-gray-100  p-1 cursor-pointer "
        >
          <Image
            className="cursor-pointer mr-2 rounded-full"
            layout="fixed"
            src={userInfo.profileImage}
            width="40"
            height="40"
          />
          <p className="pr-2  whitespace-nowrap hidden xl:block">
            {userInfo.name}
          </p>
        </div>
        <div className="hidden md:block">
          <DropDownMenuIcon title="Create" Icon={PlusIcon}>
            <DropDownMenu>
              <CreateDropDown />
            </DropDownMenu>
          </DropDownMenuIcon>
        </div>
        <DropDownMenuIcon title="Notification" Icon={BellIcon}>
          <DropDownMenu>
            <NotificationDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
        <DropDownMenuIcon title="Messenger" Icon={ChatIcon}>
          <DropDownMenu>
            <MessageDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
        <DropDownMenuIcon title="Account" Icon={ChevronDownIcon}>
          <DropDownMenu>
            <AccountDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
      </div>
    </div>
  );
};

export default Header;
