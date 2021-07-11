import React, { useState, useRef } from 'react';
import genderAvatar from '../../utils/genderAvatar';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/outline';
import router from 'next/router';
import useClickOutside from '../../hooks/useClickOutside';
import { apiDeleteSavedPost } from '../../api';
const SavedCard = ({ post, publisher, type, handleRemoveSavedPost }) => {
  const [isDropdownShow, setDropdownShow] = useState(false);
  const elRef = useRef();
  useClickOutside(elRef, () => setDropdownShow(false));
  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownShow(!isDropdownShow);
  };
  const handleDeletePost = async (id) => {
    handleRemoveSavedPost(id);
    try {
      const { data } = await apiDeleteSavedPost(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => router.push(`/${publisher.username}/posts/${post._id}`)}
      className="flex relative items-center w-full justify-between p-2 rounded-lg shadow-lg cursor-pointer"
    >
      <div className="flex items-center">
        <img
          className="w-[60px] h-[60px] sm:w-[100px] object-cover sm:h-[100px] rounded-lg"
          src={
            post.picUrl ||
            publisher.profileImage ||
            genderAvatar(publisher.gender)
          }
        />
        <div className="flex-1 ml-[10px] truncate space-y-2">
          <p className="truncate overflow-hidden text-xs sm:text-sm w-[200px] sm:w-[300px]">
            {post.text}
          </p>
          <span className="inline-block text-xs sm:text-sm p-1 sm:p-2 rounded-lg bg-main text-white">
            {type}
          </span>
        </div>
      </div>
      <span
        ref={elRef}
        onClick={(e) => handleToggleDropdown(e)}
        className="top-1/2 right-2 transform -translate-y-1/2   absolute rounded-full p-2 border"
      >
        <DotsHorizontalIcon className="w-4 h-4 sm:w-6" />
        {isDropdownShow && (
          <div
            onClick={() => handleDeletePost(post._id)}
            className="absolute flex items-center justify-center transform rounded-lg translate-y-full right-0 bottom-0 p-2 border"
          >
            <TrashIcon className="h-4 sm:h-6 mr-2 " />{' '}
            <span className="text-xs sm:text-sm">Delete</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default SavedCard;
