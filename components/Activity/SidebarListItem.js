import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import router from 'next/router';
const SidebarListItem = ({ Icon, title, lists, param }) => {
  const handleClick = () => {
    router.push(`/search/${param}?q=${router.query.q}`);
  };
  const isActive = router.query.type === param;
  return (
    <div
      onClick={() => handleClick()}
      className={`flex  items-center cursor-pointer hover:bg-gray-100 justify-between p-3 py-2 rounded-md ${
        isActive && 'bg-blue-100'
      }`}
    >
      <div className="flex items-center">
        <span
          className={`rounded-full p-2 bg-gray-100 mr-[20px] ${
            isActive && 'bg-main text-secondary'
          }`}
        >
          <Icon className="h-6" />
        </span>
        <span>{title}</span>
      </div>
      {lists && (
        <span className="p-1 rounded-full hover:bg-gray-100">
          <ChevronDownIcon className="h-6" />
        </span>
      )}
    </div>
  );
};

export default SidebarListItem;
