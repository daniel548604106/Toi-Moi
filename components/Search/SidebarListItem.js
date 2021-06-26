import React from 'react';

const SidebarListItem = ({ Icon, title, active }) => {
  return (
    <div
      className={` ${
        active && 'bg-blue-200 text-secondary'
      } flex items-center p-2 rounded-md hover:bg-gray-100`}
    >
      <span
        className={`p-2 rounded-full bg-gray-200 cursor-pointer ${
          active && 'bg-main'
        }`}
      >
        <Icon className="h-6" />
      </span>
      <span className="ml-[10px]">{title}</span>
    </div>
  );
};

export default SidebarListItem;
