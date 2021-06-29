import React from 'react';
import Image from 'next/image';
import genderAvatar from '../../../../utils/genderAvatar';
const RoomCard = ({ user }) => {
  return (
    <div className="bg-secondary flex-shrink-0   space-y-1 sm:space-y-3 text-secondary flex flex-col items-center justify-center border rounded-lg p-2 sm:p-3 w-[100px]  sm:w-[150px]">
      <Image
        width={60}
        height={60}
        className="rounded-full cursor-pointer"
        src={user.profileImage || genderAvatar(user.gender)}
      />
      <p className="text-center w-full overflow-hidden">
        <span className="truncate w-1/2">{user.name}</span>
      </p>
      <button className="focus:outline-none text-sm bg-main text-white sm:text-md w-full rounded-lg border p-1">
        Join
      </button>
    </div>
  );
};

export default RoomCard;
