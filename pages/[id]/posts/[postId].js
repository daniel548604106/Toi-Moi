import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import LoaderSpinner from '../../../components/Global/LoaderSpinner';
import Loader from '../../../components/Global/Loader';
import ProfileCover from '../../../components/Post/ProfileCover';

import { DotsHorizontalIcon } from '@heroicons/react/outline';
// Dynamic import
const Post = dynamic(() => import('../../../components/Home/Feed/Post'), {
  loading: () => <LoaderSpinner />
});
const NotificationItem = dynamic(
  () => import('../../../components/Post/NotificationItem'),
  {
    loading: () => <Loader />
  }
);
const PostLayout = ({ post, profile, notifications }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(post, 'post', profile, notifications);
  }, []);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isViewPostModalOpen = useSelector(
    (state) => state.post.isViewPostModalOpen
  );

  return (
    <div className=" sm:mt-0 flex fullBodyHeight ">
      <div className="w-full">
        <ProfileCover profile={profile.profile} user={profile.profile.user} />
        <div className="py-[30px] px-3  mx-auto max-w-[600px]">
          <h2 className="mb-[10px] text-sm text-gray-400">From notification</h2>
          <Post post={post} />
        </div>
      </div>
      <div className="sticky fullBodyHeight lg:flex flex-col  self-start top-[64px]  border w-[30%] hidden    p-3 py-5 bg-secondary text-secondary min-w-[350px]">
        <div className=" flex items-center justify-between px-2">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <span className="cursor-pointer rounded-full p-2 bg-secondary text-secondary hover:shadow-lg">
            <DotsHorizontalIcon className="h-6" />
          </span>
        </div>
        <div className="overflow-y-auto flex-1">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostLayout;

export async function getServerSideProps({ req, params, res }) {
  try {
    const token = req.cookies.token;
    console.log('postID', params, req.query);
    const username = params.id;
    const postId = params.postId;

    // Get Post
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Get Profile
    const profile = await axios.get(
      `${process.env.BASE_URL}/api/profile/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Get Notifications
    const notifications = await axios.get(
      `${process.env.BASE_URL}/api/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return {
      props: {
        post: data,
        notifications: notifications.data,
        profile: profile.data
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        errorLoading: true
      }
    };
  }
}
