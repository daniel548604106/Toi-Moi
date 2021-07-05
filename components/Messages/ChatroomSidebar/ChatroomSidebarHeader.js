import React from 'react';
import {
  XIcon,
  VideoCameraIcon,
  ChatAlt2Icon,
  SearchIcon
} from '@heroicons/react/solid';
import Avatar from '../../Global/Avatar';
import { toggleListOpen } from '../../../redux/slices/messageSlice';
import genderAvatar from '../../../utils/genderAvatar';
import { useSelector, useDispatch } from 'react-redux';
const Header = ({ searchText, t, setSearchText }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  return (
    <div className="text-primary bg-primary  p-3">
      <div className="flex relative items-center justify-between mb-3">
        <Avatar
          profileImage={userInfo.profileImage}
          gender={userInfo.gender}
          width="40"
          height="40"
          username={userInfo.username}
        />
        <h2 className="text-lg sm:text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold ">
          Messenger
        </h2>
        <div className="flex items-center space-x-2">
          <span className="p-2 ml-[5px] rounded-full bg-button text-secondary">
            <VideoCameraIcon className="h-5 w-5  cursor-pointer   rounded-full" />
          </span>
          <span
            onClick={() => dispatch(toggleListOpen())}
            className="sm:hidden p-2 rounded-full bg-button text-secondary"
          >
            <XIcon className="h-5 w-5  cursor-pointer  rounded-full" />
          </span>
        </div>
      </div>
      <div className="rounded-2xl bg-gray-200 flex items-center p-2">
        <SearchIcon className="h-5 mr-2" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          value={searchText}
          className="w-full bg-gray-200 focus:outline-none"
          placeholder={t('searchMessenger')}
        />
      </div>
    </div>
  );
};

export default Header;
