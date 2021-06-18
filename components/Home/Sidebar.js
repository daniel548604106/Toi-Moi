import React from 'react';
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon
} from '@heroicons/react/solid';
import SidebarRow from './SidebarRow';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div className="max-w-[400px] sticky top-[80px] ">
      <SidebarRow src={userInfo.profileImage} title={userInfo.name} />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={ClockIcon} title="Events" />
      <SidebarRow Icon={CalendarIcon} title="Memory" />
      <SidebarRow Icon={ChevronDownIcon} title="See more" />
    </div>
  );
};

export default Sidebar;
