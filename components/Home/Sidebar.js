import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import SidebarRow from './SidebarRow';
import genderAvatar from '../../utils/genderAvatar';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isSeeMoreOpen, setSeeMoreOpen] = useState(false);
  return (
    <div className="max-w-[400px] sticky top-[80px] ">
      <SidebarRow
        src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        title={userInfo.name}
      />
      <SidebarRow src="/icons/friend.png" title={t('sidebar.friends')} />
      <SidebarRow
        src="/icons/marketplace.png"
        title={t('sidebar.marketPlace')}
      />

      <SidebarRow src="/icons/group.png" title={t('sidebar.groups')} />
      <SidebarRow src="/icons/bookmark.png" title={t('sidebar.saved')} />
      <SidebarRow src="/icons/friendList.png" title={t('sidebar.friendList')} />
      <SidebarRow src="/icons/page.png" title={t('sidebar.fanPage')} />
      {isSeeMoreOpen ? (
        <>
          <SidebarRow src="/icons/favorite.png" title={t('sidebar.favorite')} />

          <SidebarRow src="/icons/event.png" title={t('sidebar.events')} />
        </>
      ) : (
        <div onClick={() => setSeeMoreOpen(true)}>
          <SidebarRow Icon={ChevronDownIcon} title={t('sidebar.seeMore')} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
