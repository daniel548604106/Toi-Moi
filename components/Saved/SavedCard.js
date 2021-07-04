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
      className="flex items-center justify-between p-2 rounded-lg shadow-lg cursor-pointer"
    >
      <div className="flex items-center">
        <Image
          width={150}
          height={150}
          className="w-[60px] h-[60px] object-cover sm:w-[150px] sm:h-[150px] rounded-lg"
          src={
            post.picUrl ||
            publisher.profileImage ||
            genderAvatar(publisher.gender)
          }
        />
        <div className="ml-[10px]">
          <p className="overflow-hidden truncate">{post.text}</p>
          <p>{type}</p>
        </div>
      </div>
      <span
        ref={elRef}
        onClick={(e) => handleToggleDropdown(e)}
        className="relative rounded-full p-2 border"
      >
        <DotsHorizontalIcon className="h-6" />
        {isDropdownShow && (
          <div
            onClick={() => handleDeletePost(post._id)}
            className="absolute flex items-center transform rounded-lg translate-y-full right-0 bottom-0 p-2 border"
          >
            <TrashIcon className="h-6 mr-2" /> <span>Delete</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default SavedCard;
