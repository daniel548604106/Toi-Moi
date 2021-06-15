import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutIcon } from '@heroicons/react/solid';
import { setUserLogout } from '../../redux/slices/userSlice';
import Image from 'next/image';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
const AccountPopup = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const email = useSelector((state) => state.user.userInfo.email);
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
    <div className="w-[300px] bg-white shadow-lg rounded-md p-2">
      <div
        onClick={() => router.push(`/${userInfo.username}`)}
        className="cursor-pointer flex items-center rounded-md hover:bg-gray-100  p-2"
      >
        <Image
          src={userInfo.profileImage}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="ml-[10px]">
          <span className=" font-semibold">{userInfo.name}</span>
          <p className="text-xs text-gray-600">Check out your profile</p>
        </div>
      </div>
      <hr className="my-[10px]" />
      <div
        onClick={() => handleUserLogout(email)}
        className="cursor-pointer flex items-center hover:bg-gray-100 rounded-md p-2"
      >
        <span className="p-2 rounded-full bg-gray-100">
          <LogoutIcon className="h-6" />
        </span>
        <span className="ml-[10px]">Logout</span>
      </div>
    </div>
  );
};

export default AccountPopup;
