import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import {
  DotsHorizontalIcon,
  PencilAltIcon,
  UsersIcon,
  ChatAlt2Icon
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
let tabs = [
  {
    title: 'posts',
    link: '/'
  },
  {
    title: 'friends',
    link: 'friends'
  },
  {
    title: 'photos',
    link: 'photos'
  },
  {
    title: 'about',
    link: 'about'
  },
  {
    title: 'stories',
    link: 'stories'
  }
];

const hiddenTabs = [
  {
    title: 'saved',
    link: 'saved'
  }
];

const TabsList = ({ user, friends_total }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.query.tab);
  const [visibleTabs, setVisibleTabs] = useState(tabs);
  const [moreTabs, setMoreTabs] = useState(hiddenTabs);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoggedInUser = router.query.id === userInfo.username;
  useEffect(() => {
    setActiveTab(router.query.tab);
  }, [router.query.tab]);

  const handleResize = () => {
    let width = window.innerWidth;
    if (width < 600) {
      setVisibleTabs(visibleTabs.slice(0, 0));
    } else if (width < 700) {
      setVisibleTabs(visibleTabs.slice(0, 1));
    } else if (width < 900) {
      setVisibleTabs(visibleTabs.slice(0, 2));
    } else if (width < 1000) {
      setVisibleTabs(visibleTabs.slice(0, 3));
    } else if (width < 1200) {
      setVisibleTabs(visibleTabs.slice(0, 5));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);
  return (
    <div className="p-3  border-t bg-white  flex items-center justify-between">
      <div className="flex items-center font-semibold text-gray-600 capitalize">
        {visibleTabs.map((tab) => (
          <span
            key={tab.title}
            className={`p-3 text-xs sm:text-sm   cursor-pointer  rounded-lg hover:bg-gray-100 ${
              (activeTab === tab.title ||
                (tab.title === 'posts' && !router.query.tab)) &&
              'text-blue-600 border-b hover:bg-opacity-0 rounded-none border-blue-600'
            }`}
            onClick={() => router.push(`/${router.query.id}/${tab.link}`)}
          >
            {tab.title} {tab.title === 'friends' && friends_total}
          </span>
        ))}
        <span className="hidden text-xs sm:text-sm relative sm:flex cursor-pointer items-center p-3  rounded-lg hover:bg-gray-100">
          More
          <ChevronDownIcon className="h-4" />
          <div className="hidden absolute bottom-0 left-0 transform translate-y-full rounded-lg shadow-xl border p-2 bg-white w-[300px]">
            {moreTabs.map((tab) => (
              <div key={tab.title}>{tab.title}</div>
            ))}
          </div>
        </span>
      </div>
      {isLoggedInUser ? (
        <div className="flex items-center  space-x-3">
          <button className="flex items-center  bg-blue-600 text-white rounded-md px-3 py-2">
            <PlusCircleIcon className="h-6 mr-2" />
            <span className="text-xs sm:text-sm"> Add New Stories</span>
          </button>
          <button className="flex items-center  bg-gray-100 rounded-md py-2 px-3">
            <PencilAltIcon className="h-6 mr-2" />
            <span className="text-xs sm:text-sm"> Edit Profile</span>
          </button>
          <button className="py-2 px-3 rounded-md  bg-gray-100">
            <DotsHorizontalIcon className="h-6" />
          </button>
        </div>
      ) : (
        <div className="flex items-center  space-x-3">
          <button className="flex items-center  bg-gray-100 rounded-md py-2 px-3">
            <UsersIcon className="h-6 mr-2" />
            Friend
          </button>
          <button className="flex items-center  bg-blue-600 text-white rounded-md px-3 py-2">
            <ChatAlt2Icon className="h-6 mr-2" />
            Message
          </button>
          <button className="py-2 px-3 rounded-md  bg-gray-100">
            <DotsHorizontalIcon className="h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TabsList;
