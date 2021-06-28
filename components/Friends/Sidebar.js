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
    <div className="flex w-screen sm:w-auto items-center overflow-x-auto whitespace-nowrap sm:flex-col sm:items-start p-1 sm:p-3  bg-secondary">
      <h2 className=" text-lg mb-3 sm:text-2xl font-semibold hidden sm:block">
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
