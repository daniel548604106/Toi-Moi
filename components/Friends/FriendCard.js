import React, { useState } from 'react';
import genderAvatar from '../../utils/genderAvatar';
import Image from 'next/image';
import router from 'next/router';
import { CheckIcon } from '@heroicons/react/solid';
import { apiPostFriendRequest } from '../../api/index';
const FriendCard = ({ user, removeRecommendation, idx }) => {
  const [added, setAdded] = useState(false);
  const handleAddFriend = async () => {
    try {
      setAdded(true);
      const { data } = await apiPostFriendRequest(user.username);
      removeRecommendation(user._id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        added && 'opacity-20'
      } transition-opacity duration-500  p-3 bg-secondary shadow-lg rounded-lg text-secondary`}
    >
      <div
        onClick={() =>
          router.push(`/friends/suggestions?profile_id=${user._id}`)
        }
        className="relative h-[150px] sm:h-[200px]"
      >
        <Image
          className="cursor-pointer w-full h-auto object-cover rounded-lg"
          src={user.profileImage || genderAvatar(user.gender)}
          layout="fill"
        />
      </div>
      <p className="text-xs sm:text-sm font-semibold mb-5 mt-3">{user.name}</p>
      <div className="space-y-2">
        <button
          onClick={() => handleAddFriend()}
          className="text-xs outline-none flex items-center justify-center sm:text-sm rounded-lg p-2 w-full bg-main text-white "
        >
          {added ? <CheckIcon className="h-4 text-white" /> : 'Add Friend'}
        </button>
        <button
          onClick={() => removeRecommendation(user._id)}
          className="text-xs sm:text-sm rounded-lg p-2 w-full bg-button text-secondary"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
