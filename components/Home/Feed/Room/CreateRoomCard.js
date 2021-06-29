import React from 'react';
import { VideoCameraIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreateRoomOpen } from '../../../../redux/slices/globalSlice';
const CreateRoomCard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="flex  flex-shrink-0  flex-col rounded-lg items-center space-y-1 sm:space-y-3 justify-center w-[100px] p-2 sm:w-[150px] border bg-secondary">
      <span className="w-[60px] h-[60px] flex items-center justify-center rounded-full border border-main text-main">
        <VideoCameraIcon className="h-6 sm:h-9" />
      </span>
      <div className="text-center">
        <p className="text-sm sm:text-md font-semibold">{userInfo.name}</p>
        <p className="text-xs sm:text-sm">Get started</p>
      </div>
      <button
        onClick={() => dispatch(toggleCreateRoomOpen())}
        className="focus:outline-none text-xs sm:text-sm w-full rounded-lg border p-2"
      >
        Create
      </button>
    </div>
  );
};

export default CreateRoomCard;
