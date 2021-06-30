import React from 'react';

const CreateRoomListItem = ({ Icon, icon, RightIcon, title, subtitle }) => {
  return (
    <div className="cursor-pointer p-2 flex items-center justify-between">
      <div className="flex items-center">
        <span className="rounded-full w-[50px] h-[50px] flex items-center justify-center border">
          {Icon ? (
            <Icon className="h-6" />
          ) : (
            <span className="text-lg sm:text-2xl">{icon}</span>
          )}
        </span>
        <div className="ml-[10px]">
          <p>{title}</p>
          <p className="text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>
      <span className="rounded-full p-2 border">
        <RightIcon className="h-6" />
      </span>
    </div>
  );
};

export default CreateRoomListItem;
