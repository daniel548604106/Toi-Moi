import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import SidebarListItem from './SidebarListItem';
import genderAvatar from '../../../utils/genderAvatar';
import { useSelector } from 'react-redux';
import router from 'next/router';

const Sidebar = () => {
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isSeeMoreOpen, setSeeMoreOpen] = useState(false);
  const handleSeeMore = (e) => {
    e.stopPropagation();
    setSeeMoreOpen(true);
  };
  return (
    <div className="max-w-[400px] text-secondary sm:sticky top-[80px] ">
      <div
        className="flex hover:bg-gray-200 items-center rounded-lg  p-4 py-3 cursor-pointer "
        onClick={() => router.push(`/${userInfo.username}`)}
      >
        <img
          alt="user profile image"
          className="w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] rounded-full object-cover"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <p className=" sm:inline-flex font-medium ml-3">{userInfo.name}</p>
      </div>
      <hr className="sm:hidden" />
      <SidebarListItem
        link="friends"
        src="/icons/friend.png"
        title={t('sidebar.friends')}
      />
      <SidebarListItem
        src="/icons/marketplace.png"
        link="marketplace/browse/all"
        title={t('sidebar.marketPlace')}
      />
      <SidebarListItem
        link="groups"
        src="/icons/group.png"
        title={t('sidebar.groups')}
      />
      <SidebarListItem
        link="saved"
        src="/icons/bookmark.png"
        title={t('sidebar.saved')}
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
        <div onClick={(e) => handleSeeMore(e)}>
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
