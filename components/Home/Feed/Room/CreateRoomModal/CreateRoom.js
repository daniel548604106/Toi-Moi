import React, { useState } from 'react';
import {
  VideoCameraIcon,
  ChevronRightIcon,
  HandIcon,
  ClockIcon,
  UsersIcon
} from '@heroicons/react/outline';
import CreateRoomListItem from './CreateRoomListItem';
const CreateRoom = ({ setRoomCreated }) => {
  const handleCreateRoom = async () => {
    setRoomCreated(true);
  };
  return (
    <div className=" space-y-2">
      <div className="flex flex-col items-center justify-center space-y-2">
        <span className="border w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center">
          <VideoCameraIcon className="h-6 sm:h-10" />
        </span>
        <h2 className="text-lg sm:text-xl font-semibold">建立你的包廂</h2>
      </div>
      <CreateRoomListItem
        Icon={HandIcon}
        RightIcon={ChevronRightIcon}
        title="包廂名稱"
        subtitle="Daniel's room"
      />
      <CreateRoomListItem
        Icon={ClockIcon}
        RightIcon={ChevronRightIcon}
        title="包廂名稱"
        subtitle="Daniel's room"
      />
      <CreateRoomListItem
        Icon={UsersIcon}
        RightIcon={ChevronRightIcon}
        title="向所有朋友顯示"
        subtitle="現在"
      />

      <button
        onClick={() => handleCreateRoom()}
        className="text-sm sm:text-md rounded-lg p-3 w-full bg-main text-white"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
