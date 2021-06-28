import router from 'next/router';
import React from 'react';

const SidebarListItem = ({ Icon, title, link }) => {
  const active = router.pathname.includes(link);
  return (
    <div
      onClick={() => router.push(`/friends/${link}`)}
      className={`flex items-center p-3 py-2 cursor-pointer ${
        active && 'text-main'
      }`}
    >
      <span
        className={`rounded-full p-2 mr-3  ${
          active ? 'bg-main text-white' : 'bg-button text-secondary'
        }`}
      >
        <Icon className="h-6" />
      </span>
      <p>{title}</p>
    </div>
  );
};

export default SidebarListItem;
