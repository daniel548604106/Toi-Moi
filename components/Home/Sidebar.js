import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

import SidebarRow from './SidebarRow';
import genderAvatar from '../../utils/genderAvatar';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isSeeMoreOpen, setSeeMoreOpen] = useState(false);
  return (
    <div className="max-w-[400px] sticky top-[80px] ">
      <SidebarRow
        src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        title={userInfo.name}
      />
      <SidebarRow src="/icons/friend.png" title="Friends" />
      <SidebarRow src="/icons/marketplace.png" title="Marketplace" />

      <SidebarRow src="/icons/group.png" title="Groups" />
      <SidebarRow src="/icons/bookmark.png" title="Saved" />
      <SidebarRow src="/icons/friendList.png" title="Friend List" />
      <SidebarRow src="/icons/page.png" title="Fan Page" />
      {isSeeMoreOpen ? (
        <>
          <SidebarRow src="/icons/favorite.png" title="Favorite" />

          <SidebarRow src="/icons/event.png" title="Events" />
        </>
      ) : (
        <div onClick={() => setSeeMoreOpen(true)}>
          <SidebarRow Icon={ChevronDownIcon} title="See more" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
