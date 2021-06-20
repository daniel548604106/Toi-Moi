import React from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { apiDeleteHistory } from '../../api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import genderAvatar from '../../utils/genderAvatar';
const SearchHistoryItem = ({
  setSearchResultShow,
  history,
  searchHistory,
  setSearchHistory
}) => {
  const router = useRouter();
  const handleDirectToHistory = () => {
    if (history.type === 'keyword') {
      router.push(`/search/top?q=${history.keyword}`);
    } else {
      router.push(`/${history.user.username}`);
    }
    setSearchResultShow(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      const updatedHistory = searchHistory.filter(
        (search) => search._id !== history._id
      );
      setSearchHistory(updatedHistory);
      console.log(history._id);
      const res = await apiDeleteHistory(history._id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => handleDirectToHistory()}
      className="flex justify-between items-center rounded-md hover:bg-gray-100 cursor-pointer p-2 py-1"
    >
      <div className="flex items-center">
        {history.type === 'user' ? (
          <Image
            className="rounded-full object-cover cursor-pointer"
            width={40}
            height={40}
            src={history.user.profileImage || genderAvatar(history.user.gender)}
          />
        ) : (
          <span className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-100">
            {history.type === 'keyword' && <SearchIcon className="h-6" />}
          </span>
        )}

        <span className="ml-[15px]">
          {history.type === 'user' ? history.user.name : history.keyword}
        </span>
      </div>
      <span
        onClick={(e) => handleDelete(e)}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <XIcon className="h-6" />
      </span>
    </div>
  );
};

export default SearchHistoryItem;
