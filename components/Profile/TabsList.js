import React, { useState, useEffect } from 'react';
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/solid';
import {
  DotsHorizontalIcon,
  PencilAltIcon,
  UserAddIcon,
  ChatAlt2Icon,
  UsersIcon
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { apiPostFriendRequest, apiRemoveFriendRequest } from '../../api/index';
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

const TabsList = ({ user, friends_total, friend_status }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.query.tab);
  const [visibleTabs, setVisibleTabs] = useState(tabs);
  const [moreTabs, setMoreTabs] = useState(hiddenTabs);
  const [friendStatus, setFriendStatus] = useState(friend_status);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoggedInUser = router.query.id === userInfo.username;
  const handleSendFriendRequest = async () => {
    try {
      setFriendStatus('friendRequested');
      const { data } = await apiPostFriendRequest(router.query.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveRequest = async () => {
    try {
      setFriendStatus('unfriend');
      const { data } = await apiRemoveFriendRequest(router.query.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptInvitation = async () => {
    try {
      setFriendStatus('friend');
      const { data } = await apiPostFriendRequest(router.query.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setActiveTab(router.query.tab);
  }, [router.query.tab]);

  return (
    <div className="p-3  border-t bg-secondary text-secondary  flex items-center justify-between">
      <div className="flex items-center font-semibold text-gray-600 capitalize">
        {visibleTabs.slice(0, 0).map((tab) => (
          <span
            key={tab.title}
            className={`p-3 text-xs sm:text-sm   cursor-pointer  rounded-lg hover:bg-gray-100 ${
              (activeTab === tab.title ||
                (tab.title === 'posts' && !router.query.tab)) &&
              'text-main border-b hover:bg-opacity-0 rounded-none border-main'
            }`}
            onClick={() => router.push(`/${router.query.id}/${tab.link}`)}
          >
            {tab.title} {tab.title === 'friends' && friends_total}
          </span>
        ))}
        <span className="hidden text-xs sm:text-sm relative sm:flex cursor-pointer items-center p-3  rounded-lg hover:bg-gray-100">
          More
          <ChevronDownIcon className="h-4" />
          <div className="hidden absolute bottom-0 left-0 transform translate-y-full rounded-lg shadow-xl border p-2 bg-secondary text-secondary w-[300px]">
            {moreTabs.map((tab) => (
              <div key={tab.title}>{tab.title}</div>
            ))}
          </div>
        </span>
      </div>
      {isLoggedInUser ? (
        <div className="flex items-center  space-x-3">
          <button
            onClick={() => router.push('/stories/create')}
            className="flex items-center  bg-main text-white rounded-md px-3 py-2"
          >
            <PlusCircleIcon className="h-6 mr-2" />
            <span className="text-xs sm:text-sm"> Add New Stories</span>
          </button>
          <button className="flex items-center  bg-button  rounded-md py-2 px-3">
            <PencilAltIcon className="h-6 mr-2" />
            <span className="text-xs sm:text-sm"> Edit Profile</span>
          </button>
          <button className="py-2 px-3  rounded-md  bg-button">
            <DotsHorizontalIcon className="h-6" />
          </button>
        </div>
      ) : (
        <div className="flex items-center  space-x-3">
          {friendStatus === 'unfriend' && (
            <button
              onClick={() => handleSendFriendRequest()}
              className="text-xs text-black sm:text-sm flex items-center  bg-gray-100 rounded-md py-2 px-3"
            >
              <UserAddIcon className="h-6 mr-2" />
              Add Friend
            </button>
          )}
          {friendStatus === 'friendRequested' && (
            <button
              onClick={() => handleRemoveRequest()}
              className="text-xs sm:text-sm flex items-center  bg-gray-100 rounded-md py-2 px-3"
            >
              <CheckIcon className="h-6 mr-2" />
              Request Sent
            </button>
          )}
          {friendStatus === 'friendInvited' && (
            <button
              onClick={() => handleAcceptInvitation()}
              className="text-xs sm:text-sm flex items-center  border-main border text-main  rounded-md py-2 px-3"
            >
              <CheckIcon className="h-6 mr-2" />
              Accept Invitation
            </button>
          )}
          {friendStatus === 'friend' && (
            <button
              onClick={() => handleRemoveRequest()}
              className="text-xs sm:text-sm flex items-center  border-main border text-main  rounded-md py-2 px-3"
            >
              <UsersIcon className="h-6 mr-2" />
              Friend
            </button>
          )}
          <button
            onClick={() =>
              router.push(`/messages?messageWith=${router.query.id}`)
            }
            className="text-xs sm:text-sm flex items-center  bg-main text-white rounded-md px-3 py-2"
          >
            <ChatAlt2Icon className="h-6 mr-2" />
            Message
          </button>
          <button className="py-2 px-3 rounded-md  text-black bg-gray-100">
            <DotsHorizontalIcon className="h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TabsList;
