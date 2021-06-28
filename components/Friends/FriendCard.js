import React from 'react';
import genderAvatar from '../../utils/genderAvatar';
import Image from 'next/image';
import router from 'next/router';
import { apiPostFriendRequest } from '../../api/index';
const FriendCard = ({ user }) => {
  const handleAddFriend = async () => {
    try {
      const { data } = await apiPostFriendRequest(user.username);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" p-3 bg-secondary shadow-lg rounded-lg text-secondary">
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
          className="text-xs sm:text-sm rounded-lg p-2 w-full bg-main text-white "
        >
          Add Friend
        </button>
        <button className="text-xs sm:text-sm rounded-lg p-2 w-full bg-button text-secondary">
          Remove
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
