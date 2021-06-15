import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  PlayIcon,
  FlagIcon,
  ShoppingCartIcon
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
    <div className="flex items-center sticky top-0 bg-white z-40 shadow-md p-2 sm:px-5 ">
      <div className="w-full max-w-[300px] xl:max-w-[400px] xl:min-w-[300px]">
        <div className="flex items-center ">
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
            className="flex items-center ml-[10px] border rounded-full p-[5px] bg-gray-100"
          >
            <SearchIcon className="h-5 w-5 text-gray-600" />
            <input
              className="hidden lg:inline-flex outline-none bg-gray-100 ml-[5px]"
              type="search"
              placeholder="search"
            />
          </form>
        </div>
      </div>
      <div className="flex items-center justify-between flex-grow sm:px-5 sm:mx-0 xl:px-10 xl:mx-10">
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
      <div className="relative flex justify-end items-center sm:space-x-2 w-full max-w-[350px]">
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
        <DropDownMenuIcon Icon={PlusIcon}>
          <DropDownMenu>
            <CreateDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
        <DropDownMenuIcon Icon={BellIcon}>
          <DropDownMenu>
            <NotificationDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
        <DropDownMenuIcon Icon={ChatIcon}>
          <DropDownMenu>
            <MessageDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
        <DropDownMenuIcon Icon={ChevronDownIcon}>
          <DropDownMenu>
            <AccountDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
      </div>
    </div>
  );
};

export default Header;
