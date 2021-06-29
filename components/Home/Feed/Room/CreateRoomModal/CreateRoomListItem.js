import React from 'react';

const CreateRoomListItem = ({ Icon, RightIcon, title, subtitle }) => {
  return (
    <div className="cursor-pointer p-2 flex items-center justify-between">
      <div className="flex items-center">
        <span className="rounded-full p-2 border">
          <Icon className="h-6" />
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
