import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  DotsHorizontalIcon,
  PencilAltIcon,
  CameraIcon
} from '@heroicons/react/outline';
import { PlusCircleIcon } from '@heroicons/react/solid';
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
const ProfileCover = ({ user, profile }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.query.tab);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    setActiveTab(router.query.tab);
    console.log(router.query);
  }, [router.query.tab]);

  return (
    <div className=" bg-white border">
      <div className=" relative bg-gray-100 w-screen  rounded-xl">
        <Image
          width={1000}
          height={500}
          layout="responsive"
          src={profile.profileCoverImage || `/images/profileCoverDefault.png`}
        />
        {userInfo.username === router.query.id && (
          <span className="px-4 py-2 absolute bottom-5 hover:shadow-xl cursor-pointer rounded-md right-5 bg-white">
            <CameraIcon className="h-6 " />
          </span>
        )}
        <div className="absolute translate-y-[10px] bottom-0 border w-[160px] h-[160px] rounded-full border-white transform left-1/2 -translate-x-1/2">
          <Image
            className="cursor-pointer object-cover h-[60px] w-[60px] sm:w-[100px] sm:h-[100px]   rounded-full"
            src={user.profileImage}
            layout="fill"
          />
        </div>
      </div>

      <div className=" p-5 space-x-2  flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <span>{profile.bio}</span>
        <span className="text-blue-600 cursor-pointer">Edit</span>
        <hr className="my-2" />
      </div>
      <div className="p-3 border-t  flex items-center justify-between">
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
      </div>
    </div>
  );
};

export default ProfileCover;
