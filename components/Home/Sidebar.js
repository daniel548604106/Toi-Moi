import React from 'react'
import {ChevronDownIcon, ShoppingBagIcon, UserGroupIcon} from '@heroicons/react/outline'
import { CalendarIcon, ClockIcon, DesktopComputerIcon, UsersIcon} from '@heroicons/react/solid'
import SidebarRow from './SidebarRow'
const Sidebar = () => {
  return (
    <div className="hidden lg:block w-full max-w-[400px] xl:min-w-[300px]">
      {/* <SidebarRow src={session.user.image} title={session.user.name}/> */}
      <SidebarRow Icon={UsersIcon} title="Friends"/>
      <SidebarRow Icon={UserGroupIcon} title="Groups"/>
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace"/>
      <SidebarRow Icon={DesktopComputerIcon} title="Watch"/>
      <SidebarRow Icon={ClockIcon} title="Events"/>
      <SidebarRow Icon={CalendarIcon} title="Memory"/>
      <SidebarRow Icon={ChevronDownIcon} title="See more"/>
    </div>
  )
}

export default Sidebar
