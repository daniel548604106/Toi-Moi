import React, { useState } from 'react';
import CreateRoomCard from './CreateRoomCard';
import RoomCard from './RoomCard';
import { VideoCameraIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import genderAvatar from '../../../../utils/genderAvatar';
const Index = ({ roomList }) => {
  const [isRoomShow, setRoomShow] = useState(false);
  return (
    <div>
      {isRoomShow ? (
        <div className="scrollbar-hide flex space-x-2 overflow-x-auto">
          <CreateRoomCard />
          {roomList &&
            roomList.map(({ user }) => <RoomCard key={user._id} user={user} />)}
        </div>
      ) : (
        <div className="scrollbar-hide flex p-3 space-x-2 w-full items-center overflow-x-auto bg-secondary text-secondary rounded-lg shadow-lg">
          <div
            onClick={() => setRoomShow(true)}
            className="rounded-full cursor-pointer border bg-secondary border-main text-main p-2 flex items-center"
          >
            <VideoCameraIcon className="h-6" />
            <span className="text-sm sm:text-md whitespace-nowrap ml-[5px]">
              Create Room
            </span>
          </div>
          <div
            onClick={() => setRoomShow(true)}
            className="flex items-center space-x-2"
          >
            {roomList &&
              roomList.map(({ user }) => (
                <span className="relative flex items-center" key={user._id}>
                  <Image
                    className="rounded-full cursor-pointer"
                    width={50}
                    height={50}
                    src={user.profileImage || genderAvatar(user.gender)}
                  />
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
