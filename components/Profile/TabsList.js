import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import {
  DotsHorizontalIcon,
  PencilAltIcon,
  UsersIcon,
  ChatAlt2Icon
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
const tabs = [
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
const TabsList = ({ user }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.query.tab);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoggedInUser = user.username === userInfo.username;
  useEffect(() => {
    setActiveTab(router.query.tab);
  }, [router.query.tab]);
  return (
    <div className="p-3 border-t bg-white  flex items-center justify-between">
      <div>
        {tabs.map((tab) => (
          <span
            key={tab.title}
            className={`p-3 capitalize font-semibold cursor-pointer text-gray-600 rounded-lg hover:bg-gray-100 ${
              (activeTab === tab.title ||
                (tab.title === 'posts' && !router.query.tab)) &&
              'text-blue-600 border-b hover:bg-opacity-0 rounded-none border-blue-600'
            }`}
            onClick={() => router.push(`/${user.username}/${tab.link}`)}
          >
            {tab.title}
          </span>
        ))}
      </div>
      {isLoggedInUser ? (
        <div className="flex items-center  space-x-3">
          <button className="flex items-center  bg-blue-600 text-white rounded-md px-3 py-2">
            <PlusCircleIcon className="h-6 mr-2" />
            <span> Add New Stories</span>
          </button>
          <button className="flex items-center  bg-gray-100 rounded-md py-2 px-3">
            <PencilAltIcon className="h-6 mr-2" />
            <span> Edit Profile</span>
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
