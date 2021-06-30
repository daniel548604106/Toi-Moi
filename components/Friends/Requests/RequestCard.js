import React from 'react';
import Image from 'next/image';
import router from 'next/router';
import genderAvatar from '../../../utils/genderAvatar';

const RequestCard = ({ user, t }) => {
  return (
    <div
      className="w-full  md:flex items-center justify-between p-2 sm:p-3 mb-3 bg-secondary rounded-lg shadow-lg  "
      key={user.username}
    >
      <div
        onClick={() => router.push(`/${user.username}`)}
        className="p-2 sm:p-3 flex items-center"
      >
        <Image
          className="rounded-full cursor-pointer"
          width={50}
          height={50}
          layout="fixed"
          src={user.profileImage || genderAvatar(user.gender)}
        />
        <div className=" truncate whitespace-nowrap flex-1 ml-[10px] flex items-center justify-between">
          <p className="hover:underline cursor-pointer truncate">{user.name}</p>
        </div>
      </div>
      <div className="flex sm:justify-end items-center w-full">
        <button className="text-sm sm:text-md w-full  sm:w-auto rounded-md p-1 sm:px-3 bg-main text-white">
          {t('confirm')}
        </button>
        <button className="text-sm sm:text-md w-full  sm:w-auto rounded-md p-1 sm:px-3 bg-button text-secondary ml-[10px]">
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
