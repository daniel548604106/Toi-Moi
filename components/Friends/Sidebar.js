import React from 'react';
import SidebarListItem from './SidebarListItem';
import {
  UsersIcon,
  UserIcon,
  UserAddIcon,
  UserGroupIcon,
  CakeIcon
} from '@heroicons/react/outline';
const Sidebar = () => {
  return (
    <div className="flex  w-screen scrollbar-hide   items-center overflow-x-auto lg:fixed lg:left-0  lg:w-[300px] lg:h-screen lg:overflow-y-auto lg:pt-[60px]  whitespace-nowrap lg:flex-col lg:items-start p-1 lg:p-3  bg-secondary">
      <h2 className=" text-lg mb-3 sm:text-2xl font-semibold hidden lg:block">
        Friend
      </h2>
      <SidebarListItem link="" Icon={UsersIcon} title="Home Page" />
      <SidebarListItem link="suggestions" Icon={UserIcon} title="Suggestions" />
      <SidebarListItem
        link="requests"
        Icon={UserAddIcon}
        title="Friend Requests"
      />
      <SidebarListItem link="lists" Icon={UserGroupIcon} title="All Friends" />
      <SidebarListItem link="birthdays" Icon={CakeIcon} title="Birthdays" />
    </div>
  );
};

export default Sidebar;
