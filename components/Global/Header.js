import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  PlayIcon,
  FlagIcon,
  ShoppingBagIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon
} from '@heroicons/react/solid';
import HeaderIcon from './HeaderIcon';
import { useDispatch } from 'react-redux';
import { setUserLogout } from '../../redux/slices/userSlice';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { useSelector } from 'react-redux';
const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const email = useSelector((state) => state.user.userInfo.email);
  const handleUserLogout = (email) => {
    // Set userEmail for autocomplete in login email field
    Cookie.set('userEmail', email);
    Cookie.remove('token');
    dispatch(setUserLogout());
    router.push('/');
  };
  return (
    <div className="flex items-center sticky top-0 bg-white z-50 shadow-md p-2 sm:px-5 ">
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
        <HeaderIcon onClick={() => router.push('/')} active Icon={HomeIcon} />
        <HeaderIcon Icon={FlagIcon} />
        <HeaderIcon Icon={PlayIcon} />
        <HeaderIcon Icon={ShoppingCartIcon} />
        <HeaderIcon Icon={UserGroupIcon} />
      </div>
      <div className="flex justify-end items-center sm:space-x-2 w-full max-w-[350px]">
        <div
          onClick={() => handleUserLogout(email)}
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
        <ViewGridIcon className="icon" />
        <BellIcon className="icon" />
        <ChatIcon onClick={() => router.push('/messages')} className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
