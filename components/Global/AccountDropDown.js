import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LogoutIcon,
  CogIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/solid';
import { GlobeIcon } from '@heroicons/react/outline';
import { setUserLogout } from '../../redux/slices/userSlice';
import { toggleLanguageOpen } from '../../redux/slices/globalSlice';
import Image from 'next/image';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import useDarkMode from '../../hooks/useDarkMode';
import genderAvatar from '../../utils/genderAvatar';
const AccountPopup = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const userInfo = useSelector((state) => state.user.userInfo);
  const email = useSelector((state) => state.user.userInfo.email);
  const [darkModeChecked, setDarkModeChecked] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const handleUserLogout = (email) => {
    // Set userEmail for autocomplete in login email field
    Cookie.set('userEmail', email);
    Cookie.remove('token');
    dispatch(setUserLogout());
    router.push('/');
  };

  return (
    <div>
      <div
        onClick={() => router.push(`/${userInfo.username}`)}
        className="cursor-pointer flex items-center rounded-md hover:bg-gray-100  p-2"
      >
        <Image
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="ml-[10px] text-left">
          <span className="font-semibold">{userInfo.name}</span>
          <p className="text-xs text-gray-600">Check out your profile</p>
        </div>
      </div>
      <hr className="my-[10px]" />
      <div className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md p-2">
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-gray-100">
            <CogIcon className="h-6 text-black" />
          </span>
          <span className="ml-[10px]">Settings and Privacy</span>
        </div>
        <ChevronRightIcon className="h-6 text-gray-600" />
      </div>
      <div
        onClick={() => dispatch(toggleLanguageOpen())}
        className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md p-2"
      >
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-gray-100">
            <GlobeIcon className="h-6 text-black" />
          </span>
          <span className="ml-[10px]">Language</span>
        </div>
      </div>
      <div className="flex items-center justify-between  p-2">
        <div className="flex items-center ">
          {darkModeChecked ? (
            <span className="p-2 rounded-full bg-gray-100">
              <MoonIcon className="h-6 text-black" />
            </span>
          ) : (
            <span className="p-2 rounded-full bg-gray-100">
              <SunIcon className="h-6 text-black" />
            </span>
          )}
          <span className="ml-[10px]">
            {colorTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
        <div>
          <span
            onClick={() => inputRef.current.click()}
            className={`rounded-full w-[70px] h-[40px]  p-2  flex items-center ${
              darkModeChecked ? 'bg-gray-700' : 'bg-white border'
            }`}
          >
            <span
              className={` rounded-full transition-all transform duration-200 ease-in-out bg-white w-[25px] h-[25px]
             ${darkModeChecked ? ' bg-white translate-x-full' : 'bg-gray-700'}
          `}
            ></span>
          </span>
          <input
            type="checkbox"
            hidden
            ref={inputRef}
            value={darkModeChecked}
            onClick={(e) => {
              setTheme(colorTheme);
              setDarkModeChecked(!darkModeChecked);
            }}
          />
        </div>
      </div>
      <div
        onClick={() => handleUserLogout(email)}
        className="cursor-pointer flex items-center hover:bg-gray-100 rounded-md p-2"
      >
        <span className="p-2 rounded-full bg-gray-100">
          <LogoutIcon className="h-6 text-black" />
        </span>
        <span className="ml-[10px]">Logout</span>
      </div>
    </div>
  );
};

export default AccountPopup;
