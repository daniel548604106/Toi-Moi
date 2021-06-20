import React from 'react';
import DefaultAvatar from '../../public/vercel.svg';
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/outline';
import { apiPostUserSearch } from '../../api';
import Image from 'next/image';
import genderAvatar from '../../utils/genderAvatar';
const SearchListItem = ({
  username,
  name,
  profileImage,
  gender,
  searchText,
  Icon,
  setSearchResultShow
}) => {
  const router = useRouter();
  const handleDirectToProfile = async () => {
    router.push(`/${username}`);
    try {
      setSearchResultShow(false);
      const res = await apiPostUserSearch(username);
      console.log(res, 'search');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex items-center p-[10px] cursor-pointer rounded-md hover:bg-gray-200 "
      onClick={() => handleDirectToProfile()}
    >
      {name &&
        (profileImage ? (
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center">
              <Image
                className="rounded-full object-cover"
                layout="fixed"
                src={profileImage || genderAvatar()}
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
              src={genderAvatar(gender)}
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
