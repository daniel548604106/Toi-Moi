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
    <div className=" sm:mt-0  ">
      <div className="lg:mr-[400px]">
        <ProfileCover profile={profile.profile} user={profile.profile.user} />
        <div className="py-[30px] mx-auto px-3  max-w-[700px]">
          <h2 className="mb-[10px] text-sm text-gray-400">From notification</h2>
          <Post post={post} />
        </div>
      </div>
      <div className="fixed right-0 h-screen lg:flex flex-col top-[64px]  border  hidden    p-3 py-5 bg-secondary text-secondary w-[400px]">
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
