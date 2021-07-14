import React, { useState } from 'react';
import CreateRoomCard from './CreateRoomCard';
import RoomCard from './RoomCard';
import { VideoCameraIcon } from '@heroicons/react/outline';
import genderAvatar from '../../../../utils/genderAvatar';
import Avatar from '../../../Global/Avatar';
const Index = ({ roomList }) => {
  const [isRoomShow, setRoomShow] = useState(false);
  return (
    <div className="w-full">
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
            <span className="text-xs sm:text-sm whitespace-nowrap ml-[5px]">
              Create Room
            </span>
          </div>
          <div
            onClick={() => setRoomShow(true)}
            className="w-full flex items-center flex-shrink-0 whitespace-nowrap overflow-x-auto space-x-2"
          >
            {roomList?.map(({ user }) => (
              <span className="space-x-2">
                <Avatar
                  key={user._id}
                  width={40}
                  height={40}
                  className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] rounded-full cursor-pointer"
                  profileImage={user.profileImage || genderAvatar(user.gender)}
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
