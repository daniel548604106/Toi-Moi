import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import SidebarListItem from './SidebarListItem';
import genderAvatar from '../../../utils/genderAvatar';
import { useSelector } from 'react-redux';
import router from 'next/router';
import Image from 'next/image';

const Sidebar = () => {
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isSeeMoreOpen, setSeeMoreOpen] = useState(false);
  return (
    <div className="max-w-[400px] sticky top-[80px] ">
      <div
        className="flex hover:bg-gray-200 items-center rounded-lg  p-4 py-3 cursor-pointer "
        onClick={() => router.push(`/${userInfo.username}`)}
      >
        <Image
          width={35}
          height={35}
          layout="fixed"
          className="rounded-full"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <p className="hidden sm:inline-flex font-medium ml-3">
          {userInfo.name}
        </p>
      </div>
      <SidebarListItem
        link="friends"
        src="/icons/friend.png"
        title={t('sidebar.friends')}
      />
      <SidebarListItem
        src="/icons/marketplace.png"
        link="marketplace"
        title={t('sidebar.marketPlace')}
      />
      <SidebarListItem
        link="groups"
        src="/icons/group.png"
        title={t('sidebar.groups')}
      />
      <SidebarListItem
        link="bookmark"
        src="/icons/bookmark.png"
        title={t('sidebar.saved')}
      />
      <SidebarListItem
        link="friends-list"
        src="/icons/friendList.png"
        title={t('sidebar.friendList')}
      />
      <SidebarListItem
        link="fanpage"
        src="/icons/page.png"
        title={t('sidebar.fanPage')}
      />
      {isSeeMoreOpen ? (
        <>
          <SidebarListItem
            link="favorite"
            src="/icons/favorite.png"
            title={t('sidebar.favorite')}
          />
          <SidebarListItem
            link="events"
            src="/icons/event.png"
            title={t('sidebar.events')}
          />
        </>
      ) : (
        <div onClick={() => setSeeMoreOpen(true)}>
          <SidebarListItem
            Icon={ChevronDownIcon}
            title={t('sidebar.seeMore')}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
