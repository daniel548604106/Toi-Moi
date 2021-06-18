import React from 'react';
import DefaultAvatar from '../../public/vercel.svg';
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
const SearchListItem = ({ username, name, profileImage, searchText, Icon }) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center p-[10px] cursor-pointer rounded-md hover:bg-gray-200 "
      onClick={() => router.push(`/${username}`)}
    >
      {name &&
        (profileImage ? (
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center">
              <Image
                className="rounded-full object-cover"
                layout="fixed"
                src={profileImage}
                width={40}
                height={40}
              />
              <p className="ml-[10px] font-medium">{name}</p>
            </div>
          </div>
        ) : (
          <>
            <Image
              className="rounded-full object-cover"
              layout="fixed"
              src={DefaultAvatar}
              width={40}
              height={40}
            />
            <p className="ml-[10px] font-medium">{name}</p>
          </>
        ))}
    </div>
  );
};

export default SearchListItem;
