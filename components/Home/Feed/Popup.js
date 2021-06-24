import React from 'react';
import { TrashIcon, BookmarkIcon } from '@heroicons/react/outline';
import { apiDeletePost } from '../../../api/index';
import { useSelector } from 'react-redux';
import router from 'next/router';
const Popup = ({ postId, user }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleDeletePost = async () => {
    try {
      const { data } = await apiDeletePost(postId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-lg p-3 w-[300px] rounded-md  bg-secondary text-secondary">
      {user.username === userInfo.username && (
        <div
          onClick={() => handleDeletePost()}
          className="rounded-md flex items-center hover:bg-gray-100 py-2 px-3"
        >
          <TrashIcon className="h-6" />
          <span className="ml-[10px] text-sm whitespace-nowrap">
            Move to trash can
          </span>
        </div>
      )}
      <div className="rounded-md flex items-center hover:bg-gray-100 py-2 px-3">
        <BookmarkIcon className="h-6" />
        <span className="ml-[10px] text-sm whitespace-nowrap">Save post</span>
      </div>
    </div>
  );
};

export default Popup;
