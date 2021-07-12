import React, { useState, useEffect, useRef } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import AccountDropDown from './HeaderDropDown/AccountDropDown';
import DropDownMenuIcon from './DropDownMenuIcon';
import MessageDropDown from './HeaderDropDown/MessageDropDown';
import CreateDropDown from './HeaderDropDown/CreateDropDown';
import Search from './Search/Search';
import NotificationDropDown from './HeaderDropDown/NotificationDropDown';
import useTranslation from 'next-translate/useTranslation';
import Sidebar from '../Home/Sidebar/Sidebar';
import { setUnreadNotification } from '../../redux/slices/userSlice';
const menuTabs = [
  {
    title: 'home',
    href: '/',
    Icon: HomeIcon
  },
  {
    title: 'saved',
    href: '/saved',
    Icon: BookmarkAltIcon
  },
  {
    title: 'watch',
    href: '/watch/view/all',
    Icon: PlayIcon
  },
  {
    title: 'marketplace',
    href: '/marketplace/browse/all',
    Icon: ShoppingCartIcon
  },
  {
    title: 'groups',
    href: '/groups/feed',
    Icon: UserGroupIcon
  }
];
const Header = () => {
  const router = useRouter();
  const elRef = useRef();
  const dispatch = useDispatch();
  const [isSideMenuShow, setSideMenuShow] = useState(false);

  useEffect(() => {
    console.log(router.pathname);
  }, [router.pathname]);
  useClickOutside(elRef, () => setSideMenuShow(false));
  const { userInfo } = useSelector((state) => state.user);

  const { t } = useTranslation('header');
  const handleSideMenuShow = (e) => {
    e.stopPropagation();
    setSideMenuShow(!isSideMenuShow);
  };

  return (
    <div className="flex items-center fixed left-0 right-0 top-0 bg-secondary text-secondary z-40 shadow-md px-3  sm:px-5 ">
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
        } fixed max-w-[750px] flex items-center top-[50px] bg-secondary text-secondary left-0    w-full md:static  flex-grow sm:px-5 sm:mx-0 xl:px-10`}
      >
        {menuTabs.map((tab, idx) => (
          <HeaderIcon key={tab.title} {...tab} />
        ))}
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
          <span className="relative">
            <BellIcon
              onClick={() => router.push('/notifications')}
              className="h-6"
            />
            {userInfo.unreadNotification && (
              <div
                onClick={() => dispatch(setUnreadNotification(false))}
                className="w-[5px] h-[5px] absolute top-[3px] right-1 rounded-full bg-main"
              ></div>
            )}
          </span>
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
