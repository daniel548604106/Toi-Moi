import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  PlayIcon,
  FlagIcon,
  ShoppingCartIcon,
  MenuIcon,
  BookmarkAltIcon
} from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  PlusIcon
} from '@heroicons/react/solid';
import useClickOutside from '../../hooks/useClickOutside';
import HeaderIcon from './HeaderIcon';
import genderAvatar from '../../utils/genderAvatar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AccountDropDown from './HeaderDropDown/AccountDropDown';
import DropDownMenuIcon from './DropDownMenuIcon';
import MessageDropDown from './HeaderDropDown/MessageDropDown';
import CreateDropDown from './HeaderDropDown/CreateDropDown';
import Search from './Search/Search';
import NotificationDropDown from './HeaderDropDown/NotificationDropDown';
import useTranslation from 'next-translate/useTranslation';
import Sidebar from '../Home/Sidebar/Sidebar';
const Header = () => {
  const router = useRouter();
  const elRef = useRef();
  const [isSideMenuShow, setSideMenuShow] = useState(false);
  useClickOutside(elRef, () => setSideMenuShow(false));

  const userInfo = useSelector((state) => state.user.userInfo);
  const { t } = useTranslation('header');
  const handleSideMenuShow = (e) => {
    e.stopPropagation();
    setSideMenuShow(!isSideMenuShow);
  };

  return (
    <div className="flex items-center fixed left-0 right-0 top-0 bg-secondary text-secondary z-40 shadow-md px-3 py-1  sm:px-5 ">
      <div className="w-1/2">
        <div className="flex space-x-2 items-center ">
          <img
            onClick={() => router.push('/')}
            className="w-[40px] h-[40px] cursor-pointer"
            src="/logo.svg"
          />
          <Search t={t} />
        </div>
      </div>
      <div
        className={`${
          router.pathname.includes('messages') && 'hidden'
        } fixed max-w-[750px] top-[50px] bg-secondary text-secondary left-0 flex   w-full md:static items-center flex-grow sm:px-5 sm:mx-0 xl:px-10`}
      >
        <HeaderIcon title="home" href="/" Icon={HomeIcon} />
        <HeaderIcon href="/saved" title="saved" Icon={BookmarkAltIcon} />
        <HeaderIcon title="watch" href="/watch/view/all" Icon={PlayIcon} />
        <HeaderIcon
          title="marketplace"
          href="/marketplace/browse/all"
          Icon={ShoppingCartIcon}
        />
        <HeaderIcon title="groups" href="/groups/feed" Icon={UserGroupIcon} />
      </div>
      <div className="w-1/2  relative flex justify-end items-center space-x-1 sm:space-x-2 ">
        <div
          onClick={() => router.push(`/${userInfo.username}`)}
          className="flex border items-center rounded-full space-x-2 hover:border-main  p-1 cursor-pointer "
        >
          <img
            className="w-[35px] h-[35px] cursor-pointer object-cover  rounded-full"
            src={userInfo.profileImage || genderAvatar(userInfo.gender)}
          />
          <p className="pr-2 text-sm ml-2 whitespace-nowrap hidden xl:block">
            {userInfo.name}
          </p>
        </div>
        <div className="hidden md:flex items-center">
          <DropDownMenuIcon title="Create" Icon={PlusIcon}>
            <CreateDropDown t={t} />
          </DropDownMenuIcon>
          <DropDownMenuIcon title="Notification" Icon={BellIcon}>
            <NotificationDropDown t={t} />
          </DropDownMenuIcon>
          <DropDownMenuIcon title="Messenger" Icon={ChatIcon}>
            <MessageDropDown t={t} />
          </DropDownMenuIcon>
          <DropDownMenuIcon title="Account" Icon={ChevronDownIcon}>
            <AccountDropDown t={t} />
          </DropDownMenuIcon>
        </div>
        <div className="flex items-center space-x-3 md:hidden">
          <BellIcon
            onClick={() => router.push('/notifications')}
            className="h-6"
          />
          <ChatIcon onClick={() => router.push('/messages')} className="h-6" />
          <MenuIcon
            onClick={(e) => handleSideMenuShow(e)}
            className={`h-6 ${isSideMenuShow ? 'text-main' : ''}`}
          />
        </div>
        {isSideMenuShow && (
          <div
            ref={elRef}
            className={`${
              isSideMenuShow && '-translate-x-full'
            } transform ease-in-out overflow-y-auto transition-transform  delay-500  fixed left-full w-full bg-secondary text-button h-full z-40 top-[50px]`}
          >
            <div onClick={(e) => handleSideMenuShow(e)}>
              <Sidebar />
            </div>
            <AccountDropDown t={t} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
