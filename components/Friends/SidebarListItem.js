import router from 'next/router';
import React, { useRef } from 'react';

const SidebarListItem = ({ Icon, title, link }) => {
  const active = router.pathname.includes(link);
  const btnRef = useRef(null);
  const handleClick = (e) => {
    router.push(`/friends/${link}`, undefined, { shallow: true });
    console.log('clicked');
  };
  return (
    <div
      onClick={(e) => handleClick(e)}
      className={`flex items-center p-3 py-2 cursor-pointer ${
        active && 'text-main'
      }`}
    >
      <span
        className={`rounded-full p-1 sm:p-2 mr-3  ${
          active ? 'bg-main text-white' : 'bg-button text-secondary'
        }`}
      >
        <Icon className="h-5 sm:h-6" />
      </span>
      <p className="text-sm sm:text-md">{title}</p>
    </div>
  );
};

export default SidebarListItem;
